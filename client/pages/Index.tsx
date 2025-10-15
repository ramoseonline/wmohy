import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "@/components/auth/AuthShell";
import { getSupabase } from "@/lib/supabase";

export default function Index() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "ar");
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = getSupabase();
      if (!supabase) {
        setError("خدمة المصادقة غير مهيأة.");
        return;
      }
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setError(err?.message || "حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="لوحة إدارة المعلمين"
      subtitle="سجّل دخولك للوصول إلى لوحة التحكم. التسجيل متاح للمعلمين فقط مع تأكيد البريد."
    >
      <Card className="shadow-xl border-accent">
        <CardHeader>
          <CardTitle className="text-2xl">تسجيل الدخول للمعلمين</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="mb-4 rounded-md border border-destructive bg-destructive/10 p-3 text-sm">
              {error}
            </div>
          ) : null}
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                inputMode="email"
                required
                placeholder="name@example.com"
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
            <div className="flex items-center justify-between">
              <Link
                to="/reset-password"
                className="text-sm text-primary underline-offset-4 hover:underline"
              >
                نسيت كلمة المرور؟
              </Link>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "جارٍ التحقق..." : "تسجيل الدخول"}
            </Button>
            <p className="text-center text-sm">
              ليس لديك حساب؟{" "}
              <Link
                to="/register"
                className="text-primary underline-offset-4 hover:underline"
              >
                إنشاء حساب للمعلمين
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </AuthShell>
  );
}
