"use client";

import { X, Save, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
    id?: string;
    question: string;
    answer: string;
    category: string;
    order_index?: number;
}

interface FAQModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (faq: FAQ) => Promise<void>;
    editingFaq: FAQ | null;
}

const categories = ["Genel", "Destek", "Teknik", "Burs", "Kariyer"];

export default function FAQModal({ isOpen, onClose, onSave, editingFaq }: FAQModalProps) {
    const [formData, setFormData] = useState<FAQ>({
        question: "",
        answer: "",
        category: "Genel",
        order_index: 0
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editingFaq) {
            setFormData(editingFaq);
        } else {
            setFormData({
                question: "",
                answer: "",
                category: "Genel",
                order_index: 0
            });
        }
    }, [editingFaq, isOpen]);

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
                                    {editingFaq ? "Maddeyi Düzenle" : "Yeni Madde Ekle"}
                                </h3>
                                <p className="text-xl font-black uppercase tracking-tighter">S.S.S. Detayları</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="size-10 flex items-center justify-center border border-border-brand hover:border-foreground/20 transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                            {/* Question */}
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Soru</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.question}
                                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                    className="input-field uppercase"
                                    placeholder="SORU METNİ..."
                                />
                            </div>

                            {/* Category & Order */}
                            <div className="grid grid-cols-2 gap-8">
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
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Sıralama</label>
                                    <input
                                        type="number"
                                        value={formData.order_index}
                                        onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                                        className="input-field"
                                    />
                                </div>
                            </div>

                            {/* Answer */}
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Cevap</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.answer}
                                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                    className="input-field resize-none h-40 uppercase italic"
                                    placeholder="CEVAP METNİ..."
                                />
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
