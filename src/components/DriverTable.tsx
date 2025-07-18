import React, { useState } from 'react'
import { Search, Plus, MoreHorizontal, Filter } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Driver } from '../types/driver'
import { mockDrivers } from '../data/mockData'

interface DriverTableProps {
  onDriverSelect: (driver: Driver) => void
}

export function DriverTable({ onDriverSelect }: DriverTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredDrivers = mockDrivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || driver.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="enterprise-header">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Fahrer</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {filteredDrivers.length} von {mockDrivers.length} Fahrern
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Fahrer hinzufügen
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Fahrer suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-border"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-white border-border">
                <Filter className="h-4 w-4 mr-2" />
                Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                Alle Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('active')}>
                Aktiv
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('inactive')}>
                Inaktiv
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('suspended')}>
                Gesperrt
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Table */}
        <div className="enterprise-table rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-medium text-foreground">Fahrer</TableHead>
                <TableHead className="font-medium text-foreground">Status</TableHead>
                <TableHead className="font-medium text-foreground">Kontakt</TableHead>
                <TableHead className="font-medium text-foreground">Fahrzeug</TableHead>
                <TableHead className="font-medium text-foreground text-right">Fahrten</TableHead>
                <TableHead className="font-medium text-foreground text-right">Bewertung</TableHead>
                <TableHead className="font-medium text-foreground text-right">Verdienst</TableHead>
                <TableHead className="font-medium text-foreground">Beigetreten</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrivers.map((driver) => (
                <TableRow 
                  key={driver.id}
                  className="hover:bg-muted/30 cursor-pointer border-b border-border"
                  onClick={() => onDriverSelect(driver)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={driver.avatar} alt={driver.name} />
                        <AvatarFallback className="text-xs bg-muted">
                          {driver.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">{driver.name}</div>
                        <div className="text-sm text-muted-foreground">{driver.licenseNumber}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusDisplay(driver.status)}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm text-foreground">{driver.email}</div>
                      <div className="text-sm text-muted-foreground">{driver.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">{driver.vehicleType}</TableCell>
                  <TableCell className="text-right font-medium text-foreground">
                    {driver.totalTrips.toLocaleString('de-DE')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-medium text-foreground">{driver.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium text-foreground">
                    {formatCurrency(driver.totalEarnings)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(driver.joinDate)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-muted"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onDriverSelect(driver)}>
                          Profil anzeigen
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Bearbeiten
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Deaktivieren
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredDrivers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              Keine Fahrer gefunden, die Ihren Suchkriterien entsprechen.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}