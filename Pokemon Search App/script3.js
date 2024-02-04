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
const pokemonCardContainer = document.getElementById("pokemon-container");
const loadMoreBtn = document.getElementById("load-more-btn");

const fetchData = async () => {
  try {
    const pokemonUrl = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=5";
    const res = await fetch(pokemonUrl);
    const data = await res.json();
    console.log(data); // Вывести данные в консоль для отладки

    // Собираем промисы в массив
    const pokemonPromises = data.results.map(async (pokemon) => {
      const pokemonDetailRes = await fetch(pokemon.url);
      const pokemonDetailData = await pokemonDetailRes.json();
      return {
        ...pokemon,
        imageUrl:
          pokemonDetailData.sprites.other["official-artwork"].front_default,
        height: pokemonDetailData.height,
        weight: pokemonDetailData.weight,
        hp: pokemonDetailData.stats[0].base_stat,
        attack: pokemonDetailData.stats[1].base_stat,
        defense: pokemonDetailData.stats[2].base_stat,
        specialAttack: pokemonDetailData.stats[3].base_stat,
        specialDefense: pokemonDetailData.stats[4].base_stat,
        speed: pokemonDetailData.stats[5].base_stat,
      };
    });

    // Ожидаем завершения всех промисов
    const pokemonsWithImageUrls = await Promise.all(pokemonPromises);

    displayPokemons(pokemonsWithImageUrls);
  } catch (err) {
    alert("Pokémon not found");
    console.log(err.message);
  }
};
fetchData();

// const fetchMorePokemons = () => {
//   const newLimit = 10;
//   const newOffset = offset + newLimit;

//   for (let i = offset; i < newOffset && i < pokemonDataArr.length; i++) {
//     displayPokemons([pokemonDataArr[i]]);
//   }

//   // Обновляем offset глобально
//   offset = newOffset;
//   if (offset >= pokemonDataArr.length) {
//     loadMoreBtn.disabled = true;
//     loadMoreBtn.style.cursor = "not-allowed";
//     loadMoreBtn.textContent = "No more data to load";
//   }
// };

const displayPokemons = (pokemons) => {
  pokemonCardContainer.innerHTML = "";

  pokemons.forEach((pokemon, index) => {
    const pokemonCard = document.createElement("div");
    pokemonCard.id = index;
    pokemonCard.classList.add("pokemon-card");
    pokemonCard.innerHTML = `
      <h2 class="pokemon-name">${
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
      }</h2>
      <img class="pokemon-img" src="${pokemon.imageUrl}"></img>
      <p>Height: ${pokemon.height}</p>
        <p>Weight: ${pokemon.weight}</p>
         <p>HP: ${pokemon.hp}</p>
        <p>Attack: ${pokemon.attack}</p>
        <p>Defense: ${pokemon.defense}</p>
         <p>Special Attack: ${pokemon.specialAttack}</p>
         <p>Special Defense: ${pokemon.specialDefense}</p>
          <p>Speed: ${pokemon.speed}</p>
      `;

    // Добавляем обработчик события клика на карточку
    pokemonCard.addEventListener("click", () => {
      handlePokemonClick(pokemon.name);
    });

    pokemonCardContainer.appendChild(pokemonCard);
  });
};

const handlePokemonClick = async (pokemonName) => {
  try {
    const pokemonDataUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const res = await fetch(pokemonDataUrl);

    if (res.status === 404) {
      throw new Error("Pokemon not found");
    }

    const data = await res.json();
    console.log(data);

    // Здесь вы можете использовать полученные данные, например, отобразить их на странице
  } catch (err) {
    alert(err.message);
    console.error(err);
  }
};

//loadMoreBtn.addEventListener("click", fetchMorePokemons);
