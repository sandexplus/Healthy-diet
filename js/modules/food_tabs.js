import { getResource } from '../services/services';

function foodTabs() {
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

    getResource(' http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new FoodTab(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}

export default foodTabs;