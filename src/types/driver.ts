export interface Driver {
  id: string
  name: string
  email: string
  phone: string
  status: 'active' | 'inactive' | 'suspended'
  licenseNumber: string
  vehicleType: string
  joinDate: string
  rating: number
  totalTrips: number
  totalEarnings: number
  avatar?: string
}

export interface PerformanceMetrics {
  rating: number
  totalTrips: number
  completedTrips: number
  cancelledTrips: number
  totalEarnings: number
  averageRating: number
  onTimePercentage: number
  customerSatisfaction: number
}

export interface PersonalData {
  firstName: string
  lastName: string
  dateOfBirth: string
  address: string
  city: string
  postalCode: string
  country: string
  emergencyContact: string
  emergencyPhone: string
}

export interface Asset {
  id: string
  type: 'vehicle' | 'equipment' | 'device'
  name: string
  model: string
  serialNumber: string
  status: 'active' | 'maintenance' | 'retired'
  assignedDate: string
}

export interface Document {
  id: string
  type: string
  name: string
  uploadDate: string
  expiryDate?: string
  status: 'valid' | 'expired' | 'pending'
  fileUrl: string
}

export interface PlatformAccount {
  id: string
  platform: string
  username: string
  status: 'active' | 'inactive'
  joinDate: string
  rating: number
}

export interface HistoryEntry {
  id: string
  date: string
  type: 'trip' | 'payment' | 'document' | 'status_change'
  description: string
  details?: string
}