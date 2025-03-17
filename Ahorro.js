import CuentaBase from './CuentaBase';

export default class Ahorro extends CuentaBase {
    constructor(apertura) {
        super(apertura);
    }

    invertir() {
        this.montoActual *= 1.10;
    }
}