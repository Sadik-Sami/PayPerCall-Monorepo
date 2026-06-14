import { CheckCircle2 } from 'lucide-react';
import { cookiePolicyData } from '../data';

export const metadata = {
  title: 'Cookie Policy - Executive Performance',
};

export default function CookiePolicyPage() {
  const { title, lastUpdated, intro, sections } = cookiePolicyData;

  return (
    <article className="max-w-none">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">{title}</h1>
        <p className="text-lg text-muted-foreground">{intro}</p>
      </header>

      <div className="space-y-8">
        {sections.map((section) => (
          <section 
            key={section.id} 
            className="bg-card border border-border rounded-lg p-6 lg:p-8 hover:border-ring/20 transition-colors shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
              <span className="w-8 h-8 flex items-center justify-center bg-primary/10 text-primary rounded-full text-sm font-bold">
                {section.id}
              </span>
              {section.title}
            </h2>
            
            <div className="space-y-4 text-base text-muted-foreground">
              {section.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}

              {section.list && (
                <ul className="space-y-3 mt-4">
                  {section.list.map((item, index) => {
                    const parts = item.split(': ');
                    const bold = parts[0];
                    const rest = parts.slice(1).join(': ');
                    return (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span>
                          {rest ? (
                            <>
                              <strong className="text-foreground">{bold}: </strong>
                              {rest}
                            </>
                          ) : (
                            item
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
