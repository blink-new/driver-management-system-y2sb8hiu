import React, { useState } from 'react'
import { Edit2, Save, X, User, MapPin, Phone, Mail, Calendar, Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { getPersonalData } from '../../data/mockData'

interface PersonalDataTabProps {
  driverId: string
}

export function PersonalDataTab({ driverId }: PersonalDataTabProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [personalData, setPersonalData] = useState(getPersonalData(driverId))

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reset to original data
    setPersonalData(getPersonalData(driverId))
    setIsEditing(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE')
  }

  return (
    <div className="space-y-6">
      {/* Header with Edit Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Persönliche Daten</h2>
          <p className="text-sm text-gray-600">Verwalten Sie die persönlichen Informationen des Fahrers</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="gap-2">
            <Edit2 className="h-4 w-4" />
            Bearbeiten
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Speichern
            </Button>
            <Button variant="outline" onClick={handleCancel} className="gap-2">
              <X className="h-4 w-4" />
              Abbrechen
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Grundinformationen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Vorname</Label>
                {isEditing ? (
                  <Input
                    id="firstName"
                    value={personalData.firstName}
                    onChange={(e) => setPersonalData({...personalData, firstName: e.target.value})}
                  />
                ) : (
                  <div className="mt-1 p-2 bg-gray-50 rounded-md">{personalData.firstName}</div>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Nachname</Label>
                {isEditing ? (
                  <Input
                    id="lastName"
                    value={personalData.lastName}
                    onChange={(e) => setPersonalData({...personalData, lastName: e.target.value})}
                  />
                ) : (
                  <div className="mt-1 p-2 bg-gray-50 rounded-md">{personalData.lastName}</div>
                )}
              </div>
            </div>
            
            <div>
              <Label htmlFor="dateOfBirth">Geburtsdatum</Label>
              {isEditing ? (
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={personalData.dateOfBirth}
                  onChange={(e) => setPersonalData({...personalData, dateOfBirth: e.target.value})}
                />
              ) : (
                <div className="mt-1 p-2 bg-gray-50 rounded-md flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  {formatDate(personalData.dateOfBirth)}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Kontaktinformationen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>E-Mail-Adresse</Label>
              <div className="mt-1 p-2 bg-gray-100 rounded-md flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                Wird in der Hauptansicht verwaltet
              </div>
            </div>
            
            <div>
              <Label>Telefonnummer</Label>
              <div className="mt-1 p-2 bg-gray-100 rounded-md flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4" />
                Wird in der Hauptansicht verwaltet
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Adressinformationen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address">Straße und Hausnummer</Label>
              {isEditing ? (
                <Input
                  id="address"
                  value={personalData.address}
                  onChange={(e) => setPersonalData({...personalData, address: e.target.value})}
                />
              ) : (
                <div className="mt-1 p-2 bg-gray-50 rounded-md">{personalData.address}</div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="postalCode">Postleitzahl</Label>
                {isEditing ? (
                  <Input
                    id="postalCode"
                    value={personalData.postalCode}
                    onChange={(e) => setPersonalData({...personalData, postalCode: e.target.value})}
                  />
                ) : (
                  <div className="mt-1 p-2 bg-gray-50 rounded-md">{personalData.postalCode}</div>
                )}
              </div>
              <div>
                <Label htmlFor="city">Stadt</Label>
                {isEditing ? (
                  <Input
                    id="city"
                    value={personalData.city}
                    onChange={(e) => setPersonalData({...personalData, city: e.target.value})}
                  />
                ) : (
                  <div className="mt-1 p-2 bg-gray-50 rounded-md">{personalData.city}</div>
                )}
              </div>
            </div>
            
            <div>
              <Label htmlFor="country">Land</Label>
              {isEditing ? (
                <Input
                  id="country"
                  value={personalData.country}
                  onChange={(e) => setPersonalData({...personalData, country: e.target.value})}
                />
              ) : (
                <div className="mt-1 p-2 bg-gray-50 rounded-md">{personalData.country}</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Notfallkontakt
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="emergencyContact">Name des Notfallkontakts</Label>
              {isEditing ? (
                <Input
                  id="emergencyContact"
                  value={personalData.emergencyContact}
                  onChange={(e) => setPersonalData({...personalData, emergencyContact: e.target.value})}
                />
              ) : (
                <div className="mt-1 p-2 bg-gray-50 rounded-md">{personalData.emergencyContact}</div>
              )}
            </div>
            
            <div>
              <Label htmlFor="emergencyPhone">Notfall-Telefonnummer</Label>
              {isEditing ? (
                <Input
                  id="emergencyPhone"
                  value={personalData.emergencyPhone}
                  onChange={(e) => setPersonalData({...personalData, emergencyPhone: e.target.value})}
                />
              ) : (
                <div className="mt-1 p-2 bg-gray-50 rounded-md">{personalData.emergencyPhone}</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Privacy Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Datenschutz</h4>
              <p className="text-sm text-blue-800 mt-1">
                Alle persönlichen Daten werden gemäß DSGVO verarbeitet und gespeichert. 
                Änderungen werden protokolliert und können nur von autorisierten Personen vorgenommen werden.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}