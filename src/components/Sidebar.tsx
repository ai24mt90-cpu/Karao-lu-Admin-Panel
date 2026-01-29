"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    BarChart3,
    Briefcase,
    Users,
    HelpCircle,
    Image as ImageIcon,
    Settings,
    LogOut,
    Globe,
    Newspaper,
    FileText,
    Mail
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const navLinks = [
    { href: "/", label: "Genel Bakış", icon: <BarChart3 size={18} /> },
    { href: "/projeler", label: "Projeler", icon: <Briefcase size={18} /> },
    { href: "/mesajlar", label: "Mesajlar", icon: <Mail size={18} /> },
    { href: "/son-calismalar", label: "Son Çalışmalar", icon: <ImageIcon size={18} /> },
    { href: "/sosyal-sorumluluk", label: "Sosyal Sorumluluk", icon: <Globe size={18} /> },
    { href: "/haberler", label: "Haberler", icon: <Newspaper size={18} /> },
    { href: "/blog", label: "Blog", icon: <FileText size={18} /> },
    { href: "/sss", label: "S.S.S.", icon: <HelpCircle size={18} /> },
    { href: "/yonetim-kurulu", label: "Yönetim Kurulu", icon: <Users size={18} /> },
];

export default function Sidebar() {
    const pathname = usePathname();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/login";
    };

    return (
        <aside className="w-72 flex flex-col bg-white h-screen sticky top-0 border-r border-slate-200 z-20">
            <div className="flex flex-col h-full p-8 px-6">
                {/* Brand - Professional Crystal */}
                <div className="flex flex-col gap-4 mb-10 px-2 items-center">
                    <Image
                        src="/logo-header.png"
                        alt="Karaoğlu Admin"
                        width={150}
                        height={150}
                        className="object-contain"
                        priority
                    />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Yönetim Paneli</span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 flex flex-col gap-1">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                  ${isActive
                                        ? "bg-primary/5 text-primary shadow-sm ring-1 ring-primary/5"
                                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                                    }`}
                            >
                                <span className={isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-500 transition-colors"}>
                                    {link.icon}
                                </span>
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="flex flex-col gap-4 pt-8 border-t border-border-brand">
                    <Link
                        href="/ayarlar"
                        className="flex items-center gap-4 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary hover:text-foreground transition-all"
                    >
                        <Settings size={18} />
                        Ayarlar
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary hover:text-red-500 transition-all"
                    >
                        <LogOut size={18} />
                        Çıkış Yap
                    </button>
                </div>
            </div>
        </aside>
    );
}
