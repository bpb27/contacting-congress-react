const dbString = value => {
  const ssl = '?ssl=true&sslmode=require';
  return value.includes(ssl) ? value : `${value}${ssl}`;
};

module.exports = {
  dbString,
};
