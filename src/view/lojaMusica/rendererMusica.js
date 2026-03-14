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
const idMusicaEdit = document.getElementById("id_musica_edit")
const nomeMusicaEdit = document.getElementById("musica_nome_edit")
const duracaoMusicaEdit = document.getElementById("musica_duracao_edit")
const dataLancMusicaEdit = document.getElementById("musica_dataLanc_edit")
const estiloMusicaEdit = document.getElementById("musica_estilo_edit")
const btnSalvarEdit = document.getElementById("btnSalvarEdit")
const estiloLista = document.getElementById("estilo_listar")

async function renderizarTabela() {
    // 1. Buscamos a lista atualizada do banco
    const musicas = await window.lojaMusica.musica.listar();
    const estilos = await window.lojaMusica.estilo.listar();



    // 2. Limpamos a tabela para evitar duplicidade ao recarregar
    tabela.innerHTML = "";

    // 3. O seu loop agindo sobre os dados reais
    musicas.forEach(musica => {
        // Criamos a estrutura da linha usando Template String

        const estiloEncontrado = estilos.find(e => e.estilo_id === musica.estilo_id);
        
        // Pegamos a descrição ou um texto padrão caso não encontre
        const descricaoEstilo = estiloEncontrado ? estiloEncontrado.descricao : "Não definido";

        const linhaHTML = `
            <tr>
                <td>${musica.musica_id}</td>
                <td>${musica.nome}</td>
                <td>${musica.duracao}</td>
                <td>${musica.data_lancamento}</td>
                <td id="estilo_listar">'${descricaoEstilo}'<td>
                    <button class="btn btn-sm btn-warning"
                        id="btn_editar"
                        onclick="prepararEdicao(${musica.musica_id}, '${musica.nome}' , '${musica.duracao}', '${musica.data_lancamento}', ${musica.estilo_id})"
                        data-bs-toggle="modal" 
                        data-bs-target="#modal_editar">Editar</button>
                    <button
                        id="btn_excluir"
                        onclick="excluirMusica(${musica.musica_id})"
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
    await editarMusica(nomeMusicaEdit.value, duracaoMusicaEdit.value, dataLancMusicaEdit.value, estiloMusicaEdit.value, idMusicaEdit.value)
    await renderizarTabela()
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

async function editarMusica(nome, duracao, musica_dataLanc, estilo_id, musica_id) {
    await window.lojaMusica.musica.editar(nome, duracao, musica_dataLanc, estilo_id, musica_id);
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

async function listarEstilos(id_estilo){

    estilos = await lojaMusica.estilo.listar()
    estilos.forEach(estilo => {
        if(id_estilo === estilo.estilo_id){
            estiloLista.value = estilo.descricao;
        }
    });
}

