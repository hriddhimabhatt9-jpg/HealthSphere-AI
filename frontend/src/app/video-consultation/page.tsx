// ============================================================================
// HealthSphere AI — Video Consultation Page
// WebRTC-ready video consultation interface
// ============================================================================

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Video, VideoOff, Mic, MicOff, Phone, MonitorUp,
  MessageSquare, Settings, ChevronLeft, Heart,
  Activity, Clock, FileText, Maximize, MoreVertical,
} from 'lucide-react';
import Link from 'next/link';

export default function VideoConsultationPage() {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => setElapsed((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  // Start local camera
  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch {
        // Camera not available, expected in many environments
      }
    }
    if (isCameraOn) startCamera();
    return () => {
      if (localVideoRef.current?.srcObject) {
        const tracks = (localVideoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [isCameraOn]);

  return (
    <div className="min-h-screen bg-[#0a0f1c] flex flex-col">
      {/* ── Top Bar ────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-6 h-14 bg-[#0f1629]/80 backdrop-blur-xl border-b border-white/5">
        <Link href="/patient" className="text-white/60 hover:text-white transition-colors flex items-center gap-2 text-sm" aria-label="Back to dashboard">
          <ChevronLeft size={18} />
          <span className="hidden sm:inline">Back to Dashboard</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-sm text-white/80">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true" />
            {isConnected ? 'Connected' : 'Connecting...'}
          </span>
          <span className="text-sm text-white/50 font-mono">{formatTime(elapsed)}</span>
        </div>
      </header>

      {/* ── Main Video Area ────────────────────────────────────────── */}
      <div className="flex-1 flex">
        <div className="flex-1 relative flex items-center justify-center p-4">
          {/* Remote Video (Placeholder) */}
          <div className="relative w-full max-w-5xl aspect-video bg-[#111827] rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/30">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center mb-4">
                <span className="text-3xl font-[family-name:var(--font-headline)] font-bold text-white/50">JV</span>
              </div>
              <p className="text-lg font-medium text-white/60">Dr. Julian Vance</p>
              <p className="text-sm text-white/40">Chief Surgeon — Neurology</p>
            </div>

            {/* Connection quality indicator */}
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full flex items-center gap-2 text-xs text-white/80">
              <div className="flex gap-0.5" aria-label="Connection quality: excellent">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-1 rounded-full bg-green-400`} style={{ height: `${6 + i * 3}px` }} />
                ))}
              </div>
              HD Quality
            </div>

            {/* Recording indicator */}
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-red-500/20 backdrop-blur-md rounded-full flex items-center gap-2 text-xs text-red-400 font-bold">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" aria-hidden="true" />
              REC
            </div>

            {/* Patient health overlay */}
            <motion.div
              className="absolute bottom-4 left-4 right-4 flex gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { icon: Heart, label: 'Heart Rate', value: '72 BPM', color: '#ef4444' },
                { icon: Activity, label: 'SpO2', value: '98%', color: '#22c55e' },
                { icon: Clock, label: 'Duration', value: formatTime(elapsed), color: '#3b82f6' },
              ].map((metric) => (
                <div key={metric.label} className="px-4 py-2.5 bg-black/40 backdrop-blur-xl rounded-xl flex items-center gap-2 flex-1">
                  <metric.icon size={16} style={{ color: metric.color }} aria-hidden="true" />
                  <div>
                    <p className="text-[10px] text-white/50 uppercase">{metric.label}</p>
                    <p className="text-sm font-bold text-white font-[family-name:var(--font-headline)]">{metric.value}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Local video (self) */}
          <motion.div
            className="absolute bottom-8 right-8 w-48 h-36 bg-[#1f2937] rounded-2xl overflow-hidden shadow-xl border-2 border-white/10"
            drag
            dragMomentum={false}
            whileDrag={{ scale: 1.05 }}
          >
            {isCameraOn ? (
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
                aria-label="Your camera feed"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-white/50">YOU</span>
                </div>
              </div>
            )}
            <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/50 rounded text-[10px] text-white/70">
              You
            </div>
          </motion.div>
        </div>

        {/* ── Chat Sidebar ─────────────────────────────────────────── */}
        {showChat && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-[#111827] border-l border-white/5 flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-white/5">
              <h3 className="text-sm font-bold text-white">Session Chat</h3>
            </div>
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              <div className="p-3 bg-blue-500/10 rounded-xl text-xs text-blue-300">
                <p className="font-bold">Dr. Vance</p>
                <p className="mt-1 opacity-80">I&apos;ve reviewed your latest scans. Let&apos;s discuss the findings.</p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl text-xs text-white/70 text-right">
                <p>Yes, I have some questions about the results.</p>
              </div>
            </div>
            <div className="p-4 border-t border-white/5">
              <input type="text" placeholder="Type a message..." className="w-full px-4 py-2.5 bg-white/5 rounded-xl text-sm text-white placeholder:text-white/30 border-none outline-none" aria-label="Chat message" />
            </div>
          </motion.div>
        )}
      </div>

      {/* ── Controls Bar ───────────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-4 px-6 py-5 bg-[#0f1629]/80 backdrop-blur-xl border-t border-white/5">
        <button
          onClick={() => setIsMicOn(!isMicOn)}
          className={`p-4 rounded-2xl transition-all ${isMicOn ? 'bg-white/10 hover:bg-white/15 text-white' : 'bg-red-500/20 text-red-400'}`}
          aria-label={isMicOn ? 'Mute microphone' : 'Unmute microphone'}
          id="mic-toggle-btn"
        >
          {isMicOn ? <Mic size={22} /> : <MicOff size={22} />}
        </button>

        <button
          onClick={() => setIsCameraOn(!isCameraOn)}
          className={`p-4 rounded-2xl transition-all ${isCameraOn ? 'bg-white/10 hover:bg-white/15 text-white' : 'bg-red-500/20 text-red-400'}`}
          aria-label={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
          id="camera-toggle-btn"
        >
          {isCameraOn ? <Video size={22} /> : <VideoOff size={22} />}
        </button>

        <button className="p-4 bg-white/10 hover:bg-white/15 rounded-2xl text-white transition-all" aria-label="Share screen">
          <MonitorUp size={22} />
        </button>

        <button
          onClick={() => setShowChat(!showChat)}
          className={`p-4 rounded-2xl transition-all ${showChat ? 'bg-blue-500/20 text-blue-400' : 'bg-white/10 hover:bg-white/15 text-white'}`}
          aria-label="Toggle chat"
          id="chat-toggle-btn"
        >
          <MessageSquare size={22} />
        </button>

        <button className="p-4 bg-white/10 hover:bg-white/15 rounded-2xl text-white transition-all" aria-label="View patient notes">
          <FileText size={22} />
        </button>

        <div className="w-px h-8 bg-white/10 mx-2" aria-hidden="true" />

        <button className="p-4 bg-red-500 hover:bg-red-600 rounded-2xl text-white transition-all shadow-lg shadow-red-500/30" aria-label="End call" id="end-call-btn">
          <Phone size={22} className="rotate-[135deg]" />
        </button>
      </div>
    </div>
  );
}
