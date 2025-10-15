import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AuthShell from "@/components/auth/AuthShell";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "ar");
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setNotice(
        "لتفعيل عملية التسجيل وإرسال رابط التفعيل عبر البريد، يرجى توصيل Supabase عبر MCP.",
      );
    } else {
      setNotice(null);
    }
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const supabase = getSupabase();
      if (!supabase) {
        setError("الاعتماد غير مهيأ. يرجى توصيل Supabase.");
        return;
      }
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: { name },
        },
      });
      if (error) throw error;
      setSuccess(
        "تم إنشاء الحساب. يرجى التحقق من بريدك الإلكتروني لتفعيل الحساب.",
      );
    } catch (err: any) {
      setError(err?.message || "حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="إنشاء حساب معلم"
      subtitle="أدخل بياناتك للتسجيل وسيتم ��رسال رابط التفعيل إلى بريدك"
    >
      <Card className="shadow-xl border-accent">
        <CardHeader>
          <CardTitle className="text-2xl">تسجيل حساب جديد</CardTitle>
        </CardHeader>
        <CardContent>
          {notice ? (
            <div className="mb-4 rounded-md border border-accent bg-accent/10 p-3 text-sm">
              {notice}
            </div>
          ) : null}
          {error ? (
            <div className="mb-4 rounded-md border border-destructive bg-destructive/10 p-3 text-sm">
              {error}
            </div>
          ) : null}
          {success ? (
            <div className="mb-4 rounded-md border border-primary bg-primary/10 p-3 text-sm">
              {success}
            </div>
          ) : null}
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">الاسم الكامل</Label>
              <Input
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                inputMode="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "جارٍ الإرسال..." : "إنشاء الحساب"}
            </Button>
            <p className="text-center text-sm">
              لديك حساب بالفعل؟{" "}
              <Link
                to="/"
                className="text-primary underline-offset-4 hover:underline"
              >
                تسجيل الدخول
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </AuthShell>
  );
}
