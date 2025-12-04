import "./OrderCard.css"
import { Image } from 'primereact/image'

export const OrderCard = (props: any) => {

    const handleCancel = () => {
        props.onCancel(props.id)
    }

    const handleDelete = () => {
        props.onDelete?.(props.id)
    }

    return (
        <div className="OrderCard">
                <Image  
                    src={props.imageURL} 
                    alt={props.name} 
                    width="80" 
                    height="80" 
                    imageClassName="border-round-lg image-local"
                />
                <a className="order-card-text" href={props.href}>
                    <p><b>{props.local}</b></p>
                    <span className="secondary-text">
                        <p>Total: ${props.costo}</p>
                        <p>{props.fecha} - {props.articulos} articulos</p>
                    </span>
                </a>
                {props.showCancel && (
                    <div className="order-card-button cancel-button">
                        <i className="pi pi-ban button-icon" onClick={handleCancel} title="Cancelar pedido"></i>
                    </div>
                )}
                {props.showDelete && (
                <div className="order-card-button delete-button">
                    <i className="pi pi-times button-icon" onClick={handleDelete} title="Eliminar pedido"></i>
                </div>
            )}
        </div>
    )
}