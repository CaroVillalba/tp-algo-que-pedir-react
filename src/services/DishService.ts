import type { Dish } from '../types/Dish'
import axios from 'axios'

export class DishService {
    private apiRoot = import.meta.env.VITE_API_URL || 'http://localhost:9000/v1'
    private path = 'dishes'

    async getByLocal(localId: number): Promise<Dish[]> {
        const response = await axios.get(`${this.apiRoot}/${this.path}/local/${localId}`)
        return response.data
    }
}

export const dishService = new DishService()
