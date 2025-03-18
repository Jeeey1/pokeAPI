const pokemonsContainer = document.querySelectorAll(".container-pokemon");
const modal = document.querySelector("dialog");
const inputPesquisa = document.getElementById("pesquisa");
const btnPesquisa = document.querySelector(".section-pesquisa button");

btnPesquisa.addEventListener("click", pesquisaModal);

function mostraPokemon() {
  pokemonsContainer.forEach((item) => {
    const numeroAleatorio = Math.floor(Math.random() * 100);
    const imgPokemon = item.querySelector("img");
    const idPokemon = item.querySelector(".id-pokemon");
    const nomePokemon = item.querySelector(".nome-pokemon");
    const typePokemon = item.querySelector(".type-pokemon");

    fetch(`https://pokeapi.co/api/v2/pokemon/${numeroAleatorio}`)
      .then((r) => r.json())
      .then((b) => {
        imgPokemon.src = b.sprites.front_default;
        idPokemon.innerText = "#" + b.id;
        nomePokemon.innerText =
          "Name: " + b.name[0].toUpperCase() + b.name.substring(1);
        typePokemon.innerText =
          "Type: " +
          b.types[0].type.name[0].toUpperCase() +
          b.types[0].type.name.substring(1);

        mudaCorPokemon(b.types[0].type.name, idPokemon);
      });
  });
}
mostraPokemon();

function mudaCorPokemon(tipo, id) {
  switch (tipo) {
    case "bug":
      id.style.backgroundColor = "#699836";
      break;

    case "dark":
      id.style.backgroundColor = "#86538D";
      break;

    case "dragon":
      id.style.backgroundColor = "#50A495";
      break;

    case "electric":
      id.style.backgroundColor = "#BFA545";
      break;

    case "fairy":
      id.style.backgroundColor = "#DBB0D5";
      break;

    case "fighting":
      id.style.backgroundColor = "#C77039";
      break;

    case "fire":
      id.style.backgroundColor = "#BF403B";
      break;

    case "flying":
      id.style.backgroundColor = "#4A65AE";
      break;

    case "ghost":
      id.style.backgroundColor = "#9D70B1";
      break;

    case "grass":
      id.style.backgroundColor = "#53A93A";
      break;

    case "ground":
      id.style.backgroundColor = "#957945";
      break;

    case "ice":
      id.style.backgroundColor = "#72ACC1";
      break;

    case "normal":
      id.style.backgroundColor = "#A4A4A4";
      break;

    case "poison":
      id.style.backgroundColor = "#7D58A2";
      break;

    case "psychic":
      id.style.backgroundColor = "#BE5C98";
      break;

    case "rock":
      id.style.backgroundColor = "#5B7B79";
      break;

    case "steel":
      id.style.backgroundColor = "#5B8196";
      break;

    case "water":
      id.style.backgroundColor = "#559AD2";
      break;
  }
}

