import Link from "next/link";
import { formatPrice } from "@/lib/formatting";
import type { Resource, Supplier } from "@/types/resource";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface ResourceCardProps {
  resource: Resource;
  supplier: Supplier | null;
}

export default function ResourceCard({ resource, supplier }: ResourceCardProps) {
  const isAvailable = resource.status === "available";
  
  return (
    <div className="bg-surface rounded-base border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="p-5 flex-1 flex flex-col">
        {/* Category & Status */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full uppercase tracking-wide">
            {resource.category.replace("-", " ")}
          </span>
          <span className={`text-xs font-bold flex items-center gap-1 ${isAvailable ? "text-green-700" : "text-amber-600"}`}>
            {isAvailable ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
            {isAvailable ? "Available" : "Limited Stock"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-heading font-bold text-text-main mb-1 line-clamp-2">
          {resource.name}
        </h3>
        
        {/* Supplier */}
        <p className="text-sm text-text-muted mb-4 flex items-center gap-1">
          {supplier?.name || "Verified Supplier"}
          <CheckCircle2 size={14} className="text-primary/70" />
        </p>
        
        <div className="mt-auto space-y-3">
          {/* Price */}
          <div className="flex items-end gap-1">
            <span className="text-2xl font-heading font-bold text-text-main">
              {formatPrice(resource.price)}
            </span>
            <span className="text-sm text-text-muted mb-1">/ {resource.unit}</span>
          </div>
          
          {/* Meta Info */}
          <div className="flex items-center gap-2 text-xs text-text-muted bg-background p-2 rounded border border-border/50">
            <span>Min: {resource.minimumOrderQuantity} {resource.unit}s</span>
            <span>•</span>
            <span className="truncate">{resource.deliveryEstimate}</span>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="p-4 border-t border-border bg-surface-muted flex gap-3">
        <Link 
          href={`/resources/${resource.id}`}
          className="flex-1 py-2 text-center text-sm font-bold text-text-main border border-border rounded-md hover:bg-background transition-colors"
        >
          View Details
        </Link>
        <Link 
          href={`/resources/${resource.id}`}
          className="flex-1 py-2 text-center text-sm font-bold text-white bg-primary rounded-md hover:bg-primary/90 transition-colors shadow-sm"
        >
          Book Batch
        </Link>
      </div>
    </div>
  );
}
