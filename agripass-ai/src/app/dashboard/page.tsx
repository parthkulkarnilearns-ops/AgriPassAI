"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Sprout, MapPin, Calendar, Clock, ChevronRight, PlusCircle, Leaf, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MOCK_FARMER, MOCK_BOOKINGS } from "@/lib/mock-data"

export default function Dashboard() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen bg-agri-earth-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-agri-earth-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-agri-green-600 rounded-lg">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-agri-earth-900">AgriPass</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-agri-earth-900">{MOCK_FARMER.name}</p>
              <p className="text-xs text-agri-earth-500">{MOCK_FARMER.kisaanId}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-agri-earth-100 flex items-center justify-center border border-agri-earth-200">
              <User className="w-5 h-5 text-agri-earth-600" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-6 space-y-6">
        
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-agri-earth-900">Welcome, {MOCK_FARMER.name}</h1>
          <p className="text-agri-earth-600 flex items-center gap-1 mt-1">
            <MapPin className="w-4 h-4" /> {MOCK_FARMER.village}, {MOCK_FARMER.district}
          </p>
        </motion.div>

        {/* AgriStack Profile Snapshot */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="text-sm font-semibold text-agri-earth-900 uppercase tracking-wider mb-3">AgriStack Records</h2>
          <div className="grid grid-cols-2 gap-3">
            {MOCK_FARMER.registeredCrops.map((crop) => (
              <Card key={crop.id} className="bg-white/50 border-agri-green-200 shadow-none">
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="p-2 bg-agri-green-100 rounded-lg text-agri-green-700">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-agri-earth-900">{crop.name}</p>
                    <p className="text-xs text-agri-earth-500">Est: {crop.expectedYield}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Active Bookings */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-agri-earth-900 uppercase tracking-wider">Active Gate Passes</h2>
          </div>
          
          <div className="space-y-3">
            {MOCK_BOOKINGS.map((booking) => (
              <Card 
                key={booking.id} 
                className="overflow-hidden border-agri-green-300 shadow-sm cursor-pointer hover:border-agri-green-500 transition-colors"
                onClick={() => router.push(`/gate-pass/${booking.id}`)}
              >
                <div className="h-1.5 w-full bg-agri-green-500" />
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-agri-green-100 text-agri-green-800 mb-2">
                        {booking.status}
                      </span>
                      <h3 className="font-semibold text-lg text-agri-earth-900">{booking.crop} • {booking.quantity} qtl</h3>
                      <p className="text-sm text-agri-earth-600">{booking.mandi}</p>
                    </div>
                    <div className="p-2 bg-agri-earth-50 rounded-full">
                      <ChevronRight className="w-5 h-5 text-agri-earth-400" />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-agri-earth-700 bg-agri-earth-50 p-3 rounded-lg border border-agri-earth-100">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-agri-green-600" />
                      <span>{new Date(booking.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                    </div>
                    <div className="w-px h-4 bg-agri-earth-300" />
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-agri-green-600" />
                      <span>{booking.timeSlot}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Floating Action Button for Booking */}
      <div className="fixed bottom-6 left-0 right-0 px-4 flex justify-center z-20">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-sm"
        >
          <Button 
            className="w-full h-14 rounded-full shadow-lg shadow-agri-green-600/30 text-lg gap-2"
            onClick={() => router.push("/book-slot")}
          >
            <PlusCircle className="w-6 h-6" />
            Book New Slot
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
