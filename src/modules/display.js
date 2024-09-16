import { process } from './processWeatherData.js';
import '../styles/style.css';

const input = document.querySelector('input');
const searchIcon = document.querySelector('#searchIcon');
const toogle = document.querySelector('#darkMode');
const body = document.querySelector('body');
const main = body.querySelector('main');
const today = main.querySelector('.todays');
const next = main.querySelector('.next');

searchIcon.addEventListener('click', async () => {
    const data = await process(input.value);
    if (data === -1) {
        clearTodays();
        clearNext();
        displayInvalidAddress();
    } else {
        clearTodays();
        clearNext();
        addDay(data[2]);
        displayTodaysInfo(data[0]);
        displayNextInfo(data[1]);
    }
});

const displayTodaysInfo = async (todaysData) => {
    const dayInfo = document.createElement('div');
    dayInfo.setAttribute('class', 'dayInfo');
    const day = document.createElement('div');
    day.setAttribute('class', 'day');
    day.textContent = await todaysData.day;
    const currentTempInfo = document.createElement('div');
    currentTempInfo.setAttribute('class', 'currentTempInfo');

    const currentTemp = document.createElement('div');
    currentTemp.setAttribute('class', 'curTemp');
    currentTemp.textContent = `Current Temprature: ${todaysData.currentTemp} F`;
    const currentCondition = document.createElement('div');
    currentCondition.setAttribute('class', 'curCondition');
    currentCondition.textContent = todaysData.hourConditions;

    const dailyTempInfo = document.createElement('div');
    dailyTempInfo.setAttribute('class', 'dailyTempInfo');
    const dailyTemprature = document.createElement('div');
    dailyTemprature.setAttribute('class', 'averageTemprature');
    dailyTemprature.textContent = `Daily Temprature : ${await todaysData.averageTemp} F`;
    const description = document.createElement('div');
    description.setAttribute('class', 'description');
    description.textContent = await todaysData.descriptions;
    const tempMax = document.createElement('div');
    tempMax.setAttribute('class', 'tempMax');
    tempMax.textContent = ` Daily maximum : ${await todaysData.tempMax} F`;
    const tempMin = document.createElement('div');
    tempMin.setAttribute('class', 'tempMin');
    tempMin.textContent = ` Daily minimum : ${await todaysData.tempMin} F`;

    const DailyHours = document.createElement('div');
    DailyHours.setAttribute('class', 'mainHours');

    todaysData.mainHours.forEach(async (Hour) => {
        const hourly = document.createElement('div');
        hourly.setAttribute('class', 'hourly');

        const time = document.createElement('div');
        time.setAttribute('class', 'hour');
        const hourlyCondition = document.createElement('div');
        hourlyCondition.setAttribute('class', 'hourlyCondition');
        const hourlyTemp = document.createElement('div');
        hourlyTemp.setAttribute('class', 'hourlyTemp');

        const hour = await Hour;

        time.textContent = await hour[0];
        hourlyCondition.textContent = await hour[1];
        hourlyTemp.textContent = `T : ${await hour[2]} F`;

        hourly.appendChild(time);
        hourly.appendChild(hourlyCondition);
        hourly.appendChild(hourlyTemp);

        DailyHours.appendChild(hourly);
    });

    dayInfo.appendChild(description);
    dayInfo.appendChild(day);

    currentTempInfo.appendChild(currentTemp);
    currentTempInfo.appendChild(currentCondition);

    dailyTempInfo.appendChild(dailyTemprature);
    dailyTempInfo.appendChild(tempMax);
    dailyTempInfo.appendChild(tempMin);

    today.appendChild(dayInfo);
    today.appendChild(currentTempInfo);
    today.appendChild(dailyTempInfo);
    today.appendChild(DailyHours);
};

const clearTodays = () => {
    while (today.firstChild) {
        today.removeChild(today.firstChild);
    }
};

const displayNextInfo = (nextData) => {
    const days = document.createElement('div');
    days.setAttribute('class', 'days');

    nextData.forEach(async (nextDay) => {
        const daily = document.createElement('div');
        daily.setAttribute('class', 'daily');

        const day = document.createElement('div');
        day.setAttribute('class', 'day');

        const dailyCondition = document.createElement('div');
        dailyCondition.setAttribute('class', 'dailyCondition');

        const dailyTemp = document.createElement('div');
        dailyTemp.setAttribute('class', 'dailyTemp');

        day.textContent = nextDay.dayTime;
        dailyCondition.textContent = nextDay.condition;
        dailyTemp.textContent = `Daily Temprature : ${nextDay.dayTemp} F`;

        daily.appendChild(day);
        daily.appendChild(dailyCondition);
        daily.appendChild(dailyTemp);
        days.appendChild(daily);
    });

    next.appendChild(days);
};

const addDay = (location) => {
    const place = document.createElement('div');
    place.setAttribute('class', 'place');
    place.textContent = location;
    today.appendChild(place);
};

const clearNext = () => {
    while (next.firstChild) {
        next.removeChild(next.firstChild);
    }
};

const displayInvalidAddress = () => {
    const invalid = document.createElement('div');
    invalid.setAttribute('class', 'invalidAddress');
    invalid.textContent = 'Please insert valid location';
    today.appendChild(invalid);
};

toogle.addEventListener('click', () => {
    if (toogle.textContent === 'dark_mode') {
        toogle.textContent = 'light_mode';
        body.style.backgroundColor = 'rgb(35, 37, 41)';
        body.style.color = 'white';
        body.style.transition = '1s';
    } else {
        toogle.textContent = 'dark_mode';
        body.style.backgroundColor = '#eef5a5';
        body.style.color = 'black';
        body.style.transition = '1s';
    }
});
