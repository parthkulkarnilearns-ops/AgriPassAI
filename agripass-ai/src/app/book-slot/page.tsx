"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Check, ChevronRight, Leaf, MapPin, Clock, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MOCK_FARMER, MOCK_MANDIS } from "@/lib/mock-data"

export default function BookSlot() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null)
  const [quantity, setQuantity] = useState("")
  const [selectedMandi, setSelectedMandi] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const timeSlots = [
    "06:00 AM - 08:00 AM",
    "08:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 02:00 PM",
    "02:00 PM - 04:00 PM"
  ]

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
    else handleSubmit()
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    // Simulate validation engine delay
    setTimeout(() => {
      setIsSubmitting(false)
      // Pass a random ID for the new gate pass
      router.push(`/gate-pass/BKG-${Math.floor(Math.random() * 10000)}?success=true`)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-agri-earth-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-agri-earth-200 sticky top-0 z-10 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => step > 1 ? setStep(step - 1) : router.back()} className="p-2 -ml-2 text-agri-earth-600 hover:bg-agri-earth-100 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-semibold text-agri-earth-900">Book Slot</span>
        </div>
        <div className="text-sm font-medium text-agri-green-600">
          Step {step} of 4
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-agri-earth-200">
        <motion.div 
          className="h-full bg-agri-green-500"
          initial={{ width: "25%" }}
          animate={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 pt-6 pb-24 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-agri-earth-900">Select Crop</h2>
                <p className="text-agri-earth-600 mt-1">Choose from your AgriStack registered crops.</p>
              </div>

              <div className="space-y-3">
                {MOCK_FARMER.registeredCrops.map(crop => (
                  <Card 
                    key={crop.id}
                    className={`cursor-pointer transition-all ${selectedCrop === crop.id ? 'border-agri-green-500 bg-agri-green-50 ring-1 ring-agri-green-500' : 'hover:border-agri-green-300'}`}
                    onClick={() => setSelectedCrop(crop.id)}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${selectedCrop === crop.id ? 'bg-agri-green-200 text-agri-green-800' : 'bg-agri-earth-100 text-agri-earth-600'}`}>
                          <Leaf className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg text-agri-earth-900">{crop.name}</p>
                          <p className="text-sm text-agri-earth-500">Yield Limit: {crop.expectedYield}</p>
                        </div>
                      </div>
                      {selectedCrop === crop.id && <Check className="w-6 h-6 text-agri-green-600" />}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-agri-earth-900">Declare Quantity</h2>
                <p className="text-agri-earth-600 mt-1">Enter the amount you wish to sell (in quintals).</p>
              </div>

              <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex gap-3 border border-blue-100">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">The Validation Engine will check this against your district's yield ceiling to prevent hoarding.</p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Input 
                    type="number"
                    placeholder="0"
                    className="text-4xl h-24 pl-6 pr-24 font-bold text-agri-earth-900 bg-white"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    autoFocus
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xl font-medium text-agri-earth-400">
                    Qtl
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-agri-earth-900">Select Mandi</h2>
                <p className="text-agri-earth-600 mt-1">Showing available mandis near Nashik.</p>
              </div>

              <div className="space-y-4">
                {MOCK_MANDIS.map(mandi => {
                  const isCrowded = mandi.currentQueue > mandi.capacity * 0.8;
                  return (
                    <Card 
                      key={mandi.id}
                      className={`cursor-pointer transition-all ${selectedMandi === mandi.id ? 'border-agri-green-500 bg-agri-green-50 ring-1 ring-agri-green-500' : 'hover:border-agri-green-300'}`}
                      onClick={() => setSelectedMandi(mandi.id)}
                    >
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg text-agri-earth-900">{mandi.name}</h3>
                            <p className="text-sm text-agri-earth-500 flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3" /> {mandi.distance} away
                            </p>
                          </div>
                          {selectedMandi === mandi.id && <div className="bg-agri-green-600 rounded-full p-1"><Check className="w-4 h-4 text-white" /></div>}
                        </div>
                        
                        <div className="bg-white rounded-lg p-3 border border-agri-earth-100 flex items-center justify-between">
                          <div className="text-sm font-medium text-agri-earth-700">Live Capacity:</div>
                          <div className={`text-sm font-bold ${isCrowded ? 'text-amber-600' : 'text-agri-green-600'}`}>
                            {mandi.capacity - mandi.currentQueue} slots open
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-agri-earth-900">Select Time Slot</h2>
                <p className="text-agri-earth-600 mt-1">Choose a 2-hour window for arrival.</p>
              </div>

              <div className="grid gap-3">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all text-left ${selectedTime === time ? 'border-agri-green-500 bg-agri-green-50 ring-1 ring-agri-green-500' : 'bg-white border-agri-earth-200 hover:border-agri-green-300'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Clock className={`w-5 h-5 ${selectedTime === time ? 'text-agri-green-600' : 'text-agri-earth-400'}`} />
                      <span className={`font-medium ${selectedTime === time ? 'text-agri-green-900' : 'text-agri-earth-700'}`}>{time}</span>
                    </div>
                    {selectedTime === time && <Check className="w-5 h-5 text-agri-green-600" />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer / Next Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-agri-earth-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
        <div className="max-w-3xl mx-auto flex gap-3">
          <Button 
            className="flex-1 h-14 text-lg rounded-xl"
            disabled={
              (step === 1 && !selectedCrop) ||
              (step === 2 && (!quantity || Number(quantity) <= 0)) ||
              (step === 3 && !selectedMandi) ||
              (step === 4 && !selectedTime) ||
              isSubmitting
            }
            onClick={handleNext}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Validating...
              </span>
            ) : step === 4 ? (
              "Confirm Booking"
            ) : (
              <span className="flex items-center gap-2">
                Continue <ChevronRight className="w-5 h-5" />
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
