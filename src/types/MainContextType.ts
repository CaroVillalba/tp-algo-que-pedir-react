import { createContext } from 'react'

export type NavigateWithGuard = (
    to: string,
    ctx?: { isInCartArea?: boolean }
) => void

export type MainContextType = {
    showToast: (message: string, severity: 'success' | 'error' | 'warning' | 'info') => void
    navigateWithGuard: NavigateWithGuard
    isInCartArea?: boolean
}

export const MainContext = createContext<MainContextType>({
    showToast: () => {},
    navigateWithGuard: () => {},
    isInCartArea: false
})