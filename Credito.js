import CuentaBase from './CuentaBase';

export default class Credito extends CuentaBase {
    constructor(apertura) {
        super(apertura);
    }

    getSaldo() {
        return this.montoActual * -1;
    }

    sumaInteres() {
        this.montoActual *= 1.15;
    }
}