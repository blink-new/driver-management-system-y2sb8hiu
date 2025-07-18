import React from 'react'
import { FileText, Upload, Download, Eye, AlertCircle, CheckCircle, Clock, Plus } from 'lucide-react'
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
import { getDocuments } from '../../data/mockData'

interface DocumentsTabProps {
  driverId: string
}

export function DocumentsTab({ driverId }: DocumentsTabProps) {
  const documents = getDocuments(driverId)

  const getStatusBadge = (status: string) => {
    const variants = {
      valid: 'bg-green-100 text-green-800 hover:bg-green-100',
      expired: 'bg-red-100 text-red-800 hover:bg-red-100',
      pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
    }
    
    const labels = {
      valid: 'Gültig',
      expired: 'Abgelaufen',
      pending: 'Ausstehend'
    }

    const icons = {
      valid: CheckCircle,
      expired: AlertCircle,
      pending: Clock
    }

    const IconComponent = icons[status as keyof typeof icons]
    
    return (
      <Badge className={`${variants[status as keyof typeof variants]} gap-1`}>
        <IconComponent className="h-3 w-3" />
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE')
  }

  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false
    const expiry = new Date(expiryDate)
    const today = new Date()
    const thirtyDaysFromNow = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000))
    return expiry <= thirtyDaysFromNow && expiry > today
  }

  const documentSummary = {
    total: documents.length,
    valid: documents.filter(d => d.status === 'valid').length,
    expired: documents.filter(d => d.status === 'expired').length,
    pending: documents.filter(d => d.status === 'pending').length,
    expiringSoon: documents.filter(d => isExpiringSoon(d.expiryDate)).length
  }

  const requiredDocuments = [
    'Führerschein',
    'Personalausweis',
    'Gesundheitszeugnis',
    'Gewerbeschein',
    'Versicherungsnachweis'
  ]

  const missingDocuments = requiredDocuments.filter(
    required => !documents.some(doc => doc.type === required)
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Dokumente</h2>
          <p className="text-sm text-gray-600">Verwalten Sie alle Dokumente des Fahrers</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Dokument hinzufügen
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gesamt</p>
                <p className="text-2xl font-bold">{documentSummary.total}</p>
              </div>
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Gültig</p>
                <p className="text-2xl font-bold text-green-600">{documentSummary.valid}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Abgelaufen</p>
                <p className="text-2xl font-bold text-red-600">{documentSummary.expired}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Ausstehend</p>
                <p className="text-2xl font-bold text-yellow-600">{documentSummary.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Läuft bald ab</p>
                <p className="text-2xl font-bold text-orange-600">{documentSummary.expiringSoon}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {(documentSummary.expired > 0 || documentSummary.expiringSoon > 0 || missingDocuments.length > 0) && (
        <div className="space-y-3">
          {documentSummary.expired > 0 && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-medium text-red-800">Abgelaufene Dokumente</p>
                <p className="text-sm text-red-700">
                  {documentSummary.expired} Dokument(e) sind abgelaufen und müssen erneuert werden.
                </p>
              </div>
            </div>
          )}

          {documentSummary.expiringSoon > 0 && (
            <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">Dokumente laufen bald ab</p>
                <p className="text-sm text-yellow-700">
                  {documentSummary.expiringSoon} Dokument(e) laufen in den nächsten 30 Tagen ab.
                </p>
              </div>
            </div>
          )}

          {missingDocuments.length > 0 && (
            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-800">Fehlende Dokumente</p>
                <p className="text-sm text-blue-700">
                  Folgende Dokumente fehlen: {missingDocuments.join(', ')}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Dokument-Übersicht</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dokument</TableHead>
                <TableHead>Typ</TableHead>
                <TableHead>Hochgeladen am</TableHead>
                <TableHead>Gültig bis</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((document) => (
                <TableRow key={document.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{document.name}</div>
                        <div className="text-sm text-gray-500">ID: {document.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{document.type}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {formatDate(document.uploadDate)}
                  </TableCell>
                  <TableCell>
                    {document.expiryDate ? (
                      <div className={isExpiringSoon(document.expiryDate) ? 'text-orange-600 font-medium' : ''}>
                        {formatDate(document.expiryDate)}
                      </div>
                    ) : (
                      <span className="text-gray-400">Kein Ablaufdatum</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(document.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Document Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Erforderliche Dokumente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {requiredDocuments.map((docType) => {
                const hasDocument = documents.some(doc => doc.type === docType)
                const document = documents.find(doc => doc.type === docType)
                
                return (
                  <div key={docType} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full ${hasDocument ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="font-medium">{docType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {hasDocument && document ? (
                        <>
                          {getStatusBadge(document.status)}
                          {document.expiryDate && isExpiringSoon(document.expiryDate) && (
                            <Badge className="bg-orange-100 text-orange-800">
                              Läuft bald ab
                            </Badge>
                          )}
                        </>
                      ) : (
                        <Button size="sm" variant="outline" className="gap-1">
                          <Upload className="h-3 w-3" />
                          Hochladen
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload-Bereich</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Dokument hochladen</h3>
              <p className="text-sm text-gray-600 mb-4">
                Ziehen Sie Dateien hierher oder klicken Sie zum Auswählen
              </p>
              <Button className="gap-2">
                <Upload className="h-4 w-4" />
                Dateien auswählen
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                Unterstützte Formate: PDF, JPG, PNG (max. 10MB)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}