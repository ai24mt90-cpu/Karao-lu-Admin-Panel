"use client";

import { Bell, Search, User } from "lucide-react";

interface TopBarProps {
    title: string;
}

export default function TopBar({ title }: TopBarProps) {
    return (
        <header className="h-24 sticky top-0 z-10 flex items-center justify-between px-10 border-b border-white/5 bg-black/80 backdrop-blur-md">
            <div className="flex items-center gap-4">
                <h2 className="text-xl font-black uppercase tracking-tighter">{title}</h2>
            </div>

            <div className="flex items-center gap-8">
                {/* Search Placeholder */}
                <div className="hidden md:flex relative group">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" />
                    <input
                        type="text"
                        placeholder="ARAMA..."
                        className="h-10 w-64 bg-white/5 border border-white/5 px-10 text-[10px] font-black uppercase tracking-[0.2em] outline-none focus:border-white/20 transition-all"
                    />
                </div>

                <div className="flex items-center gap-6">
                    <button className="text-white/40 hover:text-white transition-colors">
                        <Bell size={20} />
                    </button>
                    <div className="h-10 w-[1px] bg-white/10" />
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col text-right hidden lg:flex">
                            <p className="text-[10px] font-black uppercase tracking-widest leading-none">Admin</p>
                            <p className="text-[8px] font-medium text-white/40 uppercase tracking-widest mt-1 uppercase">Yönetici</p>
                        </div>
                        <div className="size-10 bg-white/10 flex items-center justify-center">
                            <User size={18} className="text-white/40" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
