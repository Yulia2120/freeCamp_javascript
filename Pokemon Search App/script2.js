const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonHP = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpAttack = document.getElementById("special-attack");
const pokemonSpDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");
const pokemonSpriteContainer = document.getElementById("sprite-container");
const pokemonTypes = document.getElementById("types");

const fetchData = async (pokemonNameOrId) => {
  try {
    const pokemonUrl = `http://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`;
    const res = await fetch(pokemonUrl);
    const data = await res.json();
    displayPokemonInfo(data);
    console.log(data); // Вывести данные в консоль для отладки
  } catch (err) {
    clearPokemonInfo();
    alert("Pokémon not found");
    console.log(err.message);
  }
};

searchButton.addEventListener("click", () => {
  event.preventDefault();
  const pokemonNameOrId = searchInput.value.toLowerCase();
  fetchData(pokemonNameOrId);
});

const displayPokemonInfo = (data) => {
  try {
    if (data) {
      const { id, name, weight, height, types, stats, sprites } = data;
      pokemonName.textContent = `${data.name.toUpperCase()}`;
      pokemonId.textContent = `#${data.id}`;
      pokemonWeight.textContent = `Weight: ${weight}`;
      pokemonHeight.textContent = `Height: ${height}`;
      pokemonSpriteContainer.innerHTML = `
          <img id="sprite" src="${sprites.front_default}" alt="${name} front default sprite">
        `;
      const statsCopy = stats.map((stat) => stat.base_stat);
      statsCopy.forEach((baseStat, index) => {
        const statName = stats[index].stat.name;

        switch (statName) {
          case "hp":
            pokemonHP.textContent = `${baseStat}`;
            break;
          case "attack":
            pokemonAttack.textContent = `${baseStat}`;
            break;
          case "defense":
            pokemonDefense.textContent = `${baseStat}`;
            break;
          case "special-attack":
            pokemonSpAttack.textContent = `${baseStat}`;
            break;
          case "special-defense":
            pokemonSpDefense.textContent = `${baseStat}`;
            break;
          case "speed":
            pokemonSpeed.textContent = `${baseStat}`;
            break;

          default:
            break;
        }
      });
      pokemonTypes.innerHTML = `${types
        .map(
          (type) =>
            `<span class="type ${type.type.name}">${type.type.name}</span>`
        )
        .join(" ")}`;
    } else {
      clearPokemonInfo();
    }
  } catch (error) {
    console.error("Error displaying Pokemon info:", error);
  }
};

const clearPokemonInfo = () => {
  pokemonName.textContent = "";
  pokemonId.textContent = "";
  pokemonWeight.textContent = "";
  pokemonHeight.textContent = "";
  pokemonHP.textContent = "";
  pokemonAttack.textContent = "";
  pokemonDefense.textContent = "";
  pokemonSpAttack.textContent = "";
  pokemonSpDefense.textContent = "";
  pokemonSpeed.textContent = "";
  pokemonSpriteContainer.innerHTML = "";
  pokemonTypes.textContent = "";
};
