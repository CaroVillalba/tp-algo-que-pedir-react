import { Button } from "primereact/button"
import { Image } from "primereact/image"
import { Toast } from "../../../components/common/toast"
import { useState } from "react"
import { useOnInit } from "../../../hooks/useOnInit"
import type { Order } from "../../../types/Order"
import { orderService } from "../../../services/OrderService"
import { useParams } from 'react-router-dom';
import './OrderDetailsView.css'

export const OrderDetailsView = () => {
    
    const { id } = useParams()

        const [order, setOrder] = useState<any>({
            id: 0,
            dishes: [{
                id: 0,
                description: "",
                imageUrl: "",
                price: 0,
                quantity: 0
            }],
            subtotal: 0,
            increment: 0,
            comission: 0,
            deliveryFee: 0,     
            paymentFee: 0,      
            total: 0,           
            paymentMethod: "",
            local: {            
                name: "",
                freeDelivery: false,
                distanceKm: 0
            },
            user: {}
        });

    const getOrder = async() => {
        const loadedOrder = await orderService.getOrderDetail(Number(id))
        console.log("DTO recibido en OrderDetailsView:", loadedOrder)
        setOrder(loadedOrder)
    }

    useOnInit(() => {
        getOrder()
    })

    return (
        <div className="OrderDetailsView">
            <div className="h-full flex flex-column">
                <div className="flex-1 overflow-y-auto">
                    <div className="p-2">
                        <div className="font-bold text-lg mb-3">Restaurante</div>
                            <div className="flex align-items-center">
                                <Image 
                                    src={ order.dishes[0].imageUrl }
                                    alt={ order.localName }  
                                    width="60" 
                                    height="60" 
                                    imageClassName="border-round-lg mr-3"
                                />
                                <div>
                                    <div className="font-bold">{ order.localName }</div>
                                    <small className="text-color-secondary text-sm">
                                        { order.distanceKm?.toFixed(2) ?? "?" } km · { order.freeDelivery ? 'Envío gratis' : 'Envío con costo' }
                                    </small>
                                </div>
                            </div>
                    </div>

                    <div className="p-2">
                        <div className="font-bold text-lg mb-3">Artículos</div>
                        {order.dishes.map((item: { id: number; name: string; quantity: number; price: number; imageUrl?: string }) => (
                            <div key={item.id} className="flex justify-content-between align-items-center mb-3">
                                <div>
                                    <div className="font-bold">{item.name}</div>
                                    <div className="order-item-details-text">
                                        <small className="text-color-secondary block text-sm">Cantidad: {item.quantity}</small>
                                        <small className="text-color-secondary text-sm">Precio unitario: ${item.price.toFixed(2)}</small>
                                    </div>
                                </div>
                                <div className="flex flex-column align-items-center">
                                    <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-2">
                        <div className="font-bold text-lg mb-3">Resumen</div>
                        <div className="flex justify-content-between mb-2">
                            <span>Subtotal</span>
                            <span>${order.subtotal?.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-content-between mb-2">
                            <span>Recargo por tipo de pago</span>
                            <span>${order.increment?.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-content-between mb-2">
                            <span>Tarifa de entrega</span>
                            <span>${order.comission?.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-content-between align-items-center mt-3">
                            <span className="font-bold text-lg">Total</span>
                            <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}