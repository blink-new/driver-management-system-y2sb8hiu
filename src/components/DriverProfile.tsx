import React, { useState } from 'react'
import { ArrowLeft, Mail, Phone, Calendar, Car, Star } from 'lucide-react'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Driver } from '../types/driver'
import { OverviewTab } from './profile-tabs/OverviewTab'
import { PerformanceTab } from './profile-tabs/PerformanceTab'
import { PersonalDataTab } from './profile-tabs/PersonalDataTab'
import { AssetsTab } from './profile-tabs/AssetsTab'
import { DocumentsTab } from './profile-tabs/DocumentsTab'
import { PlatformAccountsTab } from './profile-tabs/PlatformAccountsTab'
import { HistoryTab } from './profile-tabs/HistoryTab'

interface DriverProfileProps {
  driver: Driver
  onBack: () => void
}

export function DriverProfile({ driver, onBack }: DriverProfileProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const getStatusDisplay = (status: Driver['status']) => {
    const statusMap = {
      active: { label: 'Aktiv', className: 'status-active' },
      inactive: { label: 'Inaktiv', className: 'status-inactive' },
      suspended: { label: 'Gesperrt', className: 'status-suspended' }
    }
    
    const statusInfo = statusMap[status]
    return (
      <span className={statusInfo.className}>
        {statusInfo.label}
      </span>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="enterprise-header">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Back Button */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zur Übersicht
            </Button>
          </div>

          {/* Driver Header */}
          <div className="flex items-start gap-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={driver.avatar} alt={driver.name} />
              <AvatarFallback className="text-lg bg-muted">
                {driver.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-semibold text-foreground">{driver.name}</h1>
                {getStatusDisplay(driver.status)}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{driver.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{driver.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Car className="h-4 w-4" />
                  <span>{driver.vehicleType}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Seit {formatDate(driver.joinDate)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="enterprise-card p-4">
              <div className="text-2xl font-semibold text-foreground">
                {driver.totalTrips.toLocaleString('de-DE')}
              </div>
              <div className="text-sm text-muted-foreground">Fahrten gesamt</div>
            </div>
            <div className="enterprise-card p-4">
              <div className="text-2xl font-semibold text-foreground">
                {formatCurrency(driver.totalEarnings)}
              </div>
              <div className="text-sm text-muted-foreground">Gesamtverdienst</div>
            </div>
            <div className="enterprise-card p-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="text-2xl font-semibold text-foreground">{driver.rating}</span>
              </div>
              <div className="text-sm text-muted-foreground">Bewertung</div>
            </div>
            <div className="enterprise-card p-4">
              <div className="text-2xl font-semibold text-foreground">
                {driver.licenseNumber}
              </div>
              <div className="text-sm text-muted-foreground">Führerschein</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-white border border-border">
            <TabsTrigger 
              value="overview"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Übersicht
            </TabsTrigger>
            <TabsTrigger 
              value="performance"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Leistung
            </TabsTrigger>
            <TabsTrigger 
              value="personal"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Persönliche Daten
            </TabsTrigger>
            <TabsTrigger 
              value="assets"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Assets
            </TabsTrigger>
            <TabsTrigger 
              value="documents"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Dokumente
            </TabsTrigger>
            <TabsTrigger 
              value="platforms"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Plattformen
            </TabsTrigger>
            <TabsTrigger 
              value="history"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Verlauf
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <OverviewTab driver={driver} />
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <PerformanceTab driverId={driver.id} />
          </TabsContent>

          <TabsContent value="personal" className="space-y-6">
            <PersonalDataTab driverId={driver.id} />
          </TabsContent>

          <TabsContent value="assets" className="space-y-6">
            <AssetsTab driverId={driver.id} />
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <DocumentsTab driverId={driver.id} />
          </TabsContent>

          <TabsContent value="platforms" className="space-y-6">
            <PlatformAccountsTab driverId={driver.id} />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <HistoryTab driverId={driver.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}