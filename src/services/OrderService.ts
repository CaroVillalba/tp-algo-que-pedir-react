import { CRUDService } from './CRUDService'
import type { Order, CartItem, OrderDetailDTO } from '../types/Order'

export class OrderService extends CRUDService<Order> {
    constructor() {
        super('order')
    }

    async getOrderDetail(orderId: number): Promise<OrderDetailDTO> {
        const response = await this.api.get<OrderDetailDTO>(`/${this.path}/${orderId}`)
        return response.data
    }

    async confirmOrder(
        cartItems: CartItem[],
        restaurantId: number,
        paymentMethod: string,
        clientId: number
    ): Promise<Order> {
    
        const dto = {
            restaurantId,
            items: cartItems.map(item => ({
                dishId: item.id,
                quantity: item.qty
            })),
            paymentMethod: paymentMethod.toUpperCase()
        }
    
        const response = await this.api.post<Order>(
            `/${this.path}`,
            dto,
            { params: { clientId } }
        )
        return response.data
    }

    async getByStateOrder(state: string): Promise<Order[]> {
        const response = await this.api.get<Order[]>(`/${this.path}`, {
            params: { state }
        })
        return response.data
    }

    async updateOrderState(id: number): Promise<Order> {
        const response = await this.api.patch<Order>(`/${this.path}/${id}`)
        return response.data
    }

    async cancelOrder(id: number): Promise<Order> {
        const response = await this.api.patch<Order>(`/${this.path}/cancel/${id}`)
        return response.data
    }

    async deleteOrder(id: number) {
        return await this.api.delete(`/order/${id}`)
    }
}

export const orderService = new OrderService()