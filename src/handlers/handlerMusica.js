const {ipcMain} = require("electron") //importamos "ipcMain" pois iremos usar o handler, para chamar as funções do nosso service via backend
const serviceMusica = require("../service/serviceMusica") //importamos nosso arquivo "backend" para chamar as funções.

function registerMusicaHandler(){

    ipcMain.handle("lojaMusica:musica:criar", async (event, {nome, data_lancamento, duracao, estilo_id}) =>{

        return await serviceMusica.criar(nome, data_lancamento, duracao, estilo_id)
    })
    
    ipcMain.handle("lojaMusica:musica:listar", async (event) =>{

        return await serviceMusica.criar()
    })

    ipcMain.handle("lojaMusica:musica:editar", async (event, {nome, data_lancamento, duracao, estilo_id, musica_id}) =>{

        return await serviceMusica.criar(nome, data_lancamento, duracao, estilo_id, musica_id)
    })

    ipcMain.handle("lojaMusica:musica:excluir", async (event, musica_id) =>{

        return await serviceMusica.criar(musica_id)
    })
    

}

module.exports = registerMusicaHandler;