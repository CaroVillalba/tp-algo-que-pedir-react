import React, { useContext, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Checkbox } from 'primereact/checkbox'
import { Card } from 'primereact/card'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { useNavigate, useOutletContext } from 'react-router-dom'
import './StoreSearch.css'
import { localService } from '../../../services/LocalService'
import type { Local } from '../../../types/Local'
import { useOnInit } from '../../../hooks/useOnInit'
import type { CartContextType } from '../../../types/CartContextType'
import { MainContext } from '../../../types/MainContextType'


export const PinIcon = ({ esCercano }: { esCercano: boolean }) => {
  if (esCercano) {
    return (
      <div className="local-pin">
        <i className="pi pi-map-marker"></i>
      </div> )
  }
}

export const StoreSearch = () => {

  const [locales, setLocales] = useState<Local[]>([])

  const [checked, setChecked] = useState(false)
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('') 
  const { cart } = useOutletContext<{ cart: CartContextType }>()

  const { showToast } = useContext(MainContext)

  const cartRestaurantId = cart.restaurantId

 
  const localesFiltrados = checked
    ? locales.filter((local) => local.esCercano)
    : locales

  useOnInit(() => buscar(''))

  const buscar = async (query: string) => {

    try {
      const userId = Number(sessionStorage.getItem('userId'))
      const result = await localService.getRestaurantsBySearch(query, userId)

      setLocales(result)
    } catch {
      showToast('Hubo un error al buscar los locales.', 'error')
    }
  }
  
  function debounce<T extends (...args: any[]) => void>(callback: T, wait: number) {
    let timeout: ReturnType<typeof setTimeout>
    return (...args: Parameters<T>): void => {
      clearTimeout(timeout)
      timeout = setTimeout(() => callback(...args), wait)
    }
  }

  const debouncedBuscar = debounce(buscar, 1000)

  const handleKeyUpBuscar = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value
    setSearchTerm(value)
    debouncedBuscar(value)
  }
  
  return (
    <>
      <div className="search-header">
        <h3 className="search-title">Delivery</h3>

        <i
          className="shopping-cart-container"
          onClick={() => {
            if (!cartRestaurantId) {
              showToast('No tenés ningún pedido activo.', 'info')
              return
            }

            navigate(`order-checkout/${cartRestaurantId}`)
          }}
        >
          <i className="pi pi-shopping-cart shopping-cart-icon"></i>
        </i>
      </div>

      <div className="search-bar-container">
        <IconField iconPosition="right">
                <InputIcon className="pi pi-search"> </InputIcon>
                <InputText  className="search-input" 
                placeholder="Buscá tu local para pedir..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyUp={handleKeyUpBuscar}/>
        </IconField>
      </div>


      <label className="checkbox-container">
        <Checkbox
          inputId="cercanos"
          checked={checked}
          onChange={(e) => setChecked(!!e.checked)}
          className="checkbox"
        />
        <span className="checkbox-label">Buscar locales cercanos</span>
      </label>


      <main>
        <h2 className="locales-title">Locales de comida</h2>

        <div className="grid">
          {localesFiltrados.map((local) => (
            <div key={local.id} className="grid-item">
              <Card
                className="local-card"
                onClick={() => navigate(`restaurant-menu/${local.id}`)}
              >
                <div className="local-img-container">
                  <img
                    src={local.imgURL}
                    alt={`Imagen de ${local.name}`}
                    className="store-img"
                  />
                  <PinIcon esCercano={local.esCercano ?? false} />
                </div>

                <div className="local-content">
                  <strong className="local-nombre">{local.name}</strong>
                  <span className="local-direccion">{local.address}</span>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

