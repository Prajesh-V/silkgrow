"use client";

import { useState, useEffect } from "react";
import { getSuppliers, filterResources } from "@/lib/resource";
import ResourceCard from "@/components/ui/ResourceCard";
import { Search, MapPin, BadgeCheck, PhoneCall } from "lucide-react";
import { getStorageItem, STORAGE_KEYS } from "@/lib/storage";
import type { Market } from "@/types";
import marketsData from "@/data/markets.json";

const CATEGORIES: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Mulberry", value: "mulberry-leaves" },
  { label: "Rearing", value: "rearing-equipment" },
  { label: "Hygiene & Disinfection", value: "disinfectants" },
  { label: "Others", value: "other" },
];

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [mounted, setMounted] = useState(false);
  const [marketPhone, setMarketPhone] = useState("");
  const [showContactDialog, setShowContactDialog] = useState(false);
  
  const resources = filterResources(activeCategory);
  const suppliers = getSuppliers();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const mId = getStorageItem<string>(STORAGE_KEYS.SELECTED_MARKET) || marketsData[0].id;
    const m = marketsData.find(x => x.id === mId) || marketsData[0];
    setMarketPhone((m as Market & { phone?: string }).phone || "+91 80 1234 5678");
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* 1. Header & Context */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-main">Sericulture Resources</h1>
          <p className="text-text-muted mt-2 flex items-center gap-2">
            <BadgeCheck size={16} className="text-primary" />
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Verified Marketplace</span>
            Verified Agronomic Inputs & Equipment
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search saplings, disinfection..." 
              className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-md border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 bg-surface border border-border px-4 py-2 rounded-md text-sm text-text-main cursor-pointer hover:border-primary/50 transition-colors">
            <MapPin size={16} className="text-primary" />
            Ramanagara & Kolar Hubs
          </div>
        </div>
      </div>

      {/* 2. Category Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-colors ${
              activeCategory === cat.value 
                ? "bg-primary text-white shadow-sm" 
                : "bg-surface border border-border text-text-muted hover:text-text-main hover:border-text-muted"
            }`}
          >
            {cat.label}
          </button>
        ))}
        <div className="ml-auto hidden md:flex items-center gap-2">
          <span className="text-xs font-bold text-text-muted bg-surface px-3 py-1.5 rounded border border-border">
            Govt. Subsidized Only
          </span>
        </div>
      </div>

      {/* 3. Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {resources.map(resource => {
          const supplier = suppliers.find(s => s.id === resource.supplierId) || null;
          return <ResourceCard key={resource.id} resource={resource} supplier={supplier} />;
        })}
        {resources.length === 0 && (
          <div className="col-span-full py-12 text-center bg-surface border border-border rounded-base border-dashed">
            <p className="text-text-muted">No resources found in this category.</p>
          </div>
        )}
      </div>

      {/* 4. Support Banner */}
      <div className="bg-primary rounded-base p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
        <div className="relative z-10 text-white">
          <h3 className="text-xl font-heading font-bold mb-2">Govt. Subsidized & Lab-Tested Inputs</h3>
          <p className="text-white/80 text-sm max-w-xl">
            Need guidance regarding the 50% mandi nursery subsidy or pathogen testing certificates? Speak with our agronomist desk.
          </p>
        </div>
        <button 
          onClick={() => setShowContactDialog(true)}
          className="relative z-10 whitespace-nowrap bg-surface text-primary px-6 py-3 rounded-md font-bold shadow flex items-center justify-center gap-2 hover:bg-surface-hover transition-colors"
        >
          <PhoneCall size={18} />
          Call Mandi Desk
        </button>
      </div>

      {showContactDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-surface rounded-base w-full max-w-sm shadow-xl border border-border p-6 text-center my-auto max-h-[90vh] overflow-y-auto">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <PhoneCall size={24} className="text-primary" />
            </div>
            <h3 className="text-lg font-heading font-bold mb-2">Agronomist Desk</h3>
            <p className="text-text-muted text-sm mb-6">
              The regional agronomist desk is currently experiencing high call volume. Please try again shortly or use the messaging feature in your profile.
            </p>
            <button 
              onClick={() => setShowContactDialog(false)}
              className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-md font-bold w-full transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
