import { CRUDService } from './CRUDService'
import type { Local, LocalPublic, LocalCheckout, LocalAccount } from '../types/Local'

class LocalService extends CRUDService<Local>{
    constructor(){
        super('local')
    }

    async getPublicById(id: number): Promise<LocalPublic> {
        const response = await this.api.get<LocalPublic>(`/${this.path}/${id}`)
        return response.data
    }

    async getRestaurants(): Promise<LocalAccount[]>{ 
        const response = await this.api.get<LocalAccount[]>(`/${this.path}/profile`)
        return response.data
    }

    async getRestaurantsBySearch(query: string, userId: number): Promise<Local[]>{
        const response = await this.api.get<Local[]>(`/${this.path}`, { params: { query, userId } })
        return response.data
    }

    async getCheckoutInfo(id: number, userId?: number): Promise<LocalCheckout> {
        const response = await this.api.get<LocalCheckout>(
            `/${this.path}/order-checkout/${id}`,
            { params: userId ? { userId } : {} }
        )
        return response.data
    }
}

export const localService = new LocalService ()