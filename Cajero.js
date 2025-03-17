import React, { useState } from 'react';
import Debito from './Debito';
import Credito from './Credito';
import Ahorro from './Ahorro';

const Cajero = () => {
    const [tipoCuenta, setTipoCuenta] = useState('');
    const [saldoInicial, setSaldoInicial] = useState(0);
    const [cuenta, setCuenta] = useState(null);
    const [operacion, setOperacion] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [saldoActual, setSaldoActual] = useState(0); 

    const seleccionarCuenta = (tipo) => {
        setTipoCuenta(tipo);
        const saldo = parseFloat(saldoInicial);
        switch (tipo) {
            case "1":
                setCuenta(new Debito(saldo));
                setSaldoActual(saldo); 
                break;
            case "2":
                setCuenta(new Credito(saldo));
                setSaldoActual(saldo * -1); 
                break;
            case "3":
                setCuenta(new Ahorro(saldo));
                setSaldoActual(saldo); 
                break;
            default:
                alert("Opción no válida.");
        }
    };

    const realizarOperacion = () => {
        switch (operacion) {
            case "1":
                break;
            case "2":
                cuenta.depositar(parseFloat(cantidad));
                setSaldoActual(cuenta.getSaldo()); 
                break;
            case "3":
                if (cuenta instanceof Debito) {
                    cuenta.retirar(parseFloat(cantidad));
                    setSaldoActual(cuenta.getSaldo()); 
                } else {
                    alert("Operación no válida para este tipo de cuenta.");
                }
                break;
            case "4":
                if (cuenta instanceof Credito) {
                    cuenta.sumaInteres();
                    setSaldoActual(cuenta.getSaldo()); 
                } else if (cuenta instanceof Ahorro) {
                    cuenta.invertir();
                    setSaldoActual(cuenta.getSaldo()); 
                } else {
                    alert("Operación no válida para este tipo de cuenta.");
                }
                break;
            default:
                alert("Operación no válida.");
        }
    };

    return (
        <div style={styles.container}>
            <h1>Bienvenido al cajero automático</h1>

            {/* selecciona la cuenta en la que se desea operar */}
            <div style={styles.section}>
                <h2>Seleccione el tipo de cuenta:</h2>
                <button style={styles.button} onClick={() => seleccionarCuenta("1")}>
                    Tarjeta de débito
                </button>
                <button style={styles.button} onClick={() => seleccionarCuenta("2")}>
                    Tarjeta de crédito
                </button>
                <button style={styles.button} onClick={() => seleccionarCuenta("3")}>
                    Cuenta de ahorro
                </button>
            </div>

            {/* introducir el saldo en la cuenta principal */}
            <div style={styles.section}>
                <input
                    type="number"
                    placeholder="Saldo inicial"
                    value={saldoInicial}
                    onChange={(e) => setSaldoInicial(e.target.value)}
                    style={styles.input}
                />
            </div>

            {/* muestra el saldo actual en la cuenta principal */}
            {cuenta && (
                <div style={styles.saldoContainer}>
                    <h2>Saldo actual:</h2>
                    <div style={styles.saldoBox}>
                        {saldoActual}
                    </div>
                </div>
            )}

            {/* operaciones basica del cajero */}
            {cuenta && (
                <div style={styles.section}>
                    <h2>Operaciones disponibles:</h2>
                    <button style={styles.button} onClick={() => setOperacion("1")}>
                        Consultar saldo
                    </button>
                    <button style={styles.button} onClick={() => setOperacion("2")}>
                        Depositar
                    </button>
                    <button style={styles.button} onClick={() => setOperacion("3")}>
                        Retirar
                    </button>
                    {(cuenta instanceof Credito || cuenta instanceof Ahorro) && (
                        <button style={styles.button} onClick={() => setOperacion("4")}>
                            {cuenta instanceof Credito ? "Aplicar intereses" : "Invertir"}
                        </button>
                    )}
                </div>
            )}

            {/* introducir saldo en las cuentas */}
            {cuenta && (
                <div style={styles.section}>
                    <input
                        type="number"
                        placeholder="Cantidad"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        style={styles.input}
                    />
                    <button style={styles.button} onClick={realizarOperacion}>
                        Realizar operación
                    </button>
                </div>
            )}
        </div>
    );
};


const styles = {
    container: {
        textAlign: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    section: {
        marginBottom: '20px',
    },
    button: {
        margin: '5px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        margin: '5px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    saldoContainer: {
        margin: '20px 0',
    },
    saldoBox: {
        padding: '20px',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        borderRadius: '10px',
        fontSize: '24px',
        fontWeight: 'bold',
        display: 'inline-block',
    },
};

export default Cajero;