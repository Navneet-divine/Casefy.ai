'use client'

import { useApp } from '@/context/AppContext'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { Trash2, File, Calendar } from 'lucide-react'

export function FileList() {
  const { selectedCaseId, cases, selectedFileIds, toggleFileSelection, deleteFileFromCase } = useApp()

  const selectedCase = cases.find(c => c.id === selectedCaseId)
  
  if (!selectedCaseId) {
    return (
      <Card className="p-8 text-center border-dashed">
        <File className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">Select a case to view its files.</p>
      </Card>
    )
  }

  if (!selectedCase || selectedCase.files.length === 0) {
    return (
      <Card className="p-8 text-center border-dashed">
        <File className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">No files uploaded yet. Upload files to this case.</p>
      </Card>
    )
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="space-y-3">
      {selectedCase.files.map((file) => (
        <Card 
          key={file.id}
          className="p-4 hover:border-primary/50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <Checkbox
              checked={selectedFileIds.includes(file.id)}
              onCheckedChange={() => toggleFileSelection(file.id)}
              className="flex-shrink-0"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-medium text-foreground truncate">{file.name}</h4>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span>{formatFileSize(file.size)}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(file.uploadedAt)}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {file.type.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteFileFromCase(selectedCase.id, file.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
