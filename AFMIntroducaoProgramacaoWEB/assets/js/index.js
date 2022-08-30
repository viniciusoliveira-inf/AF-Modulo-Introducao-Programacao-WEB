formHTML = document.querySelector('form')
let usuario = {}
formHTML.addEventListener('submit', (e) => {
    e.preventDefault()
    usuarioHTML = document.querySelector('#usuario').value
    senhaHTML = document.querySelector('#senha').value
    usuario = procuraUsuario(usuarioHTML, senhaHTML)
    if(!usuario){
        return
    }
    localStorage.setItem('usuarioLogado', usuario.email)
    window.location.assign('recados.html')
})
function procuraUsuario(email, senha){
    let usuarioEncontrado = JSON.parse(localStorage.getItem(email))
    if(usuarioEncontrado && usuarioEncontrado.senha === senha){
        return usuarioEncontrado
    } else {
        alert('Usuário ou senha não conferem!')
        return
    }
}