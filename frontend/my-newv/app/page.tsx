"use client"

import type React from "react"
import { useState } from "react"
import { Upload, LinkIcon, Download, Eye, Copy, Trash2, Check, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("upload")
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [detectResults, setDetectResults] = useState<any>(null)
  const [copied, setCopied] = useState(false)
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file.name)
      setDetectResults({
        aiScore: 78,
        confidence: 92,
        status: "completed",
        details: {
          paragraphs: 12,
          aiProbability: 0.78,
          humanProbability: 0.22,
        },
      })
    }
  }

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 via-purple-600 to-magenta-700 flex flex-col items-center">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-md supports-[backdrop-filter]:bg-black/30">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg
                  className="animate-float opacity-90 hover:opacity-100 transition-opacity duration-300"
                  viewBox="0 0 200 140"
                  width="48"
                  height="48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="eyeOuterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "#1e40af", stopOpacity: 1 }} />
                      <stop offset="50%" style={{ stopColor: "#1e3a8a", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "#172554", stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="magentaPlayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "#ec4899", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "#be185d", stopOpacity: 1 }} />
                    </linearGradient>
                    <filter id="shadowFilter">
                      <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
                    </filter>
                    <filter id="glowFilter">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Outer eye curve with depth and lighting */}
                  <path
                    d="M 40 70 Q 80 20, 160 70 Q 80 120, 40 70 Z"
                    fill="none"
                    stroke="url(#eyeOuterGrad)"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#shadowFilter)"
                    opacity="0.95"
                  />

                  {/* Inner eye curve with refined detail */}
                  <path
                    d="M 160 70 Q 100 30, 40 70 Q 100 110, 160 70 Z"
                    fill="none"
                    stroke="url(#eyeOuterGrad)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.7"
                  />

                  {/* Highlight/shine effect for realism */}
                  <ellipse cx="120" cy="50" rx="12" ry="8" fill="white" opacity="0.3" filter="url(#glowFilter)" />

                  {/* Play button - magenta gradient with enhanced styling */}
                  <g filter="url(#shadowFilter)">
                    <circle cx="100" cy="70" r="18" fill="url(#magentaPlayGrad)" opacity="0.95" />
                    <circle cx="100" cy="70" r="16" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                    <polygon points="95,65 95,75 107,70" fill="white" opacity="0.95" />
                  </g>
                </svg>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold tracking-tight text-white">OptiScam</h1>
                <p className="text-xs text-white/70">AI Detection Suite</p>
              </div>
            </div>
            <nav className="hidden items-center gap-8 md:flex">
              <a
                href="#"
                className="nav-link-highlight text-sm font-medium text-white/80"
                onMouseEnter={() => setHoveredNav("features")}
                onMouseLeave={() => setHoveredNav(null)}
              >
                Features
              </a>
              <a
                href="#"
                className="nav-link-highlight text-sm font-medium text-white/80"
                onMouseEnter={() => setHoveredNav("pricing")}
                onMouseLeave={() => setHoveredNav(null)}
              >
                Pricing
              </a>
              <a
                href="#"
                className="nav-link-highlight text-sm font-medium text-white/80"
                onMouseEnter={() => setHoveredNav("docs")}
                onMouseLeave={() => setHoveredNav(null)}
              >
                Docs
              </a>
              <Button
                size="sm"
                className="rounded-full shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-pink-500 to-magenta-600 hover:from-pink-600 hover:to-magenta-700 text-white border-0"
              >
                Sign In
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl w-full px-6 py-16 bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl my-8">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-pink-300 border border-pink-300/30">
              <Zap className="h-4 w-4" />
              Powered by Advanced AI
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <h2 className="mb-4 text-5xl font-bold tracking-tight text-white text-center w-full">
              <span style={{ color: "oklch(59.1% 0.293 322.896)" }}>Scam</span> or Not{" "}
              <span className="bg-gradient-to-r from-magenta-400 via-magenta-500 to-magenta-600 bg-clip-text text-transparent">
                Scam
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-white/80 leading-relaxed">
              Upload files or paste links to analyze content authenticity with precision. Know what's real.
            </p>
          </div>
        </div>

        {/* Detection Interface */}
        <Card className="border border-white/20 bg-black/20 backdrop-blur-xl p-8 mb-12 shadow-sm shadow-black/30">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-lg bg-white/10 p-1 backdrop-blur">
              <TabsTrigger value="upload" className="flex items-center gap-2 rounded-md transition-all text-white">
                <Upload className="h-4 w-4" />
                Upload File
              </TabsTrigger>
              <TabsTrigger value="link" className="flex items-center gap-2 rounded-md transition-all text-white">
                <LinkIcon className="h-4 w-4" />
                Paste Link
              </TabsTrigger>
            </TabsList>

            {/* Upload Tab */}
            <TabsContent value="upload" className="space-y-6 mt-6">
              <div className="group rounded-xl border-2 border-dashed border-white/30 bg-gradient-to-b from-white/5 to-white/0 p-12 text-center transition-all hover:border-pink-400/60 hover:from-pink-500/10 hover:to-pink-500/0">
                <div className="flex flex-col items-center gap-4">
                  <div className="rounded-lg bg-gradient-to-br from-pink-500/20 to-magenta-600/20 p-4 transition-transform group-hover:scale-110 group-hover:from-pink-500/30 group-hover:to-magenta-600/30">
                    <Upload className="h-7 w-7 text-pink-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-lg">Drag and drop your file</p>
                    <p className="text-sm text-white/70 mt-1">Supports .txt, .pdf, .docx files</p>
                  </div>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="absolute h-0 w-0 opacity-0"
                    accept=".txt,.pdf,.docx"
                  />
                  <label className="mt-2 cursor-pointer">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur transition-all duration-300"
                    >
                      Browse Files
                    </Button>
                  </label>
                </div>
              </div>

              {uploadedFile && (
                <div className="flex items-center justify-between rounded-lg bg-pink-500/20 border border-pink-500/40 p-4 backdrop-blur transition-all duration-300">
                  <span className="text-sm font-medium text-white">{uploadedFile}</span>
                  <Button
                    size="sm"
                    className="rounded-lg bg-gradient-to-r from-pink-500 to-magenta-600 hover:from-pink-600 hover:to-magenta-700 text-white border-0 transition-all duration-300"
                  >
                    Analyze Now
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Link Tab */}
            <TabsContent value="link" className="space-y-6 mt-6">
              <div className="flex gap-3">
                <input
                  type="url"
                  placeholder="https://example.com/article"
                  className="flex-1 rounded-lg border border-white/30 bg-white/10 backdrop-blur px-4 py-3 text-white placeholder-white/50 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500/30 transition-all"
                />
                <Button className="rounded-lg px-6 bg-gradient-to-r from-pink-500 to-magenta-600 hover:from-pink-600 hover:to-magenta-700 text-white border-0 transition-all duration-300">
                  Analyze
                </Button>
              </div>
              <p className="text-sm text-white/70">
                Paste a URL to extract and analyze content from web pages instantly.
              </p>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Results Section */}
        {detectResults && detectResults.status === "completed" && (
          <div className="space-y-8 animate-in fade-in-50 duration-500">
            {/* AI Score Display */}
            <Card className="border border-white/20 bg-gradient-to-br from-black/30 via-black/40 to-black/30 backdrop-blur-xl p-8 shadow-sm shadow-black/30">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/20 to-magenta-600/20 backdrop-blur p-8 border border-pink-500/30">
                  <div className="relative mb-4">
                    <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-pink-500/40 bg-gradient-to-br from-pink-500/10 to-transparent">
                      <div className="text-center">
                        <div className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-magenta-400 bg-clip-text text-transparent">
                          {detectResults.aiScore}%
                        </div>
                        <div className="text-xs font-medium text-white/70 mt-1">AI Score</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Confidence */}
                <div className="flex flex-col justify-center gap-3 rounded-xl bg-white/10 backdrop-blur p-6 border border-white/20 transition-all duration-300">
                  <div className="text-sm font-semibold text-white/70 uppercase tracking-wide">Confidence Level</div>
                  <div className="text-4xl font-bold text-white">{detectResults.confidence}%</div>
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-pink-500 to-magenta-600 transition-all duration-1000"
                      style={{ width: `${detectResults.confidence}%` }}
                    />
                  </div>
                  <p className="text-xs text-white/70 mt-2">High confidence detection</p>
                </div>

                {/* Breakdown */}
                <div className="flex flex-col justify-center gap-4 rounded-xl bg-white/10 backdrop-blur p-6 border border-white/20">
                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-medium text-white">AI-Generated</span>
                      <span className="font-bold text-pink-400">78%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-pink-500 to-pink-600" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-medium text-white">Human-Written</span>
                      <span className="font-bold text-blue-300">22%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-1/4 rounded-full bg-gradient-to-r from-blue-400 to-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-lg bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur transition-all duration-300"
              >
                <Download className="h-4 w-4" />
                Download Report
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-lg bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur transition-all duration-300"
              >
                <Eye className="h-4 w-4" />
                View Details
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-lg bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur transition-all duration-300"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Results
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-lg text-red-400 hover:bg-red-500/20 border-white/30 bg-white/10 backdrop-blur transition-all duration-300"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Detailed Report */}
            <Card className="border border-white/20 bg-black/30 backdrop-blur-xl p-6 shadow-sm shadow-black/30">
              <h3 className="mb-6 text-lg font-semibold text-white">Detailed Analysis</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur p-4 border border-white/20 transition-all duration-300 hover:border-pink-400/50">
                  <p className="text-xs font-medium text-white/70 uppercase tracking-wide">Total Paragraphs</p>
                  <p className="text-3xl font-bold text-white">{detectResults.details.paragraphs}</p>
                </div>
                <div className="space-y-2 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur p-4 border border-white/20 transition-all duration-300 hover:border-pink-400/50">
                  <p className="text-xs font-medium text-white/70 uppercase tracking-wide">Analysis Method</p>
                  <p className="text-lg font-semibold text-white">Advanced NLP</p>
                </div>
                <div className="space-y-2 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur p-4 border border-white/20 transition-all duration-300 hover:border-pink-400/50">
                  <p className="text-xs font-medium text-white/70 uppercase tracking-wide">Processing Time</p>
                  <p className="text-lg font-semibold text-white">2.3s</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
