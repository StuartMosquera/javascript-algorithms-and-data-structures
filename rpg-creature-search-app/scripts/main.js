// DOM Variables
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const creatureName = document.getElementById('creature-name');
const creatureId = document.getElementById('creature-id');
const creatureWeight = document.getElementById('weight');
const creatureHeight = document.getElementById('height');
const types = document.getElementById('types');
const description = document.querySelector('.creature-description')
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

// API URL
const CREATURE_URL = 'https://rpg-creature-api.freecodecamp.rocks/api/creature';

// Function to search for a creature
async function searchCreature(creature) {
  const creatureQuery = `${normalizeText(creature)}`;
  const endpoint = `${CREATURE_URL}/${creatureQuery}`;

  try {
    const response = await fetch(endpoint);

    if (response.ok) {
      const jsonResponse = await response.json();
      displayCreature(jsonResponse);
    } else {
      alert('Creature not found');
    }

  } catch (error) {
    console.log(error);
    alert('Something went wrong, please try again later. Error: ' + error.message);
  }
}

// Function to display creature details in the UI
function displayCreature(creature) {
  cleanUI();

  creatureName.textContent = creature.name;
  creatureId.textContent = '#' + creature.id;
  creatureWeight.textContent = 'Weight: ' + creature.weight;
  creatureHeight.textContent = 'Height: ' + creature.height;

  for (const type of creature.types) {
    const spanTag = document.createElement('span');
    spanTag.style.backgroundColor = setCreatureColor(type.name);
    spanTag.textContent = type.name;
    types.appendChild(spanTag);
  }

  description.innerHTML = `
    <h3>${creature.special.name}</h3>
    <p>${creature.special.description}</p>
  `;

  hp.textContent = creature.stats[0].base_stat;
  attack.textContent = creature.stats[1].base_stat;
  defense.textContent = creature.stats[2].base_stat;
  specialAttack.textContent = creature.stats[3].base_stat;
  specialDefense.textContent = creature.stats[4].base_stat;
  speed.textContent = creature.stats[5].base_stat;
}

// Function to clean the UI before displaying a new creature
function cleanUI() {
  creatureName.textContent = '';
  creatureId.textContent = '';
  creatureWeight.textContent = '';
  creatureHeight.textContent = '';
  types.innerHTML = '';
  description.innerHTML = '';
  hp.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  specialAttack.textContent = '';
  specialDefense.textContent = '';
  speed.textContent = '';
}

// Function to set the background color based on creature type
function setCreatureColor(type) {
  switch (type) {
    case 'bug':
      return '#7ba35a';
    case 'dark':
      return '#b49b87';
    case 'dragon':
    case 'flying':
      return '#a096f0';
    case 'electric':
      return '#ffcc32';
    case 'fairy':
    case 'fighting':
      return '#d28782';
    case 'fire':
      return '#ff6d50';
    case 'ghost':
      return '#9e9bcf';
    case 'grass':
      return '#52a352';
    case 'ground':
    case 'rock':
      return '#e1bf50';
    case 'ice':
      return '#64c9ff';
    case 'poison':
      return '#ea9bf0';
    case 'psychic':
      return '#ff64a5';
    case 'steel':
      return '#aaaab9';
    case 'water':
      return '#329fff';
    default:
      return '#a6a69a';
  }
}

// Function to normalize text for API queries
const normalizeText = text => text.replace(/[\W]/g, '').toLowerCase();

// Event listeners for search functionality
searchButton.onclick = function(event) {
  event.preventDefault();
  searchCreature(searchInput.value);
}

searchInput.onkeydown = function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchCreature(searchInput.value);
  }
}
