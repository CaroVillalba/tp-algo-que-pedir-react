import '../SearchCriteria/SearchCriteria.css'
import { Card } from 'primereact/card'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { DataView } from 'primereact/dataview'
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import type { ProfileContextType } from '../../../../types/ProfileContextType'
import { AddMarketingWordDialog } from './AddMarketingDialog'
import './MarketingCriteria.css'


export const MarketingCriteria = () => {

    const { criteria, showToast, updateCriteria } = useOutletContext<ProfileContextType>()
    const { criteria: c, setCriteria } = criteria

    const [dialogVisible, setDialogVisible] = useState(false)

    const marketingWords = c.marketingWords

    const handleAddWord = (newWord: string) => {
        const normalized = newWord.toLowerCase()

        if (marketingWords.map(w => w.toLowerCase()).includes(normalized)) {
            showToast('La palabra ya existe en la lista.', 'warning')
            return
        }

        updateCriteria(prev => ({
            ...prev,
            marketingWords: [...prev.marketingWords, newWord]
        }))

        setDialogVisible(false)
    }

    const handleRemoveWord = (wordToRemove: string) => {
        updateCriteria(prev => ({
            ...prev,
            marketingWords: prev.marketingWords.filter(w => w !== wordToRemove)
        }))
    }

    const wordTemplate = (word: string) => {
        return (
            <div className="p-col-12">
                <div className="marketing-data-row p-card p-p-2 p-mb-2">
                    <div className="marketing-name">{word}</div>
                    <Button 
                        icon="pi pi-times" 
                        className="p-button-danger p-button-text p-button-rounded marketing-remove-button" 
                        onClick={() => handleRemoveWord(word)} 
                    />
                </div>
            </div>
        )
    }

    return (
        <>
            <Card className='criteria-card-marketing'>
                <section className='card-text'>
                    <div className='header-row'>
                        <div className='card-text-header'>
                            <span className='title'>Marketing</span>
                            <span className='subtitle'>Filtra platos por palabras clave</span>
                        </div>

                        <Checkbox 
                            className='custom-checkbox' 
                            checked={c.marketing}
                            onChange={() =>
                                updateCriteria(prev => ({
                                    ...prev,
                                    marketing: !prev.marketing
                                }))
                            }
                        />
                    </div>
                </section>
            

            <section className='marketing-list-row'>
                <DataView
                    value={marketingWords}
                    layout="list"
                    itemTemplate={wordTemplate}
                    emptyMessage="No hay palabras agregadas."
                    className='marketing-list'
                />
            </section>
            
            
            <div className="add-button-marketing">
            <Button
                icon="pi pi-plus"
                className="p-button-rounded p-button-danger add-button"
                onClick={() => setDialogVisible(true)}
                disabled={!c.marketing}  
                />
            </div>
        </Card>

            <AddMarketingWordDialog
                visible={dialogVisible}
                onHide={() => setDialogVisible(false)}
                onAdd={handleAddWord}
            />
        </>
    )
}
