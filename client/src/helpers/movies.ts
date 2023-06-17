export const getYears = (startYear = 1970) => {
  const currentYear = new Date().getFullYear(),
    years = [];
  while (startYear <= currentYear) {
    years.push(startYear++);
  }
  return years;
};
