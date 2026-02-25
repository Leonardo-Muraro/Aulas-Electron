(async () => {
    const btnIncrementar = document.getElementById('incrementar')
    const contador = document.getElementById('contador')
    const btnZerar = document.getElementById('zerar')
    const btnDecrescer = document.getElementById('decrescer')


    btnIncrementar.addEventListener('click', async () => {
        
        // chamada para o backend
        await window.contador.incrementar()
        const valor = await window.contador.pegarValor()
        console.log(valor)
        contador.innerHTML = valor

    })


    btnZerar.addEventListener("click", async () => {

        await window.contador.zerar()
        const valor = await window.contador.pegarValor()
        console.log(valor)
        contador.innerHTML = valor

    })

    btnDecrescer.addEventListener("click", async () =>{
        
        await window.contador.decrescer()
        const valor = await window.contador.pegarValor()
        console.log(valor)
        contador.innerHTML = valor
        
    })

})()



