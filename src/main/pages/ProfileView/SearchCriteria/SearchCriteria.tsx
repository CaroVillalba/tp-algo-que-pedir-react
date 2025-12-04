import { Card } from  'primereact/card'
import './SearchCriteria.css'
import { Checkbox } from 'primereact/checkbox'
import { FaithfulCriteria } from '../FaithfulCriteria/FaithfulCriteria'
import { MarketingCriteria } from '../MarketingCriteria/MarketingCriteria'
import { InputNumber, type InputNumberValueChangeEvent } from 'primereact/inputnumber'
import { useOutletContext } from 'react-router-dom'
import type { CriteriaType, ProfileContextType } from '../../../../types/ProfileContextType'

export const SearchCriteria = () => {
    const { criteria, updateCriteria } = useOutletContext<ProfileContextType>()
    
    const { criteria: c, setCriteria} = criteria    


    return (
        <>
        
            <section className='criteria-list'>
                <Card className='criteria-card'>
                    <div className='card-text'>
                    <span className='title'>Veganos</span>
                    <span className='subtitle'>Solo platos veganos</span>
                    </div>
                <Checkbox 
                className='custom-checkbox' 
                onChange={() => {
                        updateCriteria(prev => ({
                            ...prev,
                            vegan: !prev.vegan
                        }))
                    } } checked={c.vegan}></Checkbox>
                </Card>
                
           
                 <Card className='criteria-card'>
                    <div className='card-text'>
                    <span className='title'>Exquisitos</span>
                    <span className='subtitle'>Solo platos de autor</span>
                    </div>
                <Checkbox className='custom-checkbox' 
                onChange={() =>
                        updateCriteria(prev => ({
                            ...prev,
                            exquisite: !prev.exquisite
                        }))
                    } checked={c.exquisite}></Checkbox>
                </Card>

                <Card className='criteria-card'>
                    <div className='card-text'>
                    <span className='title'>Conservadores</span>
                    <span className='subtitle'>Solo platos con ingredientes preferidos</span>
                    </div>
                <Checkbox className='custom-checkbox' 
                onChange={() =>
                        updateCriteria(prev => ({
                            ...prev,
                            conservative: !prev.conservative
                        }))
                    } 
                checked={c.conservative}
                />
                </Card>

                <FaithfulCriteria></FaithfulCriteria>
                <MarketingCriteria></MarketingCriteria>

                
                <Card className='criteria-card'>
                    <div className='card-text'>
                        <div className='header-row'>
                            <div className='card-text-header'>
                                <span className='title'>Impacientes</span>
                                <span className='subtitle'>Dentro de una distancia máxima</span>
                            </div>
                            <Checkbox 
                                className='custom-checkbox impatient-checkbox' 
                                 onChange={() =>
                                    updateCriteria(prev => ({
                                    ...prev,
                                    impatient: !prev.impatient
                                    }))} 
                                checked={c.impatient}
                            />
                        </div>
                        <section className='sub-subtitle distance-row'>
                            <span>Distancia(Kms)</span>
                            <InputNumber 
                            inputId='Impatient' 
                            value={c.distance} 
                            onValueChange={e => updateCriteria(prev => ({
                                                                ...prev,
                                                                distance: e.value ?? 0
                                                            }))} 
                            showButtons
                            buttonLayout='horizontal'
                            min={1}
                            max={5}
                            disabled={!c.impatient}
                            incrementButtonIcon='pi pi-plus'
                            decrementButtonIcon='pi pi-minus'
                            />
                        </section>
                    </div>
                </Card>

            </section>
        
        </>
    )

}