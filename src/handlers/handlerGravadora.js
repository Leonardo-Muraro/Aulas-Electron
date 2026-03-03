const {ipcMain} = require("electron")
const serviceGravadora = require("../service/serviceGravadora")
  
  
function registerGravadoraHandler(){  
  // É necessário passar "event" como um dos parâmetros pois a função handle armazena dados do evento nessa variável, que podem ser úteis depois.
  ipcMain.handle("lojaMusica:gravadora:criar", async (event, nome) =>  {
    //Estou passando a descrição pois exigi ela na criação do gravadora
    //Estou retornando {`id: this.lastID, nome`} dessa maneira, retorno todo o objeto ao front 
    return  await serviceGravadora.criar(nome)
  })

  ipcMain.handle("lojaMusica:gravadora:listar", async (event) => {
    return await serviceGravadora.listar()
  })

  ipcMain.handle(`lojaMusica:gravadora:excluir`, async (event, id) => {

    return await serviceGravadora.excluir(id)
  })

  ipcMain.handle("lojaMusica:gravadora:editar", async (event, {id, nome}) => {

    return await serviceGravadora.editar(id, nome)
  })
}

module.exports = registerGravadoraHandler;