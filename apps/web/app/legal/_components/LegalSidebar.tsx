'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Scale, FileText, Cookie, ShieldCheck, ArrowLeft } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { Button } from '@workspace/ui/components/button';

const links = [
  { href: '/legal/privacy-policy', label: 'Privacy Policy', icon: Scale },
  { href: '/legal/terms-of-service', label: 'Terms of Service', icon: FileText },
  { href: '/legal/cookie-policy', label: 'Cookie Policy', icon: Cookie },
  { href: '/legal/gdpr-compliance', label: 'GDPR Compliance', icon: ShieldCheck },
];

export function LegalSidebar() {
  const pathname = usePathname();

  return (
    <aside className="md:col-span-3">
      <div className="sticky top-24 space-y-6">
        <Button variant="ghost" asChild className="w-full justify-start text-muted-foreground hover:text-foreground">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        
        <div className="bg-card rounded-lg border border-border py-4 shadow-sm">
          <div className="px-6 mb-4">
            <h2 className="font-semibold text-lg text-foreground mb-1">Legal Center</h2>
            <p className="text-sm text-muted-foreground">Last updated Oct 2024</p>
          </div>
          
          <nav className="flex flex-col w-full">
            {links.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-6 py-3 text-sm font-semibold transition-all duration-150 ease-in-out hover:bg-muted/50",
                    isActive 
                      ? "text-primary border-r-4 border-primary bg-muted/20" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}
