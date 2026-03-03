const {ipcMain} = require("electron")
const serviceArtista = require("../service/serviceArtista")
  
  
function registerArtistaHandler(){  
  // É necessário passar "event" como um dos parâmetros pois a função handle armazena dados do evento nessa variável, que podem ser úteis depois.
  ipcMain.handle("lojaMusica:artista:criar", async (event, nome) =>  {
    //Estou passando a descrição pois exigi ela na criação do artista
    //Estou retornando {`id: this.lastID, nome`} dessa maneira, retorno todo o objeto ao front 
    return  await serviceArtista.criar(nome)
  })

  ipcMain.handle("lojaMusica:artista:listar", async (event) => {
    return await serviceArtista.listar()
  })

  ipcMain.handle(`lojaMusica:artista:excluir`, async (event, id) => {

    return await serviceArtista.excluir(id)
  })

  ipcMain.handle("lojaMusica:artista:editar", async (event, {id, nome}) => {

    return await serviceArtista.editar(id, nome)
  })
}

module.exports = registerArtistaHandler;