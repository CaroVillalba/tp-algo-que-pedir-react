import { useState } from 'react'
import type { Local, LocalAccount } from '../../../types/Local'
import { useToast } from '../../../hooks/useToast'
import { Outlet } from 'react-router-dom'
import { Toast } from '../../../components/common/toast'
import '../../../toast.css'
import { getMensajeError, type ErrorResponse } from '../../../utils/errorHandling'
import { localService } from '../../../services/LocalService'
import { ingredientService } from '../../../services/IngredientService'
import { useOnInit } from '../../../hooks/useOnInit'
import type { User } from '../../../types/User'
import { authService } from '../../../services/AuthService'
import { userService } from '../../../services/UserService'
import type { Ingredient } from '../../../types/IngredientType'
import type { CriteriaType } from '../../../types/ProfileContextType'
import { all } from 'axios'


export const LayoutProfile = () => {
        const [ availableRestaurants, setAvailableRestaurants ] = useState<LocalAccount[]>([])
        const [ selectedRestaurants, setSelectedRestaurants ] = useState<LocalAccount[]>([])
        const [ displayAddDialog, setDisplayAddDialog ] = useState(false)
        const [ distance, setDistance ] = useState<number>(1)
        const { toast, showToast } = useToast()
        const [profileInfo, setProfileInfo] = useState<User>({ 
                id : -1,
                firstname : '',
                username : '',
                lastname : '',
                location : '',
                preferredIngredients: [],
                ingredientsToAvoid: [],
                address: {
                    street: '',
                    number: 0,
                    coordinates: {
                        x: 0,
                        y:0,
                    }
                },
                email: '',
                pendingRatings: [],
                criteria: {
                    faithful : false,
                    marketing: false,
                    marketingWords: [],
                    vegan: false,
                    exquisite: false,
                    conservative: false,
                    impatient: false,
                    distance: 0
                }, 
                preferredRestaurants: [],
        })


        const [criteria, setCriteria] = useState({
            faithful: false,
            marketing: false,
            marketingWords: [] as string[],
            vegan: false,
            exquisite: false,
            conservative: false,
            impatient: false,
            distance: 0
        })

        const [ username, setUsername ] = useState('username')


        const [ avoidIngredients, setAvoidIngredients ] = useState<Ingredient[]>(profileInfo.ingredientsToAvoid)
        const [ preferredIngredients, setPreferredIngredients ] = useState<Ingredient[]>(profileInfo.preferredIngredients)
        const [ availableIngredients, setAvailableIngredients ] = useState<Ingredient[]>([])

        const profileContext = {
            profileInfo, setProfileInfo,
            username, setUsername,
        }

        const criteriaContext = {
            criteria, setCriteria,
            distance, setDistance,
        }

        const restaurantContext = {
            availableRestaurants, setAvailableRestaurants,
            selectedRestaurants, setSelectedRestaurants,
            displayAddDialog, setDisplayAddDialog,
        }

        const ingredientContext = {
           avoidIngredients, setAvoidIngredients,
           preferredIngredients, setPreferredIngredients,
           availableIngredients, setAvailableIngredients,
       }

      

       const updateCriteria = (update: (prev: CriteriaType) => CriteriaType) => {
        setCriteria(prev => {
            const updated = update(prev);

            
            setProfileInfo(prevProfile => ({
                ...prevProfile,
                criteria: updated
                
            }))

            return updated
        });
    };
        async function fetchProfileInfo()  {
                const username =  authService.getLoggedUsername()
                const ingredients = await ingredientService.getAll()
                
                if (username == null) {
                    showToast('Debe iniciar sesión para ver su perfil.', 'error')
                    return
                }
        
                setUsername(username) 
        
                try {
                    const userProfile = await userService.getUserProfile(username) 
                    
                    const allRestaurants = await localService.getRestaurants()
                    
                    const preferredIds = userProfile.preferredRestaurants.map(r => r.id)
                    const preferredFromProfile = allRestaurants.filter(r => preferredIds.includes(r.id))
                    setSelectedRestaurants(preferredFromProfile)
                    
                    const available = allRestaurants.filter(r => !preferredIds.includes(r.id))
                    setAvailableRestaurants(available)

                    setCriteria(userProfile.criteria)
                    setProfileInfo(userProfile)
                    setAvoidIngredients(userProfile.ingredientsToAvoid)
                    setPreferredIngredients(userProfile.preferredIngredients)
                    setAvailableIngredients(ingredients) 

                } catch (error: unknown) {
                    const errorMessage = getMensajeError(error as ErrorResponse)
                    showToast(`Error al cargar perfil: ${errorMessage}`, 'error')
                }
        }
    

       
        useOnInit(fetchProfileInfo)


        return(<>
        <Outlet context= {{
            profile: profileContext,
            criteria: criteriaContext,
            restaurant: restaurantContext,
            ingredients: ingredientContext,
            updateCriteria,
            showToast,

        }}/>
        
        
        <div id= "toast-container">
            <Toast toast = { toast } />
        </div>
        
        </>
        )

}


