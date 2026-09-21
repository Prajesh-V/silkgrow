"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { loadBookings } from "@/lib/booking";
import { formatPrice } from "@/lib/formatting";
import type { Booking } from "@/types/booking";
import { CalendarRange, PackageSearch, PackageCheck, CheckCircle2, ShoppingBag } from "lucide-react";

export default function BookingsPage() {
  const [mounted, setMounted] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setBookings(loadBookings().reverse()); // Newest first
  }, []);

  if (!mounted) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse w-8 h-8 bg-primary/20 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-heading font-bold text-text-main flex items-center gap-3">
          <CalendarRange className="text-primary" size={28} />
          My Bookings
        </h1>
        <p className="text-text-muted mt-2">Manage your resource orders and mandi fast-track tokens.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-surface border border-border rounded-base p-12 text-center flex flex-col items-center justify-center">
          <div className="bg-background w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <PackageSearch size={32} className="text-text-muted" />
          </div>
          <h3 className="text-xl font-heading font-bold text-text-main mb-2">No active bookings</h3>
          <p className="text-text-muted mb-6 max-w-sm">
            You haven&apos;t made any resource bookings yet. Browse the marketplace to order supplies.
          </p>
          <Link 
            href="/resources" 
            className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-md shadow-sm transition-colors flex items-center gap-2"
          >
            <ShoppingBag size={18} />
            Browse Resources
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-surface rounded-base border border-border p-5 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-border">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-text-main">{booking.id}</span>
                    <span className="text-xs text-text-muted">•</span>
                    <span className="text-xs text-text-muted">{new Date(booking.bookingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}</span>
                  </div>
                  <h3 className="text-lg font-bold text-text-main">
                    {booking.resourceNameSnapshot}
                  </h3>
                </div>
                
                <div className="flex items-center gap-2 bg-success-bg text-success-text px-3 py-1.5 rounded-full border border-success-border">
                  <CheckCircle2 size={16} />
                  <span className="text-sm font-bold capitalize">{booking.status}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-text-muted mb-1">Supplier</p>
                  <p className="text-sm font-medium">{booking.supplierNameSnapshot}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Quantity</p>
                  <p className="text-sm font-medium">{booking.quantity} Units</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Total Price</p>
                  <p className="text-sm font-medium font-bold text-primary">{formatPrice(booking.total)}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Est. Delivery</p>
                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    <PackageCheck size={14} className="text-text-muted" />
                    {booking.estimatedDelivery}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
