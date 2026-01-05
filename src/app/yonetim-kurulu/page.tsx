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
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Organizasyon</h3>
                        <p className="text-sm font-bold uppercase tracking-widest text-slate-700">Yönetici Kadrosu Yönetimi</p>
                    </div>

                    <button
                        onClick={() => {
                            setEditingMember(null);
                            setIsModalOpen(true);
                        }}
                        className="btn-primary"
                    >
                        <UserPlus size={16} className="mr-3" /> Yeni Üye Ekle
                    </button>
                </div>

                {/* Members Grid */}
                <div className="min-h-[400px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center gap-4 text-text-secondary py-20">
                            <Loader2 className="animate-spin" size={32} />
                            <p className="text-[10px] font-bold uppercase tracking-widest">Kadro Yükleniyor...</p>
                        </div>
                    ) : members.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-4 text-text-secondary py-20 border border-dashed border-border-brand rounded-3xl">
                            <p className="text-[10px] font-bold uppercase tracking-widest">Üye Bulunamadı</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence mode="popLayout">
                                {members.map((member) => (
                                    <motion.div
                                        key={member.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className={`relative overflow-hidden border rounded-3xl transition-all hover:shadow-xl ${member.is_leader ? 'border-primary/20 bg-primary/5' : 'border-border-brand bg-white'} group`}
                                    >
                                        <div className="flex flex-col aspect-[4/5] relative bg-slate-50">
                                            {member.image_url ? (
                                                <Image src={member.image_url} alt={member.name} fill className="object-cover transition-all duration-1000" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[10px] font-bold opacity-10">FOTOĞRAF YOK</div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />

                                            <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-1">
                                                <h4 className="text-xl font-bold uppercase tracking-tight text-slate-700 leading-none">{member.name}</h4>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-primary italic">{member.role}</p>
                                            </div>
                                        </div>

                                        <div className="p-8 border-t border-border-brand bg-white/40 backdrop-blur-sm flex flex-col gap-6">
                                            <p className="text-[10px] font-medium leading-relaxed text-slate-500 uppercase tracking-widest line-clamp-2 italic">
                                                "{member.bio || 'Biyografi belirtilmemiş.'}"
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <div className="flex gap-4">
                                                    <button className="text-slate-400 hover:text-primary transition-colors"><Mail size={16} /></button>
                                                    <button className="text-slate-400 hover:text-primary transition-colors"><Linkedin size={16} /></button>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setEditingMember(member);
                                                            setIsModalOpen(true);
                                                        }}
                                                        className="size-10 flex items-center justify-center border border-border-brand text-slate-400 hover:text-primary hover:border-primary/20 transition-all rounded-lg"
                                                    >
                                                        <Edit2 size={12} />
                                                    </button>
                                                    <button
                                                        onClick={() => member.id && handleDelete(member.id)}
                                                        className="size-10 flex items-center justify-center border border-border-brand text-slate-300 hover:text-red-500 hover:border-red-500/20 transition-all rounded-lg"
                                                    >
                                                        <Trash2 size={12} />
                                                    </button>
                                                </div>
                                            </div>
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
