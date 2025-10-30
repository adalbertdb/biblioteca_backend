import Material from './Recurso.js';

export default class Pelicula extends Material {
    constructor(titol, director, genere, numExemplars) {
        super(titol, numExemplars);
        this.director = director;
        this.genere = genere;
    }
}