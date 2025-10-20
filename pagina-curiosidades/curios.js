
const getH1 = document.getElementById("curiosidade")

async function getPokemonDescription(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}`)
    const data = await response.json();
  
    
    let entry = data.flavor_text_entries.find(e => e.language.name === "pt")
    
    
    if (!entry) {
      entry = data.flavor_text_entries.find(e => e.language.name === "en")
    }
  
   
    const flavorText = entry ? entry.flavor_text.replace(/\f/g, ' ').replace(/\n/g, ' ') : "Descrição não encontrada."
    
    return flavorText
  }
  

  async function createMessage(message) {
   
    const pokemon = await getPokemonDescription(message)
    console.log('Valor de pokemon:', pokemon)
    if (getH1) {
       
        getH1.textContent = `${pokemon}`.toLocaleLowerCase()
    } else {
        console.error('Elemento com ID "curiosidade" não encontrado.')
    }
}

async function getPokemonImage(name) {
  const divPai = document.getElementById('box')

  if (!divPai) {
   console.log('error')
    
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)

    const data = await response.json()
    const imageUrl = data.sprites.front_default
    
    const img = document.createElement('img')
    img.src = imageUrl
    img.alt = `Imagem de ${name}`
    img.classList.add('pokemon-image')

    divPai.appendChild(img) 
  } catch (error) {
    return false
  }
}

getPokemonImage("pikachu")
createMessage("pikachu")



  