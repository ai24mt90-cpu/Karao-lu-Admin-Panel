import { Bell, Search, User } from "lucide-react";

interface TopBarProps {
    title: string;
}

export default function TopBar({ title }: TopBarProps) {
    return (
        <header className="h-20 sticky top-0 z-30 flex items-center justify-between px-10 bg-white/80 backdrop-blur-xl border-b border-slate-200">
            <div className="flex items-center gap-4">
                <h2 className="text-lg font-bold text-slate-700 tracking-tight">{title}</h2>
            </div>

            <div className="flex items-center gap-8">
                {/* Search - Integrated */}
                <div className="hidden md:flex relative group">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Hızlı ara..."
                        className="h-10 w-80 bg-slate-50 rounded-lg border border-slate-200 px-10 text-sm font-medium outline-none focus:border-primary/50 focus:bg-white transition-all focus:ring-4 focus:ring-primary/5"
                    />
                </div>

                <div className="flex items-center gap-6">

                    <button className="text-slate-400 hover:text-primary transition-colors p-2 hover:bg-slate-50 rounded-lg">
                        <Bell size={20} />
                    </button>
                    <div className="h-8 w-[1px] bg-slate-200" />
                    <div className="flex items-center gap-3 pl-2">
                        <div className="flex flex-col text-right hidden lg:flex">
                            <p className="text-sm font-bold text-slate-700 leading-none">Admin User</p>
                            <p className="text-[11px] font-medium text-slate-500 mt-1">Sistem Yöneticisi</p>
                        </div>
                        <div className="size-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 font-bold border border-slate-200">
                            <User size={18} />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
