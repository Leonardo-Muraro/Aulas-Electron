const tabela = document.getElementById("tabela-estilos-body");
document.addEventListener("DOMContentLoaded", renderizarTabela);

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
                    <button class="btn btn-sm btn-warning">Editar</button>
                    <button class="btn btn-sm btn-danger">Excluir</button>
                </td>
            </tr>
        `;

        // Injetamos a linha no final do corpo da tabela
        tabela.insertAdjacentHTML('beforeend', linhaHTML);
    });
}