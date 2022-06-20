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
//Define cores escuras pro background
const coresEscuras = {
  fire: 'darkred',
  grass: 'darkgreen',
	electric: 'gold',
	water: 'darkblue',
	ground: 'goldenrod',
	rock:'#8a7208',
	fairy: '#c26c7e',
	poison: '#7c2b7c',
	bug: 'darkolivegreen',
	dragon: '#4617b4',
	psychic: '#c92556',
	flying: '#634da5',
	fighting: '#a71d16',
	normal: '#838340',
  dark: '#5f4431',
  steel: '#9494ac73',
  ice: '#98d8d896',
  ghost: '#71589883'
}
//Gera uma função para o carregamento da página.
window.onload = function () {
  //Chama a variável numeroPoke que está armazenada no localStorage
  var numeroPoke = localStorage.getItem('valueText');
  console.log(numeroPoke);
  //Chama o pokémon a partir do número
  async function pokeLoad(numeroPoke) {
    //Cria variaveis para inserir tipos de pokémons
    var tipo1;
    var tipo2;
    //Cria variável pra colocar a cor do pokémon
    var bgc;
    //Chama o pokémon
    const responsePokemon = await fetch('https://pokeapi.co/api/v2/pokemon/'+numeroPoke);
    const pokemon = await responsePokemon.json();
    //Constante com o nome do pokémon
    const nome = pokemon.name;
    const peso = pokemon.weight;
    const altura = pokemon.height;
    const tipoTamanho = pokemon.types.length;
    if (tipoTamanho == 2) {
      tipo1 = pokemon.types[0].type.name;
      tipo2 = pokemon.types[1].type.name;
      const corTipo1 = cores[tipo1];
      const corTipo2 = cores[tipo2];
      bgc = coresEscuras[tipo1];
      document.getElementById("pokesPage2").innerHTML+=`
        <div class="clearfix" style="background-color:${bgc};">
          <div class="contemOverlay" style="background-color:${bgc};">
            <div class='imagemPaginaPoke'>
              <img id='imagemPaginaPoke' src="assets/svg/${numeroPoke}.svg" alt="${nome}"></img>
            </div>
            <div id="nomePoke">${numeroPoke} ${nome}</div>
            <div id="pesoPoke">Peso: ${peso}</div>
            <div id="nomePoke">Altura: ${altura}</div>
            <div id="tiposPaginaPoke">
              <div style="background-color:${corTipo1};" class="tipo1Poke">
                <img src="assets/icons/types/${tipo1}.svg"></img><span id="textoTipo"> ${tipo1}</span> 
              </div>
              <div style="background-color:${corTipo2};" class="tipo2Poke">
                <img src="assets/icons/types/${tipo2}.svg"></img><span id="textoTipo"> ${tipo2}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      tipo1 = pokemon.types[0].type.name;
      const corTipo1 = cores[tipo1];
      bgc = coresEscuras[tipo1];
      document.getElementById("pokesPage2").innerHTML+=`
      <div class="clearfix" style="background-color:${bgc};">
        <div class="contemOverlay" style="background-color:${bgc};">
          <div class='imagemPaginaPoke'>
            <img id='imagemPaginaPoke' src="assets/svg/${numeroPoke}.svg" alt="${nome}"></img>
          </div>
          <div id="nomePoke">${numeroPoke} ${nome}</div>
          <div id="pesoPoke">Peso: ${peso}</div>
            <div id="nomePoke">Altura: ${altura}</div>
          <div style="background-color:${corTipo1};" class="tipo1Poke">
            <img src="assets/icons/types/${tipo1}.svg"></img><span id="textoTipo"> ${tipo1}</span>
          </div>
        </div>
      </div>
      `;
    }
  }
  pokeLoad(numeroPoke)
}