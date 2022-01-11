function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter }) {
    // Slider

    let slideIndex = 1;
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter);

    slider.style.position = "relative";

    const dots = document.createElement('ol');
    dots.classList.add('carousel-indicators');
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);

        if (+dot.getAttribute('data-slide-to') === slideIndex) {
            dot.style.opacity = '1';
        }

        dots.append(dot);
    }

    const dot = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showSlides(n) {
        dot.forEach(item => {
            item.style.opacity = '0.5';
        });

        if (n > slides.length) {
            slideIndex = 1;
        } else if (n < 1) {
            slideIndex = slides.length;
        } else {
            slideIndex = +n;
        }

        slides.forEach((item) => {
            item.classList.remove('show');
            item.classList.add('hide');
        });


        slides[slideIndex - 1].classList.remove('hide');
        slides[slideIndex - 1].classList.add('show');

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dot[slideIndex - 1].style.opacity = '1';
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    dot.forEach(item => {
        item.addEventListener('click', function() {
            showSlides(item.getAttribute('data-slide-to'));
        });
    });

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });

    next.addEventListener('click', function() {
        plusSlides(1);
    });
}

export default slider;