async function mostraModal() {
  pokemonsContainer.forEach((item) => {
    const idPokemon = item.querySelector(".id-pokemon").innerText;
    const idPokemonString = idPokemon.replace("#", "");

    const idPokemonModal = modal.querySelector(".id-pokemon");
    const nomePokemonModal = modal.querySelector(".nome-pokemon");
    const imgPrincipal = modal.querySelector(".img-principal");
    const alturaPokemon = modal.querySelector(".altura-pokemon");
    const pesoPokemon = modal.querySelector(".peso-pokemon");
    const habilidade = modal.querySelector(".habilidade-pokemon");

    item.addEventListener("click", async function () {
      modal.showModal();
      const recebePoke = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${idPokemonString}`
      );
      const pokeJSON = await recebePoke.json();

      idPokemonModal.innerText = "#" + pokeJSON.id;
      nomePokemonModal.innerText = pokeJSON.name;
      imgPrincipal.src = pokeJSON.sprites.front_default;
      mudaCorPokemon(pokeJSON.types[0].type.name, imgPrincipal);

      if (pokeJSON.height / 10 >= 1)
        alturaPokemon.innerText = pokeJSON.height / 10 + "m";
      else alturaPokemon.innerText = pokeJSON.height * 10 + "cm";

      pesoPokemon.innerText = pokeJSON.weight / 10 + "kg";
      habilidade.innerText = pokeJSON.abilities[0].ability.name;
      mostraEvolucao(nomePokemonModal.innerText);
    });
  });
  fechaModal();
}

setTimeout(mostraModal, 500);

function fechaModal() {
  const botaoFechar = document.querySelectorAll(".closeButton");

  botaoFechar.forEach((botao) => {
    botao.addEventListener("click", () => {
      const selectEvo1 = document.querySelector(".evo1");
      const selectEvo2 = document.querySelector(".evo2");
      const selectBase = document.querySelector(".evoBase");

      if (selectEvo1) selectEvo1.remove();
      if (selectEvo2) selectEvo2.remove();
      if (selectBase) selectBase.remove();
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

  // verifica se o pokemon passado no parâmetro é base
  if (nomePoke === pokeBase) {
    const pokeEvo1 = chainJson.chain.evolves_to[0].species.name;
    if (pokeEvo1) {
      const newEvo = document.createElement("img");
      const selectEvo1 = sectionEvolucao.querySelector(".evo1");
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokeEvo1}`)
        .then((r) => r.json())
        .then((b) => {
          Evolucao1 = newEvo;
          Evolucao1.src = b.sprites.front_default;
          if (!selectEvo1) {
            sectionEvolucao.appendChild(Evolucao1);
            Evolucao1.classList.add("evo1");
          }
        });
    }

    if (chainJson.chain.evolves_to[0].evolves_to[0]) {
      const pokeEvo2 = chainJson.chain.evolves_to[0].evolves_to[0].species.name;
      const newEvo = document.createElement("img");
      const selectEvo2 = sectionEvolucao.querySelector(".evo2");
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokeEvo2}`)
        .then((r) => r.json())
        .then((b) => {
          Evolucao2 = newEvo;
          Evolucao2.src = b.sprites.front_default;
          if (!selectEvo2) {
            sectionEvolucao.appendChild(Evolucao2);
            Evolucao2.classList.add("evo2");
          }
        });
    }
  } else if (nomePoke == chainJson.chain.evolves_to[0].species.name) {
    // verifica se o pokemon no parâmetro é a evolucao 1
    const newEvo = document.createElement("img");
    const selectBase = sectionEvolucao.querySelector(".evoBase");
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeBase}`)
      .then((r) => r.json())
      .then((b) => {
        evoBase = newEvo;
        evoBase.src = b.sprites.front_default;
        if (!selectBase) {
          sectionEvolucao.appendChild(evoBase);
          evoBase.classList.add("evoBase");
        }
      });

    if (chainJson.chain.evolves_to[0].evolves_to[0]) {
      const evo2 = chainJson.chain.evolves_to[0].evolves_to[0].species.name;
      const newEvo = document.createElement("img");
      const selectEvo2 = sectionEvolucao.querySelector(".evo2");
      fetch(`https://pokeapi.co/api/v2/pokemon/${evo2}`)
        .then((r) => r.json())
        .then((b) => {
          Evolucao2 = newEvo;
          Evolucao2.src = b.sprites.front_default;
          if (!selectEvo2) {
            sectionEvolucao.appendChild(Evolucao2);
            Evolucao2.classList.add("evo2");
          }
        });
    }
  } else {
    const newEvoBase = document.createElement("img");
    const newEvo1 = document.createElement("img");
    const selectBase = sectionEvolucao.querySelector(".evoBase");
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeBase}`)
      .then((r) => r.json())
      .then((b) => {
        evoBase = newEvoBase;
        evoBase.src = b.sprites.front_default;
        if (!selectBase) {
          evoBase.classList.add("evoBase");
          sectionEvolucao.appendChild(evoBase);
        }
      });
    const pokeEvo1 = chainJson.chain.evolves_to[0].species.name;
    const selectEvo1 = document.querySelector(".evo1");
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeEvo1}`)
      .then((r) => r.json())
      .then((b) => {
        Evolucao1 = newEvo1;
        Evolucao1.src = b.sprites.front_default;
        if (!selectEvo1) {
          sectionEvolucao.appendChild(Evolucao1);
          Evolucao1.classList.add("evo1");
        }
      });
  }
}

function pesquisaModal() {
  const nomePokemon = inputPesquisa.value.toLowerCase();
  const idPokemonModal = modal.querySelector(".id-pokemon");
  const nomePokemonModal = modal.querySelector(".nome-pokemon");
  const imgPrincipal = modal.querySelector(".img-principal");
  const alturaPokemon = modal.querySelector(".altura-pokemon");
  const pesoPokemon = modal.querySelector(".peso-pokemon");
  const habilidade = modal.querySelector(".habilidade-pokemon");

  if (nomePokemon !== "") {
    fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`)
      .then((r) => r.json())
      .then((b) => {
        idPokemonModal.innerText = "#" + b.id;
        nomePokemonModal.innerText = b.name;
        imgPrincipal.src = b.sprites.front_default;
        mudaCorPokemon(b.types[0].type.name, imgPrincipal);

        if (b.height / 10 >= 1) alturaPokemon.innerText = b.height / 10 + "m";
        else alturaPokemon.innerText = b.height + "m";

        pesoPokemon.innerText = b.weight / 10 + "kg";
        habilidade.innerText = b.abilities[0].ability.name;
        mostraEvolucao(nomePokemonModal.innerText);
        modal.showModal();
      });
    fechaModal();
  }
}
