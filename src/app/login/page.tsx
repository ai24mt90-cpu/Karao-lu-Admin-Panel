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
        <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans">

            {/* Left Side - Brand & Aesthetic */}
            <div className="hidden md:flex md:w-1/2 bg-slate-50 border-r border-border-brand relative overflow-hidden p-20 flex-col justify-between">
                <div className="relative z-10 transition-all duration-700">
                    <Logo size={80} className="text-primary" />
                    <div className="mt-10 flex flex-col gap-4">
                        <h1 className="text-5xl font-bold uppercase tracking-tight text-slate-700 leading-tight">
                            Karaoğlu <br /> Universal <br /> Mühendislik
                        </h1>
                        <div className="h-1.5 w-20 bg-primary rounded-full" />
                    </div>
                </div>

                <div className="relative z-10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-relaxed max-w-xs">
                        Geleceği Rasyonel <br /> Çözümlerle İnşa Ediyoruz.
                    </p>
                </div>

                {/* Background Image/Aesthetic Element */}
                <div className="absolute inset-0 grayscale opacity-10 pointer-events-none">
                    <Image
                        src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200"
                        alt="Architecture"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 to-transparent" />
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8 md:p-20 bg-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md flex flex-col gap-12"
                >
                    <div className="flex flex-col gap-4">
                        <h2 className="text-3xl font-bold uppercase tracking-tight text-slate-700">Panel Erişimi</h2>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Yönetici kimlik bilgilerinizle giriş yapın</p>
                    </div>

                    <form onSubmit={handleLogin} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary ml-4">E-Posta</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-16 w-full bg-slate-50 border border-border-brand px-14 text-sm font-medium tracking-wide outline-none focus:border-primary/40 focus:bg-white focus:shadow-xl focus:shadow-primary/5 transition-all rounded-2xl"
                                    placeholder="admin@karaoglu.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary ml-4">Şifre</label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-16 w-full bg-slate-50 border border-border-brand px-14 text-sm font-medium tracking-wide outline-none focus:border-primary/40 focus:bg-white focus:shadow-xl focus:shadow-primary/5 transition-all rounded-2xl"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-3 text-red-500 bg-red-50 p-4 border border-red-100 rounded-2xl"
                            >
                                <AlertCircle size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-wider">{error}</span>
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary h-16 w-full gap-3 active:scale-[0.98] transition-all disabled:opacity-50 mt-4 shadow-xl shadow-primary/20"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <><LogIn size={16} /> Giriş Yap</>}
                        </button>
                    </form>

                    <div className="flex justify-between items-center px-4">
                        <button className="text-[8px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Şifremi Unuttum</button>
                        <span className="text-[8px] font-medium text-slate-300 tracking-widest">KARAOĞLU V1.0.4</span>
                    </div>
                </motion.div>
            </div>

        </div>
    );
}
