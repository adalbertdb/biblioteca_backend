import Persona from './Persona.js';

export default class Administrador extends Persona {
    constructor(nom, dni, carrec) {
        super(nom, dni);
        this.carrec = carrec;
    }
}

