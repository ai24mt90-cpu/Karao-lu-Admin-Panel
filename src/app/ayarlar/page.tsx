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
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Yönetici Profili</h3>
                        <p className="text-sm font-bold uppercase tracking-widest text-slate-700">Hesap Bilgileri ve Erişilebilirlik</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-1 flex flex-col items-center p-12 border border-border-brand bg-white rounded-3xl gap-6 shadow-sm">
                            <div className="size-32 bg-slate-50 flex items-center justify-center border border-border-brand group relative cursor-pointer rounded-2xl overflow-hidden">
                                <User size={48} className="text-slate-300 group-hover:text-primary transition-colors" />
                                <div className="absolute inset-0 bg-white/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-[8px] font-bold uppercase tracking-widest text-primary">Değiştir</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <h4 className="text-lg font-bold uppercase tracking-tight text-slate-700">Mehmet Karaoğlu</h4>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-primary mt-1">Super Admin</p>
                            </div>
                            <button className="text-[9px] font-bold uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors flex items-center gap-2 mt-4">
                                <LogOut size={14} /> Çıkış Yap
                            </button>
                        </div>

                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-4">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Ad Soyad</label>
                                <input type="text" defaultValue="Mehmet Karaoğlu" className="h-14 bg-white border border-border-brand px-6 text-sm font-bold tracking-widest outline-none focus:border-primary/40 transition-all uppercase rounded-2xl" />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">E-Posta</label>
                                <input type="email" defaultValue="admin@karaoglu.com" className="h-14 bg-white border border-border-brand px-6 text-sm font-bold tracking-widest outline-none focus:border-primary/40 transition-all uppercase rounded-2xl" />
                            </div>
                            <div className="flex flex-col gap-4 md:col-span-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Biyografi Gösterimi</label>
                                <textarea rows={4} defaultValue="Yönetim Kurulu Üyesi ve Baş Mühendis." className="bg-white border border-border-brand p-6 text-sm font-medium tracking-widest outline-none focus:border-primary/40 transition-all uppercase italic text-slate-500 resize-none rounded-2xl"></textarea>
                            </div>
                            <div className="md:col-span-2 flex justify-end">
                                <button className="btn-primary">
                                    <Save size={16} /> Profili Kaydet
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Security & System Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
                    {/* Security */}
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Güvenlik</h3>
                            <p className="text-sm font-bold uppercase tracking-widest text-slate-700">Erişim ve Şifre Kontrolleri</p>
                        </div>

                        <div className="flex flex-col border border-border-brand divide-y divide-border-brand rounded-3xl overflow-hidden bg-white shadow-sm">
                            {[
                                { label: "Şifre Değiştir", icon: <Lock size={16} /> },
                                { label: "İki Faktörlü Doğrulama", icon: <Shield size={16} />, active: "Pasif" },
                                { label: "Cihaz Yönetimi", icon: <ChevronRight size={16} /> }
                            ].map((item, idx) => (
                                <button key={idx} className="flex h-20 px-8 items-center justify-between hover:bg-slate-50 transition-all group text-slate-700">
                                    <div className="flex items-center gap-4">
                                        <div className="text-slate-300 group-hover:text-primary transition-colors">{item.icon}</div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                                    </div>
                                    {item.active && <span className="text-[9px] font-bold uppercase tracking-widest text-red-500">{item.active}</span>}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notifications/Preferences */}
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Sistem Ayarları</h3>
                            <p className="text-sm font-bold uppercase tracking-widest text-slate-700">Site ve Bildirim Yönetimi</p>
                        </div>

                        <div className="flex flex-col border border-border-brand divide-y divide-border-brand rounded-3xl overflow-hidden bg-white shadow-sm">
                            {[
                                { label: "Sistem Bildirimleri", icon: <Bell size={16} />, toggle: true },
                                { label: "Site Bakım Modu", icon: <SettingsIcon size={16} />, toggle: false },
                                { label: "E-Posta Raporları", icon: <ChevronRight size={16} /> }
                            ].map((item, idx) => (
                                <div key={idx} className="flex h-20 px-8 items-center justify-between hover:bg-slate-50 transition-all text-slate-700">
                                    <div className="flex items-center gap-4">
                                        <div className="text-slate-300 transition-colors">{item.icon}</div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                                    </div>
                                    {item.toggle !== undefined && (
                                        <div className={`w-12 h-6 rounded-full border ${item.toggle ? 'border-primary bg-primary/10' : 'border-slate-200 bg-slate-100'} relative flex items-center p-1 cursor-pointer transition-colors`}>
                                            <div className={`size-4 rounded-full ${item.toggle ? 'bg-primary translate-x-6 shadow-sm shadow-primary/20' : 'bg-slate-300'} transition-all`} />
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
