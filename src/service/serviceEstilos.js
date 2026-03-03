const db = require('../../database/db')

const serviceEstilo = {
    criar: (descricao) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO estilo (descricao) VALUES (?)`;
            db.run(query, [descricao], function(err){
                if (err){
                    reject(err);
                }
                else{
                    resolve({id: this.lastID, descricao})
                }

            });
        })
    },

    listar: () => {
        return new Promise((resolve, reject) =>{
            const query = `SELECT * FROM estilo`
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
            const query = `DELETE FROM estilo WHERE estilo_id = (?)`
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

    editar: (id, descricao) => {
        return new Promise((resolve, reject) =>{
            const query = `UPDATE estilo SET descricao = (?) WHERE estilo_id = (?)`
            db.run(query, [descricao, id], function(err){
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

module.export = serviceEstilo;