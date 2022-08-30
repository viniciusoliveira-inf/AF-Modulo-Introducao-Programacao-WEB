const usuarioLogado = JSON.parse(localStorage.getItem(localStorage.getItem('usuarioLogado')))
const botaoCancEditHTML = document.querySelector('#botao-cancelar')
const botaoCadRecHTML = document.querySelector('#botao-cadastrar')
const localRecadosHTML = document.querySelector('#recados')
const botaoSairHTML = document.querySelector('#botao-sair')
const inputNumeroHTML = document.querySelector('#numero_recado')
const inputDescricaoHTML = document.querySelector('#input-descricao')
const inputDetalhamentoHTML = document.querySelector('#input-detalhamento')
document.addEventListener('DOMContentLoaded', (()=>{
    if(!usuarioLogado){
        location.assign('index.html')
        return
    } 
    const nomeUsuarioHTML = document.querySelector('#nome_do_usuario')
    nomeUsuarioHTML.innerText = usuarioLogado.nome
    mostrarRecados(usuarioLogado)
}))
botaoCadRecHTML.addEventListener('click', criarRecado)
botaoCancEditHTML.addEventListener('click', cancelaEdicao)
botaoSairHTML.addEventListener('click', sairSistema)
function criarRecado(){
    const usuarioLogado = JSON.parse(localStorage.getItem(localStorage.getItem('usuarioLogado')))
    const numeroRecado = inputNumeroHTML.value
    const descricao = inputDescricaoHTML.value
    const detalhamento = inputDetalhamentoHTML.value
    if(!descricao || !detalhamento){
        alert('Os campos Descrição e Detalhamento devem ser preenchidos!')
        return
    }
    recadoNovo = {
		descricao,
		detalhamento
    }
    if(numeroRecado){
        usuarioLogado.recados[numeroRecado] = recadoNovo
    } else {
        usuarioLogado.recados.push(recadoNovo)
    }
    salvarNoLocalStorage(usuarioLogado)
    limparDados()
    mostrarRecados(usuarioLogado)
    cancelaEdicao()
}
function editarRecado(id, usuario){
    const usuarioDoRecado = JSON.parse(localStorage.getItem(usuario))
    const recadoParaEditar = usuarioDoRecado.recados[id]
    botaoCadRecHTML.value = "ATUALIZAR"
    botaoCadRecHTML.style = 'background-color: yellow; color: black'
    botaoCancEditHTML.style = 'display: inline-block'
    inputNumeroHTML.value = id
    inputDescricaoHTML.value = recadoParaEditar.descricao
	inputDetalhamentoHTML.value = recadoParaEditar.detalhamento
}
function cancelaEdicao(){
    botaoCadRecHTML.value = "CADASTRAR"
    botaoCadRecHTML.style = 'background-color: gree; color: #efefef'
	inputDescricaoHTML.value = ''
	inputDetalhamentoHTML.value = ''
    botaoCancEditHTML.style = ''
    inputNumeroHTML.value = ''
}
function excluirRecado(id, usuario){
    const usuarioDoRecado = JSON.parse(localStorage.getItem(usuario))
    usuarioDoRecado.recados.splice(id, 1)
    localStorage.setItem(usuario, JSON.stringify(usuarioDoRecado))
    let usuarioNovosRecados = JSON.parse(localStorage.getItem(usuario))
    mostrarRecados(usuarioNovosRecados)
}
function salvarNoLocalStorage(info){
    localStorage.setItem(info.email, JSON.stringify(info))
}
function limparDados(){
    inputNumeroHTML.value = ''
    inputDescricaoHTML.value = ''
	inputDetalhamentoHTML.value = ''
}
function mostrarRecados(usuario){
    localRecadosHTML.innerHTML = ''
    recadosUsuarioLogado = usuario.recados
    let btn = []
    recadosUsuarioLogado.forEach((recado ,index, ) => {
        let novaLinha = document.createElement('tr')
        novaLinha.setAttribute('id', `linha_recado_${index}`)
        let numeroRecado = document.createElement('td')
        numeroRecado.innerText = `${index+1}`
        let descricao = document.createElement('td')
        descricao.innerText = recado.descricao
		let detalhamento = document.createElement('td')
        detalhamento.innerText = recado.detalhamento
        let tdBotoes = document.createElement('td')
        let botaoEditar = document.createElement('button')
        botaoEditar.setAttribute('class', `editar`)
        botaoEditar.setAttribute('id', `btn_editar_${index}`)
        botaoEditar.setAttribute('onclick', `editarRecado(${index}, '${usuarioLogado.email}')`)
        botaoEditar.innerText = 'EDITAR'
        let botaoExcluir = document.createElement('button')
        botaoExcluir.setAttribute('class', `excluir`)
        botaoExcluir.setAttribute('id', `btn_excluir_${index}`)
        botaoExcluir.setAttribute('onclick', `excluirRecado(${index}, '${usuarioLogado.email}')`)
        botaoExcluir.innerText = 'EXCLUIR'
        novaLinha.appendChild(numeroRecado)
        novaLinha.appendChild(descricao)
		novaLinha.appendChild(detalhamento)
        tdBotoes.appendChild(botaoEditar)
        tdBotoes.appendChild(botaoExcluir)
        novaLinha.appendChild(tdBotoes)
        localRecadosHTML.appendChild(novaLinha)
        btn.push(novaLinha)
    })
}
function sairSistema(){
    localStorage.removeItem('usuarioLogado')
    location.assign('index.html')
}