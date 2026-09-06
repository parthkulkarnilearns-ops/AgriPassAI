"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle2, ArrowLeft, Download, Share2, QrCode } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function GatePass() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = params.id as string
  const isNew = searchParams.get("success") === "true"
  
  const [token, setToken] = useState("")

  useEffect(() => {
    // Generate a random 6-digit token for the prototype
    setToken(Math.floor(100000 + Math.random() * 900000).toString())
  }, [])

  return (
    <div className="min-h-screen bg-agri-earth-50 flex flex-col items-center py-8 px-4">
      {/* Header */}
      <div className="w-full max-w-sm flex items-center justify-between mb-8">
        <button onClick={() => router.push("/dashboard")} className="p-2 -ml-2 text-agri-earth-600 hover:bg-agri-earth-100 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold text-agri-earth-900">Gate Pass</span>
        <div className="w-9" /> {/* Spacer */}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm space-y-6"
      >
        {isNew && (
          <div className="bg-agri-green-50 text-agri-green-800 p-4 rounded-xl flex items-start gap-3 border border-agri-green-200">
            <CheckCircle2 className="w-6 h-6 text-agri-green-600 flex-shrink-0" />
            <div>
              <p className="font-semibold">Booking Confirmed!</p>
              <p className="text-sm text-agri-green-700 mt-1">Your slot has been reserved. Present this pass at the mandi gate.</p>
            </div>
          </div>
        )}

        <Card className="overflow-hidden border-agri-earth-200 shadow-xl shadow-agri-earth-200/50 relative">
          {/* Ticket styling cutouts */}
          <div className="absolute top-[60%] -left-4 w-8 h-8 bg-agri-earth-50 rounded-full border-r border-agri-earth-200" />
          <div className="absolute top-[60%] -right-4 w-8 h-8 bg-agri-earth-50 rounded-full border-l border-agri-earth-200" />
          <div className="absolute top-[60%] left-4 right-4 h-px border-t-2 border-dashed border-agri-earth-200" />

          <CardContent className="p-0">
            {/* Top half */}
            <div className="p-6 bg-white text-center pb-8">
              <div className="inline-flex items-center justify-center p-3 bg-agri-green-50 rounded-2xl mb-4 text-agri-green-600">
                <QrCode className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-agri-earth-900 tracking-wider mb-1">{token || "------"}</h2>
              <p className="text-sm font-medium text-agri-earth-500 uppercase tracking-widest mb-6">Security Token</p>
              
              {/* Mock QR Code */}
              <div className="w-48 h-48 mx-auto bg-agri-earth-50 border-2 border-agri-earth-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h20v20H0V0zm10 10h10v10H10V10zM0 10h10v10H0V10zm10-10h10v10H10V0z\' fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")', backgroundSize: '10px 10px' }} />
                <QrCode className="w-24 h-24 text-agri-earth-800 relative z-10" />
              </div>
              <p className="text-xs text-agri-earth-400 mt-3">Scan at digital weighbridge</p>
            </div>

            {/* Bottom half */}
            <div className="p-6 bg-agri-earth-50/50 pt-8">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-agri-earth-500 uppercase tracking-wider mb-1">Booking ID</p>
                  <p className="font-semibold text-agri-earth-900">{id}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-agri-earth-500 uppercase tracking-wider mb-1">Date</p>
                    <p className="font-semibold text-agri-earth-900">08 Sep 2026</p>
                  </div>
                  <div>
                    <p className="text-xs text-agri-earth-500 uppercase tracking-wider mb-1">Time</p>
                    <p className="font-semibold text-agri-earth-900">08:00 AM - 10:00 AM</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-agri-earth-500 uppercase tracking-wider mb-1">Mandi</p>
                  <p className="font-semibold text-agri-earth-900">Pimpalgaon Baswant APMC</p>
                </div>
                <div>
                  <p className="text-xs text-agri-earth-500 uppercase tracking-wider mb-1">Consignment</p>
                  <p className="font-semibold text-agri-earth-900">Onion • 20 Quintals</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full h-12 bg-white">
            <Download className="w-4 h-4 mr-2" />
            Save PDF
          </Button>
          <Button variant="outline" className="w-full h-12 bg-white">
            <Share2 className="w-4 h-4 mr-2" />
            Share SMS
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
