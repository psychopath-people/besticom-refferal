import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Gift, Trophy, ShieldCheck, CheckCircle2, Loader2, Lock } from "lucide-react";
import { z } from "zod";

const STAFF_CODE = "bestidaftar";

const memberSchema = z.object({
  fullName: z.string().trim().min(2, "Nama minimal 2 karakter").max(100, "Nama maksimal 100 karakter"),
  email: z.string().trim().email("Format email tidak valid").max(255),
  phone: z
    .string()
    .trim()
    .min(8, "Nomor WhatsApp tidak valid")
    .max(20, "Nomor WhatsApp tidak valid")
    .regex(/^[0-9+\-\s]+$/, "Hanya angka, + dan - yang diperbolehkan"),
  customerType: z.enum(["personal", "instansi", "perusahaan", "sekolah"], {
    required_error: "Pilih tipe customer",
  }),
  organization: z.string().trim().max(150).optional(),
  city: z.string().trim().min(2, "Kota wajib diisi").max(80),
  notes: z.string().trim().max(500).optional(),
});

type MemberForm = z.infer<typeof memberSchema>;

const benefits = [
  {
    icon: Gift,
    title: "Poin Setiap Pembelian",
    desc: "Dapatkan poin otomatis di setiap transaksi yang bisa ditukar diskon atau hadiah.",
  },
  {
    icon: Trophy,
    title: "Reward Eksklusif",
    desc: "Akses promo member-only, bonus aksesoris, dan layanan prioritas.",
  },
  {
    icon: ShieldCheck,
    title: "Garansi & Support Prioritas",
    desc: "Klaim garansi lebih cepat dan dukungan teknis khusus untuk member terdaftar.",
  },
];

