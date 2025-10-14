const typeColors = {
    normal: "#A8A878", fire: "#F08030", water: "#6890F0", electric: "#F8D030",
    grass: "#78C850", ice: "#98D8D8", fighting: "#C03028", poison: "#A040A0",
    ground: "#E0C068", flying: "#A890F0", psychic: "#F85888", bug: "#A8B820",
    rock: "#B8A038", ghost: "#705898", dark: "#705848", dragon: "#7038F8",
    steel: "#B8B8D0", fairy: "#EE99AC"
  }
  
  const typeContainer = document.getElementById("type-buttons")
  const pokemonList = document.getElementById("pokemon-list")
  const searchInput = document.getElementById("search")
  const resetButton = document.getElementById("reset")
  
  const types = Object.keys(typeColors);
  
 
  types.forEach(type => {
    const btn = document.createElement("button")
    btn.textContent = type.charAt(0).toUpperCase() + type.slice(1)
    btn.style.backgroundColor = typeColors[type]
    btn.addEventListener("click", () => getPokemonsByType(type))
    typeContainer.appendChild(btn);
  })
  
  
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const name = searchInput.value.toLowerCase()
      getPokemon(name)
    }
  });
  

  resetButton.addEventListener("click", () => {
    pokemonList.innerHTML = ""
    searchInput.value = ""
  });
  
  
  async function getPokemonsByType(type) {
    pokemonList.innerHTML = ""
    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
    const data = await res.json()
  
    for (let p of data.pokemon.slice(0, 12)) {
      const pokeUrl = p.pokemon.url
      const pokeRes = await fetch(pokeUrl)
      const pokeData = await pokeRes.json()
      createCard(pokeData)
    }
  }
  
 
  async function getPokemon(name) {
    pokemonList.innerHTML = ""
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      if (!res.ok) throw new Error("Pokémon não encontrado")
      const data = await res.json()
      createCard(data)
    } catch (error) {
      pokemonList.innerHTML = `<p style="color:#a34700; font-weight:bold;">Pokémon não encontrado!</p>`
    }
  }
  

  function createCard(pokemon) {
    const div = document.createElement("div")
    div.classList.add("card")
    div.innerHTML = `
      <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
      <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
      <p>ID ${pokemon.id}</p>
      <div class="types">
        ${pokemon.types.map(t => `<span class="type ${t.type.name}">${t.type.name}</span>`).join("")}
      </div>
    `
    pokemonList.appendChild(div)
  }
  