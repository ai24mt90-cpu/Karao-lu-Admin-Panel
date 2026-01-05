"use client";

import { X, Save, Loader2, Globe, Trophy, School } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageUpload from "./ImageUpload";

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

interface SocialModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (program: SocialProgram) => Promise<void>;
    editingProgram: SocialProgram | null;
}

const categories = [
    { label: "Eğitim", value: "Eğitim", icon: "school" },
    { label: "Spor", value: "Spor", icon: "trophy" },
    { label: "Toplumsal Katkı", value: "Toplumsal Katkı", icon: "globe" }
];

export default function SocialModal({ isOpen, onClose, onSave, editingProgram }: SocialModalProps) {
    const [formData, setFormData] = useState<SocialProgram>({
        title: "",
        category: "Eğitim",
        location: "",
        date: "",
        description: "",
        icon_type: "school"
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editingProgram) {
            setFormData(editingProgram);
        } else {
            setFormData({
                title: "",
                category: "Eğitim",
                location: "",
                date: "",
                description: "",
                icon_type: "school"
            });
        }
    }, [editingProgram, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error("Save error:", error);
        } finally {
            setLoading(false);
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'school': return <School size={18} />;
            case 'trophy': return <Trophy size={18} />;
            case 'globe': return <Globe size={18} />;
            default: return <Globe size={18} />;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/10 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-surface border border-border-brand p-10 shadow-2xl overflow-y-auto max-h-[90vh]"
                    >
                        <div className="flex justify-between items-start mb-10">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                                    {editingProgram ? "Programı Düzenle" : "Yeni Program Ekle"}
                                </h3>
                                <p className="text-xl font-bold text-slate-700 tracking-tight">Sosyal Sorumluluk Detayları</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="size-10 flex items-center justify-center border border-border-brand hover:bg-slate-50 transition-all rounded-lg text-slate-400 hover:text-slate-600"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                            {/* Title */}
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">Program Adı</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="input-field uppercase"
                                    placeholder="ÖRN: ANADOLU LİSESİ BAĞIŞI"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Category */}
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">Kategori & İkon</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => {
                                            const cat = categories.find(c => c.value === e.target.value);
                                            setFormData({
                                                ...formData,
                                                category: e.target.value,
                                                icon_type: cat?.icon || "globe"
                                            });
                                        }}
                                        className="input-field"
                                    >
                                        {categories.map(cat => <option key={cat.value} value={cat.value}>{cat.label.toUpperCase()}</option>)}
                                    </select>
                                </div>

                                {/* Date/Year */}
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">Tarih / Durum</label>
                                    <input
                                        type="text"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="input-field uppercase"
                                        placeholder="ÖRN: 2023 VEYA DEVAM EDİYOR"
                                    />
                                </div>

                                {/* Location */}
                                <div className="flex flex-col gap-3 md:col-span-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">Konum</label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="input-field uppercase"
                                        placeholder="ÖRN: SİVAS VEYA TÜRKİYE GENELİ"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">Açıklama</label>
                                <textarea
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="input-field resize-none h-32 uppercase"
                                    placeholder="PROGRAM HAKKINDA DETAYLI BİLGİ..."
                                />
                            </div>

                            {/* Image Upload */}
                            <ImageUpload
                                value={formData.image_url}
                                onChange={(url) => setFormData({ ...formData, image_url: url })}
                                label="Program Görseli"
                            />

                            <div className="flex gap-4 mt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="btn-outline flex-1 border-border-brand"
                                >
                                    Vazgeç
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary flex-1 gap-3"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={16} /> : <><Save size={16} /> Kaydet</>}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
