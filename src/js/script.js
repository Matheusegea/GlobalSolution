document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle')
    const mobileNav = document.getElementById('mobileNav')
    const closeMenu = document.getElementById('closeMenu')

    if (menuToggle && mobileNav && closeMenu) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.add('active')
        })

        closeMenu.addEventListener('click', () => {
            mobileNav.classList.remove('active')
        })

        document.querySelectorAll('.__mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active')
            })
        })
    }
})