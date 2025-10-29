import Material from './Recurso.js';

export default class Revista extends Material {
    constructor(titol, dataPublicacio, numExemplars) {
        super(titol, numExemplars);
        this.dataPublicacio = dataPublicacio;
    }
}

