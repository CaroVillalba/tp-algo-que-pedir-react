import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import './FaithfulCriteria.css'
import { DataView } from 'primereact/dataview'
import type { Local, LocalAccount } from '../../../../types/Local'
import { Dialog } from 'primereact/dialog'
import { PickList } from 'primereact/picklist'
import '../../../../toast.css'
import { useOutletContext } from 'react-router-dom'
import type { ProfileContextType } from '../../../../types/ProfileContextType'

export const FaithfulCriteria = () => {

    const { criteria, restaurant, updateCriteria, profile } = useOutletContext<ProfileContextType>()


    const { profileInfo, setProfileInfo } = profile

    const { criteria: c , setCriteria } = criteria

    const { availableRestaurants, setAvailableRestaurants, selectedRestaurants,
            setSelectedRestaurants, displayAddDialog, setDisplayAddDialog  } = restaurant
    


    const onChangePickList = (event: { source: LocalAccount[], target: LocalAccount[] }) => {

        setAvailableRestaurants(event.source)
        setSelectedRestaurants(event.target)

        setProfileInfo(prev => ({
        ...prev,
        preferredRestaurants: event.target
    }))
    }


    const pickListItemTemplate = (restaurant: LocalAccount) => {
        return (
            <div className="flex align-items-center p-2">
                <img src={restaurant.imgURL} alt={restaurant.name} className="w-3rem h-3rem shadow-2 flex-shrink-0 mr-3" />
                <div className="flex-1">
                    <div className="font-bold">{restaurant.name}</div>
                    <div> ★ {restaurant.rating} • 🧑‍🍳${restaurant.authorCommission} • ${restaurant.appCommission}</div>
                </div>
            </div>
        )
    }


    const itemTemplate = (restaurant: LocalAccount) => {
        return (
            <div className="restaurant-item" key={restaurant.id}>
                <img src={restaurant.imgURL} alt={restaurant.name} className="restaurant-image" />
                <div className="restaurant-details">
                    <span className="restaurant-name">{restaurant.name}</span>
                    <div className="restaurant-info">
                        <span> ★ {restaurant.rating} • 🧑‍🍳${restaurant.authorCommission} • ${restaurant.appCommission}</span>
                    </div>
                </div>
            </div>
        )
    }

    const listTemplate = ( items : LocalAccount[] ) => {
        if( !items || items.length === 0) return null

        let list = items.map((restaurants) => {
            return itemTemplate(restaurants)
        })

        return <div className='restaurants-dataview grid grid-nogutter'>{list}</div>
    }
  
    
    return (
        <>

        <div className='faithful-criteria-container'>
            <Card className='criteria-card p-shadow-2'> 
                <div className='card-text'>
                    <span className='title'>Fieles</span>
                    <span className='subtitle'>Solo los restaurantes preferidos</span>
                </div>
                <Checkbox
                    className="custom-checkbox"
                    checked={c.faithful}
                    onChange={() => {
                        updateCriteria(prev => ({
                            ...prev,
                            faithful: !prev.faithful
                        }))
                        }}
                    />
            </Card>

            <DataView 
                value={selectedRestaurants} 
                listTemplate={listTemplate}
                layout='list'
                emptyMessage='No hay restaurantes agregados.'
                className='restaurants-dataview'
            />

            <div className='add-button-container'>
                <Button 
                    icon="pi pi-plus" 
                    className="p-button-rounded p-button-danger add-button"
                    onClick={() => setDisplayAddDialog(true)}
                    disabled={!c.faithful}
                />
            </div>
        </div>

        <Dialog 
                header="Agregar Restaurantes Preferidos" 
                visible={displayAddDialog} 
                onHide={() => setDisplayAddDialog(false)} 
                modal 
                style={{ width: '80%' , height: '79%'}}
                
            >
                <div className="p-fluid">
                    <PickList
                        dataKey="id"
                        source={availableRestaurants} 
                        target={selectedRestaurants} 
                        itemTemplate={pickListItemTemplate} 
                        sourceHeader="Restaurantes disponibles" 
                        targetHeader="Restaurantes en preferidos" 
                        onChange={onChangePickList} 
                        sourceStyle={{ height: '120px'}} 
                        targetStyle={{ height: '120px' }} 
                        
                    />
                </div>
            </Dialog>

        </>
    )

}



