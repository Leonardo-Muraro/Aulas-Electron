const db = require('../../database/db')

const serviceGravadora = {
    criar: (nome) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO gravadora (nome) VALUES (?)`;
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
            const query = `SELECT * FROM gravadora`
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
            const query = `DELETE FROM gravadora WHERE gravadora_id = (?)`
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
            const query = `UPDATE gravadora SET nome = (?) WHERE gravadora_id = (?)`
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

module.export = serviceGravadora;