"use client";

import DashboardLayout from "@/components/DashboardLayout";
import {
    Search,
    Filter,
    Plus,
    MoreVertical,
    Edit2,
    Trash2,
    Eye,
    MapPin
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
    {
        id: 1,
        title: "Şehir Hastanesi A Blok",
        category: "Sağlık",
        location: "Sivas",
        year: "2023",
        status: "Devam Ediyor",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 2,
        title: "Vanspor Stadyum Yenileme",
        category: "Spor",
        location: "Van",
        year: "2024",
        status: "Başlangıç",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 3,
        title: "Anadolu Lisesi Kompleksi",
        category: "Eğitim",
        location: "Ankara",
        year: "2022",
        status: "Tamamlandı",
        image: "https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=400"
    }
];

export default function ProjectsAdminPage() {
    return (
        <DashboardLayout title="Proje Yönetimi">
            <div className="flex flex-col gap-10">

                {/* Actions Bar */}
                <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-b border-border-brand pb-10">
                    <div className="relative w-full max-w-md group">
                        <Search size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-foreground transition-colors" />
                        <input
                            type="text"
                            placeholder="PROJE ARA..."
                            className="h-16 w-full bg-surface border border-border-brand px-14 text-[10px] font-black uppercase tracking-[0.2em] outline-none focus:border-foreground/20 transition-all uppercase"
                        />
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <button className="btn-outline flex-1 md:flex-none h-16 px-8 border border-border-brand bg-transparent text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-foreground/5 transition-all">
                            <Filter size={14} /> Filtrele
                        </button>
                        <button className="btn-primary flex-1 md:flex-none h-16 px-10 bg-foreground text-background text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:opacity-90">
                            <Plus size={16} /> Yeni Proje Ekle
                        </button>
                    </div>
                </div>

                {/* Projects List */}
                <div className="flex flex-col gap-1">
                    {/* Header Row */}
                    <div className="grid grid-cols-12 px-8 py-4 text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary opacity-50">
                        <div className="col-span-1">Görsel</div>
                        <div className="col-span-4">Proje Adı / Konum</div>
                        <div className="col-span-2">Kategori</div>
                        <div className="col-span-2">Durum</div>
                        <div className="col-span-1">Yıl</div>
                        <div className="col-span-2 text-right">İşlemler</div>
                    </div>

                    <div className="flex flex-col gap-2">
                        {projects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="grid grid-cols-12 items-center px-8 py-6 border border-border-brand bg-surface hover:bg-foreground/[0.02] hover:border-foreground/10 transition-all group"
                            >
                                <div className="col-span-1 px-4">
                                    <div className="relative size-12 grayscale group-hover:grayscale-0 transition-all duration-500 overflow-hidden">
                                        <Image src={project.image} alt={project.title} fill className="object-cover" />
                                    </div>
                                </div>

                                <div className="col-span-4 flex flex-col gap-1">
                                    <h4 className="text-sm font-black uppercase tracking-tighter">{project.title}</h4>
                                    <div className="flex items-center gap-2 text-[10px] font-medium text-text-secondary uppercase tracking-widest">
                                        <MapPin size={10} /> {project.location}
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-60 italic">{project.category}</span>
                                </div>

                                <div className="col-span-2">
                                    <span className={`text-[9px] font-black px-3 py-1 uppercase tracking-widest ${project.status === "Tamamlandı" ? "bg-foreground text-background" : "border border-border-brand text-foreground"}`}>
                                        {project.status}
                                    </span>
                                </div>

                                <div className="col-span-1">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-60">{project.year}</span>
                                </div>

                                <div className="col-span-2 flex items-center justify-end gap-2">
                                    <button title="Görüntüle" className="size-10 flex items-center justify-center border border-border-brand text-text-secondary hover:text-foreground hover:border-foreground/20 transition-all">
                                        <Eye size={14} />
                                    </button>
                                    <button title="Düzenle" className="size-10 flex items-center justify-center border border-border-brand text-text-secondary hover:text-foreground hover:border-foreground/20 transition-all">
                                        <Edit2 size={14} />
                                    </button>
                                    <button title="Sil" className="size-10 flex items-center justify-center border border-border-brand text-text-secondary/50 hover:text-red-500 hover:border-red-500/20 transition-all">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 flex justify-center">
                        <button className="text-[9px] font-black uppercase tracking-[0.4em] text-text-secondary/40 hover:text-foreground transition-colors flex items-center gap-3">
                            Daha Fazla Göster <MoreVertical size={14} />
                        </button>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}
