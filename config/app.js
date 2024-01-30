const JWT_SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret';
const MONGOOSE_CONNECT = process.env.BD_ADRES;
const PORT3000 = 3000;

module.exports = {
  JWT_SECRET,
  MONGOOSE_CONNECT,
  PORT3000
};
