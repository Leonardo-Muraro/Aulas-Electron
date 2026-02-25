let dados = {
    valor1: null,
    valor2: null,
    operacao: null
},
ultimovalor = null

const visor = document.getElementById("visor")

function escreverNum(valor){
    if(ultimovalor){
        visor.innerText += valor
    } else {
        visor.innerText = valor
    }

    if(dados.operacao){
        if(!dados.valor2){
            dados.valor2 = valor
        } else {
            dados.valor2 += valor
        }
    }
    ultimovalor = valor
}

function escreverOperacao(operacao){
    if(ultimovalor == operacao){
        console.log("estou entrando aqui")
        return
    }

    if(!dados.operacao){
        dados.valor1 = visor.innerText
        dados.operacao = operacao
    }


    switch (operacao) {
        case "SUM":
            visor.innerHTML += '+'
            break;
        case "SUB":
            visor.innerHTML += '-'
            break;
        case "MUL":
            visor.innerHTML += 'x'
            break;
        case "DIV":
            visor.innerHTML += '/'
            break;
    
        default:
            break;
    }

    ultimovalor = dados.operacao

}

async function executar(){
    console.log(dados)
    const resultado = await window.calculadora.executar(dados)
    visor.innerText = resultado

}



function limparVisor(){
    visor.innerText = ""
    dados.valor1 = null
    dados.valor2 = null
    dados.operacao = null
    ultimovalor = null
}