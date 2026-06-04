import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sparkles,
  Phone,
  QrCode,
  Send,
  Loader2,
  Gift,
  ArrowLeft,
  CheckCircle2,
  Tag,
  Wrench,
  ShieldCheck,
  PackageOpen,
  Ticket,
  RefreshCw,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const WEBHOOK_URL = "https://n8n.autoinovasoftsolution.cloud/webhook/besti-check";
const TG_BOT = "besticomputer_bot";

const phoneSchema = z
  .string()
  .trim()
  .regex(/^(\+?62|0)8\d{8,12}$/, {
    message: "Nomor HP Indonesia tidak valid (contoh: 081234567890)",
  });

type PointsResponse = {
  phone: string;
  name?: string;
  points: number;
  tier?: string;
  member_since?: string;
};

type RewardItem = {
  id: string;
  name: string;
  description: string;
  points: number;
  icon: React.ReactNode;
  category: "diskon" | "layanan" | "produk" | "voucher";
};

// Catalog reward — idealnya di-fetch dari backend/n8n sehingga tim bisa update tanpa ubah kode
const REWARD_CATALOG: RewardItem[] = [
  {
    id: "diskon_5k",
    name: "Diskon Rp 5.000",
    description: "Potongan langsung untuk transaksi berikutnya",
    points: 50,
    icon: <Tag className="h-5 w-5" />,
    category: "diskon",
  },
  {
    id: "diskon_10k",
    name: "Diskon Rp 10.000",
    description: "Potongan langsung untuk transaksi berikutnya",
    points: 100,
    icon: <Tag className="h-5 w-5" />,
    category: "diskon",
  },
  {
    id: "diskon_25k",
    name: "Diskon Rp 25.000",
    description: "Potongan langsung untuk transaksi berikutnya",
    points: 250,
    icon: <Tag className="h-5 w-5" />,
    category: "diskon",
  },
  {
    id: "diskon_50k",
    name: "Diskon Rp 50.000",
    description: "Potongan langsung untuk transaksi berikutnya",
    points: 500,
    icon: <Tag className="h-5 w-5" />,
    category: "diskon",
  },
  {
    id: "antivirus_1bln",
    name: "Antivirus 1 Bulan",
    description: "Aktivasi lisensi antivirus premium selama 30 hari",
    points: 150,
    icon: <ShieldCheck className="h-5 w-5" />,
    category: "layanan",
  },
  {
    id: "service_ringan",
    name: "Gratis Service Ringan",
    description: "Pembersihan debu, reinstall driver, atau optimasi OS",
    points: 300,
    icon: <Wrench className="h-5 w-5" />,
    category: "layanan",
  },
  {
    id: "mousepad",
    name: "Mousepad BESTI",
    description: "Mousepad branded BESTI Computer ukuran standard",
    points: 200,
    icon: <PackageOpen className="h-5 w-5" />,
    category: "produk",
  },
  {
    id: "voucher_100k",
    name: "Voucher Rp 100.000",
    description: "Voucher belanja produk apa saja di BESTI Computer",
    points: 1000,
    icon: <Ticket className="h-5 w-5" />,
    category: "voucher",
  },
];

const CATEGORY_LABELS: Record<RewardItem["category"], string> = {
  diskon: "Diskon",
  layanan: "Layanan",
  produk: "Produk",
  voucher: "Voucher",
};

function normalizePhone(input: string) {
  const trimmed = input.trim().replace(/\s|-/g, "");
  if (trimmed.startsWith("+62")) return "62" + trimmed.slice(3);
  if (trimmed.startsWith("62")) return trimmed;
  if (trimmed.startsWith("0")) return "62" + trimmed.slice(1);
  return trimmed;
}

