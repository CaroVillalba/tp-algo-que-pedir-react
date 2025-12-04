import { useState } from 'react'
import { useNavigate, Link, useOutletContext } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { authService } from '../../../../services/AuthService'
import { getMensajeError, type ErrorResponse } from '../../../../utils/errorHandling'
import type { MainContextType } from '../../../../types/MainContextType'

export const Login = () => {
  const { 
        showToast
    } = useOutletContext<MainContextType>()

  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const res = await authService.login({ username: user, password })
      sessionStorage.setItem('userId', res.id.toString())
      navigate('/home')
    } catch (error: unknown) {
                        const errorMessage = getMensajeError(error as ErrorResponse)
                        showToast(`Error al logearse: ${errorMessage}`, 'error')
                    }
  }

  return (
    <section className="auth-content flex justify-content-center align-items-center">
      <Card className="p-4 w-full max-w-25rem bg-transparent shadow-none border-none">
        <form onSubmit={handleLogin} className="flex flex-column gap-3">

          <div className="flex flex-column align-items-center mb-2">
            <i className="pi pi-user text-3xl mb-2"></i>
            <h2 className="m-0">Algo que pedir</h2>
          </div>

          <div>
            <label htmlFor="user" className="block mb-1 ">Usuario*</label>
            <InputText
              id="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full"
              placeholder="Nombre"
              maxLength={100}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1">Contraseña*</label>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}
              className="w-full"          
              inputClassName="w-full"     
              showIcon="pi pi-eye-slash"
              hideIcon="pi pi-eye"
              placeholder="Contraseña"
              toggleMask
              required
            />
          </div>

          <Button type="submit" label="Iniciar sesión" className="w-full p-button-custom-primary" />

          <p className="text-center m-0 mt-2">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="font-bold">Regístrate</Link>
          </p>
        </form>
      </Card>
    </section>
  )
}


