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
let x = 0;
//Chama toda a Pokedex
async function pokedex(x) {
  for (i=1;i<31;i++){
    await pokeLoad(i+x);
    console.log(x)
    console.log(i)
  }
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
    const tipoTamanho = pokemon.types.length;
    //console.log(nome);
    //console.log(numeroPoke);
    //console.log(tipoTamanho);
    //Segrega pokémons de 1 e 2 tipos para evitar erros com imagens e texto.
    if (tipoTamanho == 2) {
      tipo1 = pokemon.types[0].type.name;
      tipo2 = pokemon.types[1].type.name;
      const corTipo1 = cores[tipo1];
      const corTipo2 = cores[tipo2];
      bgc = coresEscuras[tipo1];
      //Gera o código html para a index.html
      document.getElementById("pokes").innerHTML+= `
      <button type="button" onclick="carregaPoke(${numeroPoke}); location.href='poke.html'" id="botaoPoke" style="background-color:${bgc};">
      <div style="background-color:${bgc};" class="containerPokemon" id="containerPokemon">
        <div class='imagemPoke'>
          <img id='imagemPoke' src="assets/svg/${numeroPoke}.svg" alt="${nome}"></img>
        </div>
        <div class="numeroPoke">
          #${numeroPoke} ${nome}
        </div>
        <div class="nomePoke">
          
        </div>
          <div style="background-color:${corTipo1};" class="tipo1Poke">
            <img src="assets/icons/types/${tipo1}.svg"></img><span id="textoTipo"> ${tipo1}</span>
          </div>
          <div style="background-color:${corTipo2};" class="tipo2Poke">
            <img src="assets/icons/types/${tipo2}.svg"></img><span id="textoTipo"> ${tipo2}</span>
          </div>
        </div>
      </div>
      </button>
      `;
    } else {
      tipo1 = pokemon.types[0].type.name;
      const corTipo1 = cores[tipo1]
      bgc = coresEscuras[tipo1];
      //Gera o código html para a index.html
      document.getElementById("pokes").innerHTML+= `
      <button type="button" onclick="carregaPoke(${numeroPoke}); location.href='poke.html'" id="botaoPoke" style="background-color:${bgc};">
      <div style="background-color:${bgc};" class="containerPokemon" id="containerPokemon">
        <div class='imagemPoke'>
          <img id='imagemPoke' src="assets/svg/${pokemon.id}.svg" alt="${nome}"></img>
        </div>
        <div class="numeroPoke">
          #${numeroPoke} ${nome}
        </div>
        <div class="tipo1Poke" style="background-color:${corTipo1};">
          <img src="assets/icons/types/${tipo1}.svg"></img><span id="textoTipo"> ${tipo1}</span>
        </div>
      </div>
      </button>
      `;
    }
  }
}
//Carrega o id do pokémon na local storage do navegador
function carregaPoke (numeroPoke) {
  var text = numeroPoke;
  console.log(text);
  localStorage.setItem('valueText', text);
}
//Chama o código
pokedex(0)
let y = 31;
window.addEventListener('scroll',()=>{
  //console.log("scrolled", window.scrollY) //scrolled from top
  //console.log(window.innerHeight) //visible part of screen
  
  if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
    pokedex(y);
    return y = y+30
  }
})