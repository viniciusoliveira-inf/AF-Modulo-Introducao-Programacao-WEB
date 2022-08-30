const formularioCadastro = document.querySelector('#form_cadastro');
formularioCadastro.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.querySelector('#nome').value;
    const email = document.querySelector('#email').value; 
    const senha1 = document.querySelector('#senha1').value;
    const senha2 = document.querySelector('#senha2').value;
    if(senha1.length < 6 || senha2.length < 6){
        alert('As senhas devem ter pelo menos 6 caracteres.');
        return;
    }
    if(senha1 !== senha2){
        alert('Senha e confirmação de senha não conferem.');
        return;
    };
    const existeUsuario = verificaExistente(email)
    if (email === existeUsuario.email){
        alert('E-Mail já cadastrado!')
        return;
    }
    salvarConta({
        nome: nome,
        email: email,
        senha: senha1,
        recados: []
    })
    alert('Conta criada com sucesso!')
    location.assign('index.html')
});
function verificaExistente(chave){
    const possivelConta = localStorage.getItem(chave);
    if(possivelConta){
        return JSON.parse(possivelConta)
    }
    return '';
}
function salvarConta(novoUsuario){
    localStorage.setItem(novoUsuario.email, JSON.stringify(novoUsuario))
}