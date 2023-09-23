document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("ingresarDatosBtn").addEventListener("click", mostrarInputs);

    class CuadroMagico {
        constructor(n) {
            this.n = n;
            this.matriz = new Array(n).fill(null).map(() => new Array(n).fill(0));
        }

        llenarMatriz(valores) {
            let idx = 0;
            for (let i = 0; i < this.n; i++) {
                for (let j = 0; j < this.n; j++) {
                    const valor = valores[idx];
                    if (!isNaN(valor)) {
                        this.matriz[i][j] = valor;
                    } else {
                        alert("Por favor, ingrese un número válido.");
                        return;
                    }
                    idx++;
                }
            }
        }

        calcularConstanteMagica() {
            const constanteMagica = this.matriz[0].reduce((acc, val) => acc + val, 0);
            return constanteMagica;
        }

        esCuadroMagico() {
            const constanteMagica = this.calcularConstanteMagica();

            for (let i = 0; i < this.n; i++) {
                const sumaFila = this.matriz[i].reduce((acc, val) => acc + val, 0);
                
                const sumaColumna = this.matriz.reduce((acc, fila) => acc + fila[i], 0);
                if (sumaFila !== constanteMagica || sumaColumna !== constanteMagica) {
                    return false;
                }
            }

            const sumaDiagonalPrincipal = this.matriz.reduce((acc, fila, i) => acc + fila[i], 0);
            if (sumaDiagonalPrincipal !== constanteMagica) {
                return false;
            }

            const sumaDiagonalSecundaria = this.matriz.reduce((acc, fila, i) => acc + fila[this.n - 1 - i], 0);
            if (sumaDiagonalSecundaria !== constanteMagica) {
                return false;
            }

            return true;
        }

        generarTabla() {
            const tabla = document.createElement("table");
            for (let i = 0; i < this.n; i++) {
                const fila = document.createElement("tr");
                for (let j = 0; j < this.n; j++) {
                    const celda = document.createElement("td");
                    celda.textContent = this.matriz[i][j];
                    fila.appendChild(celda);
                }
                tabla.appendChild(fila);
            }
            return tabla;
        }
    }

    function mostrarInputs() {
        const tamañoInput = document.getElementById("tamañoInput");
        const tamaño = parseInt(tamañoInput.value);

        if (!isNaN(tamaño) && tamaño > 0) {
            const inputContainer = document.getElementById("inputContainer");
            const inputTable = document.getElementById("inputTable");
            inputTable.innerHTML = "";

            for (let i = 0; i < tamaño; i++) {
                const row = document.createElement("tr");
                for (let j = 0; j < tamaño; j++) {
                    const cell = document.createElement("td");
                    const input = document.createElement("input");
                    input.type = "number";
                    cell.appendChild(input);
                    row.appendChild(cell);
                }
                inputTable.appendChild(row);
            }

            const calcularBtn = document.getElementById("calcularBtn");
            calcularBtn.addEventListener("click", function () {
                const inputValues = [];
                const inputs = document.querySelectorAll("#inputTable input");
                inputs.forEach(input => {
                    inputValues.push(parseInt(input.value));
                });

                const cuadro = new CuadroMagico(tamaño);
                cuadro.llenarMatriz(inputValues);
                mostrarMatrizIngresada(cuadro);
                verificarCuadroMagico(cuadro);
            });

            inputContainer.style.display = "block";
        } else {
            alert("Tamaño inválido. Debe ser un número mayor que cero.");
        }
    }

    function mostrarMatrizIngresada(cuadro) {
        const matrizIngresada = document.getElementById("matrizIngresada");
        matrizIngresada.innerHTML = ""; // Limpiar contenido anterior
        const tabla = cuadro.generarTabla();
        matrizIngresada.appendChild(tabla);
    }

    function verificarCuadroMagico(cuadro) {
        if (cuadro.esCuadroMagico()) {
            document.getElementById("resultado").textContent = `Es un cuadro mágico. La constante mágica es: ${cuadro.calcularConstanteMagica()}`;
        } else {
            document.getElementById("resultado").textContent = "No es un cuadro mágico.";
        }
    }

});
