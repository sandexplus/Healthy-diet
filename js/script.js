window.addEventListener('DOMContentLoaded', () => {

    // Promo tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(active = 0) {
        tabsContent[active].style.display = 'block';

        tabs[active].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target && e.target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (e.target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Sale timer

    const days = document.querySelector('#days'),
        hours = document.querySelector('#hours'),
        minutes = document.querySelector('#minutes'),
        seconds = document.querySelector('#seconds');
    let dateText = document.querySelector('.promotion__descr').lastChild,
        dateNow = new Date(),
        dateEnd = new Date('2022-01-15T00:00:00'),
        date = new Date(dateEnd - dateNow);

    function monthToText(month) {
        let m;
        switch (month) {
            case 0:
                m = 'января';
                break;
            case 1:
                m = 'февраля';
                break;
            case 2:
                m = 'марта';
                break;
            case 3:
                m = 'апреля';
                break;
            case 4:
                m = 'мая';
                break;
            case 5:
                m = 'июня';
                break;
            case 6:
                m = 'июля';
                break;
            case 7:
                m = 'августа';
                break;
            case 8:
                m = 'сентября';
                break;
            case 9:
                m = 'октября';
                break;
            case 10:
                m = 'ноября';
                break;
            case 11:
                m = 'декабря';
                break;
            default:
                m = '';
        }
        return m;
    }

    let dateHours = dateEnd.getHours().toString();
    if (dateHours.length < 2) {
        dateHours = '0' + dateHours;
    }
    let dateMinutes = dateEnd.getMinutes().toString();
    if (dateMinutes.length < 2) {
        dateMinutes = '0' + dateMinutes;
    }

    dateText.textContent = `Акция закончится ${dateEnd.getDate()} ${monthToText(dateEnd.getMonth())} в ${dateHours}:${dateMinutes}`;


    function timer() {
        dateNow = new Date();
        date = new Date(dateEnd - dateNow);

        days.textContent = date.getDate() - 1;
        if (date.getTimezoneOffset() % 60 === 0) {
            hours.textContent = date.getHours() + date.getTimezoneOffset() / 60;
            minutes.textContent = date.getMinutes();
        } else {
            const fullPart = date.getTimezoneOffset() % 60;
            hours.textContent = date.getHours() + fullPart;
            minutes.textContent = date.getMinutes() + date.getTimezoneOffset() + Math.abs(fullPart * 60);
        }
        seconds.textContent = date.getSeconds();
        setTimeout(timer, 1000);
    }

    if (date > 0) {
        setTimeout(timer, 0);
    } else {
        days.textContent = '0';
        hours.textContent = '0';
        minutes.textContent = '0';
        seconds.textContent = '0';
    }

    // Modal

    const modal = document.querySelector('.modal'),
        modalOpen = document.querySelectorAll('[data-modal]');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        clearInterval(modalTimerId);
    }

    function closeModal() {
        document.querySelector('.modal__dialog').classList.add('show');
        document.querySelector('.modal__dialog').classList.remove('hide');
        modal.classList.add('hide');
        modal.classList.remove('show');
    }

    function openModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', openModalByScroll);
        }
    }

    modalOpen.forEach(item => {
        item.addEventListener('click', () => {
            openModal();
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') === '') {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 200000);

    window.addEventListener('scroll', openModalByScroll);

    // Tabs classes

    class FoodTab {
        constructor(image, alt, title, descr, price, parentSelector, ...classes) {
            this.image = image;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = +price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 73;
            this.changeToRUB();
        }

        changeToRUB() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            let checkBaseClass = false;

            if (this.classes.length > 0) {
                for (let className of this.classes) {
                    if (className === 'menu__item') {
                        checkBaseClass = true;
                        break;
                    }
                }
                if (!checkBaseClass) {
                    this.classes.unshift('menu__item');
                }
                this.classes.forEach(className => element.classList.add(className));
            } else {
                element.classList.add('menu__item');
            }

            element.innerHTML = `
                <img src="${this.image}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `;

            this.parent.append(element);
        }
    }

    const getResource = async(url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    getResource(' http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new FoodTab(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // Forms

    const forms = document.querySelectorAll('form'),
        message = {
            loading: 'icons/spinner.svg',
            success: 'Спасибо, мы с вами свяжемся',
            failure: 'Что-то пошло не так'
        },
        inputs = document.querySelectorAll('form input');

    forms.forEach(form => {
        bindPostData(form);
    });

    const postData = async(url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');

            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 30px auto 0;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    inputs.forEach(input => {
                        input.value = '';
                    });
                });
        });
    }

    function showThanksModal(message) {
        const previousModalDialog = document.querySelector('.modal__dialog');
        previousModalDialog.classList.remove('show');
        previousModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
         `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            previousModalDialog.classList.add('show');
            previousModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    // Slider

    let slideIndex = 1;
    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current');

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

    // Calculator

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(item => {
            item.classList.remove(activeClass);
            if (item.getAttribute('id') === localStorage.getItem('sex')) {
                item.classList.add(activeClass);
            }
            if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                item.classList.add(activeClass);
            }
        });

    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }


                elements.forEach(item => {
                    item.classList.remove(activeClass);
                });



                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector, max, min) {
        const input = document.querySelector(selector);


        input.addEventListener('input', () => {
            if (input.value.match(/\D/g) || input.value > max || input.value < min) {
                input.style.border = "1px solid red";
                return;
            } else {
                input.style.border = "none";
            }
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
                default:
                    break;
            }
            calcTotal();
        });

    }

    getDynamicInformation('#height', 250, 75);
    getDynamicInformation('#weight', 170, 25);
    getDynamicInformation('#age', 100, 10);
});