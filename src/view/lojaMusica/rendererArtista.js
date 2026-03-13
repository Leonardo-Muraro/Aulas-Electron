const tabela = document.getElementById("tabela-artista-body");
document.addEventListener("DOMContentLoaded", renderizarTabela);
const btnSalvar = document.getElementById("btnSalvar")
const btnExcluir = document.getElementById("btn_excluir")
const novoArtista = document.getElementById("artista_add")
const idArtistaEdit = document.getElementById("id_artista_edit")
const nomeArtistaEdit = document.getElementById("nome_edit")
const btnSalvarEdit = document.getElementById("btnSalvarEdit")

async function renderizarTabela() {
    // 1. Buscamos a lista atualizada do banco
    const artistas = await window.lojaMusica.artista.listar();

    // 2. Limpamos a tabela para evitar duplicidade ao recarregar
    tabela.innerHTML = "";

    // 3. O seu loop agindo sobre os dados reais
    artistas.forEach(artista => {
        // Criamos a estrutura da linha usando Template String
        const linhaHTML = `
            <tr>
                <td>${artista.artista_id}</td>
                <td>${artista.nome}</td>
                <td>
                    <button class="btn btn-sm btn-warning"
                        id="btn_editar"
                        onclick="prepararEdicao(${artista.artista_id}, '${artista.nome}')"
                        data-bs-toggle="modal" 
                        data-bs-target="#modal_editar">Editar</button>
                    <button
                        id="btn_excluir"
                        onclick="excluirArtista(${artista.artista_id})"
                        class="btn btn-sm 
                        btn-danger">Excluir</button>
                </td>
            </tr>
        `;

        // Injetamos a linha no final do corpo da tabela
        tabela.insertAdjacentHTML('beforeend', linhaHTML);
    });
}

btnSalvar.addEventListener("click", async () => {
    artista = artista_add.value;
    await adicionarEstilo(artista);
})

btnSalvarEdit.addEventListener("click", async () =>{
    await editarEstilo(idArtistaEdit.value, nomeArtistaEdit.value)
    renderizarTabela()
})

async function adicionarEstilo(artista){
    await window.lojaMusica.artista.criar(artista);
    renderizarTabela();
}

function prepararEdicao(artista_id, nome) {
    idArtistaEdit.value = artista_id;
    nomeArtistaEdit.value = nome;
}

async function editarEstilo(id, nome) {
    await window.lojaMusica.artista.editar(id, nome);
    renderizarTabela();
}

async function excluirArtista(id) {
    await window.lojaMusica.artista.excluir(id)
    renderizarTabela()
}

