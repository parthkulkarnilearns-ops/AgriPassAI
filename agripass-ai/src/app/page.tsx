"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Sprout, Phone, CreditCard, ArrowRight, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  const router = useRouter()
  const [step, setStep] = useState<"login" | "otp">("login")
  const [phone, setPhone] = useState("")
  const [kisaanId, setKisaanId] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.length === 10 && kisaanId.length === 11) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setStep("otp")
      }, 1000)
    }
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length === 4) {
      setIsLoading(true)
      // Mocking AgriStack fetch & session creation
      setTimeout(() => {
        setIsLoading(false)
        router.push("/dashboard")
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-agri-earth-50">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-agri-green-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-agri-green-400/30 rounded-full blur-3xl pointer-events-none" />
      
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-agri-green-600 rounded-2xl mb-4 shadow-lg shadow-agri-green-600/30">
            <Sprout className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-agri-earth-900 tracking-tight">AgriPass AI</h1>
          <p className="text-agri-earth-500 mt-2">Dynamic Procurement Scheduling</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-xl shadow-agri-earth-200/50 border-agri-earth-200/50 backdrop-blur-sm bg-white/90">
            <CardHeader>
              <CardTitle className="text-xl">
                {step === "login" ? "Farmer Login" : "Verify OTP"}
              </CardTitle>
              <CardDescription>
                {step === "login" 
                  ? "Enter your details to access your AgriStack profile." 
                  : `We've sent a 4-digit code to +91 ${phone}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === "login" ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-agri-earth-700">Mobile Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-agri-earth-400" />
                      <Input 
                        type="tel" 
                        placeholder="10-digit number" 
                        className="pl-10"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        required
                        minLength={10}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-agri-earth-700">Kisaan ID</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-agri-earth-400" />
                      <Input 
                        type="text" 
                        placeholder="11-digit ID" 
                        className="pl-10"
                        value={kisaanId}
                        onChange={(e) => setKisaanId(e.target.value.replace(/\D/g, '').slice(0, 11))}
                        required
                        minLength={11}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-12 text-base mt-2" disabled={isLoading || phone.length < 10 || kisaanId.length < 11}>
                    {isLoading ? "Sending..." : "Send OTP"}
                    {!isLoading && <ArrowRight className="w-5 h-5 ml-2" />}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-agri-earth-700">One-Time Password</label>
                    <Input 
                      type="text" 
                      placeholder="Enter 4-digit PIN" 
                      className="text-center text-2xl tracking-widest h-14"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      required
                      minLength={4}
                      autoFocus
                    />
                  </div>
                  <Button type="submit" className="w-full h-12 text-base mt-2" disabled={isLoading || otp.length < 4}>
                    {isLoading ? "Verifying..." : "Verify & Login"}
                    {!isLoading && <CheckCircle2 className="w-5 h-5 ml-2" />}
                  </Button>
                  <div className="text-center mt-4">
                    <button 
                      type="button" 
                      className="text-sm text-agri-green-600 hover:underline"
                      onClick={() => setStep("login")}
                    >
                      Use a different number
                    </button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        <div className="text-center mt-8 text-sm text-agri-earth-500">
          <p>Backed by AgriStack and PFMS</p>
        </div>
      </div>
    </div>
  )
}
