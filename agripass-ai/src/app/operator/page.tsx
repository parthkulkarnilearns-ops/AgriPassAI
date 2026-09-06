"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ScanLine, Search, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function OperatorDashboard() {
  const router = useRouter()
  const [token, setToken] = useState("")
  const [isScanning, setIsScanning] = useState(false)

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    if (token.length === 6) {
      router.push(`/operator/weighbridge?token=${token}`)
    }
  }

  const simulateScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setToken("842911")
      setIsScanning(false)
      setTimeout(() => {
        router.push(`/operator/weighbridge?token=842911`)
      }, 500)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-agri-earth-50">
      {/* Header */}
      <header className="bg-agri-earth-900 text-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-agri-green-400" />
            <span className="font-semibold">Mandi Gate Operations</span>
          </div>
          <div className="text-sm font-medium text-agri-earth-300">
            Pimpalgaon Baswant APMC
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Scanner Simulation */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-agri-earth-200 h-full">
              <CardHeader>
                <CardTitle>Scan QR Pass</CardTitle>
                <CardDescription>Use the dedicated scanner or camera to verify farmer booking</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center pt-8 pb-12">
                <div className={`relative w-48 h-48 border-4 rounded-xl flex items-center justify-center transition-colors ${isScanning ? 'border-agri-green-500' : 'border-agri-earth-200 border-dashed'}`}>
                  {isScanning && (
                    <motion.div 
                      className="absolute left-0 right-0 h-1 bg-agri-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.5)]"
                      initial={{ top: "0%" }}
                      animate={{ top: "100%" }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                  )}
                  <ScanLine className={`w-16 h-16 ${isScanning ? 'text-agri-green-500' : 'text-agri-earth-300'}`} />
                </div>
                
                <Button 
                  onClick={simulateScan} 
                  disabled={isScanning}
                  className="mt-8"
                  variant={isScanning ? "outline" : "default"}
                >
                  {isScanning ? "Scanning..." : "Simulate QR Scan"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Manual Entry */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-agri-earth-200 h-full">
              <CardHeader>
                <CardTitle>Manual Token Entry</CardTitle>
                <CardDescription>Fallback entry if QR code cannot be scanned</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVerify} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-agri-earth-700">6-Digit Token</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-agri-earth-400" />
                      <Input 
                        type="text" 
                        placeholder="e.g. 842911" 
                        className="pl-10 text-lg tracking-widest font-mono"
                        value={token}
                        onChange={(e) => setToken(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        maxLength={6}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-12 text-base mt-4" disabled={token.length !== 6}>
                    Verify Booking
                  </Button>
                </form>

                <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                  <strong className="block mb-1">Queue Status</strong>
                  <p>Current Yard Load: 45 / 200 vehicles.</p>
                  <p>Average weighbridge clearing time: 4m 20s.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
