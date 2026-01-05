"use client";

import DashboardLayout from "@/components/DashboardLayout";
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    Eye,
    Heart,
    Globe,
    Trophy,
    School
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const programs = [
    {
        id: 1,
        title: "Anadolu Lisesi Bağışı",
        category: "Eğitim",
        location: "Sivas",
        date: "2022",
        icon: <School size={16} />,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbcyhifZbpSgvyiXW09ZLaG6ZTAfuwGut1eaAfWhMtwXsI2AkjddTNbSRCxvQ9GaC1ywJJLuv5mwBvjg-OdEu7q3Pn8Ssox_vRbe4kiKFVyhJj96RS_Kv9ab3CiWLum_1ur5cg8UNkA2Ka0luYWkS5f7BoDPwN-GPoGBTDR5I2nA91WObLOK7QlA8bWmk4BkO4TxoNdA4hbN6hHnm3GVCMhUCqt9UfsXR60-s8U1WzoaTU6DywtagjJYmeutuJtBxwf1y1GS4OKB2Y"
    },
    {
        id: 2,
        title: "Vanspor Kulüp Bağışı",
        category: "Spor",
        location: "Van",
        date: "Devam Ediyor",
        icon: <Trophy size={16} />,
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 3,
        title: "Toplumsal Dayanışma Projesi",
        category: "Toplumsal Katkı",
        location: "Türkiye Geneli",
        date: "2023",
        icon: <Globe size={16} />,
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=400"
    }
];

export default function SocialResponsibilityAdminPage() {
    return (
        <DashboardLayout title="Sosyal Sorumluluk Yönetimi">
            <div className="flex flex-col gap-10">

                {/* Actions Bar */}
                <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-b border-white/5 pb-10">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Yönetim</h3>
                        <p className="text-sm font-black uppercase tracking-tighter text-white">Program ve Bağış Listesi</p>
                    </div>

                    <button className="h-16 px-10 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white/90">
                        <Plus size={16} /> Yeni Program Ekle
                    </button>
                </div>

                {/* Categories Quick Filter */}
                <div className="flex gap-4 overflow-x-auto pb-4">
                    {["TÜMÜ", "EĞİTİM", "SPOR", "TOPLUMSAL KATKI"].map((cat, idx) => (
                        <button key={cat} className={`h-12 px-8 text-[9px] font-black uppercase tracking-[0.2em] border ${idx === 0 ? "bg-white text-black border-white" : "border-white/10 text-white/40 hover:text-white"}`}>
                            {cat}
                        </button>
                    ))}
                </div>

                {/* List View */}
                <div className="flex flex-col gap-4">
                    {programs.map((program, idx) => (
                        <motion.div
                            key={program.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="p-8 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all flex flex-col md:flex-row items-center gap-10 group"
                        >
                            <div className="relative size-24 shrink-0 grayscale group-hover:grayscale-0 transition-all duration-700">
                                <Image src={program.image} alt={program.title} fill className="object-cover" />
                            </div>

                            <div className="flex-1 flex flex-col gap-2">
                                <div className="flex items-center gap-3 text-white/20 italic text-[10px] font-black uppercase tracking-widest">
                                    {program.icon} {program.category}
                                </div>
                                <h4 className="text-xl font-black uppercase tracking-tighter">{program.title}</h4>
                                <div className="flex gap-6 mt-2">
                                    <div className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Konum: <span className="text-white">{program.location}</span></div>
                                    <div className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Tarih: <span className="text-white">{program.date}</span></div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button title="Görüntüle" className="size-12 flex items-center justify-center border border-white/5 text-white/20 hover:text-white hover:border-white/20 transition-all">
                                    <Eye size={16} />
                                </button>
                                <button title="Düzenle" className="size-12 flex items-center justify-center border border-white/5 text-white/20 hover:text-white hover:border-white/20 transition-all">
                                    <Edit2 size={16} />
                                </button>
                                <button title="Sil" className="size-12 flex items-center justify-center border border-white/5 text-white/10 hover:text-red-500 hover:border-red-500/20 transition-all">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </DashboardLayout>
    );
}
