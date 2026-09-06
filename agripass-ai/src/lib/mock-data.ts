export const MOCK_FARMER = {
  name: "Ramesh Patil",
  kisaanId: "12345678901",
  mobile: "9876543210",
  district: "Nashik",
  village: "Pimpalgaon",
  landSize: "4.5 Acres",
  registeredCrops: [
    { id: "c1", name: "Onion", expectedYield: "60 Quintals" },
    { id: "c2", name: "Soybean", expectedYield: "25 Quintals" }
  ]
}

export const MOCK_MANDIS = [
  { id: "m1", name: "Pimpalgaon Baswant APMC", distance: "12 km", currentQueue: 45, capacity: 200 },
  { id: "m2", name: "Lasalgaon APMC", distance: "28 km", currentQueue: 180, capacity: 250 },
  { id: "m3", name: "Nashik APMC", distance: "35 km", currentQueue: 110, capacity: 300 }
]

export const MOCK_BOOKINGS = [
  {
    id: "BKG-8821",
    crop: "Onion",
    quantity: 20,
    mandi: "Pimpalgaon Baswant APMC",
    date: "2026-09-08",
    timeSlot: "08:00 AM - 10:00 AM",
    status: "Confirmed",
    token: "842911"
  }
]
