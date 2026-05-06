'use client'

import { useApp } from '@/context/AppContext'
import { Card } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trash2, FileText } from 'lucide-react'

export function CaseList() {
  const { cases, selectedCaseId, setSelectedCaseId, deleteCase } = useApp()

  if (cases.length === 0) {
    return (
      <Card className="p-8 text-center border-dashed">
        <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">No cases yet. Create your first case to get started.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {cases.map((caseItem) => (
        <Card 
          key={caseItem.id}
          className={`p-4 cursor-pointer transition-all ${
            selectedCaseId === caseItem.id 
              ? 'ring-2 ring-primary bg-card border-primary/50' 
              : 'hover:border-primary/50'
          }`}
          onClick={() => setSelectedCaseId(caseItem.id)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{caseItem.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{caseItem.caseNumber}</p>
              <p className="text-sm text-muted-foreground mt-2">{caseItem.description}</p>
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="secondary">{caseItem.files.length} files</Badge>
                <span className="text-xs text-muted-foreground">
                  Created {formatDate(caseItem.createdAt)}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                deleteCase(caseItem.id)
              }}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
