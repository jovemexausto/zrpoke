const app = require("express")();
const cache = new (require("node-cache"))();
const cors = require("cors");
const { default: axios } = require("axios");
const { default: errorHandler } = require("./lib/errorHandler.js");
const { default: constants } = require("./lib/constants.js");
const {
  default: flattenAndSortAbilities,
  filterEffectEntriesByLanguage,
} = require("./lib/abilities.js");

// por causa do uso de portas diferentes nossa aplicação
// precisa do cors para que o front-end possa acessar
app.use(cors());
app.options("*", cors());

app.get("/api/pokemon/:name", async (req, res) => {
  const { name } = req.params;
  const endpoint = `${constants.BASE_URL}/api/v2/pokemon/${name}`;
  try {
    // primeiro tentamos recuperar do cache uma resposta
    // previamente armazenada onde a chave é o endpoint solicitado
    // em caso de uma aplicação produtiva usaríamos redis ou memcached
    const cachedResponse = cache.get(endpoint);
    if (cachedResponse) {
      console.log("Maravilha! Enviamos a resposta do cache...");
      res.send(cachedResponse);
      return;
    }
    // Do contrário fazemos uma nova solicitação a API
    // verificamos a integridade da solicitação (validadeStatus)
    // e retornamos uma resposta apropriada em caso de erro no bloco catch
    const response = await axios.get(endpoint, constants.AXIOS_OPTIONS);
    // desestruturamos a propriedade abilities da resposta
    // e chamamos a função de flattenAndSortAbilities para obter a estrutura final
    let abilities = flattenAndSortAbilities(response.data.abilities);
    const transformed = {
      abilities,
      name: response.data.name,
      image: response.data.sprites.other["official-artwork"].front_default,
    };
    // se tudo estiver ok, armazenamos a resposta no cache
    // a resposta é armazenada após o processamento acima
    // dessa forma economizamos também tempo de processamento,
    // não só de requisição
    cache.set(endpoint, transformed, constants.CACHE_TTL);
    res.send(transformed);
  } catch (error) {
    errorHandler(error, res);
  }
});

// o endpoint pokeapi.co/api/v2/ability?limit=-1 não nos interessa aqui
// pois retorna apenas uma lista de urls que nos faria realizar outras
// centenas de requisições a API e inserir uma complexidade desnecessária.
// Verifiquei que é possível pokémons compartilharem a mesma habilidade
// logo armazenar cada habilidade separadamente é mais eficiente pra tal cenário
// pois assim iremos criar um cache sob demanda.
app.get("/api/ability/:id", async (req, res) => {
  const { id } = req.params;
  const endpoint = `${constants.BASE_URL}/api/v2/ability/${id}`;
  try {
    const cachedResponse = cache.get(endpoint);
    if (cachedResponse) {
      res.send(cachedResponse);
      return;
    }
    const response = await axios.get(endpoint, constants.AXIOS_OPTIONS);
    cache.set(endpoint, response.data, constants.CACHE_TTL);
    const { effect_entries } = response.data;
    const [filtered] = effect_entries.filter(
      filterEffectEntriesByLanguage("en")
    );
    cache.set(endpoint, filtered, constants.CACHE_TTL);
    res.send(filtered);
  } catch (error) {
    errorHandler(error, res);
  }
});

app.listen(constants.PORT, () => {
  console.log("Server on localhost:" + constants.PORT);
});
