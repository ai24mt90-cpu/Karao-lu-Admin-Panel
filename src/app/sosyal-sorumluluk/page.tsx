"use client";

import DashboardLayout from "@/components/DashboardLayout";
import {
    Plus,
    Edit2,
    Trash2,
    Eye,
    Globe,
    Trophy,
    School,
    Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import SocialModal from "@/components/SocialModal";

interface SocialProgram {
    id?: string;
    title: string;
    category: string;
    location?: string;
    date?: string;
    image_url?: string;
    description?: string;
    icon_type?: string;
}

export default function SocialResponsibilityAdminPage() {
    const [programs, setPrograms] = useState<SocialProgram[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("TÜMÜ");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProgram, setEditingProgram] = useState<SocialProgram | null>(null);

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("social_responsibility")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching social programs:", error);
        } else {
            setPrograms(data || []);
        }
        setLoading(false);
    };

    const handleSave = async (programData: SocialProgram) => {
        const { id, ...data } = programData;

        let error;
        if (id) {
            const { error: updateError } = await supabase
                .from("social_responsibility")
                .update(data)
                .eq("id", id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from("social_responsibility")
                .insert([data]);
            error = insertError;
        }

        if (error) {
            alert("Hata oluştu: " + error.message);
            throw error;
        } else {
            fetchPrograms();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu programı silmek istediğinize emin misiniz?")) return;

        const { error } = await supabase
            .from("social_responsibility")
            .delete()
            .eq("id", id);

        if (error) {
            alert("Silme hatası: " + error.message);
        } else {
            setPrograms(programs.filter(p => p.id !== id));
        }
    };

    const filteredPrograms = programs.filter(p =>
        activeCategory === "TÜMÜ" || p.category.toUpperCase() === activeCategory
    );

    const getIcon = (type?: string) => {
        switch (type) {
            case 'school': return <School size={16} />;
            case 'trophy': return <Trophy size={16} />;
            case 'globe': return <Globe size={16} />;
            default: return <Globe size={16} />;
        }
    };

    return (
        <DashboardLayout title="Sosyal Sorumluluk Yönetimi">
            <div className="flex flex-col gap-10">

                {/* Actions Bar */}
                <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-b border-border-brand pb-10">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary">Yönetim</h3>
                        <p className="text-sm font-black uppercase tracking-tighter text-foreground">Program ve Bağış Listesi</p>
                    </div>

                    <button
                        onClick={() => {
                            setEditingProgram(null);
                            setIsModalOpen(true);
                        }}
                        className="btn-primary h-16 shrink-0"
                    >
                        <Plus size={16} className="mr-3" /> Yeni Program Ekle
                    </button>
                </div>

                {/* Categories Quick Filter */}
                <div className="flex gap-4 overflow-x-auto pb-4">
                    {["TÜMÜ", "EĞİTİM", "SPOR", "TOPLUMSAL KATKI"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`h-12 px-8 text-[9px] font-black uppercase tracking-[0.2em] border transition-all ${activeCategory === cat ? "bg-foreground text-background border-foreground" : "border-border-brand text-text-secondary hover:text-foreground"}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* List View */}
                <div className="flex flex-col gap-4 min-h-[400px]">
                    {loading ? (
                        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-text-secondary py-20">
                            <Loader2 className="animate-spin" size={32} />
                            <p className="text-[10px] font-black uppercase tracking-[0.5em]">Programlar Yükleniyor...</p>
                        </div>
                    ) : filteredPrograms.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-text-secondary py-20 border border-dashed border-border-brand">
                            <p className="text-[10px] font-black uppercase tracking-[0.5em]">Program Bulunamadı</p>
                        </div>
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {filteredPrograms.map((program, idx) => (
                                <motion.div
                                    key={program.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="p-8 border border-border-brand bg-surface hover:bg-foreground/[0.02] hover:border-foreground/10 transition-all flex flex-col md:flex-row items-center gap-10 group"
                                >
                                    <div className="relative size-24 shrink-0 grayscale group-hover:grayscale-0 transition-all duration-700 overflow-hidden bg-foreground/5">
                                        {program.image_url ? (
                                            <Image src={program.image_url} alt={program.title} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[8px] font-black opacity-10">NO IMG</div>
                                        )}
                                    </div>

                                    <div className="flex-1 flex flex-col gap-2">
                                        <div className="flex items-center gap-3 text-text-secondary italic text-[10px] font-black uppercase tracking-widest opacity-40">
                                            {getIcon(program.icon_type)} {program.category}
                                        </div>
                                        <h4 className="text-xl font-black uppercase tracking-tighter">{program.title}</h4>
                                        <div className="flex gap-6 mt-2">
                                            <div className="text-[9px] font-black uppercase tracking-[0.4em] text-text-secondary">Konum: <span className="text-foreground">{program.location || 'BELİRTİLMEMİŞ'}</span></div>
                                            <div className="text-[9px] font-black uppercase tracking-[0.4em] text-text-secondary">Tarih: <span className="text-foreground">{program.date || 'BELİRTİLMEMİŞ'}</span></div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => {
                                                setEditingProgram(program);
                                                setIsModalOpen(true);
                                            }}
                                            title="Düzenle"
                                            className="size-12 flex items-center justify-center border border-border-brand text-text-secondary hover:text-foreground hover:border-foreground/20 transition-all"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => program.id && handleDelete(program.id)}
                                            title="Sil"
                                            className="size-12 flex items-center justify-center border border-border-brand text-text-secondary/50 hover:text-red-500 hover:border-red-500/20 transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </div>

            </div>

            <SocialModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                editingProgram={editingProgram}
            />
        </DashboardLayout>
    );
}
