import { useEffect, useRef, useState, useCallback } from "react";
import jsQR from "jsqr";
import { Loader2, CheckCircle2, XCircle, RefreshCw, Scan } from "lucide-react";

const REDEEM_URL = "/api/redeem";
const QR_EXPIRY_MS = 15 * 60 * 1000;

type RedeemPayload = {
  type: string;
  phone: string;
  points: number;
  reward_id: string;
  reward_name: string;
  ts: number;
};

type Stage =
  | { id: "scanning" }
  | { id: "detected"; payload: RedeemPayload }
  | { id: "confirming"; payload: RedeemPayload }
  | { id: "success"; txn_id: string; nama: string; reward: string; balance_after: number }
  | { id: "error"; message: string }
  | { id: "camera_error"; message: string };

declare global {
  interface Window {
    Telegram?: { WebApp?: { close: () => void; ready: () => void; expand: () => void } };
  }
}

export default function RedeemScan() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);
  const detectedRef = useRef(false);

  const [stage, setStage] = useState<Stage>({ id: "scanning" });

  useEffect(() => {
    window.Telegram?.WebApp?.ready();
    window.Telegram?.WebApp?.expand();
    startCamera();
    return stopCamera;
  }, []);

  async function startCamera() {
    detectedRef.current = false;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        rafRef.current = requestAnimationFrame(tick);
      }
    } catch {
      setStage({ id: "camera_error", message: "Kamera tidak bisa diakses. Pastikan izin kamera sudah diberikan dan buka ulang halaman ini." });
    }
  }

  function stopCamera() {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
  }

  const tick = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || detectedRef.current) return;
    if (video.readyState < video.HAVE_ENOUGH_DATA) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(img.data, img.width, img.height, { inversionAttempts: "dontInvert" });
    if (code?.data) {
      detectedRef.current = true;
      handleDetected(code.data);
    } else {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, []);

  function handleDetected(raw: string) {
    stopCamera();
    try {
      const data = JSON.parse(raw) as RedeemPayload;
      if (data.type !== "besti_redeem") {
        setStage({ id: "error", message: "QR ini bukan QR redeem poin BESTI.\nGunakan QR dari halaman poin website." });
        return;
      }
      const ageMs = Date.now() - Number(data.ts);
      if (ageMs < 0 || ageMs > QR_EXPIRY_MS) {
        const min = Math.floor(Math.abs(ageMs) / 60000);
        setStage({ id: "error", message: `QR sudah kadaluarsa (${min} menit lalu).\nMinta customer generate QR baru dari website.` });
        return;
      }
      if (!Number.isInteger(data.points) || data.points <= 0) {
        setStage({ id: "error", message: "QR tidak valid: data poin tidak wajar." });
        return;
      }
      setStage({ id: "detected", payload: data });
    } catch {
      setStage({ id: "error", message: "QR tidak dikenali.\nPastikan QR dari halaman poin website BESTI." });
    }
  }

  async function confirmRedeem(payload: RedeemPayload) {
    setStage({ id: "confirming", payload });
    const chatId = new URLSearchParams(window.location.search).get("chat_id") ?? "";
    const body = JSON.stringify({ ...payload, chat_id: chatId });
    try {
      let res: Response;
      try {
        res = await fetch(REDEEM_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        });
      } catch (netErr) {
        setStage({ id: "error", message: `[NET] Fetch gagal: ${String(netErr)}\nURL: ${REDEEM_URL}` });
        return;
      }
      const rawText = await res.text();
      let json: Record<string, unknown> = {};
      try {
        json = JSON.parse(rawText);
      } catch {
        setStage({ id: "error", message: `[HTTP ${res.status}] Response bukan JSON:\n${rawText.slice(0, 300)}` });
        return;
      }
      if (json.success) {
        setStage({
          id: "success",
          txn_id: String(json.txn_id ?? ""),
          nama: String(json.nama ?? ""),
          reward: String(json.item ?? payload.reward_name),
          balance_after: Number(json.balance_after ?? 0),
        });
        setTimeout(() => window.Telegram?.WebApp?.close(), 3000);
      } else {
        setStage({ id: "error", message: `[HTTP ${res.status}] ${String(json.message ?? "Redeem gagal")}\n\n${rawText.slice(0, 200)}` });
      }
    } catch (err) {
      setStage({ id: "error", message: `[ERR] ${String(err)}` });
    }
  }

  function restart() {
    setStage({ id: "scanning" });
    startCamera();
  }

  const formatPhone = (p: string) => p.replace(/^62/, "0").replace(/(\d{4})(\d{4})(\d+)/, "$1-$2-$3");

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="relative z-20 flex items-center justify-center gap-2 pt-safe pt-4 pb-3 px-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-sm font-semibold tracking-wide uppercase text-white/80">
          BESTI Redeem Scanner
        </span>
      </div>

      {/* Camera view */}
      <div className="relative flex-1">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
        />
        <canvas ref={canvasRef} className="hidden" />

        {/* Scanner overlay — hanya tampil saat scanning */}
        {stage.id === "scanning" && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* dim corners */}
            <div className="absolute inset-0 bg-black/40" />
            {/* scan window */}
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 bg-transparent" />
              {/* corner brackets */}
              {[
                "top-0 left-0 border-t-4 border-l-4 rounded-tl-xl",
                "top-0 right-0 border-t-4 border-r-4 rounded-tr-xl",
                "bottom-0 left-0 border-b-4 border-l-4 rounded-bl-xl",
                "bottom-0 right-0 border-b-4 border-r-4 rounded-br-xl",
              ].map((cls, i) => (
                <div key={i} className={`absolute w-10 h-10 border-green-400 ${cls}`} />
              ))}
              {/* scan line */}
              <div className="absolute left-1 right-1 h-0.5 bg-green-400/80 animate-[scanline_2s_ease-in-out_infinite]" />
            </div>
            <p className="absolute bottom-28 left-0 right-0 text-center text-sm text-white/70">
              Arahkan kamera ke QR customer
            </p>
          </div>
        )}

        {/* Overlay panel bawah */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          {/* DETECTED */}
          {stage.id === "detected" && (
            <div className="m-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-yellow-300">QR Terbaca</span>
              </div>
              <div>
                <p className="text-xl font-bold text-white">{stage.payload.reward_name}</p>
                <p className="text-green-400 font-semibold mt-1">
                  {stage.payload.points.toLocaleString("id-ID")} poin
                </p>
                <p className="text-white/60 text-sm mt-1">{formatPhone(stage.payload.phone)}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={restart}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 text-white/70 text-sm font-semibold active:opacity-70"
                >
                  <RefreshCw className="h-4 w-4" />
                  Scan Ulang
                </button>
                <button
                  onClick={() => confirmRedeem(stage.payload)}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500 text-white text-sm font-bold active:opacity-80"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Konfirmasi
                </button>
              </div>
            </div>
          )}

          {/* CONFIRMING */}
          {stage.id === "confirming" && (
            <div className="m-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5">
              <div className="flex items-center justify-center gap-3 py-4">
                <Loader2 className="h-6 w-6 text-green-400 animate-spin" />
                <span className="text-white font-semibold">Memproses redeem...</span>
              </div>
            </div>
          )}

          {/* SUCCESS */}
          {stage.id === "success" && (
            <div className="m-4 rounded-2xl bg-green-600/90 backdrop-blur-md border border-green-400/40 p-5 space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-white" />
                <span className="text-lg font-bold text-white">Redeem Berhasil!</span>
              </div>
              <div className="space-y-1">
                <p className="text-white font-semibold">{stage.reward}</p>
                <p className="text-white/80 text-sm">{stage.nama}</p>
                <p className="text-green-200 text-sm">Sisa poin: <span className="font-bold">{stage.balance_after.toLocaleString("id-ID")}</span></p>
                <p className="text-white/50 text-xs font-mono">{stage.txn_id}</p>
              </div>
            </div>
          )}

          {/* ERROR */}
          {(stage.id === "error" || stage.id === "camera_error") && (
            <div className="m-4 rounded-2xl bg-red-900/80 backdrop-blur-md border border-red-500/30 p-5 space-y-3">
              <div className="flex items-start gap-2">
                <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-white/90 text-sm leading-relaxed whitespace-pre-line">{stage.message}</p>
              </div>
              {stage.id !== "camera_error" && (
                <button
                  onClick={restart}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 text-white text-sm font-semibold active:opacity-70"
                >
                  <Scan className="h-4 w-4" />
                  Scan QR Lain
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes scanline {
          0%, 100% { top: 4px; opacity: 1; }
          50% { top: calc(100% - 4px); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
