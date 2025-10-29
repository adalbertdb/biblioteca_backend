import Material from './Material.js';

export default class Llibre extends Material {
    constructor(titol, autor, numExemplars) {
        super(titol, numExemplars);
        this.autor = autor;
    }
}