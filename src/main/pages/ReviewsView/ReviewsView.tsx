
import { RestorantToReview } from "./RestorantToReview/RestorantToReview"

import { authService } from "../../../services/AuthService"
import { userService } from "../../../services/UserService"
import { useOnInit } from "../../../hooks/useOnInit"
import { useState } from "react"

export const ReviewsView = () => {

   

    const loadReviews = async () => {
        const username = authService.getLoggedUsername()!!
        const userProfile = await userService.getUserProfile(username)
        setItems(userProfile.pendingRatings as any)
    }

    const [items, setItems] = useState([
        {localId: 1, localName:"Defautl local", localRating:"default rating", date:"default date", localImage:""}
    ])

    useOnInit(() => {
        loadReviews()
    })


    return (
        <div className = "ReviewsView">
            <div className = "pendingReviews">
                {
                (items.length == 0) ? ( 
                    <h3>No hay restaurantes para calificar!</h3>
                ) : items.map(item => (
                    <RestorantToReview localId={item.localId} nombre={item.localName} puntuacion={item.localRating} tiempo={item.date} imageUrl={item.localImage}></RestorantToReview>
                ))
                
                }
            </div>
        </div>
    )
}