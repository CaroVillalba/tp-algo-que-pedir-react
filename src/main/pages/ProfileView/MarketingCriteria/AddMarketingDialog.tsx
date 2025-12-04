import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { useState } from 'react'

interface Props {
    visible: boolean
    onHide: () => void
    onAdd: (word: string) => void
}

export const AddMarketingWordDialog = ({ visible, onHide, onAdd }: Props) => {
    const [value, setValue] = useState('')

    const handleAdd = () => {
        if (value.trim().length === 0) return
        onAdd(value.trim())
        setValue('')
    }

    return (
        <Dialog 
            header="Agregar palabra de marketing"
            visible={visible} 
            onHide={onHide} 
            style={{ width: '80%', height:'30%' }}
            modal
        >
            <div className="flex flex-column gap-3">
                <InputText
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Ej: sin TAC, light, descuento..."
                    className="w-full"
                />

                <Button 
                    label="Agregar" 
                    icon="pi pi-plus"
                    onClick={handleAdd}
                    className="button-primary"
                />
            </div>
        </Dialog>
    )
}
