const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokeapiUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
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

const formatPokemonName = (name) => {
  return name
    .toLowerCase()
    .replace("♀", "-f")
    .replace("♂", "-m")
    .replace(/[^a-z0-9-]/g, "");
};

const searchPokemon = async (name, id, data) => {
  if (data && data.length > 0) {
    const formattedName = formatPokemonName(name);

    for (const pokemon of data) {
      const currentId = pokemon.url.match(/\/(\d+)\/$/)[1];
      const currentName = formatPokemonName(pokemon.name);

      if (formattedName === currentName || String(id) === currentId) {
        try {
          const detailsRes = await fetch(
            `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${formattedName}`
          );

          const detailsData = await detailsRes.json();
          return detailsData;
        } catch (error) {
          console.log("Error fetching details:", error);
          return null;
        }
      }
    }

    console.log("Wrong Pokémon Name or ID");
    return null;
  } else {
    console.log("Incorrect data structure. No Pokémon data.");
    return null;
  }
};

const displayPokemonInfo = (name, id, data) => {
  if (data) {
    const { weight, height, types, stats, sprites } = data;
    pokemonName.textContent = `${name.toUpperCase()}`;
    pokemonId.textContent = `#${id}`;
    pokemonWeight.textContent = `Weight: ${weight}`;
    pokemonHeight.textContent = `Height: ${height}`;
    pokemonHP.textContent = `${
      stats.find((stat) => stat.stat.name === "hp").base_stat
    }`;
    pokemonAttack.textContent = `${
      stats.find((stat) => stat.stat.name === "attack").base_stat
    }`;
    pokemonDefense.textContent = `${
      stats.find((stat) => stat.stat.name === "defense").base_stat
    }`;
    pokemonSpAttack.textContent = `${
      stats.find((stat) => stat.stat.name === "special-attack").base_stat
    }`;
    pokemonSpDefense.textContent = `${
      stats.find((stat) => stat.stat.name === "special-defense").base_stat
    }`;
    pokemonSpeed.textContent = `${
      stats.find((stat) => stat.stat.name === "speed").base_stat
    }`;
    pokemonSpriteContainer.innerHTML = `<img id="sprite" src="${sprites.front_default}"></img>`;

    pokemonTypes.textContent = `${types
      .map((type) => type.type.name)
      .join("  ")}`;
    pokemonTypes.innerHTML = "";

    types.forEach((typeData) => {
      const newSpan = document.createElement("span");
      newSpan.classList.add("type");
      newSpan.classList.add(typeData.type.name.toLowerCase());
      newSpan.textContent = typeData.type.name;
      pokemonTypes.appendChild(newSpan);
    });
  } else {
    alert("Pokémon not found");
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

const startSearch = async (data) => {
  const searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const searchValue = searchInput.value.toLowerCase();

    let searchName = searchValue;
    let searchId = null;

    if (!isNaN(searchValue)) {
      searchId = parseInt(searchValue, 10);
    } else {
      searchName = searchValue;
    }
    clearPokemonInfo();
    if (data) {
      const detailsData = await searchPokemon(searchName, searchId, data);

      if (detailsData) {
        displayPokemonInfo(detailsData.name, detailsData.id, detailsData);
      } else {
        alert("Pokémon not found");
      }
    }
  });
};

const fetchData = async () => {
  try {
    const res = await fetch(pokeapiUrl);
    const { results } = await res.json();
    startSearch(results);
  } catch (err) {
    console.log(err.message);
  }
};

fetchData();
