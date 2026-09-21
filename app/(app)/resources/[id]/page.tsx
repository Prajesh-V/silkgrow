"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getResourceById, getSupplierById } from "@/lib/resource";
import { createBooking, persistBooking, loadBookings } from "@/lib/booking";
import { formatPrice } from "@/lib/formatting";
import { ArrowLeft, CheckCircle2, ShieldCheck, MapPin, Truck, AlertCircle, ShoppingBag } from "lucide-react";

export default function ResourceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const resource = getResourceById(resolvedParams.id);
  
  const [quantity, setQuantity] = useState(resource?.minimumOrderQuantity || 1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!resource) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center">
        <h2 className="text-2xl font-heading font-bold mb-4">Resource Not Found</h2>
        <p className="text-text-muted mb-8">This resource may have been removed or the ID is invalid.</p>
        <Link href="/resources" className="text-primary font-bold hover:underline">
          &larr; Back to Marketplace
        </Link>
      </div>
    );
  }

  const supplier = getSupplierById(resource.supplierId);
  const isAvailable = resource.status === "available";
  const total = quantity * resource.price;

  const handleBooking = () => {
    setIsSubmitting(true);
    
    // Simulate slight network delay for realistic feel
    setTimeout(() => {
      const existingBookings = loadBookings();
      const newBooking = createBooking({
        resourceId: resource.id,
        supplierId: resource.supplierId,
        resourceName: resource.name,
        supplierName: supplier?.name || "Verified Supplier",
        quantity,
        unitPrice: resource.price,
        estimatedDelivery: resource.deliveryEstimate,
        existingBookings
      });
      
      persistBooking(newBooking);
      router.push("/bookings");
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Back nav */}
      <Link href="/resources" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-main transition-colors">
        <ArrowLeft size={16} /> Back to Resources
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Details (Left) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-surface rounded-base border border-border p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full uppercase tracking-wide">
                {resource.category.replace("-", " ")}
              </span>
              <span className={`text-xs font-bold flex items-center gap-1 ${isAvailable ? "text-green-700" : "text-amber-600"}`}>
                {isAvailable ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                {isAvailable ? "In Stock" : "Limited Stock"}
              </span>
            </div>

            <h1 className="text-3xl font-heading font-bold text-text-main mb-4">
              {resource.name}
            </h1>

            <p className="text-text-muted text-lg leading-relaxed mb-6">
              {resource.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6 border-y border-border">
              <div>
                <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Supplier</h4>
                <div className="flex items-start gap-2 text-sm text-text-main font-medium">
                  <ShieldCheck size={18} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    {supplier?.name || "Verified Supplier"}
                    <div className="text-xs text-text-muted font-normal mt-0.5 flex items-center gap-1">
                      <MapPin size={12} /> {supplier?.location || "Regional Hub"}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Logistics</h4>
                <div className="flex items-start gap-2 text-sm text-text-main font-medium">
                  <Truck size={18} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    {resource.deliveryEstimate}
                    <div className="text-xs text-text-muted font-normal mt-0.5">
                      Secure handling
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Card (Right) */}
        <div className="lg:col-span-4">
          <div className="bg-surface rounded-base border border-border p-6 sticky top-6 shadow-sm">
            <div className="mb-6">
              <span className="text-3xl font-heading font-bold text-text-main">
                {formatPrice(resource.price)}
              </span>
              <span className="text-text-muted ml-1">/ {resource.unit}</span>
            </div>

            <div className="space-y-4 mb-6">
              <label className="block text-sm font-bold text-text-main">
                Quantity
              </label>
              <div className="flex items-center">
                <button 
                  onClick={() => setQuantity(Math.max(resource.minimumOrderQuantity, quantity - 1))}
                  className="w-10 h-10 border border-border rounded-l flex items-center justify-center bg-surface-muted hover:bg-surface-hover text-lg transition-colors"
                >
                  -
                </button>
                <input 
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(resource.minimumOrderQuantity, parseInt(e.target.value) || resource.minimumOrderQuantity))}
                  className="h-10 w-full text-center border-y border-border bg-background focus:outline-none"
                  min={resource.minimumOrderQuantity}
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-border rounded-r flex items-center justify-center bg-surface-muted hover:bg-surface-hover text-lg transition-colors"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-text-muted text-right">Min: {resource.minimumOrderQuantity} {resource.unit}s</p>
            </div>

            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-text-muted">Total</span>
                <span className="text-xl font-bold text-text-main">{formatPrice(total)}</span>
              </div>
              <p className="text-xs text-text-muted italic text-right">Pay on delivery / pickup</p>
            </div>

            <button
              onClick={handleBooking}
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-md shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                "Processing..."
              ) : (
                <>
                  <ShoppingBag size={18} />
                  Confirm Booking
                </>
              )}
            </button>
            <p className="text-xs text-center text-text-muted mt-3">
              Your supplier will coordinate payment and delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
