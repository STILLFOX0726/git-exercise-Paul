"use client"

import type React from "react"
import { useState } from "react"
import { Upload, LinkIcon, Download, Eye, Copy, Trash2, Check, Shield, Zap, Brain, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("upload")
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [detectResults, setDetectResults] = useState<{
    aiScore: number
    confidence: number
    status: string
    details: { paragraphs: number; aiProbability: number; humanProbability: number }
  } | null>(null)
  const [copied, setCopied] = useState(false)

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
    <div className="relative min-h-screen bg-[#050510] flex flex-col items-center overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="orb-1 absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="orb-2 absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-pink-600/15 blur-[100px]" />
        <div className="orb-3 absolute bottom-0 left-1/3 h-[450px] w-[450px] rounded-full bg-blue-600/15 blur-[110px]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="pointer-events-none fixed inset-0 grid-pattern opacity-50" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-black/40 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex items-center justify-center group/logo">
                <svg
                  className="opacity-95 hover:opacity-100 transition-all duration-500 drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] hover:drop-shadow-[0_0_14px_rgba(236,72,153,0.6)]"
                  viewBox="0 0 120 120"
                  width="48"
                  height="48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "#7c3aed", stopOpacity: 1 }} />
                      <stop offset="40%" style={{ stopColor: "#8b5cf6", stopOpacity: 1 }} />
                      <stop offset="70%" style={{ stopColor: "#a855f7", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "#c084fc", stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="shieldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "#c084fc", stopOpacity: 0.8 }} />
                      <stop offset="50%" style={{ stopColor: "#f472b6", stopOpacity: 0.6 }} />
                      <stop offset="100%" style={{ stopColor: "#c084fc", stopOpacity: 0.8 }} />
                    </linearGradient>
                    <linearGradient id="shieldInner" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "#1a1040", stopOpacity: 0.95 }} />
                      <stop offset="50%" style={{ stopColor: "#0f0a2e", stopOpacity: 0.98 }} />
                      <stop offset="100%" style={{ stopColor: "#0a0620", stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="eyeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: "#ec4899", stopOpacity: 1 }} />
                      <stop offset="50%" style={{ stopColor: "#f472b6", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "#ec4899", stopOpacity: 1 }} />
                    </linearGradient>
                    <radialGradient id="irisGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" style={{ stopColor: "#fb7185", stopOpacity: 1 }} />
                      <stop offset="60%" style={{ stopColor: "#ec4899", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "#be185d", stopOpacity: 1 }} />
                    </radialGradient>
                    <radialGradient id="pupilGrad" cx="40%" cy="40%" r="50%">
                      <stop offset="0%" style={{ stopColor: "#fda4af", stopOpacity: 1 }} />
                      <stop offset="50%" style={{ stopColor: "#ec4899", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "#9d174d", stopOpacity: 1 }} />
                    </radialGradient>
                    <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" style={{ stopColor: "#ec4899", stopOpacity: 0.3 }} />
                      <stop offset="100%" style={{ stopColor: "#ec4899", stopOpacity: 0 }} />
                    </radialGradient>
                    <linearGradient id="scanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: "#22d3ee", stopOpacity: 0 }} />
                      <stop offset="50%" style={{ stopColor: "#22d3ee", stopOpacity: 0.9 }} />
                      <stop offset="100%" style={{ stopColor: "#22d3ee", stopOpacity: 0 }} />
                    </linearGradient>
                    <linearGradient id="bracketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "#22d3ee", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "#06b6d4", stopOpacity: 0.6 }} />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="softGlow">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="innerShadow">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.5" />
                    </filter>
                  </defs>
                  <path d="M60 8 L104 28 C104 28 108 72 60 112 C12 72 16 28 16 28 Z" fill="none" stroke="#a855f7" strokeWidth="4" opacity="0.15" filter="url(#softGlow)" />
                  <path d="M60 8 L104 28 C104 28 108 72 60 112 C12 72 16 28 16 28 Z" fill="url(#shieldGrad)" filter="url(#innerShadow)" />
                  <path d="M60 8 L104 28 C104 28 108 72 60 112 C12 72 16 28 16 28 Z" fill="none" stroke="url(#shieldStroke)" strokeWidth="1.2" />
                  <path d="M60 16 L96 33 C96 33 99 70 60 104 C21 70 24 33 24 33 Z" fill="url(#shieldInner)" />
                  <path d="M60 16 L96 33 C96 33 99 70 60 104 C21 70 24 33 24 33 Z" fill="none" stroke="white" strokeWidth="0.4" opacity="0.15" />
                  <path d="M60 10 L100 29" fill="none" stroke="white" strokeWidth="0.6" opacity="0.25" />
                  <ellipse cx="60" cy="58" rx="22" ry="14" fill="url(#eyeGlow)">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
                  </ellipse>
                  <path d="M32 58 Q60 36 88 58 Q60 80 32 58 Z" fill="none" stroke="url(#eyeGrad)" strokeWidth="2" strokeLinecap="round" filter="url(#glow)" />
                  <path d="M34 58 Q60 40 86 58 Q60 76 34 58 Z" fill="#ec4899" opacity="0.06" />
                  <circle cx="60" cy="58" r="11" fill="none" stroke="url(#irisGrad)" strokeWidth="2.5" opacity="0.8">
                    <animate attributeName="r" values="11;11.5;11" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="60" cy="58" r="8" fill="none" stroke="#ec4899" strokeWidth="0.5" opacity="0.4" />
                  <polygon points="56,52 56,64 67,58" fill="url(#pupilGrad)" filter="url(#glow)">
                    <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite" />
                  </polygon>
                  <polygon points="57,53.5 57,58 62,55.5" fill="white" opacity="0.3" />
                  <rect x="28" y="44" width="64" height="1.5" rx="0.75" fill="url(#scanGrad)" opacity="0.6">
                    <animate attributeName="y" values="42;74;42" dur="2.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2.8s" repeatCount="indefinite" />
                  </rect>
                  <g stroke="url(#bracketGrad)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" filter="url(#glow)">
                    <path d="M34 43 L34 38 L40 38" fill="none" />
                    <path d="M86 43 L86 38 L80 38" fill="none" />
                    <path d="M34 73 L34 78 L40 78" fill="none" />
                    <path d="M86 73 L86 78 L80 78" fill="none" />
                  </g>
                  <g fill="#22d3ee" opacity="0.5">
                    <circle cx="34" cy="38" r="1"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" /></circle>
                    <circle cx="86" cy="38" r="1"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin="0.5s" repeatCount="indefinite" /></circle>
                    <circle cx="34" cy="78" r="1"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin="1s" repeatCount="indefinite" /></circle>
                    <circle cx="86" cy="78" r="1"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin="1.5s" repeatCount="indefinite" /></circle>
                  </g>
                </svg>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold tracking-tight text-white">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Opti</span>Scam
                </h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-medium">Video Detection</p>
              </div>
            </div>
            <nav className="hidden items-center gap-1 md:flex">
              <a href="#" className="nav-link-highlight rounded-lg px-4 py-2 text-sm font-medium text-white/70 transition-all hover:text-white hover:bg-white/[0.05]">
                Features
              </a>
              <a href="#" className="nav-link-highlight rounded-lg px-4 py-2 text-sm font-medium text-white/70 transition-all hover:text-white hover:bg-white/[0.05]">
                Pricing
              </a>
              <a href="#" className="nav-link-highlight rounded-lg px-4 py-2 text-sm font-medium text-white/70 transition-all hover:text-white hover:bg-white/[0.05]">
                Docs
              </a>
              <div className="ml-4 h-5 w-px bg-white/10" />
              <Button size="sm" className="ml-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 btn-glow hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300">
                Get Started
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-5xl w-full px-6 pt-20 pb-24">
        {/* Hero Section */}
        <div className="mb-20 text-center">
          {/* Badge */}
          <div className="animate-slide-up mb-8 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span className="text-xs font-medium text-purple-300">AI-Powered Detection Engine</span>
          </div>

          <h2 className="animate-slide-up delay-100 mb-6 text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent text-shimmer">
              SCAM
            </span>{" "}
            OR NOT{" "}
            <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 bg-clip-text text-transparent">
              Scam
            </span>
            <span className="glow-text text-pink-400">?</span>
          </h2>

          <p className="animate-slide-up delay-200 mx-auto max-w-xl text-lg text-white/50 leading-relaxed">
            Upload files or paste links to analyze content authenticity with precision.{" "}
            <span className="text-white/80 font-medium">Know what&apos;s real.</span>
          </p>

          {/* Feature Chips */}
          <div className="animate-slide-up delay-300 mt-10 flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: Shield, label: "99.2% Accuracy", color: "purple" },
              { icon: Zap, label: "Real-time Analysis", color: "yellow" },
              { icon: Brain, label: "Deep Learning", color: "pink" },
            ].map((chip) => (
              <div
                key={chip.label}
                className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.15]"
              >
                <chip.icon className={`h-3.5 w-3.5 ${chip.color === "purple" ? "text-purple-400" : chip.color === "yellow" ? "text-yellow-400" : "text-pink-400"}`} />
                <span className="text-xs font-medium text-white/70">{chip.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detection Interface */}
        <div className="animate-slide-up delay-400">
          <Card className="card-hover relative overflow-hidden border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl p-8 mb-12 shadow-[0_0_60px_rgba(0,0,0,0.5)]">
            {/* Card inner glow */}
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-purple-600/10 blur-[80px]" />

            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="relative w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-xl bg-white/[0.05] p-1.5 backdrop-blur border border-white/[0.06]">
                <TabsTrigger value="upload" className="flex items-center gap-2 rounded-lg transition-all text-white/70 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/80 data-[state=active]:to-pink-600/80 data-[state=active]:text-white data-[state=active]:shadow-lg">
                  <Upload className="h-4 w-4" />
                  Upload File
                </TabsTrigger>
                <TabsTrigger value="link" className="flex items-center gap-2 rounded-lg transition-all text-white/70 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/80 data-[state=active]:to-pink-600/80 data-[state=active]:text-white data-[state=active]:shadow-lg">
                  <LinkIcon className="h-4 w-4" />
                  Paste Link
                </TabsTrigger>
              </TabsList>

              {/* Upload Tab */}
              <TabsContent value="upload" className="space-y-6 mt-8">
                <div className="group relative rounded-2xl border-2 border-dashed border-white/[0.1] bg-gradient-to-b from-white/[0.03] to-transparent p-14 text-center transition-all duration-500 hover:border-purple-500/40 hover:bg-purple-500/[0.03]">
                  <div className="flex flex-col items-center gap-5">
                    <div className="relative">
                      <div className="rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 p-5 transition-all duration-500 group-hover:scale-110 group-hover:from-purple-500/30 group-hover:to-pink-600/30 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                        <Upload className="h-8 w-8 text-purple-400 transition-colors group-hover:text-purple-300" />
                      </div>
                      <div className="absolute -inset-1 rounded-2xl bg-purple-500/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-lg">Drag and drop your file</p>
                      <p className="text-sm text-white/40 mt-1.5">MP4, AVI, MOV, or paste a URL</p>
                    </div>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      accept="video/*"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl bg-white/[0.05] border-white/[0.1] text-white/80 hover:bg-white/[0.1] hover:text-white backdrop-blur transition-all duration-300"
                    >
                      Browse Files
                    </Button>
                  </div>
                </div>

                {uploadedFile && (
                  <div className="flex items-center justify-between rounded-xl bg-purple-500/10 border border-purple-500/20 p-4 backdrop-blur animate-slide-up">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-purple-500/20 p-2">
                        <Eye className="h-4 w-4 text-purple-400" />
                      </div>
                      <span className="text-sm font-medium text-white">{uploadedFile}</span>
                    </div>
                    <Button
                      size="sm"
                      className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-0 btn-glow shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300"
                    >
                      Analyze Now
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Link Tab */}
              <TabsContent value="link" className="space-y-6 mt-8">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                    <input
                      type="url"
                      placeholder="https://example.com/video"
                      className="w-full rounded-xl border border-white/[0.1] bg-white/[0.03] backdrop-blur pl-11 pr-4 py-3.5 text-white placeholder-white/30 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                  </div>
                  <Button className="rounded-xl px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-0 btn-glow shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300">
                    Analyze
                  </Button>
                </div>
                <p className="text-sm text-white/40">
                  Paste a URL to extract and analyze video content from web pages instantly.
                </p>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Results Section */}
        {detectResults && detectResults.status === "completed" && (
          <div className="space-y-8">
            {/* AI Score Display */}
            <Card className="animate-slide-up relative overflow-hidden border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl p-8 shadow-[0_0_60px_rgba(0,0,0,0.5)]">
              {/* Inner glow */}
              <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full bg-pink-600/10 blur-[80px]" />

              <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* Score Circle */}
                <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-600/10 backdrop-blur p-8 border border-white/[0.08]">
                  <div className="relative mb-3">
                    <div className="pulse-ring flex h-36 w-36 items-center justify-center rounded-full border-[3px] border-pink-500/30 bg-gradient-to-br from-pink-500/10 to-transparent">
                      <div className="text-center">
                        <div className="text-5xl font-bold bg-gradient-to-br from-pink-300 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                          {detectResults.aiScore}%
                        </div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50 mt-1.5">AI Score</div>
                      </div>
                    </div>
                  </div>
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/20 px-3 py-1 text-[11px] font-semibold text-red-400 uppercase tracking-wide">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                    High Risk
                  </span>
                </div>

                {/* Confidence */}
                <div className="card-hover flex flex-col justify-center gap-4 rounded-2xl bg-white/[0.03] backdrop-blur p-6 border border-white/[0.08]">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40">Confidence Level</div>
                    <div className="rounded-full bg-green-500/10 border border-green-500/20 px-2 py-0.5 text-[10px] font-semibold text-green-400">Excellent</div>
                  </div>
                  <div className="text-5xl font-bold text-white tracking-tight">{detectResults.confidence}%</div>
                  <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 animate-progress"
                      style={{ width: `${detectResults.confidence}%` }}
                    />
                  </div>
                  <p className="text-xs text-white/30">Based on multi-model ensemble analysis</p>
                </div>

                {/* Breakdown */}
                <div className="card-hover flex flex-col justify-center gap-5 rounded-2xl bg-white/[0.03] backdrop-blur p-6 border border-white/[0.08]">
                  <div>
                    <div className="mb-2.5 flex justify-between text-sm">
                      <span className="font-medium text-white/70">AI-Generated</span>
                      <span className="font-bold text-pink-400">78%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden">
                      <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 animate-progress" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-2.5 flex justify-between text-sm">
                      <span className="font-medium text-white/70">Human-Written</span>
                      <span className="font-bold text-blue-400">22%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden">
                      <div className="h-full w-1/4 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 animate-progress delay-200" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="animate-slide-up delay-100 flex flex-wrap gap-3">
              {[
                { icon: Download, label: "Download Report" },
                { icon: Eye, label: "View Details" },
              ].map((btn) => (
                <Button
                  key={btn.label}
                  variant="outline"
                  className="flex items-center gap-2 rounded-xl bg-white/[0.03] border-white/[0.08] text-white/70 hover:bg-white/[0.08] hover:text-white hover:border-white/[0.15] backdrop-blur transition-all duration-300"
                >
                  <btn.icon className="h-4 w-4" />
                  {btn.label}
                </Button>
              ))}
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-xl bg-white/[0.03] border-white/[0.08] text-white/70 hover:bg-white/[0.08] hover:text-white hover:border-white/[0.15] backdrop-blur transition-all duration-300"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-green-400">Copied!</span>
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
                className="rounded-xl text-red-400/70 hover:text-red-400 hover:bg-red-500/10 border-white/[0.08] bg-white/[0.03] backdrop-blur transition-all duration-300"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Detailed Report */}
            <Card className="animate-slide-up delay-200 border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl p-8 shadow-[0_0_60px_rgba(0,0,0,0.5)]">
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.15em] text-white/40">Detailed Analysis</h3>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { label: "Total Paragraphs", value: String(detectResults.details.paragraphs), color: "purple" },
                  { label: "Analysis Method", value: "Advanced NLP", color: "pink" },
                  { label: "Processing Time", value: "2.3s", color: "cyan" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="card-hover group space-y-3 rounded-xl bg-white/[0.03] backdrop-blur p-5 border border-white/[0.06] transition-all duration-300 hover:border-white/[0.12]"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color === "purple" ? "text-purple-300" : stat.color === "pink" ? "text-pink-300" : "text-cyan-300"}`}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-white/[0.04] bg-black/30 backdrop-blur-xl py-8">
        <div className="mx-auto max-w-5xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">OptiScam &mdash; AI-Powered Content Detection</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Privacy</a>
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Terms</a>
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