export default function Points() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ── All state first ──
  const [redeemNotif, setRedeemNotif] = useState<{ reward: string; balance: string; nama: string } | null>(null);
  const [phone, setPhone] = useState("");
  const [lastFour, setLastFour] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PointsResponse | null>(null);
  const [selectedReward, setSelectedReward] = useState<RewardItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<RewardItem["category"] | "semua">("semua");
  const [redeemOpen, setRedeemOpen] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "pending" | "error" } | null>(null);
  const [redeemSuccess, setRedeemSuccess] = useState<{ reward: string; balance: number; nama: string } | null>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Effects after all state ──

  // Reactive to URL params — fires when navigated back from /scan with ?redeemed=1
  useEffect(() => {
    if (searchParams.get("redeemed") === "1") {
      setRedeemNotif({
        reward: searchParams.get("reward") ?? "",
        balance: searchParams.get("balance") ?? "",
        nama: searchParams.get("nama") ?? "",
      });
      setSearchParams({}, { replace: true });
    }
  }, [searchParams]);

  // Auto-poll every 5s while QR dialog is open and no success yet
  useEffect(() => {
    if (redeemOpen && !redeemSuccess && data && selectedReward) {
      pollingRef.current = setInterval(async () => {
        try {
          const res = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: data.phone, last_four: lastFour, action: "check_points" }),
          });
          const json = await res.json();
          if (json.success && json.points < data.points) {
            clearInterval(pollingRef.current!);
            const successData = {
              reward: selectedReward.name,
              balance: json.points,
              nama: json.name ?? data.name ?? "",
            };
            setRedeemSuccess(successData);
            setRedeemNotif({ reward: successData.reward, balance: String(successData.balance), nama: successData.nama });
            setData((prev) => prev ? { ...prev, points: json.points } : prev);
          }
        } catch { /* silent */ }
      }, 5000);
    }
    return () => { if (pollingRef.current) clearInterval(pollingRef.current); };
  }, [redeemOpen, redeemSuccess]);

  async function checkRedeemStatus() {
    if (!data || !selectedReward) return;
    setCheckingStatus(true);
    setStatusMsg(null);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: data.phone, last_four: lastFour, action: "check_points" }),
      });
      const json = await res.json();
      if (json.success && json.points < data.points) {
        const successData = {
          reward: selectedReward.name,
          balance: json.points,
          nama: json.name ?? data.name ?? "",
        };
        setRedeemSuccess(successData);
        setRedeemNotif({ reward: successData.reward, balance: String(successData.balance), nama: successData.nama });
        setData((prev) => prev ? { ...prev, points: json.points } : prev);
      } else {
        setStatusMsg({ type: "pending" });
      }
    } catch {
      setStatusMsg({ type: "error" });
    } finally {
      setCheckingStatus(false);
    }
  }

  function closeRedeemDialog() {
    setRedeemOpen(false);
    setStatusMsg(null);
    setRedeemSuccess(null);
    setSelectedReward(null);
  }

  async function handleCheck(e: React.FormEvent) {
    e.preventDefault();
    const parsed = phoneSchema.safeParse(phone);
    if (!parsed.success) {
      toast({
        title: "Nomor tidak valid",
        description: parsed.error.errors[0]?.message,
        variant: "destructive",
      });
      return;
    }

    if (!/^\d{4}$/.test(lastFour)) {
      toast({
        title: "4 digit terakhir tidak valid",
        description: "Masukkan tepat 4 angka terakhir nomor HP Anda.",
        variant: "destructive",
      });
      return;
    }

    const normalized = normalizePhone(parsed.data);
    setLoading(true);
    setData(null);
    setSelectedReward(null);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: normalized, last_four: lastFour, action: "check_points" }),
      });

      const json = await res.json();

      if (!json.success) {
        toast({
          title: "Nomor tidak ditemukan",
          description: json.message || "Nomor ini belum terdaftar sebagai member BESTI.",
          variant: "destructive",
        });
        return;
      }

      const points = Number(json?.points ?? 0) || 0;
      setData({
        phone: json?.phone ?? normalized,
        name: json?.name,
        points,
        tier: json?.tier,
        member_since: json?.member_since,
      });
    } catch (err) {
      console.error("Check points error:", err);
      toast({
        title: "Gagal memuat poin",
        description: "Periksa URL webhook n8n & koneksi internet, lalu coba lagi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const availableRewards = REWARD_CATALOG.filter(
    (r) => !data || r.points <= data.points
  );

  const filteredRewards =
    activeCategory === "semua"
      ? REWARD_CATALOG
      : REWARD_CATALOG.filter((r) => r.category === activeCategory);

  const redeemPayload =
    data && selectedReward
      ? JSON.stringify({
          type: "besti_redeem",
          phone: data.phone,
          points: selectedReward.points,
          reward_id: selectedReward.id,
          reward_name: selectedReward.name,
          ts: Date.now(),
        })
      : "";

  const categories: Array<RewardItem["category"] | "semua"> = [
    "semua",
    "diskon",
    "layanan",
    "produk",
    "voucher",
  ];

  return (
    <Layout>
      {/* ── Success overlay notification ── */}
      {redeemNotif && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#1a1625] rounded-2xl shadow-2xl border border-green-200 dark:border-purple-700/50 p-8 max-w-sm w-full text-center space-y-4">
            {/* Animated checkmark */}
            <div className="relative flex items-center justify-center">
              <div className="absolute w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 animate-ping opacity-30" />
              <div className="relative w-16 h-16 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center shadow-lg">
                <CheckCircle2 className="h-9 w-9 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white">Redeem Berhasil!</h3>
              {redeemNotif.nama && (
                <p className="text-gray-500 dark:text-gray-400 text-sm">Halo, <span className="font-semibold text-gray-700 dark:text-gray-200">{redeemNotif.nama}</span>!</p>
              )}
              <p className="font-semibold text-green-600 dark:text-green-400">{redeemNotif.reward}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">berhasil ditukarkan</p>
              {redeemNotif.balance && (
                <div className="mt-2 py-2 px-4 rounded-xl bg-green-50 dark:bg-green-900/20 inline-block">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Sisa poin: </span>
                  <span className="font-bold text-green-600 dark:text-green-400">{Number(redeemNotif.balance).toLocaleString("id-ID")} poin</span>
                </div>
              )}
            </div>
            <button
              onClick={() => setRedeemNotif(null)}
              className="w-full py-2.5 rounded-xl bg-green-500 dark:bg-purple-600 hover:bg-green-600 dark:hover:bg-purple-700 text-white font-bold text-sm transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <section className="relative surface-mesh border-b border-border">
        <div className="container-custom py-14 md:py-20">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-action/10 text-action text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              BESTI Loyalty
            </span>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground">
              Cek & Tukar <span className="gradient-text">Poin Member</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Masukkan nomor HP yang terdaftar untuk melihat saldo poin dan
              memilih hadiah yang ingin ditukar.
            </p>
          </div>
        </div>
      </section>

      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Lookup form + result */}
          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-2xl bg-card border border-border p-6 md:p-8 shadow-sm">
              <div className="mb-6">
                <h2 className="font-heading text-2xl text-foreground">Cek Saldo Poin</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Data diambil real-time dari sistem loyalty BESTI.
                </p>
              </div>

              <form onSubmit={handleCheck} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor HP Terdaftar</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      placeholder="081234567890"
                      className="pl-10 h-12"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength={20}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastFour">4 Digit Terakhir Nomor HP</Label>
                  <Input
                    id="lastFour"
                    type="text"
                    inputMode="numeric"
                    pattern="\d{4}"
                    placeholder="Contoh: 7890"
                    className="h-12 tracking-widest text-center text-lg font-mono"
                    value={lastFour}
                    onChange={(e) =>
                      setLastFour(e.target.value.replace(/\D/g, "").slice(0, 4))
                    }
                    maxLength={4}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Masukkan 4 digit terakhir nomor HP Anda sebagai verifikasi.
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="action"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mengecek...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Cek Poin Saya
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Hasil & pilihan reward */}
            {data && (
              <div className="rounded-2xl border border-border overflow-hidden animate-fade-in">
                {/* Saldo header */}
                <div className="bg-gradient-to-br from-primary via-primary to-accent/40 text-primary-foreground p-6 md:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
                      Saldo Poin
                    </span>
                    {data.tier && (
                      <span className="px-3 py-1 rounded-full bg-action text-action-foreground text-xs font-semibold">
                        {data.tier}
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-5xl md:text-6xl font-bold">
                      {data.points.toLocaleString("id-ID")}
                    </span>
                    <span className="text-primary-foreground/70">poin</span>
                  </div>
                  {data.name && (
                    <p className="mt-3 text-primary-foreground/80">
                      Halo, <span className="font-semibold">{data.name}</span>
                    </p>
                  )}
                  <p className="text-sm text-primary-foreground/60">{data.phone}</p>
                </div>

                {/* Catalog reward */}
                <div className="bg-card p-6 md:p-8 space-y-5">
                  <div className="flex items-center gap-3">
                    <Gift className="h-5 w-5 text-action" />
                    <h3 className="font-heading text-lg text-foreground">Pilih Hadiah</h3>
                  </div>

                  {data.points > 0 ? (
                    <>
                      {/* Filter kategori */}
                      <div className="flex gap-2 flex-wrap">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-semibold border transition-colors",
                              activeCategory === cat
                                ? "bg-action text-action-foreground border-action"
                                : "bg-background text-muted-foreground border-border hover:border-action/50"
                            )}
                          >
                            {cat === "semua" ? "Semua" : CATEGORY_LABELS[cat]}
                          </button>
                        ))}
                      </div>

                      {/* Grid reward */}
                      <div className="grid sm:grid-cols-2 gap-3">
                        {filteredRewards.map((reward) => {
                          const canAfford = reward.points <= data.points;
                          const isSelected = selectedReward?.id === reward.id;
                          return (
                            <button
                              key={reward.id}
                              disabled={!canAfford}
                              onClick={() =>
                                setSelectedReward(isSelected ? null : reward)
                              }
                              className={cn(
                                "relative text-left rounded-xl border p-4 transition-all",
                                isSelected
                                  ? "border-action bg-action/5 ring-2 ring-action/30"
                                  : canAfford
                                  ? "border-border bg-background hover:border-action/50 hover:bg-action/5"
                                  : "border-border bg-muted/30 opacity-50 cursor-not-allowed"
                              )}
                            >
                              {isSelected && (
                                <CheckCircle2 className="absolute top-3 right-3 h-4 w-4 text-action" />
                              )}
                              <div className="flex items-start gap-3">
                                <span
                                  className={cn(
                                    "p-2 rounded-lg",
                                    isSelected
                                      ? "bg-action/20 text-action"
                                      : canAfford
                                      ? "bg-muted text-muted-foreground"
                                      : "bg-muted/50 text-muted-foreground/50"
                                  )}
                                >
                                  {reward.icon}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-sm text-foreground leading-tight">
                                    {reward.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                                    {reward.description}
                                  </p>
                                  <div className="mt-2 flex items-center gap-1">
                                    <Sparkles className="h-3 w-3 text-action" />
                                    <span className="text-xs font-bold text-action">
                                      {reward.points.toLocaleString("id-ID")} poin
                                    </span>
                                    {!canAfford && (
                                      <span className="text-xs text-muted-foreground ml-1">
                                        (kurang {(reward.points - data.points).toLocaleString("id-ID")} poin)
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {availableRewards.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-2">
                          Poin Anda belum cukup untuk reward apapun. Terus belanja di BESTI!
                        </p>
                      )}

                      {/* Tombol buka QR */}
                      <Dialog open={redeemOpen} onOpenChange={(open) => { if (!open) closeRedeemDialog(); else setRedeemOpen(true); }}>
                        <DialogTrigger asChild>
                          <Button
                            variant="accent"
                            size="lg"
                            className="w-full"
                            disabled={!selectedReward}
                          >
                            <QrCode className="mr-2 h-5 w-5" />
                            {selectedReward
                              ? `Tukar — ${selectedReward.name}`
                              : "Pilih reward terlebih dahulu"}
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="max-h-[90dvh] overflow-y-auto w-[calc(100vw-2rem)] sm:w-full sm:max-w-md p-4 sm:p-6">
                          <DialogHeader>
                            <DialogTitle>
                              {redeemSuccess ? "Penukaran Berhasil!" : "Kode QR Penukaran Poin"}
                            </DialogTitle>
                            <DialogDescription>
                              {redeemSuccess
                                ? "Poin Anda berhasil ditukarkan. Berikut detail transaksinya."
                                : "Tunjukkan kode QR ini kepada kasir BESTI untuk menukar poin Anda."}
                            </DialogDescription>
                          </DialogHeader>

                          {redeemSuccess ? (
                            /* ── SUCCESS SCREEN ── */
                            <div className="flex flex-col items-center gap-4 py-3">
                              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                                <CheckCircle2 className="h-8 w-8 text-green-600" />
                              </div>
                              <div className="text-center space-y-1">
                                <p className="font-heading text-lg font-bold text-foreground">
                                  {redeemSuccess.reward}
                                </p>
                                {redeemSuccess.nama && (
                                  <p className="text-muted-foreground text-sm">Halo, <span className="font-semibold">{redeemSuccess.nama}</span>!</p>
                                )}
                                <p className="text-xs text-muted-foreground mt-1">Sisa poin Anda</p>
                                <p className="font-heading text-3xl font-bold text-green-600">
                                  {redeemSuccess.balance.toLocaleString("id-ID")}
                                  <span className="text-sm font-normal text-muted-foreground ml-1">poin</span>
                                </p>
                              </div>
                              <Button className="w-full" onClick={closeRedeemDialog}>
                                Selesai
                              </Button>
                            </div>
                          ) : (
                            /* ── QR SCREEN ── */
                            <div className="flex flex-col items-center gap-4 py-2">
                              {/* QR always on white bg so scanner can read in any theme */}
                              <div className="p-4 rounded-2xl bg-white border-2 border-gray-200 shadow-sm">
                                {redeemPayload && (
                                  <QRCodeSVG
                                    value={redeemPayload}
                                    size={192}
                                    level="M"
                                    bgColor="#FFFFFF"
                                    fgColor="#000000"
                                    includeMargin={false}
                                    style={{ display: "block", width: "100%", height: "auto", maxWidth: 192 }}
                                  />
                                )}
                              </div>

                              <div className="text-center space-y-0.5">
                                <p className="font-heading text-base font-bold text-foreground">
                                  {selectedReward?.name}
                                </p>
                                <p className="text-sm font-semibold text-action">
                                  {selectedReward?.points.toLocaleString("id-ID")} poin
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {String(data.phone).replace(/^62/, "0").replace(/(\d{4})(\d{4})(\d+)/, "$1-$2-$3")}
                                </p>
                              </div>

                              <div className="w-full p-3 rounded-xl bg-secondary space-y-2">
                                <p className="text-xs font-semibold text-secondary-foreground uppercase tracking-wide">Langkah penukaran</p>
                                <ol className="space-y-1.5">
                                  {[
                                    "Tunjukkan QR ini kepada kasir BESTI.",
                                    "Kasir akan memindai QR untuk memproses penukaran.",
                                    "Tap tombol di bawah setelah kasir selesai memindai.",
                                  ].map((step, i) => (
                                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                      <span className="shrink-0 w-4 h-4 rounded-full bg-action/15 text-action text-[10px] font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                                      {step}
                                    </li>
                                  ))}
                                </ol>
                              </div>

                              {/* Status check */}
                              <div className="w-full space-y-2">
                                <Button
                                  variant="outline"
                                  size="default"
                                  className="w-full"
                                  onClick={checkRedeemStatus}
                                  disabled={checkingStatus}
                                >
                                  {checkingStatus ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Memverifikasi...</>
                                  ) : (
                                    <><RefreshCw className="mr-2 h-4 w-4" />Kasir Sudah Scan? Cek di Sini</>
                                  )}
                                </Button>
                                {statusMsg?.type === "pending" && (
                                  <p className="text-center text-xs text-muted-foreground">
                                    Penukaran belum diproses. Pastikan kasir telah memindai QR Anda, lalu coba lagi.
                                  </p>
                                )}
                                {statusMsg?.type === "error" && (
                                  <p className="text-center text-xs text-destructive">
                                    Tidak dapat terhubung. Periksa koneksi internet Anda lalu coba lagi.
                                  </p>
                                )}
                              </div>

                              {TG_BOT && (
                                <a
                                  href={`https://t.me/${TG_BOT}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  <Send className="h-3 w-3" />
                                  Atau kirim via bot Telegram BESTI
                                </a>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Belum ada poin yang bisa ditukar. Yuk belanja di BESTI Computer untuk
                      mengumpulkan poin!
                    </p>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setData(null);
                      setPhone("");
                      setLastFour("");
                      setSelectedReward(null);
                    }}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Cek nomor lain
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl bg-card border border-border p-6">
              <h3 className="font-heading text-lg text-foreground mb-4">
                Bagaimana Cara Kerjanya?
              </h3>
              <ol className="space-y-4">
                {[
                  {
                    t: "Masukkan nomor HP",
                    d: "Gunakan nomor yang sama saat Anda mendaftar member.",
                  },
                  {
                    t: "Lihat poin secara real-time",
                    d: "Saldo poin Anda diambil langsung dari sistem loyalty BESTI.",
                  },
                  {
                    t: "Pilih hadiah yang diinginkan",
                    d: "Klik reward yang sesuai dengan poin Anda. Hadiah yang belum terjangkau ditandai otomatis.",
                  },
                  {
                    t: "Tunjukkan QR ke kasir / Telegram",
                    d: "QR berisi info reward & poin yang dipilih — kasir atau bot akan proses otomatis.",
                  },
                ].map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="h-7 w-7 shrink-0 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{s.t}</p>
                      <p className="text-sm text-muted-foreground">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Info reward tersedia */}
            <div className="rounded-2xl bg-card border border-border p-6 space-y-3">
              <h3 className="font-heading text-base text-foreground">Reward Tersedia</h3>
              <div className="space-y-2">
                {REWARD_CATALOG.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted-foreground">{r.name}</span>
                    <span className="font-semibold text-action whitespace-nowrap ml-2">
                      {r.points.toLocaleString("id-ID")} pt
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-action/10 to-brand-sky/30 border border-action/20 p-6">
              <Gift className="h-8 w-8 text-action mb-3" />
              <h3 className="font-heading text-lg text-foreground mb-2">
                Belum jadi member?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Daftar gratis & dapatkan poin di setiap transaksi di BESTI Computer.
              </p>
              <Button variant="action" asChild>
                <a href="/member">Daftar Member</a>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
