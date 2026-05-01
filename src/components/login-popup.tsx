"use client";

import { useState, useEffect } from "react";
import { X, LogIn, Loader2, Check } from "lucide-react";

interface LoginPopupProps {
  open: boolean;
  onClose: () => void;
  onLogin?: () => void;
}

export function LoginPopup({ open, onClose }: LoginPopupProps) {
  const [step, setStep] = useState<"idle" | "starting" | "code" | "polling" | "done">("idle");
  const [verificationUrl, setVerificationUrl] = useState("");
  const [userCode, setUserCode] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [error, setError] = useState("");

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
    } catch {
      setError("接続に失敗しました");
      setStep("idle");
    }
  };

  useEffect(() => {
    if (step !== "code" || !sessionId) return;

    setStep("polling");
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/auth/login?sessionId=${sessionId}`);
        const data = await res.json();
        if (data.status === "complete") {
          setStep("done");
          clearInterval(interval);
          setTimeout(() => {
            onClose();
            window.location.reload();
          }, 1000);
        } else if (data.status === "error" || data.status === "expired") {
          setError(data.message || "認証に失敗しました");
          setStep("code");
          clearInterval(interval);
        }
      } catch {
        // keep polling
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [step, sessionId, onClose]);

  const reset = () => {
    setStep("idle");
    setError("");
    setVerificationUrl("");
    setUserCode("");
    setSessionId("");
  };

  // Reset on close
  useEffect(() => {
    if (!open) reset();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={step === "idle" ? onClose : undefined}>
      <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">
            {step === "done" ? "ログイン完了！" : "YouTubeでログイン"}
          </h3>
          {(step === "idle" || step === "done") && (
            <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-muted">
              <X size={20} />
            </button>
          )}
        </div>

        {error && (
          <p className="text-red-400 text-sm mb-4 p-3 bg-red-500/10 rounded-xl">{error}</p>
        )}

        {step === "idle" && (
          <>
            <p className="text-muted text-sm mb-6">
              コメント投稿や評価にはYouTubeアカウントの連携が必要です。google.com/device でコードを入力して連携します。
            </p>
            <button
              onClick={startOAuth}
              className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary-hover transition-colors"
            >
              <LogIn size={18} />
              YouTubeでログイン
            </button>
          </>
        )}

        {step === "starting" && (
          <div className="flex flex-col items-center py-8 gap-3">
            <Loader2 size={32} className="animate-spin text-primary" />
            <p className="text-muted text-sm">認証を開始しています...</p>
          </div>
        )}

        {(step === "code" || step === "polling") && (
          <>
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
            <div className="bg-border rounded-xl p-4 text-center mb-4">
              <p className="text-xs text-muted mb-1">コード</p>
              <p className="text-2xl font-bold tracking-widest">{userCode}</p>
            </div>
            {step === "polling" && (
              <div className="flex flex-col items-center gap-2 py-4">
                <Loader2 size={24} className="animate-spin text-primary" />
                <p className="text-muted text-sm">認証を待っています...</p>
              </div>
            )}
          </>
        )}

        {step === "done" && (
          <div className="flex flex-col items-center py-6 gap-2">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <Check size={24} className="text-green-500" />
            </div>
            <p className="text-muted text-sm">ログインしました。画面を更新します...</p>
          </div>
        )}
      </div>
    </div>
  );
}
