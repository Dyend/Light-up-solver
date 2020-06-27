
var tablero = [];
var dimension_tablero = 0;
var primer_movimento = 0;

function inicializaMatriz(contenido){
    var largo = contenido.split("\n").length;
    dimension_tablero = largo;
    var tabla = [];
    var filas = contenido.split("\n");
    for(var i = 0; i < largo; i++){		
        tabla[i] = [];
        var fila = filas[i];
        // quitamos los espacios de la fila
        fila = fila.replace(/ /g, "");
        for(var j = 0 ; j < largo ; j++){
            var caracter = fila.charAt(j);
            tabla[i][j] = caracter;
        }	        
    }
    return tabla;
}		



function cargarTablero(contenido){
    tablero = inicializaMatriz(contenido);
    dibujar_tabla();
    var dimension_tabla = (dimension_tablero*50 + dimension_tablero*2) + "px";
    document.getElementById("tablerominas").style.height = dimension_tabla;
    document.getElementById("tablerominas").style.width = dimension_tabla;
    temporal();
    primer_movimento = 0;
}

// metodo que re dibuja la tabla
function dibujar_tabla(){
    var dimension_matriz_cuadrada = tablero[0].length;
    // clean table
    document.getElementById("tablerominas").innerHTML = '';
    var dimension_tabla = (dimension_matriz_cuadrada*50 + dimension_matriz_cuadrada*2) + "px";
    document.getElementById("tablerominas").style.height = dimension_tabla;
    document.getElementById("tablerominas").style.width = dimension_tabla;

    for(var i = 0; i < dimension_matriz_cuadrada; i++){
        
        for(var j = 0; j < dimension_matriz_cuadrada; j++){
            
            var caracter = tablero[i][j];
            var div = document.createElement("div");
            div.id = i + "" + j;
            // cambiar esta wea por sswitch
            if(caracter=="-"){
                div.className = "white_square";
            }
            else if(caracter=="#"){
                div.className = "black_square";
            }
            else if(caracter == "L"){
                div.className = "lampara";
            }
            else if(caracter == "XI"){
                div.className = "XI";
                div.innerHTML = "<p>" + "X" + "</p>";
            }
            else if(caracter == "X"){
                div.className = "X";
                div.innerHTML = "<p>" + caracter + "</p>";
            }
            else if(caracter == "I"){
                div.className = "luz";
            }
            else{
                div.innerHTML = "<p>" + caracter + "</p>";
                div.className = "black_square";
            }
            tablerominas.appendChild(div);

        }
    }		    
}

//  retorna true si esta completado
function solved(){
    for(var i = 0 ; i < dimension_tablero ; i++){
        for(var j = 0 ; j < dimension_tablero ; j++){
            if(tablero[i][j]== "-")
                return false;
        }
    }
    alert('El ejercicio esta terminado');
    return true;
}

// printea la matriz
function temporal(){
    console.log(tablero);
}

function first_move(){
    for(var i = 0 ; i < dimension_tablero ; i++){
        for(var j = 0 ; j < dimension_tablero ; j++){
            if(tablero[i][j]== "0")
                marcar_x(i,j);
        }
    }
}

// metodo llamado al presionar el boton next move
function next_move(){
    if(primer_movimento == 0){
        first_move();
        dibujar_tabla();
        primer_movimento = 1;
    }
    else if(solver()){
        dibujar_tabla();
        temporal();
        solved();
    }
    else if(!solved()){
        alert('no encontre mas movimientos :(');
    }

}


// funciones del solver

// metodo llamado con el boton next move
function solver(){

    // revisar la matriz ordenada de acuerdo a los que tengan mas probabilidad 4 3 2 1 0 y luego el resto

    var movimiento_logrado = false;
    for(var i = 0 ; i < tablero.length ; i++){
        for(var j = 0 ; j < tablero.length ; j++){
            switch(tablero[i][j]){
                case "4":
                    if(regla_numeros(4,i,j))
                        movimiento_logrado = true;
                        console.log('regla numeros');
                    break;
                case "3":
                    if(regla_numeros(3,i,j))
                        movimiento_logrado = true;
                        console.log('regla numeros');
                    break;
                case "2":
                    if(regla_numeros(2,i,j))
                        movimiento_logrado = true;
                        console.log('regla numeros');
                    break;
                case "1":
                    if(regla_numeros(1,i,j))
                        movimiento_logrado = true;
                        console.log('regla numeros');
                    break;
                case "X":
                    if(regla_x(i,j))
                        movimiento_logrado = true;
                        console.log('regla del x');
                    break;
                case "-":
                    if(regla_blanco(i,j))
                        movimiento_logrado = true;
                        console.log('regla blanco');
                    break;
                default:
                    break;
            }
            if(movimiento_logrado)
                return movimiento_logrado;
        }
    }
    return movimiento_logrado;

}

