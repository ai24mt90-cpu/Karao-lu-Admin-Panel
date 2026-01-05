"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ShieldCheck, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Logo from "@/components/Logo";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            router.push("/");
        } catch (err: any) {
            setError(err.message || "Giriş yapılamadı. Bilgilerinizi kontrol edin.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-row bg-black">
            {/* Left Section: Branding Context */}
            <div className="hidden lg:flex flex-1 relative overflow-hidden border-r border-white/5">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
                        alt="Corporate skyscraper"
                        fill
                        className="object-cover grayscale brightness-[0.2]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                <div className="relative z-10 flex flex-col justify-between p-20 w-full h-full">
                    {/* Logo Area */}
                    <div className="flex items-center gap-6 text-white">
                        <Logo size={80} className="text-white" />
                        <div className="flex flex-col">
                            <span className="text-2xl font-black uppercase tracking-tighter leading-none">Karaoğlu</span>
                            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-text-secondary">Universal Mühendislik</span>
                        </div>
                    </div>

                    <div className="max-w-xl">
                        <h1 className="text-6xl font-black text-white leading-tight mb-8 tracking-tighter uppercase">
                            Evrensel <br /> Yönetim Paneli
                        </h1>
                        <p className="text-text-secondary text-sm uppercase tracking-[0.4em] leading-loose font-medium">
                            Projeleri, altyapı yatırımlarını ve sosyal sorumluluk faaliyetlerini tek bir merkezden yönetin.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Section: Login Form */}
            <div className="flex-1 flex flex-col justify-center items-center p-8 bg-black relative">
                <div className="absolute top-10 right-10">
                    <Link href="/" className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary hover:text-white transition-colors flex items-center gap-2">
                        <ArrowLeft size={14} /> Siteye Dön
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-sm flex flex-col gap-12"
                >
                    <div className="flex flex-col gap-4">
                        <h2 className="text-4xl font-black uppercase tracking-tighter">Giriş Yap</h2>
                        <p className="text-xs uppercase tracking-[0.3em] text-text-secondary leading-loose">
                            Lütfen yönetici kimlik bilgilerinizi doğrulayın.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="flex flex-col gap-8">
                        {error && (
                            <div className="p-4 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                                {error}
                            </div>
                        )}

                        <div className="flex flex-col gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary">E-Posta</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/30 group-focus-within:text-white transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full h-14 bg-white/5 border border-white/10 pl-12 text-sm text-white focus:outline-none focus:border-white/40 transition-all uppercase tracking-widest placeholder:text-white/10"
                                        placeholder="admin@karaoglu.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary">Şifre</label>
                                    <button type="button" className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white">Şifremi Unuttum</button>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/30 group-focus-within:text-white transition-colors" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full h-14 bg-white/5 border border-white/10 pl-12 text-sm text-white focus:outline-none focus:border-white/40 transition-all placeholder:text-white/10"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="group flex h-16 w-full items-center justify-center gap-3 bg-white text-black text-xs font-black uppercase tracking-[0.3em] hover:bg-white/90 transition-all active:scale-95 disabled:opacity-50"
                        >
                            {loading ? "Giriş Yapılıyor..." : (
                                <>
                                    Giriş Yap <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="flex flex-col items-center gap-6 pt-12 border-t border-white/5">
                        <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.5em] text-white/20">
                            <ShieldCheck size={12} />
                            <span>Güvenli Yönetim Erişimi</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
