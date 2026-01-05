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
          <p className="text-[10px] font-bold uppercase tracking-[0.5em]">Veriler Hazırlanıyor...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Genel Bakış">
      <div className="flex flex-col gap-10">

        {/* Welcome Section - Professional Crystal */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-2">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-slate-700 tracking-tight">Hoş Geldiniz, Admin</h1>
            <p className="text-sm font-medium text-slate-500">
              Karaoğlu Universal Mühendislik <span className="mx-2 text-slate-300">|</span> <span className="text-primary font-semibold">Sistem Yönetim Merkezi</span>
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/projeler" className="btn-primary">
              <Plus size={16} /> Yeni İçerik Ekle
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="card-premium rounded-3xl flex flex-col gap-8 group">
              <div className="flex justify-between items-start">
                <div className="size-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">{stat.icon}</div>
                <div className="text-[10px] font-bold text-text-secondary/60 bg-surface px-3 py-1 rounded-full uppercase tracking-widest">{stat.trend}</div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-text-secondary">{stat.label}</span>
                <span className="text-5xl font-bold text-slate-700 tracking-tighter">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Projects Column */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="flex items-center justify-between border-b border-border-brand pb-6">
              <h2 className="text-lg font-bold uppercase tracking-widest text-slate-700">Son Projeler</h2>
              <Link href="/projeler" className="text-[10px] font-bold uppercase tracking-widest text-text-secondary hover:text-primary transition-colors">Tümünü Yönet</Link>
            </div>

            <div className="flex flex-col gap-4">
              {recentProjects.length === 0 ? (
                <div className="p-10 border border-dashed border-border-brand rounded-2xl text-center bg-surface/50">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-text-secondary">Henüz proje eklenmemiş</p>
                </div>
              ) : (
                recentProjects.map((project) => (
                  <div key={project.id} className="group p-5 bg-white rounded-2xl shadow-sm hover:shadow-md border border-transparent hover:border-primary/10 flex items-center gap-6 transition-all duration-300">
                    <div className="relative size-20 shrink-0 rounded-xl overflow-hidden shadow-inner bg-surface">
                      {project.image_url && <Image src={project.image_url} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />}
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-1">{project.location}</span>
                          <h4 className="text-lg font-bold text-slate-700 tracking-tight">{project.title}</h4>
                        </div>
                        <span className={`text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${project.status === "Tamamlandı" ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-orange-50 text-orange-600 border border-orange-100"}`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                    <Link href="/projeler" className="size-11 rounded-xl bg-surface flex items-center justify-center text-text-secondary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
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
              <h2 className="text-lg font-bold uppercase tracking-widest text-slate-700">Aktivite</h2>
            </div>

            <div className="flex flex-col gap-8 opacity-50">
              <div className="flex gap-6 relative">
                <div className="absolute left-[9px] top-6 h-10 w-[1px] bg-border-brand" />
                <div className="size-[19px] rounded-none border border-border-brand bg-surface shrink-0 mt-1 flex items-center justify-center">
                  <Clock size={8} className="text-text-secondary" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-text-secondary/40">Şimdi</span>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-700">Sistem Hazır</p>
                  <p className="text-[10px] font-medium text-text-secondary uppercase tracking-widest">Tüm veriler Supabase ile bağlandı</p>
                </div>
              </div>
            </div>

            <div className="mt-auto p-10 border border-border-brand bg-surface flex flex-col items-center text-center gap-6">
              <TrendingUp className="text-text-secondary/40" size={32} />
              <p className="text-[9px] font-bold uppercase tracking-[0.4em] leading-loose text-text-secondary">
                Veritabanı bağlantısı <br /> <span className="text-slate-700">Aktif ve Güvenli</span>
              </p>
              <button className="btn-outline h-12 w-full text-[9px]">Sistem Durumu</button>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
