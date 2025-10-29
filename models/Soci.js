import Persona from './Persona.js';

export default class Soci extends Persona {
    constructor(nom, dni) {
        super(nom, dni);
        this.llibresPrestats = [];
    }
}1

