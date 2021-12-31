import axios from "axios";

const HOST = process.env.ZRPOKE_URL || "http://localhost";
const PORT = process.env.ZRPOKE_PORT || 3030;
const SERVER_URL = `${HOST}:${PORT}`;

const AXIOS_OPTIONS = {
  validateStatus: (status) => status === 200,
};

export function fetchPokemon(name) {
  return axios.get(SERVER_URL + "/api/pokemon/" + name, AXIOS_OPTIONS);
}

export function fetchAbility(url) {
  return axios.get(url, AXIOS_OPTIONS);
}
