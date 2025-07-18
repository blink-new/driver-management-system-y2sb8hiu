import React from 'react'
import { Car, Smartphone, Package, Plus, Settings, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { getAssets } from '../../data/mockData'

interface AssetsTabProps {
  driverId: string
}

export function AssetsTab({ driverId }: AssetsTabProps) {
  const assets = getAssets(driverId)

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'vehicle':
        return Car
      case 'device':
        return Smartphone
      case 'equipment':
        return Package
      default:
        return Package
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800 hover:bg-green-100',
      maintenance: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
      retired: 'bg-gray-100 text-gray-800 hover:bg-gray-100'
    }
    
    const labels = {
      active: 'Aktiv',
      maintenance: 'Wartung',
      retired: 'Außer Betrieb'
    }
    
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      vehicle: 'Fahrzeug',
      device: 'Gerät',
      equipment: 'Ausrüstung'
    }
    return labels[type as keyof typeof labels] || type
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE')
  }

  const assetSummary = {
    total: assets.length,
    active: assets.filter(a => a.status === 'active').length,
    maintenance: assets.filter(a => a.status === 'maintenance').length,
    retired: assets.filter(a => a.status === 'retired').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Assets</h2>
          <p className="text-sm text-gray-600">Verwalten Sie alle dem Fahrer zugewiesenen Assets</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Asset hinzufügen
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gesamt</p>
                <p className="text-2xl font-bold">{assetSummary.total}</p>
              </div>
              <Package className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Aktiv</p>
                <p className="text-2xl font-bold text-green-600">{assetSummary.active}</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="h-3 w-3 bg-green-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Wartung</p>
                <p className="text-2xl font-bold text-yellow-600">{assetSummary.maintenance}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Außer Betrieb</p>
                <p className="text-2xl font-bold text-gray-600">{assetSummary.retired}</p>
              </div>
              <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                <div className="h-3 w-3 bg-gray-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Asset-Übersicht</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Typ</TableHead>
                <TableHead>Modell</TableHead>
                <TableHead>Seriennummer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Zugewiesen am</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => {
                const IconComponent = getAssetIcon(asset.type)
                return (
                  <TableRow key={asset.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <IconComponent className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{asset.name}</div>
                          <div className="text-sm text-gray-500">ID: {asset.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getTypeLabel(asset.type)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{asset.model}</TableCell>
                    <TableCell className="font-mono text-sm">{asset.serialNumber}</TableCell>
                    <TableCell>
                      {getStatusBadge(asset.status)}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {formatDate(asset.assignedDate)}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Asset Details Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {assets.map((asset) => {
          const IconComponent = getAssetIcon(asset.type)
          return (
            <Card key={asset.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                  </div>
                  {asset.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Typ:</span>
                  <Badge variant="outline">{getTypeLabel(asset.type)}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Modell:</span>
                  <span className="font-medium">{asset.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Seriennummer:</span>
                  <span className="font-mono text-sm">{asset.serialNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  {getStatusBadge(asset.status)}
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Zugewiesen am:</span>
                  <span className="text-gray-900">{formatDate(asset.assignedDate)}</span>
                </div>
                
                <div className="pt-3 border-t">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Details
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Wartung
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Maintenance Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Wartungsplan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-800">Mercedes Sprinter - Inspektion fällig</p>
                  <p className="text-sm text-yellow-700">Nächste Inspektion in 2 Wochen</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Termin planen
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 bg-green-600 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <p className="font-medium text-green-800">GPS Tracker - Wartung abgeschlossen</p>
                  <p className="text-sm text-green-700">Software-Update erfolgreich installiert</p>
                </div>
              </div>
              <span className="text-sm text-green-600">Vor 3 Tagen</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}