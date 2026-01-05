"use client";

import DashboardLayout from "@/components/DashboardLayout";
import {
    User,
    Lock,
    Settings as SettingsIcon,
    Bell,
    Shield,
    Save,
    LogOut,
    ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
    return (
        <DashboardLayout title="Ayarlar">
            <div className="flex flex-col gap-10">

                {/* Profile Section */}
                <section className="flex flex-col gap-8 pb-12 border-b border-white/5">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Yönetici Profili</h3>
                        <p className="text-sm font-black uppercase tracking-tighter text-white">Hesap Bilgileri ve Erişilebilirlik</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-1 flex flex-col items-center p-12 border border-white/5 bg-white/[0.01] gap-6">
                            <div className="size-32 bg-white/5 flex items-center justify-center border border-white/10 group relative cursor-pointer">
                                <User size={48} className="text-white/20 group-hover:text-white transition-colors" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-[8px] font-black uppercase tracking-widest">Değiştir</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <h4 className="text-lg font-black uppercase tracking-tight">Mehmet Karaoğlu</h4>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mt-1">Super Admin</p>
                            </div>
                            <button className="text-[9px] font-black uppercase tracking-[0.2em] text-red-500 hover:text-red-400 transition-colors flex items-center gap-2 mt-4">
                                <LogOut size={14} /> Çıkış Yap
                            </button>
                        </div>

                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Ad Soyad</label>
                                <input type="text" defaultValue="Mehmet Karaoğlu" className="h-14 bg-white/[0.03] border border-white/10 px-6 text-sm font-black tracking-widest outline-none focus:border-white/40 transition-all uppercase" />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">E-Posta</label>
                                <input type="email" defaultValue="admin@karaoglu.com" className="h-14 bg-white/[0.03] border border-white/10 px-6 text-sm font-black tracking-widest outline-none focus:border-white/40 transition-all uppercase" />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Biyografi Gösterimi</label>
                                <textarea rows={4} defaultValue="Yönetim Kurulu Üyesi ve Baş Mühendis." className="bg-white/[0.03] border border-white/10 p-6 text-sm font-medium tracking-widest outline-none focus:border-white/40 transition-all uppercase italic text-white/40 resize-none"></textarea>
                            </div>
                            <div className="flex flex-col justify-end">
                                <button className="h-14 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white/90">
                                    <Save size={16} /> Profili Kaydet
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Security & System Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Security */}
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Güvenlik</h3>
                            <p className="text-sm font-black uppercase tracking-tighter text-white">Erişim ve Şifre Kontrolleri</p>
                        </div>

                        <div className="flex flex-col border border-white/5 divide-y divide-white/5">
                            {[
                                { label: "Şifre Değiştir", icon: <Lock size={16} /> },
                                { label: "İki Faktörlü Doğrulama", icon: <Shield size={16} />, active: "Pasif" },
                                { label: "Cihaz Yönetimi", icon: <ChevronRight size={16} /> }
                            ].map((item, idx) => (
                                <button key={idx} className="flex h-20 px-8 items-center justify-between hover:bg-white/[0.02] transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="text-white/20 group-hover:text-white transition-colors">{item.icon}</div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</span>
                                    </div>
                                    {item.active && <span className="text-[9px] font-black uppercase tracking-widest text-red-500">{item.active}</span>}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notifications/Preferences */}
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Sistem Ayarları</h3>
                            <p className="text-sm font-black uppercase tracking-tighter text-white">Site ve Bildirim Yönetimi</p>
                        </div>

                        <div className="flex flex-col border border-white/5 divide-y divide-white/5">
                            {[
                                { label: "Sistem Bildirimleri", icon: <Bell size={16} />, toggle: true },
                                { label: "Site Bakım Modu", icon: <SettingsIcon size={16} />, toggle: false },
                                { label: "E-Posta Raporları", icon: <ChevronRight size={16} /> }
                            ].map((item, idx) => (
                                <div key={idx} className="flex h-20 px-8 items-center justify-between hover:bg-white/[0.01] transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="text-white/20">{item.icon}</div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</span>
                                    </div>
                                    {item.toggle !== undefined && (
                                        <div className={`w-12 h-6 border ${item.toggle ? 'border-white bg-white/10' : 'border-white/10'} relative flex items-center p-1 cursor-pointer`}>
                                            <div className={`size-3 ${item.toggle ? 'bg-white translate-x-6' : 'bg-white/10'} transition-all`} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}
