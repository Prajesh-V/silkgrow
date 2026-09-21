import Header from "./Header";
import Sidebar from "../navigation/Sidebar";
import MobileNav from "../navigation/MobileNav";

interface ShellProps {
  children: React.ReactNode;
}

export default function Shell({ children }: ShellProps) {
  return (
    <div className="flex h-screen bg-background overflow-hidden w-full">
      {/* Desktop Sidebar (hidden on mobile) */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Responsive Header */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto w-full">
          {/* 
            Mobile spacing: top 16 (64px) for header, bottom 20 (80px) for bottom nav
            Desktop spacing: top header is flex item, no bottom nav spacing needed 
          */}
          <div className="pt-16 pb-20 md:pt-0 md:pb-0 min-h-full">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation (hidden on desktop) */}
      <MobileNav />
    </div>
  );
}
