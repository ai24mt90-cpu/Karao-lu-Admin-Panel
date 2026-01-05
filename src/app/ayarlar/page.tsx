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

export default function SettingsPage() {
    return (
        <DashboardLayout title="Ayarlar">
            <div className="flex flex-col gap-10">

                {/* Profile Section */}
                <section className="flex flex-col gap-8 pb-12 border-b border-border-brand">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary">Yönetici Profili</h3>
                        <p className="text-sm font-black uppercase tracking-tighter text-foreground">Hesap Bilgileri ve Erişilebilirlik</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-1 flex flex-col items-center p-12 border border-border-brand bg-surface gap-6">
                            <div className="size-32 bg-foreground/5 flex items-center justify-center border border-border-brand group relative cursor-pointer">
                                <User size={48} className="text-text-secondary/40 group-hover:text-foreground transition-colors" />
                                <div className="absolute inset-0 bg-background/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-[8px] font-black uppercase tracking-widest text-foreground">Değiştir</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <h4 className="text-lg font-black uppercase tracking-tight">Mehmet Karaoğlu</h4>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary mt-1">Super Admin</p>
                            </div>
                            <button className="text-[9px] font-black uppercase tracking-[0.2em] text-red-500 hover:opacity-70 transition-colors flex items-center gap-2 mt-4">
                                <LogOut size={14} /> Çıkış Yap
                            </button>
                        </div>

                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary">Ad Soyad</label>
                                <input type="text" defaultValue="Mehmet Karaoğlu" className="h-14 bg-surface border border-border-brand px-6 text-sm font-black tracking-widest outline-none focus:border-foreground/40 transition-all uppercase" />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary">E-Posta</label>
                                <input type="email" defaultValue="admin@karaoglu.com" className="h-14 bg-surface border border-border-brand px-6 text-sm font-black tracking-widest outline-none focus:border-foreground/40 transition-all uppercase" />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary">Biyografi Gösterimi</label>
                                <textarea rows={4} defaultValue="Yönetim Kurulu Üyesi ve Baş Mühendis." className="bg-surface border border-border-brand p-6 text-sm font-medium tracking-widest outline-none focus:border-foreground/40 transition-all uppercase italic text-text-secondary resize-none"></textarea>
                            </div>
                            <div className="flex flex-col justify-end">
                                <button className="btn-primary h-14 bg-foreground text-background text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:opacity-90">
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
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary">Güvenlik</h3>
                            <p className="text-sm font-black uppercase tracking-tighter text-foreground">Erişim ve Şifre Kontrolleri</p>
                        </div>

                        <div className="flex flex-col border border-border-brand divide-y divide-border-brand">
                            {[
                                { label: "Şifre Değiştir", icon: <Lock size={16} /> },
                                { label: "İki Faktörlü Doğrulama", icon: <Shield size={16} />, active: "Pasif" },
                                { label: "Cihaz Yönetimi", icon: <ChevronRight size={16} /> }
                            ].map((item, idx) => (
                                <button key={idx} className="flex h-20 px-8 items-center justify-between hover:bg-foreground/[0.02] transition-all group text-foreground">
                                    <div className="flex items-center gap-4">
                                        <div className="text-text-secondary group-hover:text-foreground transition-colors">{item.icon}</div>
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
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary">Sistem Ayarları</h3>
                            <p className="text-sm font-black uppercase tracking-tighter text-foreground">Site ve Bildirim Yönetimi</p>
                        </div>

                        <div className="flex flex-col border border-border-brand divide-y divide-border-brand">
                            {[
                                { label: "Sistem Bildirimleri", icon: <Bell size={16} />, toggle: true },
                                { label: "Site Bakım Modu", icon: <SettingsIcon size={16} />, toggle: false },
                                { label: "E-Posta Raporları", icon: <ChevronRight size={16} /> }
                            ].map((item, idx) => (
                                <div key={idx} className="flex h-20 px-8 items-center justify-between hover:bg-foreground/[0.01] transition-all text-foreground">
                                    <div className="flex items-center gap-4">
                                        <div className="text-text-secondary">{item.icon}</div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</span>
                                    </div>
                                    {item.toggle !== undefined && (
                                        <div className={`w-12 h-6 border ${item.toggle ? 'border-foreground bg-foreground/10' : 'border-border-brand'} relative flex items-center p-1 cursor-pointer`}>
                                            <div className={`size-3 ${item.toggle ? 'bg-foreground translate-x-6' : 'bg-text-secondary/20'} transition-all`} />
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
