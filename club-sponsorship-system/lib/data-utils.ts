import type { Sponsor, Fund, Volunteer } from "@/lib/types"

// Local storage keys
const SPONSORS_KEY = "club_sponsorship_sponsors"
const FUNDS_KEY = "club_sponsorship_funds"
const VOLUNTEERS_KEY = "club_sponsorship_volunteers"
const DATA_INITIALIZED_KEY = "club_sponsorship_initialized"

// Sample data for initial setup
const sampleSponsors: Sponsor[] = [
  {
    id: "s1",
    name: "John Smith",
    company: "Tech Solutions Inc.",
    email: "john@techsolutions.com",
    level: "gold",
    amount: 5000,
    renewalDate: new Date(new Date().setDate(new Date().getDate() + 45)).toISOString(),
    status: "active",
  },
  {
    id: "s2",
    name: "Sarah Johnson",
    company: "Digital Innovations",
    email: "sarah@digitalinnovations.com",
    level: "silver",
    amount: 2500,
    renewalDate: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString(),
    status: "active",
  },
  {
    id: "s3",
    name: "Michael Brown",
    company: "Creative Designs",
    email: "michael@creativedesigns.com",
    level: "bronze",
    amount: 1000,
    renewalDate: new Date(new Date().setDate(new Date().getDate() + 90)).toISOString(),
    status: "active",
  },
  {
    id: "s4",
    name: "Emily Davis",
    company: "Future Technologies",
    email: "emily@futuretech.com",
    level: "gold",
    amount: 4500,
    renewalDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
    status: "active",
  },
  {
    id: "s5",
    name: "Robert Wilson",
    company: "Innovative Solutions",
    email: "robert@innovativesolutions.com",
    level: "silver",
    amount: 2000,
    renewalDate: new Date(new Date().setDate(new Date().getDate() + 60)).toISOString(),
    status: "pending",
  },
  {
    id: "s6",
    name: "Jennifer Martinez",
    company: "Global Enterprises",
    email: "jennifer@globalenterprises.com",
    level: "gold",
    amount: 6000,
    renewalDate: new Date(new Date().setDate(new Date().getDate() + 120)).toISOString(),
    status: "active",
  },
  {
    id: "s7",
    name: "Thomas Anderson",
    company: "Matrix Systems",
    email: "thomas@matrixsystems.com",
    level: "bronze",
    amount: 1200,
    renewalDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(),
    status: "active",
  },
  {
    id: "s8",
    name: "Lisa Rodriguez",
    company: "Sunrise Media",
    email: "lisa@sunrisemedia.com",
    level: "silver",
    amount: 3000,
    renewalDate: new Date(new Date().setDate(new Date().getDate() + 75)).toISOString(),
    status: "active",
  },
  {
    id: "s9",
    name: "Kevin Taylor",
    company: "Quantum Computing",
    email: "kevin@quantumcomputing.com",
    level: "gold",
    amount: 7500,
    renewalDate: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(),
    status: "pending",
  },
  {
    id: "s10",
    name: "Amanda White",
    company: "Stellar Graphics",
    email: "amanda@stellargraphics.com",
    level: "bronze",
    amount: 800,
    renewalDate: new Date(new Date().setDate(new Date().getDate() + 180)).toISOString(),
    status: "expired",
  },
  {
    id: "s11",
    name: "Daniel Lee",
    company: "Innovative Tech",
    email: "daniel@innovativetech.com",
    level: "silver",
    amount: 2800,
    renewalDate: new Date(new Date().setDate(new Date().getDate() + 20)).toISOString(),
    status: "active",
  },
  {
    id: "s12",
    name: "Michelle Clark",
    company: "Digital Solutions",
    email: "michelle@digitalsolutions.com",
    level: "gold",
    amount: 5500,
    renewalDate: new Date(new Date().setDate(new Date().getDate() + 40)).toISOString(),
    status: "active",
  },
]

