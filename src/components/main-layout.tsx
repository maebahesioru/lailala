import { Sidebar } from "./sidebar";
import { WidgetsPanel } from "./widgets-panel";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="flex w-full max-w-[1265px] items-start">
        <Sidebar />
        <main className="flex-1 min-w-0 border-x border-[#2f3336]">
          {children}
        </main>
        <WidgetsPanel />
      </div>
    </div>
  );
}
