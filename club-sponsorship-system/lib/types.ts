export interface Sponsor {
  id: string
  name: string
  company: string
  email: string
  level: "gold" | "silver" | "bronze"
  amount: number
  renewalDate: string
  status: "active" | "pending" | "expired"
}

export interface Fund {
  id: string
  description: string
  type: "income" | "expense"
  category: string
  amount: number
  date: string
}

export interface Volunteer {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  sponsorsAcquired: number
  totalAmountAcquired: number
}