const sampleFunds: Fund[] = [
  {
    id: "f1",
    description: "Sponsorship from Tech Solutions Inc.",
    type: "income",
    category: "sponsorship",
    amount: 5000,
    date: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString(),
  },
  {
    id: "f2",
    description: "Sponsorship from Digital Innovations",
    type: "income",
    category: "sponsorship",
    amount: 2500,
    date: new Date(new Date().setDate(new Date().getDate() - 25)).toISOString(),
  },
  {
    id: "f3",
    description: "Marketing materials for event",
    type: "expense",
    category: "marketing",
    amount: 1200,
    date: new Date(new Date().setDate(new Date().getDate() - 20)).toISOString(),
  },
  {
    id: "f4",
    description: "Venue rental for networking event",
    type: "expense",
    category: "event",
    amount: 2000,
    date: new Date(new Date().setDate(new Date().getDate() - 15)).toISOString(),
  },
  {
    id: "f5",
    description: "Sponsorship from Creative Designs",
    type: "income",
    category: "sponsorship",
    amount: 1000,
    date: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
  },
  {
    id: "f6",
    description: "Volunteer appreciation gifts",
    type: "expense",
    category: "volunteer",
    amount: 500,
    date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
  },
  {
    id: "f7",
    description: "Sponsorship from Future Technologies",
    type: "income",
    category: "sponsorship",
    amount: 4500,
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
  },
  {
    id: "f8",
    description: "Donation from alumni",
    type: "income",
    category: "donation",
    amount: 1500,
    date: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),
  },
  {
    id: "f9",
    description: "Website development and maintenance",
    type: "expense",
    category: "operations",
    amount: 1800,
    date: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString(),
  },
  {
    id: "f10",
    description: "Annual club fair booth setup",
    type: "expense",
    category: "marketing",
    amount: 750,
    date: new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString(),
  },
  {
    id: "f11",
    description: "Sponsorship from Global Enterprises",
    type: "income",
    category: "sponsorship",
    amount: 6000,
    date: new Date(new Date().setMonth(new Date().getMonth() - 4)).toISOString(),
  },
  {
    id: "f12",
    description: "Equipment purchase for events",
    type: "expense",
    category: "operations",
    amount: 3200,
    date: new Date(new Date().setMonth(new Date().getMonth() - 5)).toISOString(),
  },
  {
    id: "f13",
    description: "Sponsorship from Matrix Systems",
    type: "income",
    category: "sponsorship",
    amount: 1200,
    date: new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString(),
  },
  {
    id: "f14",
    description: "Catering for networking event",
    type: "expense",
    category: "event",
    amount: 1500,
    date: new Date(new Date().setMonth(new Date().getMonth() - 7)).toISOString(),
  },
  {
    id: "f15",
    description: "Sponsorship from Sunrise Media",
    type: "income",
    category: "sponsorship",
    amount: 3000,
    date: new Date(new Date().setMonth(new Date().getMonth() - 8)).toISOString(),
  },
  {
    id: "f16",
    description: "Promotional materials",
    type: "expense",
    category: "marketing",
    amount: 900,
    date: new Date(new Date().setMonth(new Date().getMonth() - 9)).toISOString(),
  },
  {
    id: "f17",
    description: "Sponsorship from Quantum Computing",
    type: "income",
    category: "sponsorship",
    amount: 7500,
    date: new Date(new Date().setMonth(new Date().getMonth() - 10)).toISOString(),
  },
  {
    id: "f18",
    description: "Office supplies",
    type: "expense",
    category: "operations",
    amount: 350,
    date: new Date(new Date().setMonth(new Date().getMonth() - 11)).toISOString(),
  },
]

