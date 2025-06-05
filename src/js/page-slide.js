document.addEventListener('DOMContentLoaded', function() {
    initializeSlides()
    
    function initializeSlides() {
        const slideContainers = document.querySelectorAll('.page-slide-container')
        
        slideContainers.forEach(container => {
            const slideWrapper = container.querySelector('.slide-wrapper')
            const slides = container.querySelectorAll('.slide')
            const dots = container.querySelectorAll('.slide-dot')
            const prevBtn = container.querySelector('.slide-arrow-left')
            const nextBtn = container.querySelector('.slide-arrow-right')
            
            if (!slideWrapper || !slides.length) return
            
            let currentSlide = 0
            const slideCount = slides.length

            updateSlidePosition()
            if (dots.length) dots[0].classList.add('active')
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    currentSlide = (currentSlide - 1 + slideCount) % slideCount
                    updateSlidePosition()
                    updateDots()
                    resetAutoPlay()
                })
            }
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    currentSlide = (currentSlide + 1) % slideCount
                    updateSlidePosition()
                    updateDots()
                    resetAutoPlay()
                })
            }
            if (dots.length) {
                dots.forEach((dot, index) => {
                    dot.addEventListener('click', function() {
                        currentSlide = index
                        updateSlidePosition()
                        updateDots()
                        resetAutoPlay()
                    })
                })
            }
            function updateSlidePosition() {
                slideWrapper.style.transform = `translateX(-${currentSlide * 100}%)`
            }
            function updateDots() {
                if (!dots.length) return
                
                dots.forEach((dot, index) => {
                    if (index === currentSlide) {
                        dot.classList.add('active')
                    } else {
                        dot.classList.remove('active')
                    }
                })
            }
            let slideInterval
            function startAutoPlay() {
                if (slideInterval) {
                    clearInterval(slideInterval)
                }
                slideInterval = setInterval(function() {
                    currentSlide = (currentSlide + 1) % slideCount
                    updateSlidePosition()
                    updateDots()
                }, 3000)
            }
            function resetAutoPlay() {
                clearInterval(slideInterval)
                startAutoPlay()
            }
            startAutoPlay()
            container.addEventListener('mouseenter', function() {
                clearInterval(slideInterval)
            })
            container.addEventListener('mouseleave', function() {
                startAutoPlay()
            })
        })
    }
})
