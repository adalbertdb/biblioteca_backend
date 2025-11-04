import Recurso from './Recurso.js';

export default class Revista extends Recurso {
    constructor(titol, dataPublicacio, numExemplars) {
        super(titol, numExemplars);
        this.dataPublicacio = dataPublicacio;
    }
}

