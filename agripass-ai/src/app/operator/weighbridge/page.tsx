"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, CheckCircle2, FileText, Scale, Droplets, Banknote, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WeighbridgeSettle() {
  const router = useRouter()
  const [step, setStep] = useState(1) // 1: Connect Scale, 2: Assay, 3: Settle
  const [weight, setWeight] = useState<number | null>(null)
  const [moisture, setMoisture] = useState<number | null>(null)
  const [isSettling, setIsSettling] = useState(false)
  const [settled, setSettled] = useState(false)

  // Simulate Web Serial API streaming
  useEffect(() => {
    if (step === 1) {
      let currentWeight = 15.0; // Tare
      const interval = setInterval(() => {
        currentWeight += Math.random() * 2;
        if (currentWeight >= 20.45) { // Gross target
          clearInterval(interval);
          setWeight(20.45); // Final gross
        } else {
          setWeight(parseFloat(currentWeight.toFixed(2)));
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, [step]);

  // Simulate Moisture sensor
  useEffect(() => {
    if (step === 2) {
      setTimeout(() => {
        setMoisture(11.2); // Good moisture for onion
      }, 1000);
    }
  }, [step]);

  const handleSettle = () => {
    setIsSettling(true)
    setTimeout(() => {
      setIsSettling(false)
      setSettled(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-agri-earth-50 flex flex-col">
      <header className="bg-agri-earth-900 text-white sticky top-0 z-10 px-4 h-16 flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 -ml-2 text-agri-earth-300 hover:text-white rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold">Digital Weighbridge</span>
        <div className="ml-auto flex items-center gap-2 text-xs font-medium px-2 py-1 bg-agri-earth-800 rounded-full border border-agri-earth-700">
          <ShieldCheck className="w-4 h-4 text-agri-green-400" /> Web Serial Active
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 pt-6 pb-24">
        
        {/* Farmer Info Bar */}
        <div className="bg-white border border-agri-earth-200 p-4 rounded-xl shadow-sm mb-6 flex flex-wrap gap-x-8 gap-y-4 justify-between items-center">
          <div>
            <p className="text-xs text-agri-earth-500 uppercase">Booking</p>
            <p className="font-semibold text-agri-earth-900">BKG-8821</p>
          </div>
          <div>
            <p className="text-xs text-agri-earth-500 uppercase">Farmer</p>
            <p className="font-semibold text-agri-earth-900">Ramesh Patil</p>
          </div>
          <div>
            <p className="text-xs text-agri-earth-500 uppercase">Declared</p>
            <p className="font-semibold text-agri-earth-900">Onion • 20 Qtl</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Action Area */}
          <div className="md:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="weighing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <Card className="border-agri-green-200 bg-white overflow-hidden shadow-sm">
                    <div className="h-1 bg-agri-green-500 w-full" />
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Scale className="w-5 h-5 text-agri-green-600" /> Streaming Live Weight
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center py-8">
                      <div className="font-mono text-6xl font-bold tracking-tighter text-agri-earth-900 mb-2">
                        {weight?.toFixed(2) || "0.00"}
                      </div>
                      <div className="text-sm font-medium text-agri-earth-500 uppercase tracking-widest">
                        Quintals (Gross)
                      </div>
                      
                      {weight === 20.45 && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 w-full">
                          <Button className="w-full h-12 text-lg" onClick={() => setStep(2)}>
                            Lock Weight & Proceed
                          </Button>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="assay" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <Card className="border-blue-200 bg-white overflow-hidden shadow-sm">
                    <div className="h-1 bg-blue-500 w-full" />
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Droplets className="w-5 h-5 text-blue-600" /> Digital Moisture Assay
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center py-8">
                      {moisture ? (
                        <>
                          <div className="font-mono text-6xl font-bold tracking-tighter text-blue-900 mb-2">
                            {moisture}%
                          </div>
                          <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-8">
                            Passes standard (&lt;12%)
                          </div>
                          <Button className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700" onClick={() => setStep(3)}>
                            Approve Quality
                          </Button>
                        </>
                      ) : (
                        <div className="flex items-center gap-3 text-agri-earth-600 py-8">
                          <div className="w-5 h-5 border-2 border-agri-earth-400 border-t-transparent rounded-full animate-spin" />
                          Reading sensors...
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="settle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <Card className="border-agri-earth-200 bg-white shadow-sm relative overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Banknote className="w-5 h-5 text-agri-earth-700" /> Settlement & DBT
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="bg-agri-earth-50 rounded-xl p-4 border border-agri-earth-100 grid gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-agri-earth-500">Net Weight</span>
                          <span className="font-bold text-agri-earth-900">20.45 Qtl</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-agri-earth-500">MSP Rate (Onion)</span>
                          <span className="font-medium text-agri-earth-900">₹1,200 / Qtl</span>
                        </div>
                        <div className="h-px bg-agri-earth-200 my-1" />
                        <div className="flex justify-between text-base">
                          <span className="font-medium text-agri-earth-900">Total Payable</span>
                          <span className="font-bold text-agri-green-600">₹24,540</span>
                        </div>
                      </div>

                      {settled ? (
                         <div className="bg-agri-green-50 text-agri-green-800 p-4 rounded-xl flex items-start gap-3 border border-agri-green-200">
                          <CheckCircle2 className="w-6 h-6 text-agri-green-600 flex-shrink-0" />
                          <div>
                            <p className="font-semibold">PFMS DBT Triggered</p>
                            <p className="text-sm text-agri-green-700 mt-1">Transaction logged to ledger. Funds will arrive in Aadhaar-seeded account within 48h.</p>
                          </div>
                        </div>
                      ) : (
                        <Button className="w-full h-12 text-lg" disabled={isSettling} onClick={handleSettle}>
                          {isSettling ? (
                            <span className="flex items-center gap-2">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Syncing with PFMS...
                            </span>
                          ) : (
                            "Confirm & Trigger Payment"
                          )}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Ledger Trail sidebar */}
          <div className="hidden md:block">
            <h3 className="text-sm font-semibold text-agri-earth-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Audit Ledger
            </h3>
            <div className="space-y-3 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-agri-earth-200 before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-agri-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" />
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] p-3 rounded-lg border border-agri-earth-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-xs text-agri-earth-900">Arrived</span>
                  </div>
                  <div className="text-xs text-agri-earth-500">Hash verified</div>
                </div>
              </div>
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className={`flex items-center justify-center w-5 h-5 rounded-full border border-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ${step >= 2 ? 'bg-agri-green-500' : 'bg-agri-earth-200'}`} />
                <div className={`w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] p-3 rounded-lg border shadow-sm ${step >= 2 ? 'border-agri-earth-200 bg-white' : 'border-dashed border-agri-earth-200 bg-transparent'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-medium text-xs ${step >= 2 ? 'text-agri-earth-900' : 'text-agri-earth-400'}`}>Weighed</span>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className={`flex items-center justify-center w-5 h-5 rounded-full border border-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ${step >= 3 ? 'bg-agri-green-500' : 'bg-agri-earth-200'}`} />
                <div className={`w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] p-3 rounded-lg border shadow-sm ${step >= 3 ? 'border-agri-earth-200 bg-white' : 'border-dashed border-agri-earth-200 bg-transparent'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-medium text-xs ${step >= 3 ? 'text-agri-earth-900' : 'text-agri-earth-400'}`}>Assay</span>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className={`flex items-center justify-center w-5 h-5 rounded-full border border-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ${settled ? 'bg-agri-green-500' : 'bg-agri-earth-200'}`} />
                <div className={`w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] p-3 rounded-lg border shadow-sm ${settled ? 'border-agri-green-300 bg-agri-green-50' : 'border-dashed border-agri-earth-200 bg-transparent'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-medium text-xs ${settled ? 'text-agri-green-900' : 'text-agri-earth-400'}`}>Settled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
