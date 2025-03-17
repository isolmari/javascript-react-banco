export default class CuentaBase {
    constructor(apertura) {
        this.montoActual = apertura;
    }

    getSaldo() {
        return this.montoActual;
    }

    depositar(cantidad) {
        this.montoActual += cantidad;
    }
}