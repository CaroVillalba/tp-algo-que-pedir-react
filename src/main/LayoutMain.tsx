import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { Header } from '../components/Header'
import Footer from '../components/Footer'
import { useToast } from '../hooks/useToast'
import { Toast } from '../components/common/toast'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { routeConfig } from './routeConfig'
import { MainContext } from '../types/MainContextType'
import type { MainContextType } from '../types/MainContextType'
import { useCart } from '../hooks/useCart'

export const LayoutMain = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const cart = useCart()

    const path = location.pathname

    const match = Object.entries(routeConfig)
        .sort((a, b) => b[0].length - a[0].length)
        .find(([route]) => 
            path === route || path.startsWith(route))
        
    const title = match?.[1].title ?? ''
    const showBackButton = match?.[1].back ?? false

    const { toast, showToast } = useToast()

    const [pendingPath, setPendingPath] = useState<string | null>(null)
    const [showModal, setShowModal] = useState(false)

    const navigateWithGuard: MainContextType['navigateWithGuard'] = (to) => {
        const isCurrentlyInCart = location.pathname.startsWith('/home')
        const leavingCartArea = isCurrentlyInCart && !to.startsWith('/home')
    
   /*      if (leavingCartArea) {
            setPendingPath(to)
            setShowModal(true)
            return
        } */
    
        navigate(to)
    }
    
    const confirmLeave = () => {
        if (pendingPath) navigate(pendingPath)
        setPendingPath(null)
        setShowModal(false)
    }
    
    const cancelLeave = () => {
        setPendingPath(null)
        setShowModal(false)
    }
    
    const contextValue: MainContextType = useMemo(() => ({
        showToast,
        navigateWithGuard
    }), [showToast])

    return (
        <MainContext.Provider value={contextValue}>
            <Header title={title} showBackButton={showBackButton} />
            <main className='main-content'>
                <Outlet context={{ cart }} />
            </main>
            <Footer />

            <div id="toast-container">
                <Toast toast = { toast } />
            </div>

            <Dialog
                header="Salir del área de carrito"
                visible={showModal}
                modal
                onHide={cancelLeave}
                footer={
                <div className="flex justify-end gap-2">
                    <Button label="Cancelar" onClick={cancelLeave} />
                    <Button label="Confirmar" onClick={confirmLeave} />
                </div>
                }
            >
                <p>Si salís, el carrito se vaciará automáticamente.</p>
            </Dialog>
        </MainContext.Provider>
    )
}
