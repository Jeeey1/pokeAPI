const pokemonsContainer = document.querySelectorAll(".container-pokemon");
const modal = document.querySelector("dialog");

function mostraPokemon() {
  pokemonsContainer.forEach((item) => {
    const numeroAleatorio = Math.floor(Math.random() * 100);
    const imgPokemon = item.querySelector("img");
    const idPokemon = item.querySelector(".id-pokemon");
    const nomePokemon = item.querySelector(".nome-pokemon");

    fetch(`https://pokeapi.co/api/v2/pokemon/${numeroAleatorio}`)
      .then((r) => r.json())
      .then((b) => {
        imgPokemon.src = b.sprites.front_default;
        idPokemon.innerText = "#" + b.id;
        nomePokemon.innerText = b.name;
        mudaCorPokemon(b.types[0].type.name, imgPokemon);
      });
  });
}
mostraPokemon();

function mudaCorPokemon(tipo, img) {
  switch (tipo) {
    case "bug":
      img.style.backgroundColor = "#699836";
      break;

    case "dark":
      img.style.backgroundColor = "#86538D";
      break;

    case "dragon":
      img.style.backgroundColor = "#50A495";
      break;

    case "electric":
      img.style.backgroundColor = "#BFA545";
      break;

    case "fairy":
      img.style.backgroundColor = "#DBB0D5";
      break;

    case "fighting":
      img.style.backgroundColor = "#C77039";
      break;

    case "fire":
      img.style.backgroundColor = "#BF403B";
      break;

    case "flying":
      img.style.backgroundColor = "#4A65AE";
      break;

    case "ghost":
      img.style.backgroundColor = "#9D70B1";
      break;

    case "grass":
      img.style.backgroundColor = "#53A93A";
      break;

    case "ground":
      img.style.backgroundColor = "#957945";
      break;

    case "ice":
      img.style.backgroundColor = "#72ACC1";
      break;

    case "normal":
      img.style.backgroundColor = "#A4A4A4";
      break;

    case "poison":
      img.style.backgroundColor = "#7D58A2";
      break;

    case "psychic":
      img.style.backgroundColor = "#BE5C98";
      break;

    case "rock":
      img.style.backgroundColor = "#5B7B79";
      break;

    case "steel":
      img.style.backgroundColor = "#5B8196";
      break;

    case "water":
      img.style.backgroundColor = "#559AD2";
      break;
  }
}

function mostraModal() {
  pokemonsContainer.forEach((item) => {
    const idPokemon = item.querySelector(".id-pokemon").innerText;
    const idPokemonString = idPokemon.replace("#", "");

    const idPokemonModal = modal.querySelector(".id-pokemon");
    const nomePokemonModal = modal.querySelector(".nome-pokemon");
    const imgPrincipal = modal.querySelector(".img-principal");
    const alturaPokemon = modal.querySelector(".altura-pokemon");
    const pesoPokemon = modal.querySelector(".peso-pokemon");
    const habilidade = modal.querySelector(".habilidade-pokemon");

    item.addEventListener("click", () => {
      modal.showModal();
      fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemonString}`)
        .then((r) => r.json())
        .then((b) => {
          idPokemonModal.innerText = "#" + b.id;
          nomePokemonModal.innerText = b.name;
          imgPrincipal.src = b.sprites.front_default;
          mudaCorPokemon(b.types[0].type.name, imgPrincipal);

          if (b.height / 10 >= 1) alturaPokemon.innerText = b.height / 10 + "m";
          else alturaPokemon.innerText = b.height / 10 + "cm";

          pesoPokemon.innerText = b.weight / 10 + "kg";
          habilidade.innerText = b.abilities[0].ability.name;
          mostraEvolucao(nomePokemonModal.innerText);
        });
    });
    fechaModal();
  });
}

setTimeout(mostraModal, 500);

function fechaModal() {
  const botaoFechar = document.querySelectorAll(".closeButton");

  botaoFechar.forEach((botao) => {
    botao.addEventListener("click", () => {
      modal.close();
    });
  });
}

async function mostraEvolucao(nomePoke) {
  const sectionEvolucao = modal.querySelector(".evolution-pokemon");
  const dadosSpecies = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${nomePoke}`
  );
  const speciesJson = await dadosSpecies.json();
  const urlChainEvolucao = speciesJson.evolution_chain.url;

  const chainEvolucao = await fetch(urlChainEvolucao);
  const chainJson = await chainEvolucao.json();
  const pokeBase = chainJson.chain.species.name;
  const pokeEvo1 = chainJson.chain.evolves_to[0].species.name;
  const pokeEvo2 = chainJson.chain.evolves_to[0].evolves_to[0].species.name;
  if (pokeBase === nomePoke) {
    const newEvo = document.createElement("img");

    if (pokeEvo1) {
      const selectEvo1 = sectionEvolucao.querySelector(".evo1");
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokeEvo1}`)
        .then((r) => r.json())
        .then((b) => {
          console.log(b);
          newEvo.src = b.sprites.front_default;
          newEvo.classList.add("evo1");
          if (!selectEvo1) {
            sectionEvolucao.appendChild(newEvo);
          }
        });
    } else {
      console.log("evolucao 1 nao existe");
    }

    if (pokeEvo2) {
      const selectEvo2 = sectionEvolucao.querySelector(".evo2");
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokeEvo2}`)
        .then((r) => r.json())
        .then((b) => {
          console.log(b);
          newEvo.src = b.sprites.front_default;
          newEvo.classList.add("evo2");
          if (!selectEvo2) {
            sectionEvolucao.appendChild(newEvo);
          }
        });
    } else {
      console.log("Evolucao 2 nao existe");
    }
  }
}

// fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon1}`)
// .then(r => r.json())
// .then(b => {
//   console.log(b)
// }) // fetch para usar na busca de pokemons
