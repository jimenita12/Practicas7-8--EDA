document.addEventListener("DOMContentLoaded", function() {

    const matriz = [
        [0, 2, 5, 7, 6],
        [0, 0, 0, 3, 8],
        [2, 9, 6, 3, 4],
        [1, 5, 6, 1, 4],
        [0, 9, 2, 5, 0]
    ];

    class ContadorCeros{
        constructor(matriz){
            this.matriz=matriz;
        }
    
        contadorCerosPorFila(fila){
            return this.matriz[fila].filter(num => num === 0).length;
        }
    
        contadorCerosPorTodasFila(){
            const resultado = [];
    
            for (let i = 0; i < this.matriz.length; i++){
                const contador = this.contadorCerosPorFila(i);
                resultado.push(contador);
            }
            return resultado;
        }
    
        mostrarResultados() {
            const tablaResultado = document.getElementById("resultado");
            const cantidadCeros = this.contadorCerosPorTodasFila(); 
        
            for (let i = 0; i < cantidadCeros.length; i++) {
                const fila = document.createElement("tr");
                const indexFila = document.createElement("td");
                const contadorCelda = document.createElement("td");
                const matrizCelda = document.createElement("td");
        
                indexFila.textContent = `Fila ${i + 1}`;
                contadorCelda.textContent = cantidadCeros[i];
                matrizCelda.textContent = this.matriz[i].join(","); 
        
                fila.appendChild(indexFila);
                fila.appendChild(contadorCelda);
                fila.appendChild(matrizCelda);
        
                tablaResultado.appendChild(fila); 
            }
        }  
    }
    
    const contadorCeros = new ContadorCeros(matriz);
    contadorCeros.mostrarResultados();
});

