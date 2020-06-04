import { Carrera } from './carrera';

export class Facultad{
    constructor(
        public id: number,
        public nombre: string,
        public carreras: Carrera[] = []
    ){}
}