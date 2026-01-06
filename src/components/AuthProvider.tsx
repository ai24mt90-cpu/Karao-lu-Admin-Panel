"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

interface AuthProviderProps {
    children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (session) {
                    setAuthenticated(true);
                    if (pathname === "/login") {
                        router.push("/");
                    }
                } else {
                    setAuthenticated(false);
                    if (pathname !== "/login") {
                        router.push("/login");
                    }
                }
            } catch (error) {
                console.error("Auth check error:", error);
                if (pathname !== "/login") {
                    router.push("/login");
                }
            } finally {
                setLoading(false);
            }
        };

        checkAuth();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_OUT") {
                setAuthenticated(false);
                router.push("/login");
            } else if (event === "SIGNED_IN" && session) {
                setAuthenticated(true);
                if (pathname === "/login") {
                    router.push("/");
                }
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [pathname, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <Loader2 className="animate-spin text-primary mx-auto mb-4" size={40} />
                    <p className="text-slate-500 text-sm">Yükleniyor...</p>
                </div>
            </div>
        );
    }

    // If on login page, always show children (login form)
    if (pathname === "/login") {
        return <>{children}</>;
    }

    // If authenticated, show children
    if (authenticated) {
        return <>{children}</>;
    }

    // If not authenticated and not on login, show loading (redirect happening)
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="text-center">
                <Loader2 className="animate-spin text-primary mx-auto mb-4" size={40} />
                <p className="text-slate-500 text-sm">Yönlendiriliyor...</p>
            </div>
        </div>
    );
}
