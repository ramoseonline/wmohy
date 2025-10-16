import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AuthShell from "@/components/auth/AuthShell";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "ar");
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const res = await fetch("/api/email/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          subject: "استعادة كلمة المرور",
          message: "رابط استعادة كلمة المرور الخاص بك",
        }),
      });
      if (!res.ok) throw new Error("تعذر إرسال البريد");
      setSuccess("تم إرسال رسالة إلى بريدك الإلكتروني.");
    } catch (err: any) {
      setError(err?.message || "حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="استعادة كلمة المرور"
      subtitle="أدخل بريدك الإلكتروني وسنرسل رابط الاستعادة"
    >
      <Card className="shadow-xl border-accent">
        <CardHeader>
          <CardTitle className="text-2xl">نسيت كلمة المرور</CardTitle>
        </CardHeader>
        <CardContent>
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
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "جارٍ الإرسال..." : "إرسال رابط الاستعادة"}
            </Button>
            <p className="text-center text-sm">
              تذكرت كلمة المرور؟{" "}
              <Link
                to="/"
                className="text-primary underline-offset-4 hover:underline"
              >
                العودة لتسجيل الدخول
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </AuthShell>
  );
}
