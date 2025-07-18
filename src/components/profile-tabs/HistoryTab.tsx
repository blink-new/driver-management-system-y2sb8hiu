import React, { useState } from 'react'
import { Calendar, Filter, Search, Car, CreditCard, FileText, Settings, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { getHistory } from '../../data/mockData'

interface HistoryTabProps {
  driverId: string
}

export function HistoryTab({ driverId }: HistoryTabProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  
  const history = getHistory(driverId)

  const filteredHistory = history.filter(entry => {
    const matchesSearch = entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (entry.details && entry.details.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesType = typeFilter === 'all' || entry.type === typeFilter
    
    let matchesDate = true
    if (dateFilter !== 'all') {
      const entryDate = new Date(entry.date)
      const today = new Date()
      
      switch (dateFilter) {
        case 'today': {
          matchesDate = entryDate.toDateString() === today.toDateString()
          break
        }
        case 'week': {
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
          matchesDate = entryDate >= weekAgo
          break
        }
        case 'month': {
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
          matchesDate = entryDate >= monthAgo
          break
        }
      }
    }
    
    return matchesSearch && matchesType && matchesDate
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'trip':
        return Car
      case 'payment':
        return CreditCard
      case 'document':
        return FileText
      case 'status_change':
        return Settings
      default:
        return Clock
    }
  }

  const getTypeBadge = (type: string) => {
    const variants = {
      trip: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      payment: 'bg-green-100 text-green-800 hover:bg-green-100',
      document: 'bg-purple-100 text-purple-800 hover:bg-purple-100',
      status_change: 'bg-orange-100 text-orange-800 hover:bg-orange-100'
    }
    
    const labels = {
      trip: 'Fahrt',
      payment: 'Zahlung',
      document: 'Dokument',
      status_change: 'Status'
    }
    
    return (
      <Badge className={variants[type as keyof typeof variants]}>
        {labels[type as keyof typeof labels]}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString('de-DE'),
      time: date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
    }
  }

  const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Vor wenigen Minuten'
    if (diffInHours < 24) return `Vor ${diffInHours} Stunden`
    if (diffInHours < 48) return 'Gestern'
    if (diffInHours < 168) return `Vor ${Math.floor(diffInHours / 24)} Tagen`
    return formatDate(dateString).date
  }

  const groupedHistory = filteredHistory.reduce((groups, entry) => {
    const date = formatDate(entry.date).date
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(entry)
    return groups
  }, {} as Record<string, typeof filteredHistory>)

  const historySummary = {
    total: history.length,
    trips: history.filter(h => h.type === 'trip').length,
    payments: history.filter(h => h.type === 'payment').length,
    documents: history.filter(h => h.type === 'document').length,
    statusChanges: history.filter(h => h.type === 'status_change').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Aktivitätsverlauf</h2>
          <p className="text-sm text-gray-600">Vollständiger Verlauf aller Aktivitäten des Fahrers</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gesamt</p>
                <p className="text-2xl font-bold">{historySummary.total}</p>
              </div>
              <Clock className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Fahrten</p>
                <p className="text-2xl font-bold text-blue-600">{historySummary.trips}</p>
              </div>
              <Car className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Zahlungen</p>
                <p className="text-2xl font-bold text-green-600">{historySummary.payments}</p>
              </div>
              <CreditCard className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Dokumente</p>
                <p className="text-2xl font-bold text-purple-600">{historySummary.documents}</p>
              </div>
              <FileText className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Status</p>
                <p className="text-2xl font-bold text-orange-600">{historySummary.statusChanges}</p>
              </div>
              <Settings className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Aktivitäten durchsuchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Typ filtern" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Typen</SelectItem>
                <SelectItem value="trip">Fahrten</SelectItem>
                <SelectItem value="payment">Zahlungen</SelectItem>
                <SelectItem value="document">Dokumente</SelectItem>
                <SelectItem value="status_change">Status-Änderungen</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Zeitraum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Zeiten</SelectItem>
                <SelectItem value="today">Heute</SelectItem>
                <SelectItem value="week">Letzte Woche</SelectItem>
                <SelectItem value="month">Letzter Monat</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* History Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Aktivitätsverlauf</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(groupedHistory).length === 0 ? (
            <div className="text-center py-12">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Keine Aktivitäten gefunden, die Ihren Filterkriterien entsprechen.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedHistory)
                .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                .map(([date, entries]) => (
                  <div key={date}>
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <h3 className="font-medium text-gray-900">{date}</h3>
                      <div className="flex-1 h-px bg-gray-200"></div>
                    </div>
                    
                    <div className="space-y-3 ml-7">
                      {entries
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((entry) => {
                          const IconComponent = getTypeIcon(entry.type)
                          const { time } = formatDate(entry.date)
                          
                          return (
                            <div key={entry.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                              <div className="p-2 bg-white rounded-lg shadow-sm">
                                <IconComponent className="h-4 w-4 text-gray-600" />
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                  <h4 className="font-medium text-gray-900">{entry.description}</h4>
                                  {getTypeBadge(entry.type)}
                                  <span className="text-sm text-gray-500">{time}</span>
                                </div>
                                
                                {entry.details && (
                                  <p className="text-sm text-gray-600">{entry.details}</p>
                                )}
                                
                                <p className="text-xs text-gray-500 mt-1">
                                  {formatRelativeDate(entry.date)}
                                </p>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export-Optionen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Als PDF exportieren
            </Button>
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Als CSV exportieren
            </Button>
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Bericht erstellen
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}