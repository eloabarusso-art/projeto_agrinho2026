let tamanho = 16;

function aumentarFonte(){
    tamanho += 2;
    document.body.style.fontSize = tamanho + "px";
}

function diminuirFonte(){
    tamanho -= 2;
    document.body.style.fontSize = tamanho + "px";
}

function altoContraste(){
    document.body.classList.toggle("contraste");
}

function resposta(tipo){

    if(tipo === "certo"){
        document.getElementById("resultado").innerHTML =
        "✅ Parabéns! Energia solar é renovável.";
    }else{
        document.getElementById("resultado").innerHTML =
        "❌ Resposta incorreta. Tente novamente!";
    }

}

let arvores = 0;

function plantarArvore(){
    arvores++;
    document.getElementById("contador").innerHTML = arvores;
}

function tocarSom(){
    document.getElementById("som").play();
}
