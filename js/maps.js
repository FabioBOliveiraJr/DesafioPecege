//Gera uma função para o carregamento da página.
window.onload = function () {
  //Chama a variável numeroPoke que está armazenada no localStorage
  var regiao = localStorage.getItem('valueText');
  // console.log(regiao);
  //Define o número da pokedex de cada região com todos os pokémons
  var dex
  switch (true) {
    case regiao == 1:
      dex = 2;
    break;
    case regiao == 2:
      dex = 7;
    break;
    case regiao == 3:
      dex = 4;
    break;
    case regiao == 4:
      dex = 5;
    break;
    case regiao == 5:
      dex = 9;
    break;
    case regiao == 6:
      dex = 12;
    break;
    case regiao == 7:
      dex = 21;
    break;
    case regiao == 8:
      dex = 27;
    break;
  }
  //Chama o pokémon a partir do número
  async function geraConteudoNormal (regiao) {
    await fetch('js/regioes.json').then(response => {return response.json()}).then(regions => {
      const nome = regions.regions[regiao].nome;
      const imagem = regions.regions[regiao].imagem;
      const texto = regions.regions[regiao].texto
      document.getElementById('corpoMapa').innerHTML=`
      <h1 style="color: black">${nome}</h1>
      <img id="mapaRegiao" src="assets/img/${imagem}" alt="Mapa de ${nome}">
      <div class="textoMapa">
        <p style="color: teal;">${texto}</p>
      </div>
      `
    })
  }
  geraConteudoNormal(regiao)
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
  //Variáveis pertinentes ao Infinite Scroll, a scroll1 é para a prmeira vez que o scroll é feito (Na geração da página), a scroll2 é para as outras gerações do scroll e determina o número de pokémons que serão gerados, sempre deverá ter o valor equivalente com o return do if que gera o scroll.
  let scroll1 = 0;
  let scroll2 = 30;
  //Cria o Infinite Scroll
  window.addEventListener('scroll',()=>{
    
    if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
      document.getElementById('loading').style.visibility = 'visible';
      setTimeout(function(){
        pokedex(scroll2, dex);
        return scroll2 = scroll2+30
      },2000);
    }
  })
  //Chama os pokémons, inicialmente com limitação de 30 para regular o máximo de pokémons aparecem
  async function pokedex(scroll1, dex) {
    const responsePokedex = await fetch('https://pokeapi.co/api/v2/pokedex/'+dex);
    const pokedex = await responsePokedex.json();
    const maxPokes = pokedex.pokemon_entries.length;
    console.log(pokedex)
    for (i=0;i<30;i++){
      var nome = pokedex.pokemon_entries[i+scroll1].pokemon_species.name
      if (i+scroll1 >= maxPokes){
        break
      }
      await pokeLoad(nome, i+scroll1);
    }
    //Chama o pokémon a partir do número
    async function pokeLoad(nomePoke, contador) {
      //Cria variaveis para inserir tipos de pokémons
      var tipo1;
      var tipo2;
      //Cria variável pra colocar a cor do pokémon
      var bgc;
      //Chama o pokémon
      const responsePokemon = await fetch('https://pokeapi.co/api/v2/pokemon/'+nomePoke);
      const pokemon = await responsePokemon.json();
      //Constante com o nome do pokémon
      var nome = nomePoke
      const numero = pokedex.pokemon_entries[contador].entry_number;
      const tipoTamanho = pokemon.types.length;
      //Segrega pokémons de 1 e 2 tipos para evitar erros com imagens e texto.
      if (tipoTamanho == 2) {
        tipo1 = pokemon.types[0].type.name;
        tipo2 = pokemon.types[1].type.name;
        const corTipo1 = cores[tipo1];
        const corTipo2 = cores[tipo2];
        bgc = coresEscuras[tipo1];
        //Gera o código html para a index.html
        document.getElementById("pokesMapa").innerHTML+= `
        <button type="button" onclick="carregaPoke(${pokemon.id}); location.href='poke.html'" id="botaoPoke" style="background-color:${bgc};">
        <div style="background-color:${bgc};" class="containerPokemon" id="containerPokemon">
          <div class='imagemPoke'>
            <img id='imagemPoke' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${nome}"></img>
          </div>
          <div class="numeroPoke">
            Regional #${numero}
          </div>
          <div class="numeroPoke">National #${pokemon.id}</div>
          <div class="numeroPoke">${nome}</div>
          <div style="display: flex;">
            <div style="background-color:${corTipo1};" class="tipo1Poke">
            <img src="assets/icons/types/${tipo1}.svg"></img></br><span id="textoTipo"> ${tipo1}</span>
            </div>
            <div style="background-color:${corTipo2};" class="tipo2Poke">
            <img src="assets/icons/types/${tipo2}.svg"></img></br><span id="textoTipo"> ${tipo2}</span>
            </div>
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
        document.getElementById("pokesMapa").innerHTML+= `
        <button type="button" onclick="carregaPoke(${pokemon.id}); location.href='poke.html'" id="botaoPoke" style="background-color:${bgc};">
        <div style="background-color:${bgc};" class="containerPokemon" id="containerPokemon">
          <div class='imagemPoke'>
            <img id='imagemPoke' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${nome}"></img>
          </div>
          <div class="numeroPoke">
            Regional #${numero}
          </div>
          <div class="numeroPoke">National #${pokemon.id}</div>
          <div class="numeroPoke">${nome}</div>
          <div class="tipo1Poke" style="background-color:${corTipo1};">
          <img src="assets/icons/types/${tipo1}.svg"></img></br><span id="textoTipo"> ${tipo1}</span>
          </div>
        </div>
        </button>
        `;
      }
    }
    document.getElementById('loading').style.visibility = 'hidden';
  }

  //Carrega o id do pokémon na local storage do navegador
  function carregaPoke (numeroPoke) {
    var text = numeroPoke;
    localStorage.setItem('valueText', text);
  }
  //Chama o código
  pokedex(scroll1, dex)
}