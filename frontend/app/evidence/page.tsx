'use client'

import { useApp } from '@/context/AppContext'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { FileText, Calendar, Download, Trash2 } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default function EvidencePage() {
  const { cases, clearSelectedFiles, selectedFileIds, toggleFileSelection, deleteFileFromCase } = useApp()
  
  const allFiles = cases.flatMap(c => 
    c.files.map(f => ({ ...f, caseId: c.id, caseName: c.name }))
  )

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">All Evidence</h1>
        <p className="text-muted-foreground text-sm sm:text-base">View and manage all files across your cases</p>
      </div>

        {allFiles.length === 0 ? (
          <Card className="p-12 text-center border-dashed">
            <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground text-lg">No files uploaded yet</p>
            <p className="text-sm text-muted-foreground mt-2">Upload files to your cases to see them here</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {/* Toolbar */}
            {selectedFileIds.length > 0 && (
              <Card className="p-4 bg-primary/10 border-primary/20">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">
                    {selectedFileIds.length} file{selectedFileIds.length !== 1 ? 's' : ''} selected
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={clearSelectedFiles}
                  >
                    Clear Selection
                  </Button>
                </div>
              </Card>
            )}

            {/* Files Grid */}
            <div className="grid gap-4">
              {allFiles.map((file) => (
                <Card 
                  key={`${file.caseId}-${file.id}`}
                  className="p-4 sm:p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <Checkbox
                      checked={selectedFileIds.includes(file.id)}
                      onCheckedChange={() => toggleFileSelection(file.id)}
                      className="mt-1 flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div className="min-w-0">
                          <h3 className="text-base sm:text-lg font-semibold text-foreground truncate">{file.name}</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1">{file.caseName}</p>
                        </div>
                        <Badge variant="outline" className="flex-shrink-0 text-xs sm:text-sm">
                          {file.type.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs sm:text-sm mb-3 sm:mb-0">
                        <div>
                          <p className="text-muted-foreground text-xs">File Size</p>
                          <p className="text-foreground font-medium">{formatFileSize(file.size)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Uploaded</p>
                          <p className="text-foreground font-medium flex items-center gap-2">
                            <Calendar className="w-3 h-3 flex-shrink-0" />
                            <span>{formatDate(file.uploadedAt)}</span>
                          </p>
                        </div>
                        <div className="col-span-2 sm:col-span-1 flex items-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-foreground flex-1 sm:flex-none"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteFileFromCase(file.caseId, file.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
    </div>
  )
}
