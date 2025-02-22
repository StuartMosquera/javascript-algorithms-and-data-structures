// DOM VARIABLES
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const imgContainer = document.getElementsByClassName("img-container")[0];

// GLOBAL VARIABLES
const endpoint = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

// ASYNC FUNCTIONS
const searchPokemon = async (input) => {
  const dataRequest = `/${input.toLowerCase()}`;
  const urlToFetch = `${endpoint}${dataRequest}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      updateUI(jsonResponse);
    } else {
      alert("Pokémon not found");
    }
  } catch (err) {
    console.log(err);
    alert("Something went wrong, please try again later.");
  }
};

// FUNCTIONS
const updateUI = obj => {
  cleanUI();
  pokemonName.innerText = `${obj.name.toUpperCase()}`;
  pokemonId.innerText = `#${obj.id}`;
  pokemonWeight.innerText = `Weight: ${obj.weight}`;
  pokemonHeight.innerText = `Height: ${obj.height}`;
  imgContainer.innerHTML = `<img id="sprite" src="${obj.sprites.front_default}" height="200" width="200" alt="${obj.name}">`;
  obj.types.forEach(item => {
    const newElement = document.createElement("span");
    newElement.classList.add(item.type.name);
    newElement.textContent = item.type.name;
    types.appendChild(newElement);
  });
  hp.textContent = `${obj.stats[0].base_stat}`;
  attack.textContent = `${obj.stats[1].base_stat}`;
  defense.textContent = `${obj.stats[2].base_stat}`;
  specialAttack.textContent = `${obj.stats[3].base_stat}`;
  specialDefense.textContent = `${obj.stats[4].base_stat}`;
  speed.textContent = `${obj.stats[5].base_stat}`;
};

const cleanUI = () => {
  pokemonName.innerText = "";
  pokemonId.innerText = "";
  pokemonWeight.innerText = "";
  pokemonHeight.innerText = "";
  imgContainer.innerHTML = "";
  types.innerHTML = "";
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";
};

const cleanStr = str => {
  const regex = /[ .]/g;
  return str.replace(regex, "-");
};

// EVENTS
searchButton.addEventListener("click", event => {
  event.preventDefault();
  const inputValue = searchInput.value;
  searchPokemon(cleanStr(inputValue));
});
// Made by Stuart Mosquera