//funcion X
function regla_x(i,j){

    // revisar que en la misma fila y columna solo haya 1 blanco
    // si se cumple eso pongo luz en la casilla encontrada.
    var largo_tablero = dimension_tablero;
    
    var aux;
    var contador = 0;
    var posicion_i, posicion_j; 

    // revisa hacia la derecha
    aux = j + 1; 

    while((aux < (largo_tablero)) && !is_black_square(tablero[i][aux])){
        if(tablero[i][aux]== "-"){
            contador = contador + 1;
            posicion_i = i;
            posicion_j = aux;
        }
        aux = aux + 1;
        if(contador > 1 )
            return false;
    }

    // revisa hacia la izquierda
    aux = j - 1;

    while(aux > -1 && !is_black_square(tablero[i][aux])){
        if(tablero[i][aux]== "-"){
            contador = contador + 1
            posicion_i = i;
            posicion_j = aux;
        }
        aux = aux - 1;
        if(contador > 1 )
            return false;
    }

    // revisa hacia la abajo
    aux = i + 1;

    while(aux < largo_tablero && !is_black_square(tablero[aux][j])){
        if(tablero[aux][j] == "-"){
            posicion_i = aux;
            posicion_j = j;
            contador = contador + 1
        }
        aux = aux + 1;
        if(contador > 1 )
            return false;
    }
    // revisa hacia la arriba
    aux = i - 1;

    while(aux > -1 && !is_black_square(tablero[aux][j])){
        if(tablero[aux][j] == "-"){
            posicion_i = aux;
            posicion_j = j;
            contador = contador + 1
        }
        aux = aux - 1;
        if(contador > 1 )
            return false;
    }

    var casillero = [posicion_i, posicion_j];
    iluminar(casillero);

    return true;

}

function is_white_square(casillero){
    if(tablero[casillero[0]][casillero[1]]=="-")
        return true;
    return false;
}
function is_yellow(casillero){
    if(tablero[casillero[0]][casillero[1]]=="I")
        return true;
    return false;
}

// funcion que marca con X alrededor del 0
function marcar_x(i,j){
    var izquierda = [i, j - 1];
    var derecha = [i, j + 1];
    var arriba = [i - 1 , j];
    var abajo = [i + 1,  j];
    var lista = [izquierda, derecha, arriba, abajo];

    for (var x = 0 ; x < lista.length ; x++){
        var casillero = [lista[x][0], lista[x][1]];
        if(!is_out_of_bounds(casillero)){
            if(is_white_square(casillero))
                tablero[casillero[0]][casillero[1]] = "X";
            else if(is_yellow(casillero))
                tablero[casillero[0]][casillero[1]] = "XI";
        }
    }
}

//retorna verdadero si encuentra un cuadro blanco en la fila
function fila_con_blanco(i,j){
    var largo_tablero = dimension_tablero;
    
    var aux;
    // revisa hacia la derecha
    aux = j + 1;

    while((aux < (largo_tablero)) && !is_black_square(tablero[i][aux])){
        if(tablero[i][aux]== "-"){
            return true;
        }
        aux = aux + 1;
    }
    // revisa hacia la izquierda
    aux = j - 1;

    while(aux > -1 && !is_black_square(tablero[i][aux])){
        if(tablero[i][aux]== "-"){
            return true;
        }
        aux = aux - 1;
    }
    return false;
}

//retorna verdadero si encuentra un cuadro blanco en la columna
function columna_con_blanco(i,j){
    var largo_tablero = dimension_tablero;
    
    var aux;
    // revisa hacia la abajo
    aux = i + 1;

    while(aux < largo_tablero && !is_black_square(tablero[aux][j])){
        if(tablero[aux][j] == "-"){
            return true;
        }
        aux = aux + 1;
    }
    // revisa hacia la arriba
    aux = i - 1;

    while(aux > -1 && !is_black_square(tablero[aux][j])){
        if(tablero[aux][j] == "-"){
            return true;
        }
        aux = aux - 1;
    }
}


// si en el camino de fila o columna encuentro un bloque blanco retorno falso sino lampara
function regla_blanco(i,j){

    if(!fila_con_blanco(i,j)){
        if(!columna_con_blanco(i,j)){
            console.log(i);
            console.log(j);
            var casillero = [i,j];
            iluminar(casillero);
            return true;
        }
    }
    return false;
    
}


// retorna true si esta el caracter en la posicion
function is_caracter(caracter, casillero){
    if(tablero[casillero[0]][casillero[1]] == caracter)
        return true;
    return false;
}


