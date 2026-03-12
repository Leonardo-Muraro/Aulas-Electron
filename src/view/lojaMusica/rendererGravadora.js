const tabela = document.getElementById("tabela-gravadora-body");
document.addEventListener("DOMContentLoaded", renderizarTabela);
const btnSalvar = document.getElementById("btnSalvar")
const btnExcluir = document.getElementById("btn_excluir")
const novaGravadora = document.getElementById("gravadora_add")
const idGravadoraEdit = document.getElementById("id_gravadora_edit")
const nomeGravadoraEdit = document.getElementById("nome_edit")
const btnSalvarEdit = document.getElementById("btnSalvarEdit")

async function renderizarTabela() {
    // 1. Buscamos a lista atualizada do banco
    const gravadoras = await window.lojaMusica.gravadora.listar();
    // 2. Limpamos a tabela para evitar duplicidade ao recarregar
    tabela.innerHTML = "";

    gravadoras.forEach(gravadora => {

        const linhaHTML = `
            <tr>
                <td>${gravadora.gravadora_id}</td>
                <td>${gravadora.nome}</td>
                <td>
                    <button class="btn btn-sm btn-warning"
                        id="btn_editar"
                        onclick="prepararEdicao(${gravadora.gravadora_id}, '${gravadora.nome}')"
                        data-bs-toggle="modal" 
                        data-bs-target="#modal_editar">Editar</button>
                    <button
                        id="btn_excluir"
                        onclick="excluirEstilo(${gravadora.gravadora_id})"
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
    const nome = novaGravadora.value;
    if (nome.trim() !== "") {
        await adicionarGravadora(nome);
        novaGravadora.value = ""; // Limpa o campo
    } 
})

btnSalvarEdit.addEventListener("click", async () =>{
    await editarEstilo(idGravadoraEdit.value, nomeGravadoraEdit.value)
    renderizarTabela()
})

async function adicionarGravadora(gravadora){
    await window.lojaMusica.gravadora.criar(gravadora);
    renderizarTabela();
}

function prepararEdicao(gravadora_id, nome) {
    idGravadoraEdit.value = gravadora_id;
    nomeGravadoraEdit.value = nome;
}

async function editarEstilo(id, nome) {
    await window.lojaMusica.gravadora.editar(id, nome);
    renderizarTabela();
}

async function excluirEstilo(id) {
    await window.lojaMusica.gravadora.excluir(id)
    renderizarTabela()
}

