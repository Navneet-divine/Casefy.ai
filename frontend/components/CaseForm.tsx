'use client'

import { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Plus } from 'lucide-react'

interface CaseFormProps {
  onSuccess?: () => void
}

export function CaseForm({ onSuccess }: CaseFormProps) {
  const { addCase } = useApp()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    caseNumber: '',
    description: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.caseNumber) {
      alert('Please fill in all required fields')
      return
    }

    addCase({
      name: formData.name,
      caseNumber: formData.caseNumber,
      description: formData.description,
      createdAt: new Date().toISOString().split('T')[0]
    })

    setFormData({ name: '', caseNumber: '', description: '' })
    setIsOpen(false)
    onSuccess?.()
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="w-full gap-2">
        <Plus className="w-4 h-4" />
        New Case
      </Button>
    )
  }

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-lg mb-4">Create New Case</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Case Name *</Label>
          <Input
            id="name"
            placeholder="e.g., Smith vs. Johnson"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="caseNumber">Case Number *</Label>
          <Input
            id="caseNumber"
            placeholder="e.g., CASE-2024-001"
            value={formData.caseNumber}
            onChange={(e) => setFormData({ ...formData, caseNumber: e.target.value })}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            placeholder="Brief description of the case"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-2"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button type="submit" className="flex-1">
            Create Case
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
