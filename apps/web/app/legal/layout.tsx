import { LegalSidebar } from './_components/LegalSidebar';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted/30 min-h-screen py-16 md:py-32">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <LegalSidebar />
          <main className="md:col-span-9">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
