
const input = document.querySelector('.search-box input')
const resetarBtn = document.querySelector('.resetar')
const img = document.querySelector('.card img')
const tipoEl = document.querySelector('.info span strong')
const idEl = document.querySelector('.info span:last-child strong')


async function buscarPokemon(nomeOuId) {
  if (!nomeOuId) return
  nomeOuId = nomeOuId.toLowerCase().trim()

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomeOuId}`)

    if (!response.ok) {
      img.src = "https://archives.bulbagarden.net/media/upload/0/0d/MissingNo.png"
      tipoEl.textContent = "NOT FOUND"
      tipoEl.className = ""
      idEl.textContent = "???"
      return;
    }

    const data = await response.json()

  
    const imagem =
      data.sprites.other['official-artwork'].front_default ||
      data.sprites.front_default;

    img.src = imagem;
    const tipo = data.types[0].type.name.toUpperCase()
    tipoEl.textContent = tipo
    tipoEl.className = data.types[0].type.name
    idEl.textContent = data.id

  } catch (error) {
    console.error("Erro ao buscar Pokémon:", error);
    img.src = "https://archives.bulbagarden.net/media/upload/0/0d/MissingNo.png"
    tipoEl.textContent = "ERRO"
    tipoEl.className = ""
    idEl.textContent = "???"
  }
}

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    buscarPokemon(input.value)
  }
})


resetarBtn.addEventListener('click', () => {
  input.value = ''
  img.src = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"
  tipoEl.textContent = "ELECTRIC"
  tipoEl.className = "electric"
  idEl.textContent = "25"
})
