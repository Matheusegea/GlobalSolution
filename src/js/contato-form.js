document.addEventListener('DOMContentLoaded', function() {
    const contatoForm = document.getElementById('contato-form')
    const successMessage = document.getElementById('form-success-message')
    
    if (contatoForm) {
        contatoForm.addEventListener('submit', function(e) {
            e.preventDefault()
            
            const nome = document.getElementById('nome').value
            const email = document.getElementById('email').value
            const telefone = document.getElementById('telefone').value
            const mensagem = document.getElementById('mensagem').value
            
            if (!nome || !email || !mensagem) {
                alert('Por favor, preencha todos os campos obrigatórios.')
                return
            }
            
            
            contatoForm.reset()
            
            successMessage.style.display = 'block'
            
            setTimeout(function() {
                successMessage.style.display = 'none'
            }, 5000)
        })
    }
})
