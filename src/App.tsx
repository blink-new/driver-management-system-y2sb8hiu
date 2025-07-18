import React, { useState } from 'react'
import { DriverTable } from './components/DriverTable'
import { DriverProfile } from './components/DriverProfile'
import { Driver } from './types/driver'

function App() {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null)

  const handleDriverSelect = (driver: Driver) => {
    setSelectedDriver(driver)
  }

  const handleBackToTable = () => {
    setSelectedDriver(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {selectedDriver ? (
        <DriverProfile 
          driver={selectedDriver} 
          onBack={handleBackToTable}
        />
      ) : (
        <DriverTable onDriverSelect={handleDriverSelect} />
      )}
    </div>
  )
}

export default App