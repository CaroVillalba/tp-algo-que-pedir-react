import { useContext, useState, useEffect } from 'react'
import { TabMenu } from 'primereact/tabmenu'
import { useLocation } from 'react-router-dom'
import { MainContext } from '../types/MainContextType'
import type { MainContextType } from '../types/MainContextType'
import './Footer.css'

export default function Footer() {
  const location = useLocation()
  const { navigateWithGuard } = useContext<MainContextType>(MainContext)

  const pathIndexMap: Record<string, number> = {
    '/home': 0,
    '/restaurant-menu': 0,
    '/order-checkout': 0,
    '/orders': 1,
    '/review': 2,
    '/review-restorant': 2,
    '/profile': 3,
    '/profile/criteria': 3,
    '/profile/ingredients-avoid': 3,
    '/profile/ingredients-preffered': 3
  }

  const getIndexFromPath = (path: string) => {
    const match = Object.keys(pathIndexMap).find(key => path.startsWith(key))
    return match ? pathIndexMap[match] : 0
  }

  const [activeIndex, setActiveIndex] = useState(getIndexFromPath(location.pathname))

  useEffect(() => {
    setActiveIndex(getIndexFromPath(location.pathname))
  }, [location.pathname])

  const items = [
    { label: 'Inicio', icon: 'pi pi-home', command: () => navigateWithGuard('/home') },
    { label: 'Pedidos', icon: 'pi pi-file', command: () => navigateWithGuard('/orders') },
    { label: 'Calificar', icon: 'pi pi-star', command: () => navigateWithGuard('/review') },
    { label: 'Perfil', icon: 'pi pi-user', command: () => navigateWithGuard('/profile') }
  ]

  return (
    <footer className="footer-container">
      <TabMenu
        model={items}
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
        className="bottom-nav"
      />
    </footer>
  )
}
