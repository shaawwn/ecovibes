
/*

    Assumes a section with id="carousel"

*/

// function carousel(images) {
//     const carouselSection = document.getElementById('carousel')

//     const carousel = _createCarousel(images)


// }
import style from './carousel.css'

export default class Carousel {
    constructor(images) {
        this.images = images
    }

    createCarousel() {
        const section = document.createElement('section')
        const carousel = document.createElement('div')
        const slideContainer = document.createElement('ul')

        carousel.dataset.carousel = ''
        slideContainer.dataset.slides = ''
        carousel.classList.add('carousel')

        this.images.forEach((image, index) => {
            const slide = document.createElement('li')
            slide.classList.add('slide')

            const img = document.createElement('img')
            img.classList.add('carousel__item')
            img.src = image
            slide.appendChild(img)
            if(index === 0) {
                slide.dataset.active = true
            }

            slideContainer.appendChild(slide)
        })

        const buttons = this.buttons()
        carousel.appendChild(buttons[0])
        carousel.appendChild(buttons[1])
        carousel.appendChild(slideContainer)
        carousel.appendChild(this.overlay())
        return carousel
    }

    overlay() {
        const overlay = document.createElement('div')
        overlay.classList.add('overlay')
        return overlay
    }

    buttons() {
        const prevBtn = document.createElement('button')
        const nextBtn = document.createElement('button')

        prevBtn.dataset.carouselButton = 'previous'
        nextBtn.dataset.carouselButton = 'next'

        prevBtn.innerText = '<'
        nextBtn.innerText = '<'

        prevBtn.classList.add('carousel__previous')
        nextBtn.classList.add('carousel__next')

        const buttons = [prevBtn, nextBtn]
        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const offset = button.dataset.carouselButton === "next" ? 1 : -1
                const slides = button
                  .closest("[data-carousel]")
                  .querySelector("[data-slides]")
            
                const activeSlide = slides.querySelector("[data-active]")
                let newIndex = [...slides.children].indexOf(activeSlide) + offset
                if (newIndex < 0) newIndex = slides.children.length - 1
                if (newIndex >= slides.children.length) newIndex = 0
            
                slides.children[newIndex].dataset.active = true
                delete activeSlide.dataset.active
            })
        })
        return buttons
    }
}
