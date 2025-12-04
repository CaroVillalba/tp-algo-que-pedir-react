import {  TextareaAutosize } from '@mui/material'
import { Button } from 'primereact/button'
import './ReviewRestorantView.css'
import { useState } from 'react'
import { useOnInit } from '../../../hooks/useOnInit'
import { localService } from '../../../services/LocalService'
import { useParams } from 'react-router-dom'
import type { Rating } from '../../../types/Rating'
import { ratingService } from '../../../services/RatingService'
import { authService } from '../../../services/AuthService'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { MainContext } from '../../../types/MainContextType'

export const ReviewRestorantView = () => {
    const navigate = useNavigate()
    const { showToast } = useContext(MainContext)

    const { id } = useParams()
    const [localName, setLocalName] = useState('error')

    const [stars, setStars] = useState('1')
    const [review, setReview] = useState('')

    const handleChangeStars = (e:any) => setStars(e.target.value)

    const handleChangeReview = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReview(e.target.value)
    };

    const loadLocalInfo = async () => {
        const localInfo = await localService.getById(Number(id))
        setLocalName(localInfo.name)
    }

    const postReview = async () => {
        const username = authService.getLoggedUsername()
        await ratingService.create({
            'username': username, 
            'localId': 1, 
            'rating': Number(stars), 
            'description': review
        })
        showToast('Calificacion enviada exitosamente', 'success')
        navigate('/review')
    }

    useOnInit(() => {
        loadLocalInfo()
    })

    return (
        <div className="ReviewRestorantView">
            <h1>¿Como fue tu experiencia en {localName}?</h1>

            <form className="starContainer">
                {
                ['1','2','3','4','5'].map((v) => (
                    <label className="star">
                        <input type="radio" name="stars" value={v} checked={stars === v} onChange={handleChangeStars}/>
                        <svg viewBox="0 0 24 24" className="star-icon" aria-hidden="true">
                            <path d="M12 .587l3.668 7.431L23.4 9.75l-5.7 5.556L18.8 24 12 20.01 5.2 24l1.1-8.694L.6 9.75l7.732-1.732L12 .587z"/>
                        </svg>
                        <span>{v}</span>
                    </label>
                ))
                }
            </form>

            <br/>

            <TextareaAutosize minRows={5} placeholder="Contanos tu experiencia" onChange={handleChangeReview}/>

            <Button className='button-primary' label='Enviar' type='submit' onClick={postReview}></Button>
        </div>
    )
}

