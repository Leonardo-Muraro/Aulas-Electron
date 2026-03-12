const db = require('../../database/db')

const serviceArtista = {
    criar: (nome) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO artista (nome) VALUES (?)`;
            db.run(query, [nome], function(err){
                if (err){
                    reject(err);
                }
                else{
                    resolve({id: this.lastID, nome})
                }

            });
        })
    },

    listar: () => {
        return new Promise((resolve, reject) =>{
            const query = `SELECT * FROM artista`
            db.all(query, [], (err, rows) => {
                if (err){
                    reject(err)
                }
                else {
                    resolve(rows)
                }
            })

        })
    },

    excluir: (id) => {
        return new Promise ((resolve, reject) =>{
            const query = `DELETE FROM artista WHERE artista_id = (?)`
            db.run(query, [id], function(err){
                if (err){
                    reject(err)
                }
                else{
                    resolve(this.changes)
                }
            })
        })
    },

    editar: (id, nome) => {
        return new Promise((resolve, reject) =>{
            const query = `UPDATE artista SET nome = (?) WHERE artista_id = (?)`
            db.run(query, [nome, id], function(err){
                if (err){
                    reject(err)
                }
                else {
                    resolve(this.changes)
                }
            })
        })
    }



}

module.exports = serviceArtista;