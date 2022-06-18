//Cores de fundo por tipo
const cores = {
  fire: '#f08030',
  grass: '#78c850',
	electric: '#F8d030',
	water: '#6890f0',
	ground: '#e0c068',
	rock: '#b8a038',
	fairy: '#ee99ac',
	poison: '#a040a0',
	bug: '#a8b820',
	dragon: '#7038f8',
	psychic: '#f85888',
	flying: '#a890f0',
	fighting: '#c03028',
	normal: '#A8A878',
  dark: '#705848',
  steel: '#b8b8d0',
  ice: '#98d8d8',
  ghost: '#705898'
}

//Chama toda a Pokedex
async function pokedex() {
  for (i=1;i<31;i++){
    await pokeLoad(i);
  }
  //Chama o pokémon a partir do número
  async function pokeLoad(numeroPoke) {
    //Cria variaveis para inserir tipos de pokémons
    var tipo1;
    var tipo2;
    //Chama o pokémon
    const responsePokemon = await fetch('https://pokeapi.co/api/v2/pokemon/'+numeroPoke);
    const pokemon = await responsePokemon.json();
    //Constante com o nome do pokémon
    const nome = pokemon.name;
    const tipoTamanho = pokemon.types.length;
    console.log(nome);
    console.log(numeroPoke);
    console.log(tipoTamanho);
    //Segrega pokémons de 1 e 2 tipos para evitar erros com imagens e texto.
    if (tipoTamanho == 2) {
      tipo1 = pokemon.types[0].type.name;
      tipo2 = pokemon.types[1].type.name;
      const corTipo1 = cores[tipo1];
      const corTipo2 = cores[tipo2];
      //Gera o código html para a index.html
      document.getElementById("pokes").innerHTML+= `
      <div style="background-color:${corTipo1};" class="containerPokemon" id="containerPokemon">
        <div class='imagemPoke'>
          <img id='imagemPoke' src="assets/svg/${pokemon.id}.svg" alt="${nome}"></img>
        </div>
        <div class="numeroPoke">
          #${numeroPoke}
        </div>
        <div class="nomePoke">
          ${nome}
        </div>
          <div style="background-color:${corTipo1};" class="tipo1Poke">
            <img src="assets/icons/types/${tipo1}.svg"></img> ${tipo1}
          </div>
          <div style="background-color:${corTipo2};" class="tipo2Poke">
            <img src="assets/icons/types/${tipo2}.svg"></img><span> ${tipo2}</span>
          </div>
        </div>
      </div>
      `;
    } else {
      tipo1 = pokemon.types[0].type.name;
      const corTipo1 = cores[tipo1]
      //Gera o código html para a index.html
      document.getElementById("pokes").innerHTML+= `<div style="background-color:${corTipo1};" class="containerPokemon" id="containerPokemon">
        <div class='imagemPoke'>
          <img id='imagemPoke' src="assets/svg/${pokemon.id}.svg" alt="${nome}"></img>
        </div>
        <div class="numeroPoke">
          #${numeroPoke}
        </div>
        <div class="nomePoke">
          ${nome}
        </div>
        <div class="tipo1Poke">
          <img src="assets/icons/types/${tipo1}.svg"></img> ${tipo1}
        </div>
      </div>
      `;
    }
  }
}
//Chama o código
pokedex()