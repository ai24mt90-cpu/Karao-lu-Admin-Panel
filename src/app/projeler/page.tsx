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
    MapPin,
    Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import ProjectModal from "@/components/ProjectModal";

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

export default function ProjectsAdminPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching projects:", error);
        } else {
            setProjects(data || []);
        }
        setLoading(false);
    };

    const handleSave = async (projectData: Project) => {
        const { id, ...data } = projectData;

        let error;
        if (id) {
            const { error: updateError } = await supabase
                .from("projects")
                .update(data)
                .eq("id", id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from("projects")
                .insert([data]);
            error = insertError;
        }

        if (error) {
            alert("Hata oluştu: " + error.message);
            throw error;
        } else {
            fetchProjects();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu projeyi silmek istediğinize emin misiniz?")) return;

        const { error } = await supabase
            .from("projects")
            .delete()
            .eq("id", id);

        if (error) {
            alert("Silme hatası: " + error.message);
        } else {
            setProjects(projects.filter(p => p.id !== id));
        }
    };

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-field uppercase"
                        />
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <button className="btn-outline flex-1 md:flex-none">
                            <Filter size={14} className="mr-3" /> Filtrele
                        </button>
                        <button
                            onClick={() => {
                                setEditingProject(null);
                                setIsModalOpen(true);
                            }}
                            className="btn-primary flex-1 md:flex-none"
                        >
                            <Plus size={16} className="mr-3" /> Yeni Proje Ekle
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

                    <div className="flex flex-col gap-2 min-h-[400px]">
                        {loading ? (
                            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-text-secondary py-20">
                                <Loader2 className="animate-spin" size={32} />
                                <p className="text-[10px] font-black uppercase tracking-[0.5em]">Projeler Yükleniyor...</p>
                            </div>
                        ) : filteredProjects.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-text-secondary py-20 border border-dashed border-border-brand">
                                <p className="text-[10px] font-black uppercase tracking-[0.5em]">Proje Bulunamadı</p>
                            </div>
                        ) : (
                            <AnimatePresence mode="popLayout">
                                {filteredProjects.map((project, idx) => (
                                    <motion.div
                                        key={project.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="grid grid-cols-12 items-center px-8 py-6 border border-border-brand bg-surface hover:bg-foreground/[0.02] hover:border-foreground/10 transition-all group"
                                    >
                                        <div className="col-span-1 px-4">
                                            <div className="relative size-12 grayscale group-hover:grayscale-0 transition-all duration-500 overflow-hidden bg-foreground/5">
                                                {project.image_url ? (
                                                    <Image src={project.image_url} alt={project.title} fill className="object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[8px] font-black opacity-20">NO IMG</div>
                                                )}
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
                                            <button
                                                onClick={() => {
                                                    setEditingProject(project);
                                                    setIsModalOpen(true);
                                                }}
                                                title="Düzenle"
                                                className="size-10 flex items-center justify-center border border-border-brand text-text-secondary hover:text-foreground hover:border-foreground/20 transition-all"
                                            >
                                                <Edit2 size={14} />
                                            </button>
                                            <button
                                                onClick={() => project.id && handleDelete(project.id)}
                                                title="Sil"
                                                className="size-10 flex items-center justify-center border border-border-brand text-text-secondary/50 hover:text-red-500 hover:border-red-500/20 transition-all"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                    </div>

                    {!loading && filteredProjects.length > 0 && (
                        <div className="mt-12 flex justify-center">
                            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-text-secondary/40">
                                Toplam {filteredProjects.length} Proje Listeleniyor
                            </p>
                        </div>
                    )}
                </div>

            </div>

            <ProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                editingProject={editingProject}
            />
        </DashboardLayout>
    );
}
