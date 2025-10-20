const typeColors = {
  normal: "#A8A878", fire: "#F08030", water: "#6890F0", electric: "#F8D030",
  grass: "#78C850", ice: "#98D8D8", fighting: "#C03028", poison: "#A040A0",
  ground: "#E0C068", flying: "#A890F0", psychic: "#F85888", bug: "#A8B820",
  rock: "#B8A038", ghost: "#705898", dark: "#705848", dragon: "#7038F8",
  steel: "#B8B8D0", fairy: "#EE99AC"
};

const typeContainer = document.getElementById("type-buttons");
const pokemonList = document.getElementById("pokemon-list");
const searchInput = document.getElementById("search");
const resetButton = document.getElementById("reset");

const types = Object.keys(typeColors);

types.forEach(function(type) {
  const button = document.createElement("button");
  button.textContent = type.charAt(0).toUpperCase() + type.slice(1);
  button.style.backgroundColor = typeColors[type];
  button.addEventListener("click", function() {
    getPokemonsByType(type);
  });
  typeContainer.appendChild(button);
});


searchInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    const name = searchInput.value.toLowerCase();
    getPokemon(name);
  }
});


resetButton.addEventListener("click", function() {
  pokemonList.innerHTML = "";
  searchInput.value = "";
});


async function getPokemonsByType(type) {
  pokemonList.innerHTML = "";

  const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const data = await response.json();

  const pokemons = data.pokemon.slice(0, 12);

  for (let i = 0; i < pokemons.length; i++) {
    const pokeUrl = pokemons[i].pokemon.url;
    const pokeResponse = await fetch(pokeUrl);
    const pokeData = await pokeResponse.json();
    createCard(pokeData);
  }
}


async function getPokemon(name) {
  pokemonList.innerHTML = "";

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    if (!response.ok) {
      throw new Error("Pokémon não encontrado");
    }

    const data = await response.json();
    createCard(data);

  } catch (error) {
    pokemonList.innerHTML = `<p style="color:#a34700; font-weight:bold;">Pokémon não encontrado!</p>`;
  }
}

function createCard(pokemon) {
  const card = document.createElement("div");
  card.classList.add("card");

  const img = pokemon.sprites.other["official-artwork"].front_default;
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id;

  const typesHtml = pokemon.types.map(function(t) {
    return `<span class="type ${t.type.name}">${t.type.name}</span>`;
  }).join("");

  card.innerHTML = `
    <img src="${img}" alt="${name}">
    <h3>${name}</h3>
    <p>ID ${id}</p>
    <div class="types">${typesHtml}</div>
  `;

  pokemonList.appendChild(card);
}
