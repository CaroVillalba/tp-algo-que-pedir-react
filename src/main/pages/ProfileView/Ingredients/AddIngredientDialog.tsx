import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import type { Ingredient } from '../../../../types/IngredientType'

interface AddIngredientDialogProps {
    visible: boolean;
    onHide: () => void;
    onAdd: (ingredient: Ingredient) => void;
    title: string;
    options: Ingredient[];   
}

export const AddIngredientDialog: React.FC<AddIngredientDialogProps> = ({
    visible, onHide, onAdd, title, options
}) => {

    const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null)

    const handleAdd = () => {
        if (selectedIngredient) {
            onAdd(selectedIngredient)
            setSelectedIngredient(null)
        }
    }

    const footer = (
        <Button label="Añadir" icon="pi pi-check" onClick={handleAdd} disabled={!selectedIngredient} />
    )

    return (
        <Dialog 
            header={title}
            visible={visible}
            style={{ width: '90vw', maxWidth: '400px' }}
            modal
            onHide={onHide}
            footer={footer}
        >
            <div className="p-fluid">
                <Dropdown
                    value={selectedIngredient}
                    options={options}
                    optionLabel="name"
                    placeholder="Selecciona un ingrediente"
                    onChange={(e) => setSelectedIngredient(e.value)}
                    className="w-full"
                />
            </div>
        </Dialog>
    )
}
