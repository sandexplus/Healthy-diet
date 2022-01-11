function timer(daysSelector, hoursSelector, minutesSelector, secondsSelector, promotionTextSelector, dateEndSelector) {
    // Timer

    const days = document.querySelector(daysSelector),
        hours = document.querySelector(hoursSelector),
        minutes = document.querySelector(minutesSelector),
        seconds = document.querySelector(secondsSelector);
    let dateText = document.querySelector(promotionTextSelector).lastChild,
        dateNow = new Date(),
        dateEnd = new Date(dateEndSelector),
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
}

export default timer;