function contador_caracteres_alrededor(caracter, i, j){
    // retorna la cantidad de lamparas alrededor de i,j
    var izquierda = [i, j - 1];
    var derecha = [i, j + 1];
    var arriba = [i - 1 , j];
    var abajo = [i + 1,  j];
    var lista = [izquierda, derecha, arriba, abajo];
    var contador = 0;

    for (var x = 0 ; x < lista.length ; x++){
        var casillero = [lista[x][0], lista[x][1]];
        if(!is_out_of_bounds(casillero) && is_caracter(caracter,casillero)){
            contador = contador + 1;
        }
    }
    return contador;
}


function is_black_square(caracter){
    if(caracter == "#" || caracter == "4" || caracter == "3" || caracter == "2" || caracter == "1" || caracter == "0")
        return true;
    return false;
}

// ilumina la fila del casillero hasta que toque un borde o cuadro negro
function iluminar_fila(casillero){
    var largo_tablero = dimension_tablero;
    var i = casillero[0];
    var j = casillero[1];

    var aux;
    // ilumina hacia la derecha

    aux = j + 1;

    while(aux < largo_tablero && !is_black_square(tablero[i][aux])){
        if(tablero[i][aux] == "X" || tablero[i][aux] == "XI")
            tablero[i][aux] = "XI";
        else
            tablero[i][aux] = "I";
        aux = aux + 1;
    }
    
    // ilumina hacia la izquierda
    aux = j - 1;

    while(aux > -1 && !is_black_square(tablero[i][aux])){
        if(tablero[i][aux] == "X" || tablero[i][aux] == "XI")
            tablero[i][aux] = "XI";
        else
            tablero[i][aux] = "I";
        aux = aux - 1;
    }

}

// ilumina la columna
function iluminar_columna(casillero){
    var largo_tablero = dimension_tablero;
    var i = casillero[0];
    var j = casillero[1];
    var aux;
    // ilumina hacia la abajo
    aux = i + 1;

    while(aux < largo_tablero && !is_black_square(tablero[aux][j])){
        if(tablero[aux][j] == "X" || tablero[aux][j] == "XI")
            tablero[aux][j] = "XI";
        else
            tablero[aux][j] = "I";
        aux = aux + 1;
    }
    // ilumina hacia la arriba
    aux = i - 1;

    while(aux > -1 && !is_black_square(tablero[aux][j])){
        if(tablero[aux][j] == "X" || tablero[aux][j] == "XI")
            tablero[aux][j] = "XI";
        else
            tablero[aux][j] = "I";
        aux = aux - 1;
    }

}


// pone una lampara y ilumina la fila y columna
function iluminar(casillero){
    var i = casillero[0];
    var j = casillero[1];
    tablero[i][j] = "L";
    iluminar_fila(casillero)
    iluminar_columna(casillero);

}

// regla que aplica para los numeros del 4 al 1
function regla_numeros(numero, i , j){
    var izquierda = [i, j - 1];
    var derecha = [i, j + 1];
    var arriba = [i - 1 , j];
    var abajo = [i + 1,  j];
    var lista = [izquierda, derecha, arriba, abajo];
    var blancos_alrededor = contador_caracteres_alrededor("-",i,j)
    var lamparas_alrededor = contador_caracteres_alrededor("L",i,j)
    var suma_blancos_lamparas_alrededor = blancos_alrededor + lamparas_alrededor;

    if(suma_blancos_lamparas_alrededor <= numero){

        for (var x = 0 ; x < lista.length ; x++){
            var casillero = [lista[x][0], lista[x][1]];
            if(!is_out_of_bounds(casillero) && !is_illuminated(casillero) && !is_caracter("X",casillero) && !is_black_square(tablero[casillero[0]][casillero[1]])){
                iluminar(casillero);
                if(lamparas_alrededor+1 == numero)
                    marcar_x(i,j);
                return true;
            }
        }
    }
    else if(lamparas_alrededor == numero){
        marcar_x(i,j);
    }
    return false;
}



// retorna verdadero si el casillero esta iluminado ya sea con lampara o con luz (casilla amarilla)

function is_illuminated(casillero){
    var i = casillero[0];
    var j = casillero[1];
    var casilla_real = tablero[i][j];
    if(casilla_real == "L" || casilla_real == "I" || casilla_real == "XI")
        return true;
    else
        return false;
}


// funcion que retorna si estas fuera de los limites del tablero
function is_out_of_bounds(casillero){
    var largo_tablero = tablero[0].length - 1;
    var i = casillero[0];
    var j = casillero[1];
    if(i < 0 || i > largo_tablero || j < 0 || j > largo_tablero)
        return true;
    else
        return false;
}