const sampleVolunteers: Volunteer[] = [
  {
    id: "v1",
    name: "Alex Thompson",
    email: "alex@example.com",
    phone: "(555) 123-4567",
    avatar: "",
    sponsorsAcquired: 2,
    totalAmountAcquired: 7500,
  },
  {
    id: "v2",
    name: "Jessica Lee",
    email: "jessica@example.com",
    phone: "(555) 234-5678",
    avatar: "",
    sponsorsAcquired: 1,
    totalAmountAcquired: 2500,
  },
  {
    id: "v3",
    name: "David Miller",
    email: "david@example.com",
    phone: "(555) 345-6789",
    avatar: "",
    sponsorsAcquired: 1,
    totalAmountAcquired: 1000,
  },
  {
    id: "v4",
    name: "Sophia Garcia",
    email: "sophia@example.com",
    phone: "(555) 456-7890",
    avatar: "",
    sponsorsAcquired: 1,
    totalAmountAcquired: 4500,
  },
  {
    id: "v5",
    name: "James Wilson",
    email: "james@example.com",
    phone: "(555) 567-8901",
    avatar: "",
    sponsorsAcquired: 0,
    totalAmountAcquired: 0,
  },
  {
    id: "v6",
    name: "Emma Rodriguez",
    email: "emma@example.com",
    phone: "(555) 678-9012",
    avatar: "",
    sponsorsAcquired: 3,
    totalAmountAcquired: 9500,
  },
  {
    id: "v7",
    name: "Ryan Chen",
    email: "ryan@example.com",
    phone: "(555) 789-0123",
    avatar: "",
    sponsorsAcquired: 2,
    totalAmountAcquired: 6000,
  },
  {
    id: "v8",
    name: "Olivia Kim",
    email: "olivia@example.com",
    phone: "(555) 890-1234",
    avatar: "",
    sponsorsAcquired: 1,
    totalAmountAcquired: 3000,
  },
  {
    id: "v9",
    name: "Ethan Patel",
    email: "ethan@example.com",
    phone: "(555) 901-2345",
    avatar: "",
    sponsorsAcquired: 2,
    totalAmountAcquired: 8300,
  },
  {
    id: "v10",
    name: "Ava Johnson",
    email: "ava@example.com",
    phone: "(555) 012-3456",
    avatar: "",
    sponsorsAcquired: 1,
    totalAmountAcquired: 5500,
  },
]

// Initialize data if not already done
export const initializeData = () => {
  if (typeof window === "undefined") return

  const isInitialized = localStorage.getItem(DATA_INITIALIZED_KEY)

  if (!isInitialized) {
    localStorage.setItem(SPONSORS_KEY, JSON.stringify(sampleSponsors))
    localStorage.setItem(FUNDS_KEY, JSON.stringify(sampleFunds))
    localStorage.setItem(VOLUNTEERS_KEY, JSON.stringify(sampleVolunteers))
    localStorage.setItem(DATA_INITIALIZED_KEY, "true")
  }
}

// Clear all data
export const clearAllData = () => {
  if (typeof window === "undefined") return

  localStorage.removeItem(SPONSORS_KEY)
  localStorage.removeItem(FUNDS_KEY)
  localStorage.removeItem(VOLUNTEERS_KEY)
  localStorage.removeItem(DATA_INITIALIZED_KEY)

  // Trigger storage event for components to reload data
  window.dispatchEvent(new Event("storage"))
}

// Sponsor CRUD operations
export const getAllSponsors = (): Sponsor[] => {
  if (typeof window === "undefined") return []

  const sponsors = localStorage.getItem(SPONSORS_KEY)
  return sponsors ? JSON.parse(sponsors) : []
}

export const addSponsor = (sponsor: Sponsor) => {
  if (typeof window === "undefined") return

  const sponsors = getAllSponsors()
  sponsors.push(sponsor)
  localStorage.setItem(SPONSORS_KEY, JSON.stringify(sponsors))

  // Trigger storage event for components to reload data
  window.dispatchEvent(new Event("storage"))
}

export const updateSponsor = (updatedSponsor: Sponsor) => {
  if (typeof window === "undefined") return

  const sponsors = getAllSponsors()
  const index = sponsors.findIndex((s) => s.id === updatedSponsor.id)

  if (index !== -1) {
    sponsors[index] = updatedSponsor
    localStorage.setItem(SPONSORS_KEY, JSON.stringify(sponsors))

    // Trigger storage event for components to reload data
    window.dispatchEvent(new Event("storage"))
  }
}

