import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { Button } from 'primereact/button'
import { ChevronLeftIcon } from 'primereact/icons/chevronleft'
import type { ProfileContextType } from '../../../../types/ProfileContextType'
import { AddIngredientDialog } from './AddIngredientDialog' 
import { useToast } from '../../../../hooks/useToast'
import { DataView } from 'primereact/dataview'
import { Toast } from '../../../../components/common/toast'
import './Ingredients.css'
import type { Ingredient } from '../../../../types/IngredientType'


export const IngredientsPreffered = () => {

    const { 
        ingredients,
        showToast,
        profile

    } = useOutletContext<ProfileContextType>()

    const { preferredIngredients, setPreferredIngredients, avoidIngredients, availableIngredients} = ingredients

    const { profileInfo, setProfileInfo } = profile

    const [dialogVisible, setDialogVisible] = useState(false)

    const handleRemoveIngredient = (ingredientToRemove: Ingredient) => {
    setPreferredIngredients(prev => {
        const updated = prev.filter(ing => ing.name !== ingredientToRemove.name)

        setProfileInfo(prevProfile => ({
            ...prevProfile,
            preferredIngredients: updated,
        }))

        return updated
    })
}


    const handleAddIngredient = (newIngredient: Ingredient) => {
        const normalizedNewIngredient = newIngredient.name.toLowerCase()
        
        
        if (preferredIngredients.map(i => i.name.toLowerCase()).includes(normalizedNewIngredient)) {
            showToast('El ingrediente ya existe en la lista de "preferidos"', 'warning')
            return
        }
        
        if (avoidIngredients.map(i => i.name.toLowerCase()).includes(normalizedNewIngredient)) {
            showToast(`"${newIngredient.name}" no puede estar en la lista de a evitar y preferidos a la vez.`, 'error')
            return
        }

        
        setPreferredIngredients(prev => {
        const updated = [...prev, newIngredient]


        setProfileInfo(prevProfile => ({
            ...prevProfile,
            preferredIngredients: updated,
        }))

        return updated
    })
        setDialogVisible(false)
    }

    const ingredientItemTemplate = (ingredient: Ingredient) => {
        return (
            <div className="p-col-12">
                <div 
                    className="ingredient-data-row p-card p-p-2 p-mb-2 "
                >
                    <div className="ingredient-name">{ingredient.name}</div>
                    
                    <Button 
                        icon="pi pi-times" 
                        className="p-button-danger p-button-text p-button-rounded ingredient-remove-button" 
                        onClick={() => handleRemoveIngredient(ingredient)} 
                    />
                </div>
            </div>
        )
    }

   

    return (
        <>
            <section className='ingredient-list-row'>
            <DataView
                className='ingredient-list'
                value={preferredIngredients}
                layout="list" 
                itemTemplate={ingredientItemTemplate}
                paginator={false} 
                emptyMessage="No hay ingredientes en esta lista."
             />
            </section>

            <Button 
                label="Añadir ingrediente" 
                icon="pi pi-plus" 
                className='button-primary button-ingredients'
                onClick={() => setDialogVisible(true)} 
            />

            <AddIngredientDialog
                visible={dialogVisible}
                onHide={() => setDialogVisible(false)}
                onAdd={handleAddIngredient}
                title="Añadir ingrediente preferido"
                options={availableIngredients} 
            />

        </>
    )
}