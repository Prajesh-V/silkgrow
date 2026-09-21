import Link from "next/link";
import { ArrowRight } from "lucide-react";
import React from "react";

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

export default function ActionCard({ icon, title, description, href }: ActionCardProps) {
  return (
    <Link href={href} className="group block bg-surface p-5 rounded-base border border-border shadow-sm hover:border-primary/50 transition-colors">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-background rounded-lg text-primary group-hover:bg-primary/10 transition-colors">
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="font-heading font-semibold text-text-main group-hover:text-primary transition-colors flex items-center justify-between">
            {title}
            <ArrowRight size={16} className="text-transparent group-hover:text-primary transition-colors" />
          </h4>
          <p className="text-sm text-text-muted mt-1 leading-snug">{description}</p>
        </div>
      </div>
    </Link>
  );
}
