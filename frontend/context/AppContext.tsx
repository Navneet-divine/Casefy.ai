'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface CaseFile {
  id: string
  name: string
  size: number
  uploadedAt: string
  type: string
  content?: string
}

export interface Case {
  id: string
  name: string
  caseNumber: string
  description: string
  createdAt: string
  files: CaseFile[]
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

interface AppContextType {
  // Auth state
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  
  // Case data
  cases: Case[]
  selectedCaseId: string | null
  selectedFileIds: string[]
  chatHistory: Message[]
  
  // Auth operations
  signup: (email: string, password: string, name: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  
  // Case operations
  addCase: (caseData: Omit<Case, 'id' | 'files'>) => void
  deleteCase: (caseId: string) => void
  setSelectedCaseId: (caseId: string | null) => void
  
  // File operations
  addFileToCase: (caseId: string, file: CaseFile) => void
  deleteFileFromCase: (caseId: string, fileId: string) => void
  toggleFileSelection: (fileId: string) => void
  clearSelectedFiles: () => void
  
  // Chat operations
  addMessage: (message: Message) => void
  clearChatHistory: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// Mock data for initial load
const mockCases: Case[] = [
  {
    id: '1',
    name: 'Smith vs. Johnson',
    caseNumber: 'CASE-2024-001',
    description: 'Civil litigation dispute',
    createdAt: '2024-01-15',
    files: [
      {
        id: 'f1',
        name: 'complaint.pdf',
        size: 245000,
        uploadedAt: '2024-01-15',
        type: 'pdf',
        content: 'This is the original complaint filed against the defendant...'
      },
      {
        id: 'f2',
        name: 'discovery_documents.pdf',
        size: 1240000,
        uploadedAt: '2024-01-20',
        type: 'pdf',
        content: 'Discovery documents containing correspondence and emails...'
      }
    ]
  },
  {
    id: '2',
    name: 'People vs. Anderson',
    caseNumber: 'CASE-2024-002',
    description: 'Criminal case proceedings',
    createdAt: '2024-02-01',
    files: [
      {
        id: 'f3',
        name: 'indictment.pdf',
        size: 180000,
        uploadedAt: '2024-02-01',
        type: 'pdf',
        content: 'Official indictment document with charges and counts...'
      }
    ]
  }
]

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [cases, setCases] = useState<Case[]>(mockCases)
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null)
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([])
  const [chatHistory, setChatHistory] = useState<Message[]>([])

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Mock validation
      if (!email || !password || !name) {
        throw new Error('All fields are required')
      }
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        createdAt: new Date().toISOString()
      }
      
      setUser(newUser)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Mock validation
      if (!email || !password) {
        throw new Error('Email and password are required')
      }
      
      // Mock user for demo
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        createdAt: new Date().toISOString()
      }
      
      setUser(mockUser)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setCases(mockCases)
    setSelectedCaseId(null)
    setSelectedFileIds([])
    setChatHistory([])
  }

  const addCase = (caseData: Omit<Case, 'id' | 'files'>) => {
    const newCase: Case = {
      ...caseData,
      id: Math.random().toString(36).substr(2, 9),
      files: []
    }
    setCases([...cases, newCase])
  }

  const deleteCase = (caseId: string) => {
    setCases(cases.filter(c => c.id !== caseId))
    if (selectedCaseId === caseId) {
      setSelectedCaseId(null)
    }
  }

  const addFileToCase = (caseId: string, file: CaseFile) => {
    setCases(cases.map(c => 
      c.id === caseId 
        ? { ...c, files: [...c.files, file] }
        : c
    ))
  }

  const deleteFileFromCase = (caseId: string, fileId: string) => {
    setCases(cases.map(c => 
      c.id === caseId 
        ? { ...c, files: c.files.filter(f => f.id !== fileId) }
        : c
    ))
    setSelectedFileIds(selectedFileIds.filter(id => id !== fileId))
  }

  const toggleFileSelection = (fileId: string) => {
    setSelectedFileIds(prev => 
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    )
  }

  const clearSelectedFiles = () => {
    setSelectedFileIds([])
  }

  const addMessage = (message: Message) => {
    setChatHistory([...chatHistory, message])
  }

  const clearChatHistory = () => {
    setChatHistory([])
  }

  return (
    <AppContext.Provider 
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        cases,
        selectedCaseId,
        selectedFileIds,
        chatHistory,
        signup,
        login,
        logout,
        addCase,
        deleteCase,
        setSelectedCaseId,
        addFileToCase,
        deleteFileFromCase,
        toggleFileSelection,
        clearSelectedFiles,
        addMessage,
        clearChatHistory
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
