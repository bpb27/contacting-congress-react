const sanitizeZip = (value = '') => value.replace(/[^\d.-]/g, '').slice(0, 5);

const dbString = value => {
  const ssl = '?ssl=true&sslmode=require';
  return value.includes(ssl) ? value : `${value}${ssl}`;
};

module.exports = {
  dbString,
  sanitizeZip,
};
