import type { Address, Coordinates } from './Address'

export interface Local {
    id: number
    name: string
    address: string
    coordinates: Coordinates,
    rating: string
    deliveryDelay: number
    imgURL: string
    appCommission: number
    esCercano?: boolean;
}

export interface LocalAccount{
    id: number
    name: string 
    imgURL: string
    address: Address
    appCommission: number
    authorCommission: number
    paymentMethods: string[]
    rating: number
}


export interface LocalPublic {
    id: number
    name: string
    imgURL: string
    rating: number
    reviews: number
    orders: number
}

export interface LocalCheckout {
    id: number;
    name: string;
    imgURL: string;
    freeDelivery: boolean;
    deliveryFee: number;
    paymentMethods: PaymentMethodTax[];
    distanceKm: Number;
}

export interface PaymentMethodTax {
    name: string;
    tax: number;
}
