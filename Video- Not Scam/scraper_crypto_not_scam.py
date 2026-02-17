"""
YouTube Crypto "NOT SCAM" Video Scraper
Uses YouTube Data API v3 to find crypto videos labeled as "NOT SCAM"
and stores them in a local SQLite database for deduplication.
"""

import json
import os
import re
import sqlite3
import sys
import time
from datetime import datetime, timezone

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "crypto_not_scam.db")

SEARCH_QUERIES = [
    "crypto not scam",
    "bitcoin not a scam",
    "ethereum legit",
    "crypto legitimate",
    "cryptocurrency not scam review",
    "bitcoin honest review",
    "crypto safe investment",
    "is bitcoin a scam",
    "crypto scam or not",
    "altcoin not scam",
]

NOT_SCAM_PATTERNS = [
    r"not\s+a?\s*scam",
    r"no\s+scam",
    r"legit\s+not\s+scam",
    r"isn'?t\s+a\s+scam",
    r"is\s+not\s+a\s+scam",
    r"legitimate",
    r"legit",
    r"not\s+fraud",
]

NOT_SCAM_RE = re.compile("|".join(NOT_SCAM_PATTERNS), re.IGNORECASE)

MAX_PAGES_PER_QUERY = 5  # Cap to conserve API quota


def init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS videos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            video_id TEXT UNIQUE NOT NULL,
            url TEXT NOT NULL,
            title TEXT,
            description TEXT,
            channel_title TEXT,
            published_at TEXT,
            view_count INTEGER,
            like_count INTEGER,
            comment_count INTEGER,
            tags TEXT,
            label TEXT DEFAULT 'NOT SCAM',
            scraped_at TEXT,
            category TEXT DEFAULT 'Crypto'
        )
    """)
    conn.commit()
    return conn


def video_exists(conn, video_id):
    row = conn.execute(
        "SELECT 1 FROM videos WHERE video_id = ?", (video_id,)
    ).fetchone()
    return row is not None


def save_video(conn, video):
    conn.execute(
        """INSERT INTO videos
           (video_id, url, title, description, channel_title, published_at,
            view_count, like_count, comment_count, tags, label, scraped_at, category)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (
            video["video_id"],
            video["url"],
            video["title"],
            video["description"],
            video["channel_title"],
            video["published_at"],
            video.get("view_count"),
            video.get("like_count"),
            video.get("comment_count"),
            json.dumps(video.get("tags", [])),
            "NOT SCAM",
            datetime.now(timezone.utc).isoformat(),
            "Crypto",
        ),
    )
    conn.commit()


def is_not_scam(title, description):
    text = f"{title} {description}"
    return NOT_SCAM_RE.search(text) is not None


def fetch_video_details(youtube, video_ids):
    """Fetch statistics and tags for a batch of video IDs."""
    details = {}
    for i in range(0, len(video_ids), 50):
        batch = video_ids[i : i + 50]
        resp = youtube.videos().list(
            part="statistics,snippet", id=",".join(batch)
        ).execute()
        for item in resp.get("items", []):
            vid = item["id"]
            stats = item.get("statistics", {})
            snippet = item.get("snippet", {})
            details[vid] = {
                "view_count": int(stats.get("viewCount", 0)),
                "like_count": int(stats.get("likeCount", 0)),
                "comment_count": int(stats.get("commentCount", 0)),
                "tags": snippet.get("tags", []),
            }
    return details


def search_videos(youtube, query, max_pages=MAX_PAGES_PER_QUERY):
    """Yield video snippets from search results, handling pagination."""
    page_token = None
    pages_fetched = 0

    while pages_fetched < max_pages:
        params = {
            "q": query,
            "part": "snippet",
            "type": "video",
            "maxResults": 50,
        }
        if page_token:
            params["pageToken"] = page_token

        resp = youtube.search().list(**params).execute()
        yield resp.get("items", [])

        page_token = resp.get("nextPageToken")
        pages_fetched += 1
        if not page_token:
            break


def run():
    api_key = os.environ.get("YOUTUBE_API_KEY")
    if not api_key:
        print("Error: Set the YOUTUBE_API_KEY environment variable.")
        sys.exit(1)

    youtube = build("youtube", "v3", developerKey=api_key)
    conn = init_db()

    total_scanned = 0
    total_not_scam = 0
    total_skipped = 0
    total_saved = 0

    for query in SEARCH_QUERIES:
        print(f"\n--- Searching: \"{query}\" ---")

        try:
            for items in search_videos(youtube, query):
                # Collect video IDs that pass the NOT SCAM check
                candidates = []
                for item in items:
                    total_scanned += 1
                    snippet = item["snippet"]
                    title = snippet.get("title", "")
                    description = snippet.get("description", "")

                    if is_not_scam(title, description):
                        video_id = item["id"]["videoId"]
                        candidates.append({
                            "video_id": video_id,
                            "url": f"https://www.youtube.com/watch?v={video_id}",
                            "title": title,
                            "description": description,
                            "channel_title": snippet.get("channelTitle", ""),
                            "published_at": snippet.get("publishedAt", ""),
                        })

                if not candidates:
                    continue

                total_not_scam += len(candidates)

                # Batch-fetch details for candidates
                vid_ids = [c["video_id"] for c in candidates]
                details = fetch_video_details(youtube, vid_ids)

                for video in candidates:
                    vid = video["video_id"]
                    if video_exists(conn, vid):
                        total_skipped += 1
                        continue

                    extra = details.get(vid, {})
                    video.update(extra)
                    save_video(conn, video)
                    total_saved += 1
                    print(f"  Saved: {video['title'][:80]}")

        except HttpError as e:
            print(f"  API error: {e}")
            if e.resp.status == 403:
                print("  Quota likely exceeded. Stopping.")
                break
            time.sleep(2)
        except ConnectionError as e:
            print(f"  Connection error: {e}")
            time.sleep(5)
        except Exception as e:
            print(f"  Unexpected error: {e}")
            time.sleep(2)

    conn.close()

    print("\n========== Summary ==========")
    print(f"  Total videos scanned:      {total_scanned}")
    print(f"  NOT SCAM videos found:     {total_not_scam}")
    print(f"  Duplicates skipped:        {total_skipped}")
    print(f"  New videos saved:          {total_saved}")
    print(f"  Database: {DB_PATH}")
    print("=============================")


if __name__ == "__main__":
    run()
