document.addEventListener('DOMContentLoaded', function() {
    const secoesBtn = document.getElementById('secoesBtn')
    const secoesMenu = document.getElementById('secoesMenu')

    secoesBtn.addEventListener('click', function(e) {
        e.stopPropagation()
        secoesMenu.classList.toggle('active')
    })
    document.addEventListener('click', function(e) {
        if (!secoesMenu.contains(e.target) && e.target !== secoesBtn) {
            secoesMenu.classList.remove('active')
        }
    })
    document.querySelectorAll('.__secao-link').forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(() => {
                secoesMenu.classList.remove('active')
            }, 100)
        })
    })
})