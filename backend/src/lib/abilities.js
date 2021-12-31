const {
  default: { SERVER_URL },
} = require("./constants.js");

/**
 * Visualização da estrutura original
 * abilities : [
 *  {
 *    "slot": 1,
 *    "is_hidden": true,
 *    "ability": {
 *      "name": "chlorophyll",
 *      "url": "https://pokeapi.co/api/v2/ability/34/"
 *  }, ...
 * ]
 *
 * A estrutura final será:
 * abilities : [
 *  {
 *    name : "chlorophyll",
 *    url  : "<SERVER_URL>/api/ability/34/"
 *  },...
 * ]
 * o array de abilities será ordenado pelo nome da habilidade
 * note também que substituiremos a url para a do nosso prórprio servidor
 */

function flattenAndSortAbilities(abilities) {
  let flatenned = [];
  for (let slot of abilities) {
    flatenned = [
      ...flatenned,
      { name: slot.ability.name, url: replaceAbilityUrl(slot.ability.url) },
    ];
  }
  return sortAbilitiesByName(flatenned);
}

function sortAbilitiesByName(abilities) {
  return abilities.sort(function (a, b) {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
}

function replaceAbilityUrl(url) {
  return url.replace(/https:\/\/pokeapi.co\/api\/v2/g, SERVER_URL + "/api");
}

module.exports = {
  default: flattenAndSortAbilities,
  filterEffectEntriesByLanguage: function (language) {
    return function (effect_entries) {
      return effect_entries.language.name === language;
    };
  },
};
