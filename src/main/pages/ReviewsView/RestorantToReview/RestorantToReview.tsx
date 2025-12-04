import { Button } from "@mui/material"
import "./RestorantToReview.css"
import { useNavigate } from 'react-router-dom'

export const RestorantToReview = (props: any) => {
    const navigate = useNavigate()

    console.log(props.imageUrl)

    return (
        <div className="RestorantToReview">
            <div className="flexContainer">
                <div className="columna0">
                    <p className="p-image">
                    <img src={props.imageUrl} className="image-local"/>
                    </p>
                </div>
                <div className="columna1">
                    <h2>{props.nombre}</h2>
                    <p>★ {props.puntuacion} - 📆 {props.tiempo}</p>
                </div>
                <div className="columna2">
                    <Button onClick={() => navigate(`/review/${props.localId}`)}>Calificar</Button>
                </div>
            </div>
        </div>
    )
}

