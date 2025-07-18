import React from 'react'
import { Star, Plus, Settings, ExternalLink, Power, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Switch } from '../ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { getPlatformAccounts } from '../../data/mockData'

interface PlatformAccountsTabProps {
  driverId: string
}

export function PlatformAccountsTab({ driverId }: PlatformAccountsTabProps) {
  const accounts = getPlatformAccounts(driverId)

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800 hover:bg-green-100',
      inactive: 'bg-gray-100 text-gray-800 hover:bg-gray-100'
    }
    
    const labels = {
      active: 'Aktiv',
      inactive: 'Inaktiv'
    }
    
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  const getPlatformLogo = (platform: string) => {
    // In a real app, you would use actual platform logos
    const colors = {
      'Uber': 'bg-black',
      'Bolt': 'bg-green-500',
      'FREE NOW': 'bg-yellow-500'
    }
    
    return (
      <div className={`h-10 w-10 rounded-lg ${colors[platform as keyof typeof colors] || 'bg-gray-500'} flex items-center justify-center text-white font-bold text-sm`}>
        {platform.charAt(0)}
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE')
  }

  const accountSummary = {
    total: accounts.length,
    active: accounts.filter(a => a.status === 'active').length,
    inactive: accounts.filter(a => a.status === 'inactive').length,
    averageRating: accounts.reduce((sum, acc) => sum + acc.rating, 0) / accounts.length
  }

  const availablePlatforms = [
    { name: 'Uber', description: 'Ride-hailing service', connected: accounts.some(a => a.platform === 'Uber') },
    { name: 'Bolt', description: 'European ride-hailing', connected: accounts.some(a => a.platform === 'Bolt') },
    { name: 'FREE NOW', description: 'Taxi and ride service', connected: accounts.some(a => a.platform === 'FREE NOW') },
    { name: 'Lyft', description: 'US ride-sharing', connected: false },
    { name: 'DiDi', description: 'Global mobility platform', connected: false }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Plattform-Konten</h2>
          <p className="text-sm text-gray-600">Verwalten Sie alle Plattform-Konten des Fahrers</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Konto hinzufügen
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Verbundene Konten</p>
                <p className="text-2xl font-bold">{accountSummary.total}</p>
              </div>
              <ExternalLink className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Aktive Konten</p>
                <p className="text-2xl font-bold text-green-600">{accountSummary.active}</p>
              </div>
              <Power className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inaktive Konten</p>
                <p className="text-2xl font-bold text-gray-600">{accountSummary.inactive}</p>
              </div>
              <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                <div className="h-3 w-3 bg-gray-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Ø Bewertung</p>
                <p className="text-2xl font-bold text-yellow-600">{accountSummary.averageRating.toFixed(1)}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connected Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Verbundene Konten</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plattform</TableHead>
                <TableHead>Benutzername</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Bewertung</TableHead>
                <TableHead>Beigetreten</TableHead>
                <TableHead>Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {getPlatformLogo(account.platform)}
                      <div>
                        <div className="font-medium text-gray-900">{account.platform}</div>
                        <div className="text-sm text-gray-500">ID: {account.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{account.username}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(account.status)}
                      <Switch 
                        checked={account.status === 'active'} 
                        size="sm"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{account.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {formatDate(account.joinDate)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Platforms */}
        <Card>
          <CardHeader>
            <CardTitle>Verfügbare Plattformen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {availablePlatforms.map((platform) => (
                <div key={platform.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getPlatformLogo(platform.name)}
                    <div>
                      <div className="font-medium text-gray-900">{platform.name}</div>
                      <div className="text-sm text-gray-500">{platform.description}</div>
                    </div>
                  </div>
                  <div>
                    {platform.connected ? (
                      <Badge className="bg-green-100 text-green-800">
                        Verbunden
                      </Badge>
                    ) : (
                      <Button size="sm" variant="outline">
                        Verbinden
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Platform Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Plattform-Leistung</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accounts.filter(a => a.status === 'active').map((account) => (
                <div key={account.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getPlatformLogo(account.platform)}
                      <span className="font-medium">{account.platform}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{account.rating}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Fahrten diese Woche:</span>
                      <div className="font-medium">42</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Verdienst:</span>
                      <div className="font-medium text-green-600">€680</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Sync Status */}
      <Card>
        <CardHeader>
          <CardTitle>Synchronisationsstatus</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-green-800">Alle Konten synchronisiert</p>
                  <p className="text-sm text-green-700">Letzte Synchronisation vor 5 Minuten</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Jetzt synchronisieren
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {accounts.map((account) => (
                <div key={account.id} className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {getPlatformLogo(account.platform)}
                    <span className="font-medium text-sm">{account.platform}</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    Letzte Sync: vor 5 Min.
                  </div>
                  <div className="text-xs text-green-600">
                    ✓ Erfolgreich
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Integration-Einstellungen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Automatische Synchronisation</p>
                <p className="text-sm text-gray-600">Daten alle 15 Minuten synchronisieren</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Benachrichtigungen</p>
                <p className="text-sm text-gray-600">Bei Problemen mit Konten benachrichtigen</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Leistungsberichte</p>
                <p className="text-sm text-gray-600">Wöchentliche Berichte über Plattform-Leistung</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}