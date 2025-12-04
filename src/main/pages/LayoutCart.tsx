import { Outlet, useOutletContext } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import type { MainContextType } from '../../types/MainContextType'

export const LayoutCart = () => {
    
    const parent = useOutletContext<MainContextType>()
    const { cart } = useOutletContext<{ cart: ReturnType<typeof useCart> }>()
    
    return <Outlet context={{ cart, ...parent }} />
}
