const searchInput = document.querySelector('.poke-input')
const searchButton = document.querySelector('.poke-btn')
const pokeContainer = document.querySelector('.poke-container')

const pokeCount = 151

const initPokemon = async () => {
	for (let i = 1; i <= pokeCount; i++) {
		await getPokemon(i)
	}
}

const getPokemon = async (id) => {
	let url = `https://pokeapi.co/api/v2/pokemon/${id}`
	let res = await fetch(url)
	let data = await res.json()
	createPokemonCard(data)
}

const createPokemonCard = (pokemon) => {
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
	const id = pokemon.id.toString().padStart(3, '0')
	const pokeTypes = pokemon.types[0].type.name

	const pokemonElement = document.createElement('div')
	pokemonElement.classList.add('poke-card')

	const pokeInnerHTML = `
        <div class="poke-img">
            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="${name} image" />
        </div>
        <div class="poke-info">
            <span class="poke-number">#${id}</span>
            <h3 class="poke-name">${name}</h3>
            <small class="poke-type">${pokeTypes}</small>
        </div>
    `
	pokemonElement.innerHTML = pokeInnerHTML

	pokeContainer.appendChild(pokemonElement)
}

initPokemon()

searchInput.addEventListener('input', (e) => {
	const searchValue = e.target.value
	const pokeCards = document.querySelectorAll('.poke-card')

	pokeCards.forEach((card) => {
		if (card.innerText.toLowerCase().includes(searchValue.toLowerCase())) {
			card.style.display = 'block'
		} else {
			card.style.display = 'none'
		}
	})
})
