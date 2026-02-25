/**
 require  - importa módulos externos dentro deste arquivo; Seja arquivo do projeto ou lib

 destructuring (desestruturação)
 const { chave1, chave2} = {aaa}

 const { contextBridge, ipcRenderer } = require("electron");
 mesma coisa que:
 const electron = require("electron")

 */

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versao", {
    chrome: process.versions.chrome,
    node: process.versions.node,
    electron: process.versions.electron
});

contextBridge.exposeInMainWorld("contador", {
    incrementar: () => {
        return ipcRenderer.invoke("contador:incrementar")
    },
    zerar: () => {
        return ipcRenderer.invoke("contador:zerar")
    },
    pegarValor: () => {
        return ipcRenderer.invoke("contador:pegarValor")
    },
    decrescer: () => {
        return ipcRenderer.invoke("contador:decrescer")
    }
})

contextBridge.exposeInMainWorld("calculadora", {
    executar: (dados) => {
        console.log(">>> preload.js > calculadora.executar()", dados)
        return ipcRenderer.invoke("calculadora:executar", dados)
    }
})

contextBridge.exposeInMainWorld("lojaMusica", {
    estilo:{
        criar: (descricao) => ipcRenderer.invoke("lojaMusica:estilo:criar", descricao),
        listar: () => ipcRenderer.invoke("lojaMusica:estilo:listar"),
        excluir: (id) => ipcRenderer.invoke("lojaMusica:estilo:excluir", id),
        editar: (id, descricao) => ipcRenderer.invoke("lojaMusica:estilo:editar", {id, descricao})
    }

})