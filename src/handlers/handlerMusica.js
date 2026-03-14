const {ipcMain} = require("electron") //importamos "ipcMain" pois iremos usar o handler, para chamar as funções do nosso service via backend
const serviceMusica = require("../service/serviceMusica") //importamos nosso arquivo "backend" para chamar as funções.

function registerMusicaHandler(){

    ipcMain.handle("lojaMusica:musica:criar", async (event, {nome, duracao, data_lancamento, estilo_id}) =>{

        return await serviceMusica.criar(nome, duracao, data_lancamento, estilo_id)
    })
    
    ipcMain.handle("lojaMusica:musica:listar", async (event) =>{

        return await serviceMusica.listar()
    })

    ipcMain.handle("lojaMusica:musica:editar", async (event, {nome, duracao, data_lancamento, estilo_id, musica_id}) =>{

        return await serviceMusica.editar(nome, duracao, data_lancamento, estilo_id, musica_id)
    })

    ipcMain.handle("lojaMusica:musica:excluir", async (event, musica_id) =>{

        return await serviceMusica.excluir(musica_id)
    })
    

}

module.exports = registerMusicaHandler;