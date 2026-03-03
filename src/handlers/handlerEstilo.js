const {ipcMain} = require("electron")
const serviceEstilo = require("../service/serviceEstilo")
  
  
function registerEstiloHandler(){  
  // É necessário passar "event" como um dos parâmetros pois a função handle armazena dados do evento nessa variável, que podem ser úteis depois.
  ipcMain.handle("lojaMusica:estilo:criar", async (event, descricao) =>  {
    //Estou passando a descrição pois exigi ela na criação do estilo
    //Estou retornando {`id: this.lastID, descricao`} dessa maneira, retorno todo o objeto ao front 
    return  await serviceEstilo.criar(descricao)
  })

  ipcMain.handle("lojaMusica:estilo:listar", async (event) => {
    return await serviceEstilo.listar()
  })

  ipcMain.handle(`lojaMusica:estilo:excluir`, async (event, id) => {

    return await serviceEstilo.excluir(id)
  })

  ipcMain.handle("lojaMusica:estilo:editar", async (event, {id, descricao}) => {

    return await serviceEstilo.editar(id, descricao)
  })
}

module.exports = registerEstiloHandler;