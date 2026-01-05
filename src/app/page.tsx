"use client";

import DashboardLayout from "@/components/DashboardLayout";
import {
  Building2,
  Users,
  School,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Plus,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Stat {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}

interface Project {
  id: string;
  title: string;
  location: string;
  status: string;
  image_url?: string;
  year: string;
}

export default function OverviewPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch stats
      const { count: projectCount } = await supabase.from("projects").select("*", { count: 'exact', head: true });
      const { count: teamCount } = await supabase.from("team").select("*", { count: 'exact', head: true });
      const { count: schoolCount } = await supabase.from("social_responsibility").select("*", { count: 'exact', head: true }).eq('category', 'Eğitim');

      setStats([
        { label: "Aktif Projeler", value: (projectCount || 0).toString(), icon: <Building2 />, trend: "Güncel" },
        { label: "Yönetici Kadrosu", value: (teamCount || 0).toString(), icon: <Users />, trend: "Aktif" },
        { label: "Eğitim Yatırımları", value: (schoolCount || 0).toString(), icon: <School />, trend: "Bağış" },
      ]);

      // Fetch recent projects
      const { data: projects } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      setRecentProjects(projects || []);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Genel Bakış">
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-text-secondary">
          <Loader2 className="animate-spin" size={32} />
          <p className="text-[10px] font-black uppercase tracking-[0.5em]">Veriler Hazırlanıyor...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Genel Bakış">
      <div className="flex flex-col gap-12">

        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Hoş Geldiniz</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary leading-loose">
              Karaoğlu Universal Mühendislik <br /> <span className="text-foreground">Dijital Yönetim Merkezi</span>
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/projeler" className="btn-primary gap-3">
              <Plus size={14} /> Yeni İçerik
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="p-10 border border-border-brand bg-surface flex flex-col gap-8 group hover:border-foreground/10 transition-all">
              <div className="flex justify-between items-start">
                <div className="text-text-secondary group-hover:text-foreground transition-colors">{stat.icon}</div>
                <div className="text-[8px] font-black text-text-secondary/60 border border-border-brand px-2 py-1 uppercase tracking-widest">{stat.trend}</div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-text-secondary">{stat.label}</span>
                <span className="text-5xl font-black tracking-tighter">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Projects Column */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="flex items-center justify-between border-b border-border-brand pb-6">
              <h2 className="text-lg font-black uppercase tracking-[0.4em]">Son Projeler</h2>
              <Link href="/projeler" className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary hover:text-foreground transition-colors">Tümünü Yönet</Link>
            </div>

            <div className="flex flex-col gap-4">
              {recentProjects.length === 0 ? (
                <div className="p-10 border border-dashed border-border-brand text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Henüz proje eklenmemiş</p>
                </div>
              ) : (
                recentProjects.map((project) => (
                  <div key={project.id} className="group p-6 border border-border-brand bg-surface hover:border-foreground/20 flex items-center gap-8 transition-all">
                    <div className="relative size-20 shrink-0 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 bg-foreground/5">
                      {project.image_url && <Image src={project.image_url} alt={project.title} fill className="object-cover" />}
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[8px] font-black text-text-secondary/40 uppercase tracking-[0.4em] block mb-1">{project.location}</span>
                          <h4 className="text-lg font-black uppercase tracking-tighter">{project.title}</h4>
                        </div>
                        <span className={`text-[8px] font-black px-2 py-1 uppercase tracking-widest ${project.status === "Tamamlandı" ? "bg-foreground text-background" : "border border-border-brand text-foreground"}`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                    <Link href="/projeler" className="size-10 flex items-center justify-center text-text-secondary/40 group-hover:text-foreground transition-colors border border-border-brand">
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>
                )
                ))}
            </div>
          </div>

          {/* Static Activity for now until an activity logging system is implemented */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between border-b border-border-brand pb-6">
              <h2 className="text-lg font-black uppercase tracking-[0.4em]">Aktivite</h2>
            </div>

            <div className="flex flex-col gap-8 opacity-50">
              <div className="flex gap-6 relative">
                <div className="absolute left-[9px] top-6 h-10 w-[1px] bg-border-brand" />
                <div className="size-[19px] rounded-none border border-border-brand bg-surface shrink-0 mt-1 flex items-center justify-center">
                  <Clock size={8} className="text-text-secondary" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-text-secondary/40">Şimdi</span>
                  <p className="text-[10px] font-black uppercase tracking-widest">Sistem Hazır</p>
                  <p className="text-[10px] font-medium text-text-secondary uppercase tracking-widest">Tüm veriler Supabase ile bağlandı</p>
                </div>
              </div>
            </div>

            <div className="mt-auto p-10 border border-border-brand bg-surface flex flex-col items-center text-center gap-6">
              <TrendingUp className="text-text-secondary/40" size={32} />
              <p className="text-[9px] font-black uppercase tracking-[0.4em] leading-loose text-text-secondary">
                Veritabanı bağlantısı <br /> <span className="text-foreground">Aktif ve Güvenli</span>
              </p>
              <button className="btn-outline h-12 w-full text-[9px]">Sistem Durumu</button>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
