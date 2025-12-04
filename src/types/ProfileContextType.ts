import type { Dispatch, SetStateAction } from 'react'
import type { Local, LocalAccount } from './Local'
import type { User } from './User'
import type { Ingredient } from './IngredientType'


export type CriteriaType = {
    faithful : boolean
    marketing: boolean
    marketingWords: string[]
    vegan: boolean
    exquisite: boolean
    conservative: boolean
    impatient: boolean
    distance: number
    
}


export type ProfileData = {
    profileInfo: User;
    setProfileInfo: Dispatch<SetStateAction<User>>;
}


export type CriteriaData = {
    criteria: CriteriaType; setCriteria: Dispatch<SetStateAction<CriteriaType>>;
}


export type RestaurantData = {
    availableRestaurants: LocalAccount[]; setAvailableRestaurants: Dispatch<SetStateAction<LocalAccount[]>>;
    selectedRestaurants: LocalAccount[]; setSelectedRestaurants: Dispatch<SetStateAction<LocalAccount[]>>;
    displayAddDialog: boolean; setDisplayAddDialog: (value: boolean) => void;
    getRestaurants: () => Promise<LocalAccount[]>;
}


export type IngredientData = {
    avoidIngredients: Ingredient[];
    setAvoidIngredients: Dispatch<SetStateAction<Ingredient[]>>;
    preferredIngredients: Ingredient[];
    setPreferredIngredients: Dispatch<SetStateAction<Ingredient[]>>;
    availableIngredients: Ingredient[];
    setAvailableIngredients: Dispatch<SetStateAction<Ingredient[]>>;
}


export type ProfileContextType = {
    profile: ProfileData;
    criteria: CriteriaData;
    restaurant: RestaurantData;
    ingredients: IngredientData;
    updateCriteria: (updater: (prev: CriteriaType) => CriteriaType) => void;
    showToast: (message: string, severity: 'success' | 'error' | 'warning') => void;
}
