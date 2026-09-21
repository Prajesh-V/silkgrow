"use client";

import { useState, useEffect } from "react";
import { getStorageItem, setStorageItem, STORAGE_KEYS, clearAllSilkGrowData } from "@/lib/storage";
import { validateName, validatePhone } from "@/lib/validation";
import marketsData from "@/data/markets.json";
import type { DemoUser } from "@/types/user";
import { Phone, MapPin, ChevronRight, LogOut, CheckCircle2, ShieldCheck, Download, Smartphone, Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<DemoUser | null>(null);
  
  // Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editMarketId, setEditMarketId] = useState("");
  
  // Validation state
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  // Modal & Features State
  const [activeModal, setActiveModal] = useState<"sms" | "iot" | "dbt" | "extension" | "qr" | null>(null);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [smsTime, setSmsTime] = useState("08:30");
  
  // Telemetry demo state
  const [lastSync, setLastSync] = useState(() => Date.now() - 600000); // 10 mins ago
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Theme state
  const [isDark, setIsDark] = useState(false);

  const markets = marketsData as { id: string; name: string }[];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const storedUser = getStorageItem<DemoUser>(STORAGE_KEYS.USER);
    if (!storedUser) {
      router.replace("/");
    } else {
      setUser(storedUser);
      setEditName(storedUser.name);
      setEditPhone(storedUser.phone);
      setEditMarketId(storedUser.marketId);
    }
    
    const prefs = getStorageItem<{ enabled: boolean; time: string }>("silkgrow:notificationPreferences");
    if (prefs) {
      setSmsEnabled(prefs.enabled);
      setSmsTime(prefs.time);
    }
    
    // Read theme
    setIsDark(document.documentElement.classList.contains("dark"));
  }, [router]);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("silkgrow:theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("silkgrow:theme", "light");
    }
  };

  if (!mounted) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse w-8 h-8 bg-primary/20 rounded-full"></div>
      </div>
    );
  }

  const handleSave = () => {
    const nameErr = validateName(editName);
    const phoneErr = validatePhone(editPhone);

    if (nameErr || phoneErr) {
      setErrors({ name: nameErr || undefined, phone: phoneErr || undefined });
      return;
    }

    const updatedUser: DemoUser = {
      ...(user || { createdAt: new Date().toISOString() }),
      name: editName.trim(),
      phone: editPhone.trim(),
      marketId: editMarketId,
    };

    setStorageItem(STORAGE_KEYS.USER, updatedUser);
    setStorageItem(STORAGE_KEYS.SELECTED_MARKET, editMarketId);
    
    setUser(updatedUser);
    setIsEditing(false);
    setErrors({});
  };

  const handleLogout = () => {
    // Demo logout clears data
    clearAllSilkGrowData();
    localStorage.removeItem("silkgrow:notificationPreferences");
    router.push("/");
  };

  const handleSaveSms = () => {
    setStorageItem("silkgrow:notificationPreferences", { enabled: smsEnabled, time: smsTime });
    setActiveModal(null);
  };

  const handleSyncIot = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setLastSync(Date.now());
      setIsSyncing(false);
    }, 1500);
  };

  // Safe fallback if user bypassed onboarding somehow
  const displayUser = user || {
    name: "Guest Operator",
    phone: "Not Set",
    marketId: "bengaluru",
    createdAt: new Date().toISOString()
  };

  const selectedMarketName = markets.find(m => m.id === displayUser.marketId)?.name || "Regional Hub";

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-main">Farmer Profile</h1>
          <p className="text-text-muted mt-1 text-sm">
            Sericulture Operator & Farm Identity • Account #KA-4891
          </p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="hidden md:flex bg-surface border border-border text-text-main hover:border-primary/50 font-bold py-2 px-4 rounded-md shadow-sm transition-colors items-center gap-2"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        
        {/* Left Column: Identity & Farm Setup */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Identity Card */}
          <div className="bg-surface border border-border rounded-base p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-bold text-2xl uppercase border-2 border-primary/20">
                  {displayUser.name.substring(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-text-main">{displayUser.name}</h2>
                    <ShieldCheck size={18} className="text-primary" />
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-1 inline-block">
                    Grade-A Lead Sericulturist
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-border">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-text-muted" />
                <div>
                  <p className="text-sm font-medium">{displayUser.phone}</p>
                  <p className="text-xs text-text-muted">SMS Verified</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-text-muted" />
                <div>
                  <p className="text-sm font-medium">{selectedMarketName} Zone</p>
                  <p className="text-xs text-text-muted">Karnataka</p>
                </div>
              </div>
            </div>

            {/* Quick Stats Ribbon */}
            <div className="mt-6 bg-background rounded-md p-4 flex justify-between items-center border border-border/50 text-sm">
              <div className="text-center px-4">
                <p className="font-bold text-primary">48</p>
                <p className="text-xs text-text-muted mt-0.5">Batches</p>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div className="text-center px-4">
                <p className="font-bold text-primary">76 kg</p>
                <p className="text-xs text-text-muted mt-0.5">Yield/100 DFL</p>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div className="text-center px-4">
                <p className="font-bold text-primary">Active</p>
                <p className="text-xs text-text-muted mt-0.5">License Status</p>
              </div>
            </div>
          </div>

          {/* Edit Form Overlay (if active) */}
          {isEditing && (
            <div className="bg-surface border border-border rounded-base p-6 shadow-sm border-l-4 border-l-primary">
              <h3 className="font-heading font-bold text-lg mb-4">Edit Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-text-main mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                  />
                  {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-main mb-1">Mobile Number</label>
                  <input 
                    type="tel" 
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                  />
                  {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-main mb-1">Primary Mandi / Hub</label>
                  <select 
                    value={editMarketId}
                    onChange={(e) => setEditMarketId(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                  >
                    {markets.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={handleSave}
                    className="flex-1 bg-primary text-white font-bold py-2 rounded-md hover:bg-primary/90 transition-colors shadow-sm text-sm"
                  >
                    Save Changes
                  </button>
                  <button 
                    onClick={() => {
                      setIsEditing(false);
                      setErrors({});
                      if (user) {
                        setEditName(user.name);
                        setEditPhone(user.phone);
                        setEditMarketId(user.marketId);
                      }
                    }}
                    className="flex-1 bg-surface border border-border font-bold py-2 rounded-md hover:bg-surface-hover transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Farm Context */}
          {!isEditing && (
            <div className="bg-surface border border-border rounded-base p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-lg">Rearing Setup & Farm Context</h3>
                <span className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Live Mandi Connected
                </span>
              </div>
              <ul className="space-y-4">
                <li className="flex justify-between items-center pb-4 border-b border-border/50">
                  <div>
                    <p className="text-sm font-medium">Primary Market Center</p>
                    <p className="text-xs text-text-muted">{selectedMarketName} Silk Mandi (Asia&apos;s Largest Cocoon Market)</p>
                  </div>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="text-primary text-xs font-bold hover:underline"
                  >
                    Change Hub
                  </button>
                </li>
                <li className="flex justify-between items-center pb-4 border-b border-border/50">
                  <div>
                    <p className="text-sm font-medium">Rearing Capacity</p>
                    <p className="text-xs text-text-muted">200–300 DFLs (Standard Shed Setup)</p>
                  </div>
                </li>
                <li className="flex justify-between items-center pb-4 border-b border-border/50">
                  <div>
                    <p className="text-sm font-medium">Primary Cocoon Breed</p>
                    <p className="text-xs text-text-muted">Bivoltine (CSR2) - High Silk Recovery</p>
                  </div>
                </li>
                <li className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Mulberry Plantation</p>
                    <p className="text-xs text-text-muted">V1 High-Yield (2.5 Acres) - Drip Irrigated</p>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Settings & Support */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-surface border border-border rounded-base p-0 shadow-sm overflow-hidden mb-6">
            <h3 className="font-heading font-bold text-lg p-6 pb-2">Preferences & Telemetry</h3>
            
            <div className="flex flex-col">
              <div className="w-full flex items-center justify-between p-3 px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left group">
                <div className="flex items-center gap-3">
                  {isDark ? (
                    <Moon size={18} className="text-text-muted group-hover:text-primary transition-colors" />
                  ) : (
                    <Sun size={18} className="text-text-muted group-hover:text-primary transition-colors" />
                  )}
                  <div>
                    <p className="text-sm font-medium">Dark Mode</p>
                    <p className="text-xs text-text-muted">Currently {isDark ? "Dark" : "Light"}</p>
                  </div>
                </div>
                <button 
                  onClick={toggleTheme}
                  className={`w-12 h-6 rounded-full transition-colors relative ${isDark ? 'bg-primary' : 'bg-border'}`}
                >
                  <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${isDark ? 'translate-x-6' : ''}`}></span>
                </button>
              </div>

              <button onClick={() => setActiveModal("sms")} className="w-full flex items-center justify-between p-3 px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left group border-t border-border">
                <div className="flex items-center gap-3">
                  <Smartphone size={18} className="text-text-muted group-hover:text-primary transition-colors" />
                  <div>
                    <p className="text-sm font-medium">Mandi SMS Alerts</p>
                    <p className="text-xs text-text-muted">{smsEnabled ? `Active (Daily ${smsTime})` : "Disabled"}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-border group-hover:text-text-muted transition-colors" />
              </button>

              <button onClick={() => setActiveModal("iot")} className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-md transition-colors text-left group">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-text-muted group-hover:text-primary transition-colors" />
                  <div>
                    <p className="text-sm font-medium">IoT Chamber Sync</p>
                    <p className="text-xs text-text-muted">1 Live Sensor (24.8°C • 68% RH)</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-border group-hover:text-text-muted transition-colors" />
              </button>

              <button onClick={() => setActiveModal("dbt")} className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-md transition-colors text-left group border-t border-border mt-2 pt-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={18} className="text-text-muted group-hover:text-primary transition-colors" />
                  <div>
                    <p className="text-sm font-medium">DBT Subsidy Status</p>
                    <p className="text-xs text-text-muted">Direct Benefit Transfer Linked</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-border group-hover:text-text-muted transition-colors" />
              </button>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-base p-6 shadow-sm">
            <h3 className="font-heading font-bold text-lg mb-4">Advisory & Support</h3>
            <div className="bg-primary/5 p-4 rounded-md border border-primary/10 mb-4">
              <p className="text-sm font-bold text-text-main mb-1">Assigned Extension Officer</p>
              <p className="text-sm">Dr. M. Srinivasan</p>
              <p className="text-xs text-text-muted">Kolar District Sericulture Division</p>
            </div>
            <button onClick={() => setActiveModal("extension")} className="w-full bg-surface border border-primary/30 text-primary font-bold py-2 rounded-md hover:bg-primary/5 transition-colors text-sm shadow-sm">
              Call Extension Desk
            </button>
          </div>

          <div className="space-y-3 pt-4">
            <button onClick={() => setActiveModal("qr")} className="w-full bg-surface border border-border text-text-main font-bold py-3 rounded-md hover:bg-surface-hover transition-colors text-sm shadow-sm flex justify-center items-center gap-2">
              <Download size={16} />
              Download Farmer QR Passbook
            </button>
            <button 
              onClick={handleLogout}
              className="w-full border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 font-bold py-3 rounded-md transition-colors text-sm shadow-sm flex justify-center items-center gap-2"
            >
              <LogOut size={16} />
              Log Out of SilkGrow
            </button>
          </div>

        </div>
      </div>

      {/* MODALS */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-surface rounded-base w-full max-w-md shadow-xl border border-border p-6 relative my-auto max-h-[90vh] overflow-y-auto">
            
            {activeModal === "sms" && (
              <>
                <h3 className="text-lg font-heading font-bold mb-4">Mandi SMS Alerts</h3>
                <p className="text-sm text-text-muted mb-6">
                  SMS alerts are currently active and routed to your registered mobile number.
                </p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">Enable Alerts</span>
                    <button 
                      onClick={() => setSmsEnabled(!smsEnabled)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${smsEnabled ? 'bg-primary' : 'bg-border'}`}
                    >
                      <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${smsEnabled ? 'translate-x-6' : ''}`}></span>
                    </button>
                  </div>
                  {smsEnabled && (
                    <div>
                      <label className="block text-sm font-bold text-text-main mb-1">Daily Alert Time</label>
                      <input 
                        type="time" 
                        value={smsTime}
                        onChange={(e) => setSmsTime(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                      />
                    </div>
                  )}
                </div>
                <div className="flex gap-3 justify-end">
                  <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-sm font-bold text-text-muted hover:text-text-main">Cancel</button>
                  <button onClick={handleSaveSms} className="bg-primary text-white px-4 py-2 rounded-md font-bold text-sm hover:bg-primary-hover">Save Preferences</button>
                </div>
              </>
            )}

            {activeModal === "iot" && (
              <>
                <h3 className="text-lg font-heading font-bold mb-4">IoT Chamber Sync</h3>
                <p className="text-sm text-text-muted mb-6">
                  Live telemetry from your primary rearing chamber. Sensor data syncs directly with the SilkGrow analytics engine.
                </p>
                <div className="bg-background border border-border p-4 rounded-md mb-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Status</span>
                    <span className="font-bold text-green-600 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Connected (Sensor #A4-92)
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Temperature</span>
                    <span className="font-bold text-text-main">24.8°C</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Humidity</span>
                    <span className="font-bold text-text-main">68% RH</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-border/50">
                    <span className="text-text-muted">Last Synced</span>
                    <span className="font-medium text-text-main">{new Date(lastSync).toLocaleTimeString()}</span>
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-sm font-bold text-text-muted hover:text-text-main">Close</button>
                  <button onClick={handleSyncIot} disabled={isSyncing} className="bg-primary text-white px-4 py-2 rounded-md font-bold text-sm hover:bg-primary-hover disabled:opacity-50">
                    {isSyncing ? "Syncing..." : "Sync Sensor Data"}
                  </button>
                </div>
              </>
            )}

            {activeModal === "dbt" && (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck size={24} className="text-primary" />
                  <h3 className="text-lg font-heading font-bold">DBT Subsidy Status</h3>
                </div>
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-md mb-6">
                  <p className="font-bold text-sm mb-1">Direct Benefit Transfer Linked</p>
                  <p className="text-xs">Your farmer profile is approved for equipment subsidies in {selectedMarketName}.</p>
                </div>
                <p className="text-xs text-text-muted text-center mb-6">
                  Status verified via direct integration with state sericulture databases.
                </p>
                <div className="flex justify-end">
                  <button onClick={() => setActiveModal(null)} className="bg-primary text-white px-6 py-2 rounded-md font-bold text-sm hover:bg-primary-hover">Close</button>
                </div>
              </>
            )}

            {activeModal === "extension" && (
              <>
                <h3 className="text-lg font-heading font-bold mb-4">Call Extension Desk</h3>
                <p className="text-sm text-text-muted mb-6">
                  Connect with your assigned sericulture extension officer for farm guidance, market support, and operational assistance.
                </p>
                <div className="bg-surface border border-border p-4 rounded-md mb-6">
                  <p className="text-sm font-bold text-text-main mb-1">Dr. M. Srinivasan</p>
                  <p className="text-xs text-text-muted">Kolar District Sericulture Division</p>
                  <p className="text-xs text-text-muted mt-2">Available: 09:00 AM - 05:00 PM</p>
                </div>
                <div className="flex justify-end gap-3">
                  <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-sm font-bold text-text-muted hover:text-text-main">Cancel</button>
                  <button onClick={() => setActiveModal(null)} className="bg-primary text-white px-6 py-2 rounded-md font-bold text-sm hover:bg-primary-hover flex items-center gap-2">
                    <Phone size={16} /> Contact Now
                  </button>
                </div>
              </>
            )}

            {activeModal === "qr" && (
              <>
                <h3 className="text-lg font-heading font-bold mb-4 text-center">Farmer QR Passbook</h3>
                <div className="w-48 h-48 bg-white border border-border mx-auto flex items-center justify-center p-4 mb-6 rounded-md shadow-sm">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SilkGrowFarmer-${displayUser.phone || 'Demo'}`} 
                    alt="Farmer QR Code" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs text-text-muted text-center mb-6">
                  Present this QR code at the mandi entry gate to verify your identity and fast-track lot weighment.
                </p>
                <div className="flex justify-end">
                  <button onClick={() => setActiveModal(null)} className="w-full bg-primary text-white px-6 py-2 rounded-md font-bold text-sm hover:bg-primary-hover">Close Passbook</button>
                </div>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
