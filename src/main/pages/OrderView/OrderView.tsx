import { TabView, TabPanel } from "primereact/tabview"
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { OrderCard } from "./OrderCard/OrderCard"
import { orderService } from "../../../services/OrderService"
import { useOnInit } from "../../../hooks/useOnInit"
import { useState } from "react"
import "./OrderView.css"

export const OrderView = () => {

    const [ordenesTodas, setOrdenesTodas] = useState<any[]>([])
    const [ordenesPendientes, setOrdenesPendientes] = useState<any[]>([])
    const [ordenesCompletadas, setOrdenesCompletadas] = useState<any[]>([])
    const [ordenesCanceladas, setOrdenesCanceladas] = useState<any[]>([])

    const updateOrders = async() => {
        const ordenes = await orderService.getAll()
        console.log(ordenes)
        setOrdenesTodas(ordenes)
        setOrdenesPendientes(ordenes.filter((orden: any) => (orden.state == "PENDIENTE" || orden.state === "PREPARADO")))
        setOrdenesCompletadas(ordenes.filter((orden: any) => (orden.state == "ENTREGADO")))
        setOrdenesCanceladas(ordenes.filter((orden: any) => (orden.state == "CANCELADO")))
    }

    useOnInit(updateOrders)

    const handleCancel = async (orderId: number) => {
        confirmDialog({
        message: '¿Seguro que querés cancelar este pedido?',
        header: 'Confirmar cancelación',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sí, cancelar',
        rejectLabel: 'No',
        accept: async () => {
            await orderService.cancelOrder(orderId)
            await updateOrders()
        }
    });
    }

    const handleDelete = async (orderId: number) => {
        await orderService.deleteOrder(orderId)
        await updateOrders()
    }

    return (
        <div className="OrderView">
            <ConfirmDialog />

            <TabView>
                <TabPanel header="Pendientes">
                    { ordenesPendientes.length === 0 ? (
                        <div className="sin-pedidos">
                            Ahora mismo, no hay pedidos pendientes.
                        </div>
                    ):
                        ordenesPendientes.map((orden) => (
                            <OrderCard 
                            key={orden.id}
                            id={orden.id}
                            local={orden.localName} 
                            costo={orden.total} 
                            fecha="12 de mayo" 
                            articulos={orden.quantity} 
                            imageURL={orden.dishes[0].imageUrl} 
                            href={"/orders/"+orden.id}
                            showCancel={true}
                            showDelete={false}
                            onCancel={handleCancel}/>
                        ))
                    }
                </TabPanel>

                <TabPanel header="Completados">
                    { ordenesCompletadas.length === 0 ? (
                        <div className="sin-pedidos">
                            Nada que ver acá. Podés realizar un pedido desde el inicio.
                        </div>
                    ):
                        ordenesCompletadas.map((orden) => (
                            <OrderCard 
                            key={orden.id}
                            id={orden.id}
                            local={orden.localName} 
                            costo={orden.total} 
                            fecha="12 de mayo" 
                            articulos={orden.quantity} 
                            imageURL={orden.dishes[0].imageUrl} 
                            href={"/orders/"+orden.id}
                            showCancel={false}
                            showDelete={true}
                            onDelete={handleDelete}/>
                        ))
                    }
                </TabPanel>

                <TabPanel header="Cancelados">
                    { ordenesCanceladas.length === 0 ? (
                        <div className="sin-pedidos">
                            No hay pedidos cancelados.
                        </div>
                    ):
                        ordenesCanceladas.map((orden) => (
                            <OrderCard 
                            key={orden.id}
                            id={orden.id}
                            local={orden.localName} 
                            costo={orden.total} 
                            fecha="12 de mayo" 
                            articulos={orden.quantity} 
                            imageURL={orden.dishes[0].imageUrl} 
                            href={"/orders/"+orden.id}
                            showCancel={false}
                            showDelete={true}
                            onDelete={handleDelete}/>
                        ))
                    }
                </TabPanel>
            </TabView>
        </div>
    )
}