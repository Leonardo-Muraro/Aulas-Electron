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


}

module.export = serviceEstilo;