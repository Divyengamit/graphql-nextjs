const formatPhoneNumber = (number) => {
  if (!number) return null;
  var m = number?.match(/(\d{3})(\d+)(\d{3})/);
  var result = m[1] + "*".repeat(m[2].length) + m[3];
  return result;
};

export { formatPhoneNumber };
