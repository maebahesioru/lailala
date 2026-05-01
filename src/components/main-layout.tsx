import { Sidebar } from "./sidebar";
import { WidgetsPanel } from "./widgets-panel";
import { MobileNav } from "./mobile-nav";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="flex w-full max-w-[1400px] items-start">
        <Sidebar />
        <main className="flex-1 min-w-0 md:border-x border-[#2f3336] min-h-screen w-full">
          {children}
        </main>
        <WidgetsPanel />
      </div>
      <MobileNav />
    </div>
  );
}
