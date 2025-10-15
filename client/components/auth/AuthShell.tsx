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
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fed401c9a1ea24dc9b78123cf1ccb99a0%2Fd105d53fc52f4907b02a9b7b2caadfa4?format=webp&width=800"
              alt="شعار WMOHY"
              className="h-14 md:h-16 w-auto"
            />
          </div>
        </header>
        <main className="flex flex-1 items-center justify-center py-8">
          <div className="grid w-full gap-8 md:grid-cols-2">
            <div className="order-2 md:order-1 flex items-center justify-center">
              <div className="w-full max-w-md">{children}</div>
            </div>
            <div className="order-1 md:order-2 flex items-center justify-center">
              <div className="rounded-2xl bg-white p-10 shadow-xl border-4 border-accent flex items-center justify-center gap-8">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fed401c9a1ea24dc9b78123cf1ccb99a0%2Fd105d53fc52f4907b02a9b7b2caadfa4?format=webp&width=800"
                  alt="شعار WMOHY"
                  className="h-32 md:h-40 w-auto"
                />
                <div className="text-center md:text-right">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-secondary mb-2">
                    {title}
                  </h1>
                  {subtitle ? (
                    <p className="text-primary text-lg leading-relaxed max-w-sm">
                      {subtitle}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="py-6 text-center text-sm text-foreground/80">
          © {new Date().getFullYear()} WMOHY — All rights reserved
        </footer>
      </div>
    </div>
  );
}
