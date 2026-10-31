import { Sidebar } from "./sidebar";
import { WidgetsPanel } from "./widgets-panel";
import { MobileNav } from "./mobile-nav";
import { DonationPopup } from "./donation-popup";
import { LinkStatusBanner } from "./link-status-banner";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="flex w-full max-w-[1360px] items-stretch justify-center min-h-screen">
        <Sidebar />
        <main className="w-full min-w-0 md:flex-1 md:max-w-[600px] md:border-x border-[#2f3336] flex flex-col">
          <LinkStatusBanner />
          {children}
        </main>
        <WidgetsPanel />
      </div>
      <MobileNav />
      <DonationPopup />
    </div>
  );
}
