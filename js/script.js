'use strict';
require('es7-object-polyfill');
import 'formdata-polyfill';
import 'dom-node-polyfills';
import 'whatwg-fetch';
import "core-js/stable/symbol";
require('es6-promise').polyfill();
import tabs from './modules/tabs';
import timer from './modules/timer';
import slider from './modules/slider';
import modal from './modules/modal';
import forms from './modules/forms';
import foodTabs from './modules/food_tabs';
import calculator from './modules/calculator';
import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 200000);
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('#days', '#hours', '#minutes', '#seconds', '.promotion__descr', '2022-01-15T00:00:00');
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        totalCounter: '#total',
        currentCounter: '#current'
    });
    modal('[data-modal]', '.modal', modalTimerId);
    forms('form', modalTimerId);
    foodTabs();
    calculator();

});