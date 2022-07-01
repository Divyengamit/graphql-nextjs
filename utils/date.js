const dayjs = require("dayjs");

const isPastDate = () => {
  const year = dayjs();
  const pastYear = dayjs().year() - 18;
  const dateyear = year.format("YYYY-MM-DD");
  return year;
};

const formatDate = (date) => {
  return dayjs(date).format("DD/MM/YYYY");
};

export { isPastDate, formatDate };
