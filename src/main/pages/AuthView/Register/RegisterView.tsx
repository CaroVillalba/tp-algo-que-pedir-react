import { useState } from 'react'
import { Link, useNavigate, useOutletContext, type ErrorResponse } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Calendar } from 'primereact/calendar'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { authService } from '../../../../services/AuthService'
import type { UserCredentialRegister } from '../../../../types/UserCredentialRegister'
import { getMensajeError } from '../../../../utils/errorHandling'
import type { MainContextType } from '../../../../types/MainContextType'

export const Register = () => {

  const { 
        showToast
    } = useOutletContext<MainContextType>()
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState<UserCredentialRegister>({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    birthDate: new Date(),
    registerDate: new Date(),
    email: '',
  }) 

  const [password2, setPassword2] = useState('')

  const validateEmail = () => {
    const email = credentials.email.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  const validateFirstname = () => credentials.firstname.trim().length >= 1

  const validateLastname = () => credentials.lastname.trim().length >= 1

  const validateBirthDate = () => credentials.birthDate

  const validateUser = () => credentials.username.length > 3
  const validatePassword = () => credentials.password === password2 && credentials.password !== ''

  const handleRegister = async () => {
    if (!validateFirstname()) {
      showToast('El Nombre no debe estar vacio.', 'error')
      return
    }
    if (!validateLastname()) {
      showToast('El apellido no debe estar vacio.', 'error')
      return
    }
    if (!validateBirthDate()) {
      showToast('Debe seleccionar su fecha de nacimiento.', 'error')
      return
    }
    if (!validateUser()) {
      showToast('El usuario debe tener al menos 4 caracteres.', 'error')
      return
    }
    if (!validateEmail()) {
      showToast('El email ingresado no es válido.', 'error')
      return
    }
    if (!validatePassword()) {
      showToast('Las contraseñas no coinciden.', 'error')
      return
    }

    try {
      await authService.register(credentials)
      window.alert('Usuario registrado con éxito.')
      navigate('/login')
    } catch (error: unknown) {
                            const errorMessage = getMensajeError(error as ErrorResponse)
                            showToast(`Error al registrarse: ${errorMessage}`, 'error')
                        }
  }

  return (
    <section className="flex justify-content-center align-items-center min-h-screen px-3 surface-ground">
      <Card className="p-4 w-full max-w-25rem bg-transparent shadow-none border-none">
        
        <div className="flex flex-column align-items-center mb-3">
          <i className="pi pi-user-plus text-3xl mb-2"></i>
          <h2 className="m-0">Crea tu cuenta</h2>
        </div>

        {/* Nombre */}
        <div className="field mb-3">
          <label className="block mb-1">Nombre*</label>
          <InputText
            className="w-full"
            value={credentials.firstname}
            onChange={(e) => setCredentials({ ...credentials, firstname: e.target.value })}
          />
        </div>

        {/* Apellido */}
        <div className="field mb-3">
          <label className="block mb-1">Apellido*</label>
          <InputText
            className="w-full"
            value={credentials.lastname}
            onChange={(e) => setCredentials({ ...credentials, lastname: e.target.value })}
          />
        </div>

        {/* Usuario */}
        <div className="field mb-3">
          <label className="block mb-1">Usuario*</label>
          <InputText
            className="w-full"
            maxLength={100}
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
        </div>

        {/* Email */}
        <div className="field mb-3">
          <label className="block mb-1">E-mail*</label>
          <InputText
            className="w-full"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          />
        </div>

        {/* Fecha de nacimiento */}
        <div className="field mb-3">
          <label className="block mb-1">Fecha de nacimiento*</label>
          <Calendar
            value={credentials.birthDate}
            onChange={(e) => setCredentials({ ...credentials, birthDate: e.value as Date })}
            showIcon
            className="w-full"
            inputClassName="w-full"
          />
        </div>

        {/* Contraseña */}
        <div className="field mb-3">
          <label className="block mb-1">Contraseña*</label>
          <Password
            className="w-full"
            inputClassName="w-full"
            toggleMask
            feedback={false}
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
        </div>

        {/* Repetir contraseña */}
        <div className="field mb-4">
          <label className="block mb-1">Reingrese la contraseña*</label>
          <Password
            className="w-full"
            inputClassName="w-full"
            toggleMask
            feedback={false}
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>

        {/* Botón */}
        <Button
          label="Registrarse"
          className="w-full p-button-custom-primary"
          onClick={handleRegister}
        />

        {/* Link login */}
        <p className="text-center m-0 mt-3">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="font-bold">Inicia sesión</Link>
        </p>
      </Card>
    </section>
  )
}
