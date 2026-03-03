const { app, BrowserWindow, ipcMain } = require('electron');
const { eventNames } = require('node:cluster');
const path = require('node:path')
const sqlite = require('sqlite3').verbose();
const serviceEstilos = require('./service/serviceEstilos')
 
const db = new sqlite.Database(
    path.resolve('database', 'loja_musica.db'),
    (erro) => {
        if (erro) {
            console.log('Erro ao conectar com sqlite.')
        } else {
            console.log('Conectado ao sqlite com sucesso.')
        }
    }
);

console.log('Estou executando no node!');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, "preload.js")
    }
  })

  // como criamos a pasta src, não é possivel referenciar por string o caminho
  // win.loadFile('./view/index.html')
  // deve ser feito o resolve para o node pegar o caminho completo no S.O
  console.log(path.resolve('src/view/index.html'))
  win.loadFile(path.resolve('src/view/index.html'))
}

let contadorValor = 0
const createIpcMain = () => {
  ipcMain.handle("contador:incrementar", () => {
    
    console.log("contador:incrementar")
    contadorValor = contadorValor + 1
  
  })

  ipcMain.handle("contador:zerar", () => {
    console.log("contador:zerar")
    contadorValor = 0
  })


  ipcMain.handle("contador:pegarValor", () => {

    console.log("contador:pegarValor")
    return contadorValor

  })

  ipcMain.handle("contador:decrescer", () => {
    
    console.log("contador:decrescer")
    if(contadorValor === 0){
      return
    }
    contadorValor -= 1
  })

  ipcMain.handle("calculadora:executar", (event, dados) =>{
    console.log("calculadora", dados)

    switch(dados.operacao){
      case 'SUM':
        return Number(dados.valor1) + Number(dados.valor1)
    
      case 'SUB':
        return Number(dados.valor1) - Number(dados.valor1)
    
      case 'MUL':
        return Number(dados.valor1) * Number(dados.valor1)
    
      case 'DIV':
        return Number(dados.valor1) / Number(dados.valor1)
    }
  })

  // É necessário passar "event" como um dos parâmetros pois a função handle armazena dados do evento nessa variável, que podem ser úteis depois.
  ipcMain.handle("lojaMusica:estilo:criar", async (event, descricao) =>  {
    //Estou passando a descrição pois exigi ela na criação do estilo
    //Estou retornando {`id: this.lastID, descricao`} dessa maneira, retorno todo o objeto ao front 
    return  await serviceEstilos.criar(descricao)
  })

  ipcMain.handle("lojaMusica:estilo:listar", async (event) => {
    return await serviceEstilos.listar()
  })

  ipcMain.handle(`lojaMusica:estilo:excluir`, async (event, id) => {

    return await serviceEstilos.excluir(id)
  })

  ipcMain.handle("lojaMusica:estilo:editar", async (event, {id, descricao}) => {

    return await serviceEstilos.editar(id, descricao)
  })
}

/*
Inicializa o App Electron
*/  
app.whenReady().then(() => {
  // E quando estiver pronto, registra as funções do backend e cria a janela.
  createIpcMain()
  createWindow()
})

