import { Outlet } from 'react-router-dom'
import { useToast } from '../hooks/useToast'
import { Toast } from '../components/common/toast'

export const LayoutAuth = () => {
    const { toast, showToast } = useToast()

    return (
        <>
            <main className='auth-content'>
                <Outlet context= { {showToast} }/>
            </main>
            <div id= "toast-container">
                <Toast toast = { toast } />
            </div>
        </>
    )
}