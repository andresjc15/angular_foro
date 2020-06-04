import { Perfil } from './perfil';
import { Categoria } from './categoria';

export class Publicacion{
        id: number
        titulo: string 
        descripcion: string
        perfil: Perfil
        categoria: Categoria
}