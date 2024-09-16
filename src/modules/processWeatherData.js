import { search } from './getWeatherData.js';

export const process = async (address) => {
    const weatherData = await search(address);
    if (weatherData === -1) {
        return -1;
    }
    const today = weatherData[0][0];
    const todaysInfo = await currentInfo(today);
    const weekInfo = nextSevenDays(weatherData);
    return [todaysInfo, weekInfo, weatherData[1]];
};

const days = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
};

const currentInfo = async (today) => {
    const tempMax = today.tempmax;
    const tempMin = today.tempmin;
    const averageTemp = today.temp;
    const condition = today.conditions;
    const descriptions = today.description;
    const date = new Date();
    const day = days[date.getDay()];
    const [currentHour, hourConditions, currentTemp] = await currentHourInfo(
        today.hours[date.getHours()],
    );
    const mainHours = [
        currentHourInfo(today.hours[0]),
        currentHourInfo(today.hours[6]),
        currentHourInfo(today.hours[12]),
        currentHourInfo(today.hours[18]),
    ];

    return {
        tempMax,
        tempMin,
        averageTemp,
        condition,
        descriptions,
        currentHour,
        hourConditions,
        currentTemp,
        day,
        mainHours,
    };
};

const currentHourInfo = async (hour) => {
    const currentHour = await hour.datetime;
    const condition = await hour.conditions;
    const currentTemp = await hour.temp;
    return [currentHour, condition, currentTemp];
};

const nextSevenDays = (weatherData) => {
    const nextDayInfos = [];
    for (let i = 1; i < 8; i += 1) {
        const day = weatherData[0][i];
        const condition = day.conditions;
        const dayTemp = day.temp;
        const dayTime = days[new Date(day.datetime).getDay()];
        nextDayInfos.push({ condition, dayTemp, dayTime });
    }
    return nextDayInfos;
};
