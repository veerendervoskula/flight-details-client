export const convertToDefEventPara = (name, value) => ({
  target: {
    name, value
  }
});

export const setHoursToDate = (date, time) => {
  let dateTime = new Date(date);
  const hours = time.slice(0, 2);
  const minutes = time.slice(2);
  dateTime.setHours(hours, minutes);
  return dateTime;
}

export const getHoursMinutesFromDate = newValue => {
  let dateTime = new Date(newValue);
  let hoursMinutes = getFormatedTimeFromDate(dateTime);
  return hoursMinutes.replace(':', '');
};

export const getFormatedTimeFromDate = newValue => {
  const hours = newValue.getHours().toString().padStart(2, "0");
  const minutes = newValue.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const formatTimeinHHMM = (time) => {
  const hours = time.slice(0, 2);
  const minutes = time.slice(2);
  return `${hours}:${minutes}`
}
