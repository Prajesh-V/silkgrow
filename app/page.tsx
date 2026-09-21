"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Phone, MapPin, ArrowRight } from "lucide-react";
import { validateName, validatePhone } from "@/lib/validation";
import { getStorageItem, setStorageItem, STORAGE_KEYS } from "@/lib/storage";
import { MARKETS } from "@/lib/marketData";
import type { DemoUser } from "@/types";

export default function OnboardingPage() {
  const router = useRouter();
  
  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [marketId, setMarketId] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string; market?: string }>({});

  // Hydration & Session Check
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const user = getStorageItem<DemoUser>(STORAGE_KEYS.USER);
    if (user) {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const nameError = validateName(name);
    const phoneError = validatePhone(phone);
    const marketError = !marketId ? "Please select a primary market." : null;

    if (nameError || phoneError || marketError) {
      setErrors({
        name: nameError || undefined,
        phone: phoneError || undefined,
        market: marketError || undefined,
      });
      return;
    }

    // Success flow
    const demoUser: DemoUser = {
      name: name.trim(),
      phone: phone.trim().replace(/^(\+91|0)/, ""),
      marketId: marketId,
      createdAt: new Date().toISOString(),
    };

    setStorageItem(STORAGE_KEYS.USER, demoUser);
    setStorageItem(STORAGE_KEYS.SELECTED_MARKET, marketId);

    router.push("/dashboard");
  };

  if (!mounted) {
    return null; // Avoid hydration flash or blank render
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:items-center md:justify-center p-4">
      {/* Mobile/Desktop unifying layout */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-surface rounded-base md:shadow-sm overflow-hidden md:min-h-[600px]">
        
        {/* Left Panel (Desktop branding focus) / Top Branding (Mobile) */}
        <div className="md:w-1/2 bg-primary text-white p-8 md:p-12 flex flex-col justify-center rounded-base md:rounded-none md:rounded-l-base mb-6 md:mb-0">
          <div className="flex items-center gap-3 mb-6">
            <img src="/logo.png" alt="SilkGrow Logo" className="w-10 h-10 object-contain" />
            <h1 className="text-2xl font-heading font-bold">SilkGrow</h1>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-heading font-semibold leading-tight mb-4">
            Smart Sericulture Decision Support
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Live mandi spot auctions, rearing microclimate IoT, and AI leaf diagnostics.
          </p>

          <div className="hidden md:block mt-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              12,400+ active rearers
            </div>
          </div>
        </div>

        {/* Right Panel (The Form) */}
        <div className="md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-surface">
          <div className="mb-8">
            <span className="inline-block text-xs font-bold tracking-wider text-secondary uppercase bg-secondary/10 px-3 py-1 rounded-full mb-4">
              ⚡ 1-Min Farm Setup
            </span>
            <h3 className="text-2xl font-heading font-bold text-text-main">Welcome to SilkGrow</h3>
            <p className="text-text-muted mt-1">Smart sericulture decision support for your farm.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Field: Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-main mb-1.5">
                Farmer Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={20} className="text-text-muted" />
                </div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Gowda"
                  className={`w-full pl-10 pr-4 py-3 bg-background border ${errors.name ? "border-secondary" : "border-border"} rounded-base focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors text-text-main`}
                />
              </div>
              {errors.name && <p className="text-secondary text-sm mt-1.5">{errors.name}</p>}
            </div>

            {/* Field: Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-text-main mb-1.5">
                Mobile Number
              </label>
              <div className="relative flex">
                <span className="inline-flex items-center px-4 py-3 rounded-l-base border border-r-0 border-border bg-background text-text-muted font-medium">
                  +91
                </span>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className={`flex-1 w-full pl-3 pr-4 py-3 bg-background border ${errors.phone ? "border-secondary" : "border-border"} rounded-r-base focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors text-text-main`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Phone size={20} className="text-text-muted" />
                </div>
              </div>
              {errors.phone ? (
                <p className="text-secondary text-sm mt-1.5">{errors.phone}</p>
              ) : (
                <p className="text-text-muted text-xs mt-1.5 flex items-center gap-1">
                  ✓ For instant SMS login & daily mandi alerts
                </p>
              )}
            </div>

            {/* Field: Market Selection */}
            <div>
              <label htmlFor="market" className="block text-sm font-medium text-text-main mb-1.5">
                Primary Cocoon Mandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin size={20} className="text-text-muted" />
                </div>
                <select
                  id="market"
                  value={marketId}
                  onChange={(e) => setMarketId(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-background border ${errors.market ? "border-secondary" : "border-border"} rounded-base focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors text-text-main appearance-none`}
                >
                  <option value="" disabled>Select your nearest market</option>
                  {MARKETS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} {m.id === "mkt-ramanagara" ? "(Asia's Largest)" : ""}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
              {errors.market && <p className="text-secondary text-sm mt-1.5">{errors.market}</p>}
            </div>

            {/* CTA */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover text-white font-medium text-lg py-4 rounded-base flex items-center justify-center gap-2 transition-colors mt-4"
            >
              Start Using SilkGrow
              <ArrowRight size={20} />
            </button>
            <p className="text-center text-xs text-text-muted mt-4">
              🔒 No password required • Secure, private & offline-first
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
