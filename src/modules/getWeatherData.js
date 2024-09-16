export const search = async (address) => {
    try {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${address}/next7days?unitGroup=us&key=W6QNDQEH22C68AAQJL93Z4ET2&contentType=json`;

        const response = await fetch(url, { mode: 'cors' });
        const responseJson = await response.json();
        const daysList = responseJson.days;
        const currentAddress = responseJson.resolvedAddress;
        return [daysList, currentAddress];
    } catch (error) {
        return -1;
    }
};
