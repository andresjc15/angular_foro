import { Perfil } from './perfil'

export class Usuario {

    id: number
    username: string
    password: string
    email: string
    perfil: Perfil
    roles: string [] = []
}