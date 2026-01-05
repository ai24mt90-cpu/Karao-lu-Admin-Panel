"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BarChart3,
    Briefcase,
    Users,
    HelpCircle,
    Image as ImageIcon,
    Settings,
    LogOut,
    Globe
} from "lucide-react";
import Logo from "./Logo";
import { supabase } from "@/lib/supabase";

const navLinks = [
    { href: "/", label: "Genel Bakış", icon: <BarChart3 size={18} /> },
    { href: "/projeler", label: "Projeler", icon: <Briefcase size={18} /> },
    { href: "/sosyal-sorumluluk", label: "Sosyal Sorumluluk", icon: <Globe size={18} /> },
    { href: "/sss", label: "S.S.S.", icon: <HelpCircle size={18} /> },
    { href: "/yonetim-kurulu", label: "Yönetim Kurulu", icon: <Users size={18} /> },
    { href: "/galeri", label: "Medya Kütüphanesi", icon: <ImageIcon size={18} /> },
];

export default function Sidebar() {
    const pathname = usePathname();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/login";
    };

    return (
        <aside className="w-72 flex flex-col border-r border-border-brand bg-surface h-screen sticky top-0">
            <div className="flex flex-col h-full p-8">
                {/* Brand */}
                <div className="flex items-center gap-4 mb-20">
                    <Logo size={48} className="text-foreground" />
                    <div className="flex flex-col">
                        <span className="text-lg font-black uppercase tracking-tighter leading-none">Karaoğlu</span>
                        <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-text-secondary">Yönetim Paneli</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 flex flex-col gap-2">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-4 px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all
                  ${isActive
                                        ? "bg-foreground text-background"
                                        : "text-text-secondary hover:text-foreground hover:bg-foreground/5"
                                    }`}
                            >
                                {link.icon}
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="flex flex-col gap-4 pt-8 border-t border-border-brand">
                    <Link
                        href="/ayarlar"
                        className="flex items-center gap-4 px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary hover:text-foreground transition-all"
                    >
                        <Settings size={18} />
                        Ayarlar
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary hover:text-red-500 transition-all"
                    >
                        <LogOut size={18} />
                        Çıkış Yap
                    </button>
                </div>
            </div>
        </aside>
    );
}
