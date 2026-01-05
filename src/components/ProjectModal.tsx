"use client";

import { X, Save, Upload, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
    id?: string;
    title: string;
    category: string;
    location: string;
    year: string;
    status: string;
    image_url?: string;
    description?: string;
}

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (project: Project) => Promise<void>;
    editingProject: Project | null;
}

const categories = ["Sağlık", "Eğitim", "Spor", "Altyapı", "Konut", "Endüstriyel"];
const statuses = ["Planlama", "Devam Ediyor", "Tamamlandı"];

export default function ProjectModal({ isOpen, onClose, onSave, editingProject }: ProjectModalProps) {
    const [formData, setFormData] = useState<Project>({
        title: "",
        category: "Altyapı",
        location: "",
        year: new Date().getFullYear().toString(),
        status: "Devam Ediyor",
        description: ""
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editingProject) {
            setFormData(editingProject);
        } else {
            setFormData({
                title: "",
                category: "Altyapı",
                location: "",
                year: new Date().getFullYear().toString(),
                status: "Devam Ediyor",
                description: ""
            });
        }
    }, [editingProject, isOpen]);

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

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-surface border border-border-brand p-10 shadow-2xl overflow-y-auto max-h-[90vh]"
                    >
                        <div className="flex justify-between items-start mb-10">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary">
                                    {editingProject ? "Projeyi Düzenle" : "Yeni Proje Ekle"}
                                </h3>
                                <p className="text-xl font-black uppercase tracking-tighter">Proje Detayları</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="size-10 flex items-center justify-center border border-border-brand hover:border-foreground/20 transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Title */}
                                <div className="flex flex-col gap-3 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Proje Başlığı</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="input-field uppercase"
                                        placeholder="ÖRN: ŞEHİR HASTANESİ A BLOK"
                                    />
                                </div>

                                {/* Category */}
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Kategori</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="input-field"
                                    >
                                        {categories.map(cat => <option key={cat} value={cat}>{cat.toUpperCase()}</option>)}
                                    </select>
                                </div>

                                {/* Status */}
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Durum</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="input-field"
                                    >
                                        {statuses.map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
                                    </select>
                                </div>

                                {/* Location */}
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Konum</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="input-field uppercase"
                                        placeholder="ŞEHİR ADI"
                                    />
                                </div>

                                {/* Year */}
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Yıl</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                        className="input-field"
                                        placeholder="2024"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Açıklama</label>
                                <textarea
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="input-field resize-none h-32 uppercase"
                                    placeholder="PROJE HAKKINDA TEKNİK DETAYLAR..."
                                />
                            </div>

                            {/* Image URL (Temporary until full storage setup) */}
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Görsel URL</label>
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        value={formData.image_url}
                                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                        className="input-field flex-1"
                                        placeholder="https://..."
                                    />
                                    <button type="button" className="size-14 shrink-0 flex items-center justify-center border border-border-brand hover:bg-foreground/5 text-text-secondary transition-all">
                                        <Upload size={18} />
                                    </button>
                                </div>
                            </div>

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
