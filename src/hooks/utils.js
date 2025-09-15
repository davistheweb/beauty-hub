function convertMinutesToHours(minutes) {
    let hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;
    return `${hours}${hours > 1 ? "hrs" : "hr"} ${remainingMinutes}${remainingMinutes > 1 ? "mins" : "min"}`;
}

function copyToClipboard(params) {
    navigator.clipboard.writeText(params);
}

function convertToAmPm(timeStr) {
    const [hourStr, minute, second] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "pm" : "am";
    hour = hour % 12;
    hour = hour === 0 ? 12 : hour;
    return `${hour}:${minute} ${ampm}`;
}


function numberFormat(params) {
    const el = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(params)
    return el
}


export { convertMinutesToHours, convertToAmPm, copyToClipboard, numberFormat };