export const deleteSponsor = (id: string) => {
  if (typeof window === "undefined") return

  const sponsors = getAllSponsors()
  const filteredSponsors = sponsors.filter((s) => s.id !== id)
  localStorage.setItem(SPONSORS_KEY, JSON.stringify(filteredSponsors))

  // Trigger storage event for components to reload data
  window.dispatchEvent(new Event("storage"))
}

// Fund CRUD operations
export const getAllFunds = (): Fund[] => {
  if (typeof window === "undefined") return []

  const funds = localStorage.getItem(FUNDS_KEY)
  return funds ? JSON.parse(funds) : []
}

export const addFund = (fund: Fund) => {
  if (typeof window === "undefined") return

  const funds = getAllFunds()
  funds.push(fund)
  localStorage.setItem(FUNDS_KEY, JSON.stringify(funds))

  // Trigger storage event for components to reload data
  window.dispatchEvent(new Event("storage"))
}

export const updateFund = (updatedFund: Fund) => {
  if (typeof window === "undefined") return

  const funds = getAllFunds()
  const index = funds.findIndex((f) => f.id === updatedFund.id)

  if (index !== -1) {
    funds[index] = updatedFund
    localStorage.setItem(FUNDS_KEY, JSON.stringify(funds))

    // Trigger storage event for components to reload data
    window.dispatchEvent(new Event("storage"))
  }
}

export const deleteFund = (id: string) => {
  if (typeof window === "undefined") return

  const funds = getAllFunds()
  const filteredFunds = funds.filter((f) => f.id !== id)
  localStorage.setItem(FUNDS_KEY, JSON.stringify(filteredFunds))

  // Trigger storage event for components to reload data
  window.dispatchEvent(new Event("storage"))
}

// Volunteer CRUD operations
export const getAllVolunteers = (): Volunteer[] => {
  if (typeof window === "undefined") return []

  const volunteers = localStorage.getItem(VOLUNTEERS_KEY)
  return volunteers ? JSON.parse(volunteers) : []
}

export const addVolunteer = (volunteer: Volunteer) => {
  if (typeof window === "undefined") return

  const volunteers = getAllVolunteers()
  volunteers.push(volunteer)
  localStorage.setItem(VOLUNTEERS_KEY, JSON.stringify(volunteers))

  // Trigger storage event for components to reload data
  window.dispatchEvent(new Event("storage"))
}

export const updateVolunteer = (updatedVolunteer: Volunteer) => {
  if (typeof window === "undefined") return

  const volunteers = getAllVolunteers()
  const index = volunteers.findIndex((v) => v.id === updatedVolunteer.id)

  if (index !== -1) {
    volunteers[index] = updatedVolunteer
    localStorage.setItem(VOLUNTEERS_KEY, JSON.stringify(volunteers))

    // Trigger storage event for components to reload data
    window.dispatchEvent(new Event("storage"))
  }
}

export const deleteVolunteer = (id: string) => {
  if (typeof window === "undefined") return

  const volunteers = getAllVolunteers()
  const filteredVolunteers = volunteers.filter((v) => v.id !== id)
  localStorage.setItem(VOLUNTEERS_KEY, JSON.stringify(filteredVolunteers))

  // Trigger storage event for components to reload data
  window.dispatchEvent(new Event("storage"))
}

// Advanced search function
export const searchSponsors = (query: string, filters: { level?: string[]; status?: string[] } = {}): Sponsor[] => {
  if (typeof window === "undefined") return []

  const sponsors = getAllSponsors()
  return sponsors.filter((sponsor) => {
    // Search by query
    const matchesQuery =
      query === "" ||
      sponsor.name.toLowerCase().includes(query.toLowerCase()) ||
      sponsor.company.toLowerCase().includes(query.toLowerCase()) ||
      sponsor.email.toLowerCase().includes(query.toLowerCase())

    // Filter by level
    const matchesLevel = !filters.level || filters.level.length === 0 || filters.level.includes(sponsor.level)

    // Filter by status
    const matchesStatus = !filters.status || filters.status.length === 0 || filters.status.includes(sponsor.status)

    return matchesQuery && matchesLevel && matchesStatus
  })
}

