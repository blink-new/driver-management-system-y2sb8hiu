import React from 'react'
import { TrendingUp, Star, Clock, Target, Award, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Progress } from '../ui/progress'
import { Badge } from '../ui/badge'
import { getPerformanceMetrics } from '../../data/mockData'

interface PerformanceTabProps {
  driverId: string
}

export function PerformanceTab({ driverId }: PerformanceTabProps) {
  const metrics = getPerformanceMetrics(driverId)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  }

  const performanceGoals = [
    { title: 'Monatliche Fahrten', current: 85, target: 100, unit: 'Fahrten' },
    { title: 'Bewertung', current: metrics.rating, target: 4.8, unit: '★' },
    { title: 'Pünktlichkeit', current: metrics.onTimePercentage, target: 90, unit: '%' },
    { title: 'Kundenzufriedenheit', current: metrics.customerSatisfaction, target: 95, unit: '%' }
  ]

  const achievements = [
    { title: '100 Fahrten Milestone', description: 'Erste 100 Fahrten abgeschlossen', date: '2023-02-15', icon: Target },
    { title: 'Top Performer', description: 'Unter den besten 10% der Fahrer', date: '2023-03-01', icon: Award },
    { title: '5-Sterne Bewertung', description: '50 aufeinanderfolgende 5-Sterne Bewertungen', date: '2023-03-15', icon: Star },
    { title: 'Pünktlichkeits-Champion', description: '95% Pünktlichkeitsrate erreicht', date: '2023-04-01', icon: Clock }
  ]

  const weeklyStats = [
    { day: 'Mo', trips: 12, earnings: 180 },
    { day: 'Di', trips: 15, earnings: 225 },
    { day: 'Mi', trips: 18, earnings: 270 },
    { day: 'Do', trips: 14, earnings: 210 },
    { day: 'Fr', trips: 20, earnings: 300 },
    { day: 'Sa', trips: 25, earnings: 375 },
    { day: 'So', trips: 16, earnings: 240 }
  ]

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamte Fahrten</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalTrips.toLocaleString('de-DE')}</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {metrics.completedTrips} abgeschlossen
              </Badge>
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                {metrics.cancelledTrips} storniert
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Durchschnittsbewertung</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-1">
              {metrics.averageRating}
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Basierend auf {metrics.completedTrips} Bewertungen
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pünktlichkeit</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.onTimePercentage}%</div>
            <Progress value={metrics.onTimePercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamtverdienst</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(metrics.totalEarnings)}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Ø {formatCurrency(metrics.totalEarnings / metrics.totalTrips)} pro Fahrt
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Leistungsziele</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {performanceGoals.map((goal, index) => {
              const percentage = Math.min((goal.current / goal.target) * 100, 100)
              const isAchieved = goal.current >= goal.target
              
              return (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{goal.title}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {goal.current}{goal.unit} / {goal.target}{goal.unit}
                      </span>
                      {isAchieved && <Badge className="bg-green-100 text-green-800">Erreicht</Badge>}
                    </div>
                  </div>
                  <Progress 
                    value={percentage} 
                    className={isAchieved ? 'bg-green-100' : ''} 
                  />
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Weekly Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Wochenleistung</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weeklyStats.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">{day.day}</div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-600">
                      {day.trips} Fahrten
                    </div>
                    <div className="font-medium text-green-600">
                      {formatCurrency(day.earnings)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Erfolge & Meilensteine</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon
              return (
                <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(achievement.date).toLocaleDateString('de-DE')}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Leistungsanalyse</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-800">Starke Leistung</h4>
                <p className="text-sm text-green-700">
                  Ihre Bewertung liegt 15% über dem Durchschnitt. Kunden schätzen besonders Ihre Pünktlichkeit.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">Verbesserungspotential</h4>
                <p className="text-sm text-yellow-700">
                  Ihre Stornierungsrate könnte verbessert werden. Versuchen Sie, nur Fahrten anzunehmen, die Sie auch durchführen können.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <Target className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800">Empfehlung</h4>
                <p className="text-sm text-blue-700">
                  Fokussieren Sie sich auf Stoßzeiten (7-9 Uhr, 17-19 Uhr) um Ihren Verdienst zu maximieren.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}