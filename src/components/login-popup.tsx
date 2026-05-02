"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogIn, Loader2, Check, Copy } from "lucide-react";

interface LoginPopupProps {
  open: boolean;
  onClose: () => void;
  onLogin?: () => void;
}

export function LoginPopup({ open, onClose }: LoginPopupProps) {
  const [step, setStep] = useState<"idle" | "starting" | "code" | "done">("idle");
  const [verificationUrl, setVerificationUrl] = useState("");
  const [userCode, setUserCode] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [error, setError] = useState("");
  const [accountWarning, setAccountWarning] = useState("");
  const [polling, setPolling] = useState(false);
  const [copied, setCopied] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startOAuth = async () => {
    setStep("starting");
    setError("");
    try {
      const res = await fetch("/api/auth/login", { method: "POST" });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setStep("idle");
        return;
      }
      setVerificationUrl(data.verificationUrl);
      setUserCode(data.userCode);
      setSessionId(data.sessionId);
      setStep("code");
      setPolling(true);
    } catch {
      setError("接続に失敗しました");
      setStep("idle");
    }
  };

  useEffect(() => {
    if (!polling || !sessionId) return;

    const poll = async () => {
      try {
        const res = await fetch(`/api/auth/login?sessionId=${sessionId}`);
        const data = await res.json();
        if (data.status === "complete") {
          setPolling(false);
          setError("");
          setAccountWarning(data.accountError ? data.accountError : "");
          setStep("done");
        } else if (data.status === "expired") {
          setPolling(false);
        } else if (data.status === "error") {
          setPolling(false);
          setError(data.message || "認証に失敗しました");
        }
      } catch (e) {
        console.log("poll network error:", e);
      }
    };

    poll();
    intervalRef.current = setInterval(poll, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [polling, sessionId]);

  const reset = () => {
    setStep("idle");
    setError("");
    setAccountWarning("");
    setVerificationUrl("");
    setUserCode("");
    setSessionId("");
    setPolling(false);
  };

  useEffect(() => {
    if (!open) reset();
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={step === "idle" ? onClose : undefined}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">
                {step === "done" ? "ログイン完了！" : "YouTubeでログイン"}
              </h3>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-muted">
                <X size={20} />
              </motion.button>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm mb-4 p-3 bg-red-500/10 rounded-xl">{error}</motion.p>
            )}

            <AnimatePresence mode="wait">
              {step === "idle" && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="text-muted text-sm mb-4">
                    コメント投稿や評価にはYouTubeアカウントの連携が必要です。google.com/device でコードを入力して連携します。
                  </p>
                  <a href="/security" target="_blank" rel="noopener noreferrer" className="block text-primary text-sm mb-4 hover:underline">
                    安全性について確認する
                  </a>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={startOAuth}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary-hover transition-colors"
                  >
                    <LogIn size={18} />
                    YouTubeでログイン
                  </motion.button>
                </motion.div>
              )}

              {step === "starting" && (
                <motion.div key="starting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center py-8 gap-3">
                  <Loader2 size={32} className="animate-spin text-primary" />
                  <p className="text-muted text-sm">認証を開始しています...</p>
                </motion.div>
              )}

              {step === "code" && (
                <motion.div key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="text-sm mb-4">
                    以下のURLにアクセスし、コードを入力してください：
                  </p>
                  <a
                    href={verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-primary underline break-all text-sm mb-4"
                  >
                    {verificationUrl}
                  </a>
                  <div className="bg-border rounded-xl p-4 text-center mb-4 relative">
                    <p className="text-xs text-muted mb-1">コード</p>
                    <motion.p initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-2xl font-bold tracking-widest">{userCode}</motion.p>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(userCode);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        } catch (e) { console.error(e); }
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-white/10 text-muted transition-colors"
                      title="コードをコピー"
                    >
                      {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </motion.button>
                  </div>
                  {polling && (
                    <div className="flex flex-col items-center gap-2 py-4">
                      <Loader2 size={24} className="animate-spin text-primary" />
                      <p className="text-muted text-sm">認証を待っています...</p>
                    </div>
                  )}
                </motion.div>
              )}

              {step === "done" && (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-6 gap-3">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 15 }} className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Check size={24} className="text-green-500" />
                  </motion.div>
                   <p className="text-muted text-sm">ログインしました</p>
                   {accountWarning && (
                     <p className="text-yellow-400 text-xs bg-yellow-500/10 p-2 rounded-lg">{accountWarning}</p>
                   )}
                   <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { onClose(); window.location.reload(); }}
                    className="px-6 py-2 bg-primary text-white rounded-full font-bold hover:bg-primary-hover transition-colors"
                  >
                    OK
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
