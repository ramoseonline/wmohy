import { cn } from "@/lib/utils";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 via-background to-secondary/10">
      <div className={cn("container mx-auto flex min-h-screen flex-col")}> 
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="شعار راموس أونلاين" className="h-10 w-auto" />
          </div>
        </header>
        <main className="flex flex-1 items-center justify-center py-8">
          <div className="grid w-full gap-8 md:grid-cols-2">
            <div className="order-2 md:order-1 flex items-center justify-center">
              <div className="w-full max-w-md">{children}</div>
            </div>
            <div className="order-1 md:order-2 hidden md:flex items-center justify-center">
              <div className="rounded-2xl bg-primary p-10 text-primary-foreground shadow-xl">
                <img src="/logo.svg" alt="الشعار" className="h-14 mb-6" />
                <h1 className="text-3xl font-extrabold mb-3">{title}</h1>
                {subtitle ? (
                  <p className="text-lg opacity-90 leading-relaxed">{subtitle}</p>
                ) : null}
              </div>
            </div>
          </div>
        </main>
        <footer className="py-6 text-center text-sm text-foreground/80">
          © {new Date().getFullYear()} راموس أونلاين — جميع الحقوق محفوظة
        </footer>
      </div>
    </div>
  );
}
