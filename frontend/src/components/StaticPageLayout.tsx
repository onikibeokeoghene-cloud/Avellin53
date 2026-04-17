import { Helmet } from 'react-helmet-async';

interface StaticPageProps {
  title: string;
  children: React.ReactNode;
}

const StaticPageLayout = ({ title, children }: StaticPageProps) => {
  return (
    <div className="bg-bg-light min-h-screen py-24">
      <Helmet>
        <title>{title} — AVELLIN</title>
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-heading text-primary uppercase tracking-[0.3em]">{title}</h1>
          <div className="h-1 w-24 bg-secondary mx-auto mt-8" />
        </div>
        
        <div className="bg-white border border-accent p-10 md:p-16 shadow-sm prose prose-sm max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
};

export default StaticPageLayout;
