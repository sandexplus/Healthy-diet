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
        modalOpen = document.querySelectorAll('[data-modal]'),
        modalClose = document.querySelector('[data-close]'),
        modalDialog = document.querySelector('.modal__dialog');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        clearInterval(modalTimerId);
    }

    function closeModal() {
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

    modalClose.addEventListener('click', () => {
        closeModal();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    //const modalTimerId = setTimeout(openModal, 20000);

    //window.addEventListener('scroll', openModalByScroll);

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

    new FoodTab(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        3,
        '.menu .container',
        'menu__item',
        'big'
    ).render();

    new FoodTab(
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        8,
        '.menu .container',
        'menu__item'
    ).render();

    new FoodTab(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        6,
        '.menu .container',
        'menu__item'
    ).render();
});