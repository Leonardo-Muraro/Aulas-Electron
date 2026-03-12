const db = require("../../database/db")

const serviceMusica = {
    criar: (nome, duracao, data_lancamento,estilo_id) => {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO musica (nome, duracao, data_lancamento, estilo_id) VALUES (?,?,?,?)"
            db.run(query, [nome, duracao, data_lancamento, estilo_id], function(err){
                if (err){
                    reject(err)
                }
                else{
                    resolve({id: this.lastID, nome})
                    //PRECISO USAR FUNCTION PARA USAR "this"
                }
            })
        })
    },
    
    listar: () => {
        return new Promise((resolve, reject) => {
            // Sintaxe básica de JOIN'S SELECT *oq eu quero selecionar de quais tabelas* FROM *tabela principal* e o JOIN das tabelas que possuem FK nessa tabela.
            const query = `
            SELECT
                 musica.*, 
                 estilo.descricao AS estilo_nome
            FROM
                musica
            JOIN
                estilo ON musica.estilo_id = estilo.estilo_id
            `
            db.all(query, [], (err, rows) => { //Consultas e coisas que não alteram a estrutura do banco usamos "db.all"
                if (err){
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    },

    excluir: (musica_id) => {
        return new Promise((resolve,reject) => {
            const query = `DELETE FROM musica WHERE musica_id = (?)`
            db.run(query, [musica_id], function(err){
                if(err){
                    reject(err)
                }
                else{
                    resolve(this.changes)
                }
            })
        })
    },

    editar: (nome, duracao, data_lancamento, estilo_id, musica_id) =>{
        return new Promise((resolve, reject) =>{
            const query = `
                UPDATE musica SET 
                nome = ?,
                duracao = ?,
                data_lancamento = ?,
                estilo_id = ?
                WHERE musica_id = ?
            ` // Usamos (?) quando aquilo que queremos passar está dentro de parênteses, como VALUES, quando o valor fica fora de parênteses, usamos apenas ?
            // Mudando todos os parâmetros via ID da música.
        db.run(query, [nome, duracao, data_lancamento, estilo_id, musica_id], function(err){
            if (err){
                reject(err)
            }
            else{
                resolve(this.changes)
            }
        })

        })
    }
}


module.exports = serviceMusica;