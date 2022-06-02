const dayjs = require("dayjs");

const isPastDate = () => {
  const year = dayjs();
  const pastYear = dayjs().year() - 18;
  const dateyear = year.format("YYYY-MM-DD");
  return year;
};

export { isPastDate };
