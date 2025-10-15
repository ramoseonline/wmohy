import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export default function Dashboard() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "ar");
  }, []);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  async function signOut() {
    const supabase = getSupabase();
    await supabase?.auth.signOut();
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 via-background to-secondary/10">
      <div className="container mx-auto py-10">
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="الشعار" className="h-10 w-auto" />
          </div>
          <div className="flex items-center gap-3">
            {isSupabaseConfigured() && (
              <Button variant="secondary" onClick={signOut}>تسجيل الخروج</Button>
            )}
          </div>
        </header>
        <main className="py-16 text-center">
          <h1 className="text-3xl font-extrabold text-primary mb-3">مرحباً بك في لوحة الإدارة</h1>
          <p className="text-lg">{email ? `تم تسجيل الدخول كـ ${email}` : "قم بتوصيل Supabase لإكمال تجربة الدخول"}</p>
        </main>
      </div>
    </div>
  );
}
