"use client";

import DashboardLayout from "@/components/DashboardLayout";
import {
    UserPlus,
    Edit2,
    Trash2,
    Star,
    Mail,
    Linkedin,
    GripHorizontal,
    Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import TeamModal from "@/components/TeamModal";

interface TeamMember {
    id?: string;
    name: string;
    role: string;
    bio?: string;
    image_url?: string;
    is_leader: boolean;
    order_index?: number;
}

export default function ManagementBoardAdminPage() {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("team")
            .select("*")
            .order("order_index", { ascending: true });

        if (error) {
            console.error("Error fetching team:", error);
        } else {
            setMembers(data || []);
        }
        setLoading(false);
    };

    const handleSave = async (memberData: TeamMember) => {
        const { id, ...data } = memberData;

        let error;
        if (id) {
            const { error: updateError } = await supabase
                .from("team")
                .update(data)
                .eq("id", id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from("team")
                .insert([data]);
            error = insertError;
        }

        if (error) {
            alert("Hata oluştu: " + error.message);
            throw error;
        } else {
            fetchMembers();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu üyeyi silmek istediğinize emin misiniz?")) return;

        const { error } = await supabase
            .from("team")
            .delete()
            .eq("id", id);

        if (error) {
            alert("Silme hatası: " + error.message);
        } else {
            setMembers(members.filter(m => m.id !== id));
        }
    };

    return (
        <DashboardLayout title="Yönetim Kurulu">
            <div className="flex flex-col gap-10">

                {/* Actions Bar */}
                <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-b border-border-brand pb-10">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary">Organizasyon</h3>
                        <p className="text-sm font-black uppercase tracking-tighter text-foreground">Yönetici Kadrosu Yönetimi</p>
                    </div>

                    <button
                        onClick={() => {
                            setEditingMember(null);
                            setIsModalOpen(true);
                        }}
                        className="btn-primary h-16 shrink-0"
                    >
                        <UserPlus size={16} className="mr-3" /> Yeni Üye Ekle
                    </button>
                </div>

                {/* Members Grid */}
                <div className="min-h-[400px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center gap-4 text-text-secondary py-20">
                            <Loader2 className="animate-spin" size={32} />
                            <p className="text-[10px] font-black uppercase tracking-[0.5em]">Kadro Yükleniyor...</p>
                        </div>
                    ) : members.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-4 text-text-secondary py-20 border border-dashed border-border-brand">
                            <p className="text-[10px] font-black uppercase tracking-[0.5em]">Üye Bulunamadı</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence mode="popLayout">
                                {members.map((member, idx) => (
                                    <motion.div
                                        key={member.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className={`relative overflow-hidden border ${member.is_leader ? 'border-primary/20 bg-foreground/[0.03]' : 'border-border-brand bg-surface'} group`}
                                    >
                                        {/* Leader Badge */}
                                        {member.is_leader && (
                                            <div className="absolute top-0 right-0 p-4 z-10">
                                                <Star size={16} className="text-foreground fill-current" />
                                            </div>
                                        )}

                                        <div className="flex flex-col aspect-[4/5] relative bg-foreground/5">
                                            {member.image_url ? (
                                                <Image src={member.image_url} alt={member.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[10px] font-black opacity-10">FOTOĞRAF YOK</div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                                            <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-1">
                                                <h4 className="text-xl font-black uppercase tracking-tighter leading-none">{member.name}</h4>
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary italic">{member.role}</p>
                                            </div>
                                        </div>

                                        <div className="p-8 border-t border-border-brand bg-surface/40 backdrop-blur-sm flex flex-col gap-6">
                                            <p className="text-[10px] font-medium leading-relaxed text-text-secondary uppercase tracking-widest line-clamp-2 italic">
                                                "{member.bio || 'Biyografi belirtilmemiş.'}"
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <div className="flex gap-4">
                                                    <button className="text-text-secondary hover:text-foreground transition-colors"><Mail size={16} /></button>
                                                    <button className="text-text-secondary hover:text-foreground transition-colors"><Linkedin size={16} /></button>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setEditingMember(member);
                                                            setIsModalOpen(true);
                                                        }}
                                                        title="Düzenle"
                                                        className="size-10 flex items-center justify-center border border-border-brand text-text-secondary hover:text-foreground hover:border-foreground/20 transition-all bg-foreground/5"
                                                    >
                                                        <Edit2 size={12} />
                                                    </button>
                                                    <button
                                                        onClick={() => member.id && handleDelete(member.id)}
                                                        title="Sil"
                                                        className="size-10 flex items-center justify-center border border-border-brand text-text-secondary/30 hover:text-red-500 hover:border-red-500/20 transition-all bg-foreground/5"
                                                    >
                                                        <Trash2 size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="absolute top-4 left-4 size-8 border border-border-brand flex items-center justify-center text-text-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
                                            <GripHorizontal size={14} />
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

            </div>

            <TeamModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                editingMember={editingMember}
            />
        </DashboardLayout>
    );
}
