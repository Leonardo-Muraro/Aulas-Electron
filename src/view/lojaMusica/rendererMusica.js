const tabela = document.getElementById("tabela-musica-body");
document.addEventListener("DOMContentLoaded", () => {
     renderizarTabela();
     carregarEstilos();
});
const btnSalvar = document.getElementById("btnSalvar")
const btnExcluir = document.getElementById("btn_excluir")
const nomeMusicaAdd = document.getElementById("nome_musica_add")
const duracaoMusicaAdd = document.getElementById("musica_duracao_add")
const dataLancMusicaAdd = document.getElementById("musica_dataLanc_add")
const estiloMusicaAdd = document.getElementById("musica_estilo_add")
const idMusicaEdit = document.getElementById("id_artista_edit")
const nomeMusicaEdit = document.getElementById("nome_edit")
const duracaoMusicaEdit = document.getElementById("musica_duracao_edit")
const dataLancMusicaEdit = document.getElementById("musica_dataLanc_edit")
const estiloMusicaEdit = document.getElementById("musica_estilo_edit")
const btnSalvarEdit = document.getElementById("btnSalvarEdit")

async function renderizarTabela() {
    // 1. Buscamos a lista atualizada do banco
    const musicas = await window.lojaMusica.musica.listar();

    // 2. Limpamos a tabela para evitar duplicidade ao recarregar
    tabela.innerHTML = "";

    // 3. O seu loop agindo sobre os dados reais
    musicas.forEach(musica => {
        // Criamos a estrutura da linha usando Template String
        const linhaHTML = `
            <tr>
                <td>${musica.musica_id}</td>
                <td>${musica.nome}</td>
                <td>
                    <button class="btn btn-sm btn-warning"
                        id="btn_editar"
                        onclick="prepararEdicao(${musica.musica_id}, '${musica.nome}' , '${musica.duracao}', ${musica.data_lancamento}, ${musica.estilo_id})"
                        data-bs-toggle="modal" 
                        data-bs-target="#modal_editar">Editar</button>
                    <button
                        id="btn_excluir"
                        onclick="excluirMusica(${musica.artista_id})"
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

    const nome = nomeMusicaAdd.value;
    const duracao = duracaoMusicaAdd.value;
    const dataLancamento = dataLancMusicaAdd.value;
    const estiloId = estiloMusicaAdd.value;

    await adicionarMusica(nome, duracao, dataLancamento, estiloId);
});




btnSalvarEdit.addEventListener("click", async () =>{
    await editarEstilo(idMusicaEdit.value, nomeMusicaEdit.value)
    renderizarTabela()
})

async function adicionarMusica(nome, duracao, dataLancamento, estiloId) {

    await window.lojaMusica.musica.criar(nome, duracao, dataLancamento, estiloId);  
    await renderizarTabela();

    nomeMusicaAdd.value = "";
    duracaoMusicaAdd.value = "";
    dataLancMusicaAdd.value = "";
    estiloMusicaAdd.value = "";
}


function prepararEdicao(musica_id, nome_musica, musica_duracao, musica_dataLanc, musica_estilo_id) {
    idMusicaEdit.value = musica_id;
    nomeMusicaEdit.value = nome_musica;
    duracaoMusicaEdit.value = musica_duracao;
    dataLancMusicaEdit.value = musica_dataLanc;
    estiloMusicaEdit.value = musica_estilo_id;

}

async function editarMusica(id, nome) {
    await window.lojaMusica.musica.editar(id, nome);
    renderizarTabela();
}

async function excluirMusica(id) {
    await window.lojaMusica.musica.excluir(id)
    renderizarTabela()
}

async function carregarEstilos() {
    const estilos = await window.lojaMusica.estilo.listar();
    const selects = [estiloMusicaAdd, estiloMusicaEdit];

    selects.forEach(select => {

        select.innerHTML = '<option value="" selected disabled>Selecione um Estilo.</option>';
        
        estilos.forEach(estilo => {
            const option = document.createElement("option");
            option.value = estilo.estilo_id; 
            option.textContent = estilo.descricao; 
            select.appendChild(option);
        });
    });
}