export default function Member() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [staffCode, setStaffCode] = useState("");
  const [staffCodeError, setStaffCodeError] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof MemberForm, string>>>({});
  const [form, setForm] = useState<MemberForm>({
    fullName: "",
    email: "",
    phone: "",
    customerType: "personal",
    organization: "",
    city: "",
    notes: "",
  });

  const update = <K extends keyof MemberForm>(key: K, value: MemberForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (staffCode !== STAFF_CODE) {
      setStaffCodeError("Kode akses salah. Hubungi staff BESTI untuk mendapatkan kode.");
      return;
    }
    setStaffCodeError("");

    const result = memberSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof MemberForm, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof MemberForm;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      toast({
        title: "Periksa kembali data Anda",
        description: "Beberapa field masih perlu diperbaiki.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://n8n.autoinovasoftsolution.cloud/webhook/besti-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const json = await res.json();
      if (!json.success) {
        toast({
          title: "Pendaftaran gagal",
          description: json.message || "Terjadi kesalahan, coba lagi.",
          variant: "destructive",
        });
        return;
      }
      setSubmitted(true);
      toast({
        title: "Pendaftaran berhasil!",
        description: "Selamat bergabung sebagai BESTI Member! Mulai kumpulkan poin di setiap transaksi.",
      });
    } catch {
      toast({
        title: "Gagal terhubung",
        description: "Periksa koneksi internet Anda lalu coba lagi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <section className="container-custom section-spacing">
          <div className="max-w-xl mx-auto text-center space-y-6 p-10 rounded-3xl border border-border bg-card glow-ring">
            <div className="h-16 w-16 mx-auto rounded-full bg-action/15 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-action" />
            </div>
            <div className="space-y-2">
              <h1 className="font-heading text-3xl text-foreground">Selamat Datang, Member BESTI!</h1>
              <p className="text-muted-foreground">
                Akun member Anda sedang kami siapkan. Tim BESTI akan menghubungi Anda via WhatsApp
                untuk aktivasi poin & informasi reward.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button variant="accent" asChild>
                <a href="/products">Belanja Sekarang</a>
              </Button>
              <Button variant="outline" onClick={() => setSubmitted(false)}>
                Daftar Member Lain
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative surface-mesh border-b border-border">
        <div className="container-custom py-14 md:py-20">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              BESTI Member
            </span>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground">
              Daftar Member, Kumpulkan <span className="gradient-text">Poin</span> Setiap Belanja.
            </h1>
            <p className="text-muted-foreground text-lg">
              Gratis & cepat. Dapatkan poin, reward, dan layanan prioritas untuk setiap pembelian
              di BESTI Computer.
            </p>
          </div>
        </div>
      </section>

      <div className="container-custom py-12 md:py-16">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Benefits */}
          <aside className="lg:col-span-2 space-y-6">
            <h2 className="font-heading text-2xl text-foreground">Keuntungan Member</h2>
            <div className="space-y-4">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="flex gap-4 p-5 rounded-2xl border border-border bg-card card-hover"
                >
                  <div className="h-11 w-11 shrink-0 rounded-xl bg-accent/10 flex items-center justify-center">
                    <b.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
              <p className="text-sm opacity-80 mb-1">Mulai Kumpulkan Poin</p>
              <p className="font-heading text-3xl font-bold">50 Poin</p>
              <p className="text-sm opacity-80 mt-2">Setiap kelipatan Rp 1 juta belanja di toko BESTI.</p>
            </div>
          </aside>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 p-6 md:p-8 rounded-3xl border border-border bg-card space-y-6"
            noValidate
          >
            <div className="space-y-1">
              <h2 className="font-heading text-2xl text-foreground">Form Pendaftaran Member</h2>
              <p className="text-sm text-muted-foreground">
                Isi data berikut untuk membuat akun BESTI Member Anda.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="fullName">Nama Lengkap *</Label>
                <Input
                  id="fullName"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="cth. Budi Santoso"
                  maxLength={100}
                  aria-invalid={!!errors.fullName}
                />
                {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="email@contoh.com"
                  maxLength={255}
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">No. WhatsApp *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  maxLength={20}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerType">Tipe Customer *</Label>
                <Select
                  value={form.customerType}
                  onValueChange={(v) => update("customerType", v as MemberForm["customerType"])}
                >
                  <SelectTrigger id="customerType">
                    <SelectValue placeholder="Pilih tipe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal / End-user</SelectItem>
                    <SelectItem value="instansi">Instansi Pemerintah</SelectItem>
                    <SelectItem value="perusahaan">Perusahaan</SelectItem>
                    <SelectItem value="sekolah">Sekolah / Kampus</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Kota *</Label>
                <Input
                  id="city"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  placeholder="cth. Surabaya"
                  maxLength={80}
                  aria-invalid={!!errors.city}
                />
                {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
              </div>

              {form.customerType !== "personal" && (
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="organization">Nama Instansi / Perusahaan / Sekolah</Label>
                  <Input
                    id="organization"
                    value={form.organization}
                    onChange={(e) => update("organization", e.target.value)}
                    placeholder="cth. PT Maju Jaya"
                    maxLength={150}
                  />
                </div>
              )}

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="notes">Catatan (opsional)</Label>
                <Textarea
                  id="notes"
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="Kebutuhan IT, preferensi brand, dll."
                  maxLength={500}
                  rows={3}
                />
              </div>
            </div>

            <div className="pt-2 space-y-3">
              {/* Kode akses staff */}
              <div className="space-y-2 p-4 rounded-xl border border-border bg-muted/40">
                <Label htmlFor="staffCode" className="flex items-center gap-2">
                  <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                  Kode Akses Staff *
                </Label>
                <Input
                  id="staffCode"
                  type="password"
                  value={staffCode}
                  onChange={(e) => { setStaffCode(e.target.value); setStaffCodeError(""); }}
                  placeholder="Masukkan kode akses dari staff BESTI"
                  aria-invalid={!!staffCodeError}
                />
                {staffCodeError ? (
                  <p className="text-xs text-destructive">{staffCodeError}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Kode ini diberikan oleh kasir/staff BESTI saat melakukan pendaftaran.
                  </p>
                )}
              </div>

              <Button type="submit" variant="accent" size="lg" className="w-full" disabled={loading}>
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Mendaftarkan...</>
                ) : (
                  <><Sparkles className="mr-2 h-4 w-4" />Daftar Member Sekarang</>

                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Dengan mendaftar, Anda menyetujui Syarat & Ketentuan dan Kebijakan Privasi BESTI.
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
