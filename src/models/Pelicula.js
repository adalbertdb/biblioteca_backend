import Recurso from './Recurso.js';

export default class Pelicula extends Recurso {
    constructor(titol, director, genere, numExemplars) {
        super(titol, numExemplars);
        this.director = director;
        this.genere = genere;
    }
}