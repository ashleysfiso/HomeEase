import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { Outlet } from "react-router-dom";
import { ModeToggle } from "@/components/ModeToogle";
import { Toaster } from "@/components/ui/toaster";

export default function Dashboard({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main>
        <div className="w-full max-w-full flex justify-center">
          <SidebarTrigger className="sticky" />
          <div className="flex-1 min-w-0">
            {children}
            <header className="w-full max-w-full border-b">
              <div className="flex h-16 items-center px-4 md:px-6">
                <h1 className="text-xl font-semibold">HomeEase Dashboard</h1>
                <div className="ml-auto flex items-center gap-4">
                  <ModeToggle />
                </div>
              </div>
            </header>
            <Outlet />
            <Toaster />
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
