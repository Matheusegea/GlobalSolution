document.addEventListener('DOMContentLoaded', function() {
    const slideWrapper = document.querySelector('.slide-wrapper')
    const slides = document.querySelectorAll('.slide')
    const dots = document.querySelectorAll('.slide-dot')
    const prevBtn = document.querySelector('.slide-arrow-left')
    const nextBtn = document.querySelector('.slide-arrow-right')
    
    let currentSlide = 0
    const slideCount = slides.length
    
    updateSlidePosition()
    dots[0].classList.add('active')
    
    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount
        updateSlidePosition()
        updateDots()
    })
    
    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % slideCount
        updateSlidePosition()
        updateDots()
    })
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index
            updateSlidePosition()
            updateDots()
        })
    })
    
    function updateSlidePosition() {
        slideWrapper.style.transform = `translateX(-${currentSlide * 100}%)`
    }
    
    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active')
            } else {
                dot.classList.remove('active')
            }
        })
    }
    
    let slideInterval = setInterval(function() {
        currentSlide = (currentSlide + 1) % slideCount
        updateSlidePosition()
        updateDots()
    }, 5000)
    
    const slideContainer = document.querySelector('.slide-container')
    slideContainer.addEventListener('mouseenter', function() {
        clearInterval(slideInterval)
    })
    
    slideContainer.addEventListener('mouseleave', function() {
        slideInterval = setInterval(function() {
            currentSlide = (currentSlide + 1) % slideCount
            updateSlidePosition()
            updateDots()
        }, 5000)
    })
})
