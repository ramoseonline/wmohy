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
              <div className="relative overflow-hidden rounded-3xl bg-white p-10 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border-4 border-accent">
                <div className="absolute -top-16 -left-16 h-40 w-40 rounded-full bg-accent/20"></div>
                <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-secondary/20"></div>
                <div className="relative flex flex-col items-center md:flex-row md:items-center md:gap-8">
                  <div className="shrink-0 rounded-full ring-8 ring-accent/30 p-2 bg-white">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2Fed401c9a1ea24dc9b78123cf1ccb99a0%2Fd105d53fc52f4907b02a9b7b2caadfa4?format=webp&width=800"
                      alt="شعار WMOHY"
                      className="h-28 md:h-36 w-auto"
                    />
                  </div>
                  <div className="mt-6 md:mt-0 text-center md:text-right max-w-md">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-secondary">
                      {title}
                    </h1>
                    {subtitle ? (
                      <p className="mt-3 text-lg leading-relaxed text-primary">
                        {subtitle}
                      </p>
                    ) : null}
                    <div className="mt-6 flex items-center justify-center md:justify-start gap-3">
                      <span className="inline-block h-2 w-10 rounded-full bg-primary"></span>
                      <span className="inline-block h-2 w-10 rounded-full bg-accent"></span>
                      <span className="inline-block h-2 w-10 rounded-full bg-secondary"></span>
                    </div>
                  </div>
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
