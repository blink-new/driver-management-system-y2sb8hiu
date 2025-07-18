import { Driver, PerformanceMetrics, PersonalData, Asset, Document, PlatformAccount, HistoryEntry } from '../types/driver'

export const mockDrivers: Driver[] = [
  {
    id: '1',
    name: 'Max Mustermann',
    email: 'max.mustermann@email.com',
    phone: '+49 123 456 7890',
    status: 'active',
    licenseNumber: 'B123456789',
    vehicleType: 'PKW',
    joinDate: '2023-01-15',
    rating: 4.8,
    totalTrips: 1250,
    totalEarnings: 15750.50,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Anna Schmidt',
    email: 'anna.schmidt@email.com',
    phone: '+49 987 654 3210',
    status: 'active',
    licenseNumber: 'B987654321',
    vehicleType: 'Transporter',
    joinDate: '2022-11-08',
    rating: 4.9,
    totalTrips: 2100,
    totalEarnings: 28900.75,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c5e8e1?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Thomas Weber',
    email: 'thomas.weber@email.com',
    phone: '+49 555 123 4567',
    status: 'inactive',
    licenseNumber: 'B555123456',
    vehicleType: 'LKW',
    joinDate: '2023-03-22',
    rating: 4.6,
    totalTrips: 890,
    totalEarnings: 12340.25,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'Sarah Fischer',
    email: 'sarah.fischer@email.com',
    phone: '+49 777 888 9999',
    status: 'active',
    licenseNumber: 'B777888999',
    vehicleType: 'PKW',
    joinDate: '2022-08-14',
    rating: 4.7,
    totalTrips: 1680,
    totalEarnings: 21450.80,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '5',
    name: 'Michael Bauer',
    email: 'michael.bauer@email.com',
    phone: '+49 333 444 5555',
    status: 'suspended',
    licenseNumber: 'B333444555',
    vehicleType: 'Transporter',
    joinDate: '2023-05-10',
    rating: 4.2,
    totalTrips: 450,
    totalEarnings: 6780.90,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  }
]

export const getPerformanceMetrics = (driverId: string): PerformanceMetrics => {
  const driver = mockDrivers.find(d => d.id === driverId)
  if (!driver) throw new Error('Driver not found')
  
  return {
    rating: driver.rating,
    totalTrips: driver.totalTrips,
    completedTrips: Math.floor(driver.totalTrips * 0.95),
    cancelledTrips: Math.floor(driver.totalTrips * 0.05),
    totalEarnings: driver.totalEarnings,
    averageRating: driver.rating,
    onTimePercentage: Math.floor(Math.random() * 20) + 80,
    customerSatisfaction: Math.floor(Math.random() * 15) + 85
  }
}

export const getPersonalData = (driverId: string): PersonalData => {
  const names = {
    '1': { firstName: 'Max', lastName: 'Mustermann' },
    '2': { firstName: 'Anna', lastName: 'Schmidt' },
    '3': { firstName: 'Thomas', lastName: 'Weber' },
    '4': { firstName: 'Sarah', lastName: 'Fischer' },
    '5': { firstName: 'Michael', lastName: 'Bauer' }
  }
  
  const name = names[driverId as keyof typeof names] || { firstName: 'Unknown', lastName: 'Driver' }
  
  return {
    firstName: name.firstName,
    lastName: name.lastName,
    dateOfBirth: '1985-06-15',
    address: 'Musterstraße 123',
    city: 'Berlin',
    postalCode: '10115',
    country: 'Deutschland',
    emergencyContact: 'Maria Mustermann',
    emergencyPhone: '+49 123 456 7891'
  }
}

export const getAssets = (driverId: string): Asset[] => [
  {
    id: '1',
    type: 'vehicle',
    name: 'Mercedes Sprinter',
    model: '2022',
    serialNumber: 'WDB9066331234567',
    status: 'active',
    assignedDate: '2023-01-15'
  },
  {
    id: '2',
    type: 'device',
    name: 'GPS Tracker',
    model: 'TomTom GO',
    serialNumber: 'TT123456789',
    status: 'active',
    assignedDate: '2023-01-15'
  },
  {
    id: '3',
    type: 'equipment',
    name: 'Sicherheitsweste',
    model: 'Hi-Vis',
    serialNumber: 'HV001234',
    status: 'active',
    assignedDate: '2023-01-15'
  }
]

export const getDocuments = (driverId: string): Document[] => [
  {
    id: '1',
    type: 'Führerschein',
    name: 'Führerschein Klasse B',
    uploadDate: '2023-01-15',
    expiryDate: '2033-01-15',
    status: 'valid',
    fileUrl: '#'
  },
  {
    id: '2',
    type: 'Personalausweis',
    name: 'Personalausweis',
    uploadDate: '2023-01-15',
    expiryDate: '2028-01-15',
    status: 'valid',
    fileUrl: '#'
  },
  {
    id: '3',
    type: 'Gesundheitszeugnis',
    name: 'Ärztliches Attest',
    uploadDate: '2023-01-15',
    expiryDate: '2024-01-15',
    status: 'expired',
    fileUrl: '#'
  }
]

export const getPlatformAccounts = (driverId: string): PlatformAccount[] => [
  {
    id: '1',
    platform: 'Uber',
    username: 'max.mustermann',
    status: 'active',
    joinDate: '2023-01-15',
    rating: 4.8
  },
  {
    id: '2',
    platform: 'Bolt',
    username: 'max_m_driver',
    status: 'active',
    joinDate: '2023-02-01',
    rating: 4.7
  },
  {
    id: '3',
    platform: 'FREE NOW',
    username: 'maxmustermann123',
    status: 'inactive',
    joinDate: '2022-12-15',
    rating: 4.9
  }
]

export const getHistory = (driverId: string): HistoryEntry[] => [
  {
    id: '1',
    date: '2024-01-15',
    type: 'trip',
    description: 'Fahrt abgeschlossen',
    details: 'Berlin Hauptbahnhof → Flughafen Tegel'
  },
  {
    id: '2',
    date: '2024-01-14',
    type: 'payment',
    description: 'Auszahlung erhalten',
    details: '€125.50'
  },
  {
    id: '3',
    date: '2024-01-13',
    type: 'document',
    description: 'Dokument hochgeladen',
    details: 'Führerschein erneuert'
  },
  {
    id: '4',
    date: '2024-01-12',
    type: 'status_change',
    description: 'Status geändert',
    details: 'Von inaktiv zu aktiv'
  }
]