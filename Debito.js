import CuentaBase from './CuentaBase';

export default class Debito extends CuentaBase {
    constructor(apertura) {
        super(apertura);
    }

    retirar(cantidad) {
        if (cantidad > this.montoActual) {
            alert("No cuenta con el saldo suficiente para completar la operación");
        } else {
            this.montoActual -= cantidad;
        }
    }
}