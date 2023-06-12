export const getYears = (startYear = 1990) => {
  const currentYear = new Date().getFullYear(),
    years = [];
  startYear = startYear || 1990;
  while (startYear <= currentYear) {
    years.push(startYear++);
  }
  return years;
};