// Get sponsors by renewal date range
export const getSponsorsByRenewalDateRange = (startDate: Date, endDate: Date): Sponsor[] => {
  if (typeof window === "undefined") return []

  const sponsors = getAllSponsors()
  return sponsors.filter((sponsor) => {
    const renewalDate = new Date(sponsor.renewalDate)
    return renewalDate >= startDate && renewalDate <= endDate
  })
}

// Get funds by date range
export const getFundsByDateRange = (startDate: Date, endDate: Date): Fund[] => {
  if (typeof window === "undefined") return []

  const funds = getAllFunds()
  return funds.filter((fund) => {
    const date = new Date(fund.date)
    return date >= startDate && date <= endDate
  })
}

// Get total income and expenses by month
export const getMonthlyFinancials = (): { month: string; income: number; expense: number }[] => {
  if (typeof window === "undefined") return []

  const funds = getAllFunds()
  const monthlyData: Record<string, { income: number; expense: number }> = {}

  // Initialize all months of the current year
  const currentYear = new Date().getFullYear()
  for (let i = 0; i < 12; i++) {
    const monthKey = `${currentYear}-${String(i + 1).padStart(2, "0")}`
    monthlyData[monthKey] = { income: 0, expense: 0 }
  }

  // Populate with actual data
  funds.forEach((fund) => {
    const date = new Date(fund.date)
    const year = date.getFullYear()
    // Only include current year data
    if (year === currentYear) {
      const month = date.getMonth() + 1
      const monthKey = `${year}-${String(month).padStart(2, "0")}`

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { income: 0, expense: 0 }
      }

      if (fund.type === "income") {
        monthlyData[monthKey].income += fund.amount
      } else {
        monthlyData[monthKey].expense += fund.amount
      }
    }
  })

  // Convert to array and sort by month
  return Object.entries(monthlyData)
    .map(([key, value]) => {
      const [year, month] = key.split("-")
      const monthName = new Date(Number.parseInt(year), Number.parseInt(month) - 1, 1).toLocaleString("default", {
        month: "short",
      })
      return {
        month: monthName,
        income: value.income,
        expense: value.expense,
      }
    })
    .sort((a, b) => {
      const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
    })
}

// Get top performing volunteers
export const getTopVolunteers = (limit = 5): Volunteer[] => {
  if (typeof window === "undefined") return []

  const volunteers = getAllVolunteers()
  return [...volunteers].sort((a, b) => b.totalAmountAcquired - a.totalAmountAcquired).slice(0, limit)
}

// Get sponsorship statistics
export const getSponsorshipStats = (): {
  totalAmount: number
  byLevel: Record<string, { count: number; amount: number }>
  byStatus: Record<string, number>
} => {
  if (typeof window === "undefined") return { totalAmount: 0, byLevel: {}, byStatus: {} }

  const sponsors = getAllSponsors()
  const stats = {
    totalAmount: 0,
    byLevel: {} as Record<string, { count: number; amount: number }>,
    byStatus: {} as Record<string, number>,
  }

  sponsors.forEach((sponsor) => {
    // Total amount
    stats.totalAmount += sponsor.amount

    // By level
    if (!stats.byLevel[sponsor.level]) {
      stats.byLevel[sponsor.level] = { count: 0, amount: 0 }
    }
    stats.byLevel[sponsor.level].count += 1
    stats.byLevel[sponsor.level].amount += sponsor.amount

    // By status
    if (!stats.byStatus[sponsor.status]) {
      stats.byStatus[sponsor.status] = 0
    }
    stats.byStatus[sponsor.status] += 1
  })

  return stats
}

