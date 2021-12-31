const PORT = process.env.ZRPOKE_PORT || 3030;
const HOST = process.env.ZRPOKE_URL || "http://localhost";
const SERVER_URL = HOST + ":" + PORT;

module.exports.default = Object.freeze({
  BASE_URL: "https://pokeapi.co",
  SERVER_URL,
  PORT,
  CACHE_TTL: 3600 * 24 * 7, // 1 semana
  MESSAGE_404: "Desculpe! Parece que não encontramos o que esperava...",
  MESSAGE_500: "Ops! Algo não vai bem por aqui...",
  AXIOS_OPTIONS: {
    validateStatus: (status) => status === 200,
    timeout: 5000,
  },
});
