function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    document.querySelector('.modal__dialog').classList.add('show');
    document.querySelector('.modal__dialog').classList.remove('hide');
    modal.classList.add('hide');
    modal.classList.remove('show');
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // Modal

    const modal = document.querySelector(modalSelector),
        modalOpen = document.querySelectorAll(triggerSelector);

    function openModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', openModalByScroll);
        }
    }

    modalOpen.forEach(item => {
        item.addEventListener('click', () => {
            openModal(modalSelector, modalTimerId);
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') === '') {
            closeModal(modalSelector);
        }
    });

    window.addEventListener('scroll', openModalByScroll);
}

export default modal;
export { closeModal, openModal };