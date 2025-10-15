import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoot = () => {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "ar");
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const container = document.getElementById("root")!;
// Cache the root across HMR to avoid calling createRoot() twice on the same container
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const w = window as any;
w.__fusion_root = w.__fusion_root || createRoot(container);
w.__fusion_root.render(<AppRoot />);
