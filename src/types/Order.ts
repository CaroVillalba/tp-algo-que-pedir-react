export interface CartItem {
    id: number
    name: string
    qty: number
    unitPrice: number
    total: number
}

export interface Restaurant {
    id: number
    name: string
    imageUrl: string
    rating: number
    distance: string
    deliveryFee: number
}

export interface CheckoutOrder {
    restaurantId: number
    items: CartItem[]
    paymentMethod: string
}

export interface Order {
    id: number
    restaurant: Restaurant
    items: CartItem[]
    subtotal: number
    paymentFee: number
    deliveryFee: number
    total: number
    paymentMethod?: string
}

export interface OrderDetailDTO {
    id: number
    localName: string
    dishes: {
        dishName: string
        quantity: number
        unitPrice: number
        total: number
    }[]
    subtotal: number
    total: number
    paymentMethod: string
    state: string
    time: string
    user: { name: string; username: string }
    direction: {
        street: string
        number: string
        coordinates: { lat: number; lon: number }
    }
    distanceKm: number
    freeDelivery: boolean
    comission: number
    increment: number
    quantity: number
}
