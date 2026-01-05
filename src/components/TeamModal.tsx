"use client";

import { X, Save, Upload, Loader2, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TeamMember {
    id?: string;
    name: string;
    role: string;
    bio?: string;
    image_url?: string;
    is_leader: boolean;
    order_index?: number;
}

interface TeamModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (member: TeamMember) => Promise<void>;
    editingMember: TeamMember | null;
}

export default function TeamModal({ isOpen, onClose, onSave, editingMember }: TeamModalProps) {
    const [formData, setFormData] = useState<TeamMember>({
        name: "",
        role: "",
        bio: "",
        is_leader: false,
        order_index: 0
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editingMember) {
            setFormData(editingMember);
        } else {
            setFormData({
                name: "",
                role: "",
                bio: "",
                is_leader: false,
                order_index: 0
            });
        }
    }, [editingMember, isOpen]);

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
                        className="relative w-full max-w-xl bg-surface border border-border-brand p-10 shadow-2xl overflow-y-auto max-h-[90vh]"
                    >
                        <div className="flex justify-between items-start mb-10">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary">
                                    {editingMember ? "Üyeyi Düzenle" : "Yeni Üye Ekle"}
                                </h3>
                                <p className="text-xl font-black uppercase tracking-tighter">Yönetici Bilgileri</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="size-10 flex items-center justify-center border border-border-brand hover:border-foreground/20 transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                            {/* Name */}
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Ad Soyad</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="input-field uppercase"
                                    placeholder="ÖRN: MURAT KARAOĞLU"
                                />
                            </div>

                            {/* Role */}
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Pozisyon / Ünvan</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="input-field uppercase"
                                    placeholder="ÖRN: YÖNETİM KURULU BAŞKANI"
                                />
                            </div>

                            {/* Leader Switch & Order */}
                            <div className="grid grid-cols-2 gap-8">
                                <div className="flex items-center gap-4 h-14 px-6 border border-border-brand bg-surface">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary flex-1">Lider Statüsü</label>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, is_leader: !formData.is_leader })}
                                        className={`size-6 border flex items-center justify-center transition-all ${formData.is_leader ? 'bg-foreground border-foreground text-background' : 'border-border-brand text-text-secondary/20'}`}
                                    >
                                        <Star size={12} fill={formData.is_leader ? "currentColor" : "none"} />
                                    </button>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <input
                                        type="number"
                                        value={formData.order_index}
                                        onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                                        className="input-field"
                                        placeholder="SIRA"
                                    />
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Kısa Biyografi</label>
                                <textarea
                                    rows={4}
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    className="input-field resize-none h-32 uppercase italic"
                                    placeholder="YÖNETİCİ HAKKINDA BİLGİ..."
                                />
                            </div>

                            {/* Image URL */}
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Fotoğraf URL</label>
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
