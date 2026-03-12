const tabela = document.getElementById("tabela-estilos-body");
document.addEventListener("DOMContentLoaded", renderizarTabela);
const btnSalvar = document.getElementById("btnSalvar")
const btnExcluir = document.getElementById("btn_excluir")
const novoEstilo = document.getElementById("descricao")
const idEstiloEdit = document.getElementById("id_estilo_edit")
const descricaoEstiloEdit = document.getElementById("descricao_edit")
const btnSalvarEdit = document.getElementById("btnSalvarEdit")

async function renderizarTabela() {
    // 1. Buscamos a lista atualizada do banco
    const estilos = await window.lojaMusica.estilo.listar();

    // 2. Limpamos a tabela para evitar duplicidade ao recarregar
    tabela.innerHTML = "";

    // 3. O seu loop agindo sobre os dados reais
    estilos.forEach(estilo => {
        // Criamos a estrutura da linha usando Template String
        const linhaHTML = `
            <tr>
                <td>${estilo.estilo_id}</td>
                <td>${estilo.descricao}</td>
                <td>
                    <button class="btn btn-sm btn-warning"
                        id="btn_editar"
                        onclick="prepararEdicao(${estilo.estilo_id}, '${estilo.descricao}')"
                        data-bs-toggle="modal" 
                        data-bs-target="#modal_editar">Editar</button>
                    <button
                        id="btn_excluir"
                        onclick="excluirEstilo(${estilo.estilo_id})"
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
    estilo = novoEstilo.value;
    await adicionarEstilo(estilo);
})

btnSalvarEdit.addEventListener("click", async () =>{
    await editarEstilo(idEstiloEdit.value, descricaoEstiloEdit.value)
    renderizarTabela()
})

async function adicionarEstilo(estilo){
    await window.lojaMusica.estilo.criar(estilo);
    renderizarTabela();
}

function prepararEdicao(estilo_id, descricao) {
    idEstiloEdit.value = estilo_id;
    descricaoEstiloEdit.value = descricao;
}

async function editarEstilo(id, descricao) {
    await window.lojaMusica.estilo.editar(id, descricao);
    renderizarTabela();
}

async function excluirEstilo(id) {
    await window.lojaMusica.estilo.excluir(id)
    renderizarTabela()
}

