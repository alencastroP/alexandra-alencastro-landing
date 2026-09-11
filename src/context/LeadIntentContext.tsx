import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Objetivo } from '../data/content'

/**
 * O que o visitante quer fazer (comprar, vender...), compartilhado entre
 * secoes: clicar em "Quero vender" no card de servicos ja chega no
 * formulario com "Vender" marcado. Um clique a menos ate o lead.
 */
interface LeadIntent {
  objetivo: Objetivo
  setObjetivo: (objetivo: Objetivo) => void
}

const LeadIntentContext = createContext<LeadIntent | null>(null)

export function LeadIntentProvider({ children }: { children: ReactNode }) {
  const [objetivo, setObjetivo] = useState<Objetivo>('Comprar')
  const value = useMemo(() => ({ objetivo, setObjetivo }), [objetivo])

  return <LeadIntentContext.Provider value={value}>{children}</LeadIntentContext.Provider>
}

export function useLeadIntent() {
  const context = useContext(LeadIntentContext)
  if (!context) throw new Error('useLeadIntent precisa estar dentro de <LeadIntentProvider>')
  return context
}
