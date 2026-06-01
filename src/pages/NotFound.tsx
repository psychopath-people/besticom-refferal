import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[65vh] px-4 text-center">
        <p className="font-heading text-[120px] md:text-[160px] font-bold text-accent/10 leading-none select-none">
          404
        </p>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground -mt-4 mb-3">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-sm mb-8">
          Halaman yang Anda cari tidak ada atau sudah dipindahkan. Silakan kembali ke beranda.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <Home className="h-4 w-4" />
            Kembali ke Beranda
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Halaman Sebelumnya
          </button>
        </div>
      </div>
    </Layout>
  );
}
