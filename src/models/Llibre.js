import Recurso from './Recurso.js';

export default class Llibre extends Recurso {
    constructor(titol, autor, numExemplars) {
        super(titol, numExemplars);
        this.autor = autor;
    }
}