"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Logo from "@/components/Logo";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError("Hatalı e-posta veya şifre.");
            setLoading(false);
        } else {
            window.location.href = "/";
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans selection:bg-foreground/10">

            {/* Left Side - Brand & Aesthetic */}
            <div className="hidden md:flex md:w-1/2 bg-surface border-r border-border-brand relative overflow-hidden p-20 flex-col justify-between">
                <div className="relative z-10">
                    <Logo size={80} className="text-foreground" />
                    <div className="mt-10 flex flex-col gap-4">
                        <h1 className="text-5xl font-black uppercase tracking-tighter leading-tight">
                            Karaoğlu <br /> Universal <br /> Mühendislik
                        </h1>
                        <div className="h-1 w-20 bg-foreground" />
                    </div>
                </div>

                <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-text-secondary leading-relaxed max-w-xs">
                        Geleceği Rasyonel <br /> Çözümlerle İnşa Ediyoruz.
                    </p>
                </div>

                {/* Background Image/Aesthetic Element */}
                <div className="absolute inset-0 grayscale opacity-20 pointer-events-none">
                    <Image
                        src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200"
                        alt="Architecture"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-background to-transparent" />
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8 md:p-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md flex flex-col gap-12"
                >
                    <div className="flex flex-col gap-4">
                        <h2 className="text-3xl font-black uppercase tracking-tighter">Panel Erişimi</h2>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary">Yönetici kimlik bilgilerinizle giriş yapın</p>
                    </div>

                    <form onSubmit={handleLogin} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary">E-Posta</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-16 w-full bg-surface border border-border-brand px-12 text-sm font-black tracking-widest outline-none focus:border-foreground/40 transition-all uppercase"
                                    placeholder="admin@karaoglu.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary">Şifre</label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-16 w-full bg-surface border border-border-brand px-12 text-sm font-black tracking-widest outline-none focus:border-foreground/40 transition-all uppercase"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-3 text-red-500 bg-red-500/10 p-4 border border-red-500/20"
                            >
                                <AlertCircle size={16} />
                                <span className="text-[10px] font-black uppercase tracking-wider">{error}</span>
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="h-16 bg-foreground text-background text-[10px] font-black uppercase tracking-[0.5em] flex items-center justify-center gap-3 hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <><LogIn size={16} /> Giriş Yap</>}
                        </button>
                    </form>

                    <div className="flex justify-between items-center">
                        <button className="text-[8px] font-black uppercase tracking-widest text-text-secondary hover:text-foreground transition-colors">Şifremi Unuttum</button>
                        <span className="text-[8px] font-medium text-text-secondary/20 tracking-tighter">KARAOĞLU V1.0.4</span>
                    </div>
                </motion.div>
            </div>

        </div>
    );
}
