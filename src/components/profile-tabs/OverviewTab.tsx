import React from 'react'
import { TrendingUp, TrendingDown, Clock, MapPin, Star, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Driver } from '../../types/driver'

interface OverviewTabProps {
  driver: Driver
}

export function OverviewTab({ driver }: OverviewTabProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE')
  }

  // Mock data for overview
  const weeklyStats = {
    trips: 47,
    earnings: 1240,
    hours: 38,
    avgRating: 4.8,
    tripsChange: 12,
    earningsChange: -5,
    hoursChange: 8
  }

  const recentActivity = [
    { id: 1, type: 'trip', description: 'Fahrt nach München abgeschlossen', time: '2 Std. ago', status: 'completed' },
    { id: 2, type: 'rating', description: '5-Sterne Bewertung erhalten', time: '4 Std. ago', status: 'positive' },
    { id: 3, type: 'document', description: 'Führerschein erneuert', time: '1 Tag ago', status: 'updated' },
    { id: 4, type: 'trip', description: 'Fahrt nach Hamburg abgeschlossen', time: '1 Tag ago', status: 'completed' }
  ]

  const alerts = [
    { id: 1, type: 'warning', message: 'Fahrzeuginspektion fällig in 15 Tagen', priority: 'medium' },
    { id: 2, type: 'info', message: 'Neue Bonusregelung verfügbar', priority: 'low' }
  ]

  return (
    <div className="space-y-6">
      {/* Weekly Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="enterprise-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Fahrten (7 Tage)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-semibold text-foreground">{weeklyStats.trips}</div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-green-600">+{weeklyStats.tripsChange}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Verdienst (7 Tage)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-semibold text-foreground">{formatCurrency(weeklyStats.earnings)}</div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingDown className="h-4 w-4 text-red-600" />
                <span className="text-red-600">{weeklyStats.earningsChange}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Stunden (7 Tage)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-semibold text-foreground">{weeklyStats.hours}h</div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-green-600">+{weeklyStats.hoursChange}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ø Bewertung (7 Tage)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="text-2xl font-semibold text-foreground">{weeklyStats.avgRating}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="enterprise-card">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-foreground">Letzte Aktivitäten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                  <div className="flex-shrink-0 mt-1">
                    {activity.type === 'trip' && <MapPin className="h-4 w-4 text-blue-600" />}
                    {activity.type === 'rating' && <Star className="h-4 w-4 text-yellow-500" />}
                    {activity.type === 'document' && <Clock className="h-4 w-4 text-green-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card className="enterprise-card">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-foreground">Benachrichtigungen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-md bg-muted/30">
                  <AlertCircle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                    alert.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Driver Details */}
      <Card className="enterprise-card">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-foreground">Fahrer-Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Grunddaten</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="text-foreground font-medium">{driver.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">E-Mail:</span>
                  <span className="text-foreground">{driver.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Telefon:</span>
                  <span className="text-foreground">{driver.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Führerschein:</span>
                  <span className="text-foreground">{driver.licenseNumber}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Fahrzeug</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Typ:</span>
                  <span className="text-foreground font-medium">{driver.vehicleType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="text-foreground">
                    {driver.status === 'active' ? 'Aktiv' : 
                     driver.status === 'inactive' ? 'Inaktiv' : 'Gesperrt'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Beigetreten:</span>
                  <span className="text-foreground">{formatDate(driver.joinDate)}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Leistung</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fahrten gesamt:</span>
                  <span className="text-foreground font-medium">{driver.totalTrips.toLocaleString('de-DE')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Verdienst gesamt:</span>
                  <span className="text-foreground font-medium">{formatCurrency(driver.totalEarnings)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bewertung:</span>
                  <span className="text-foreground font-medium">{driver.rating} ★</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}