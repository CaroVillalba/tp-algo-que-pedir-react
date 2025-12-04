import type { User } from '../types/User'
import axios from 'axios'
import type { UserCredentialLogin } from '../types/UserCredentialLogin'
import type { UserCredentialRegister } from '../types/UserCredentialRegister'



export class AuthService {
  private apiRoot = 'http://localhost:9000/v1'
  private USER_USERNAME = 'username'

  async login(credentials: UserCredentialLogin): Promise<User> {
    const response = await axios.get(`${this.apiRoot}/auth/login`, {
      params: credentials
    })

    const user : User = response.data

    if(user.username){
      localStorage.setItem(this.USER_USERNAME, user.username)
    }

    return user

  }

  async register(credentials: UserCredentialRegister) {

    const payload = {
      firstname: credentials.firstname,
      lastname: credentials.lastname,
      username: credentials.username,
      password: credentials.password,
      birthDate: credentials.birthDate,
      registerDate: credentials.registerDate.toISOString(),
      email: credentials.email,
      address: {
        street: '',
        number: 0,
        coordinates:{
          x: 0,
          y: 0,
        }

      }
    }


    await axios.post(`${this.apiRoot}/auth/register`, payload)
  }

  getLoggedUsername(): string | null {
    return localStorage.getItem(this.USER_USERNAME)
  }

}
export const authService = new AuthService()