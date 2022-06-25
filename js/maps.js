//Gera uma função para o carregamento da página.
window.onload = function () {
  //Chama a variável numeroPoke que está armazenada no localStorage
  var regiao = localStorage.getItem('valueText');
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
    //Chama a api para o testo de descrição
    const responseDesc = await fetch('https://pokeapi.co/api/v2/pokemon-species/'+numeroPoke);
    const desc = await responseDesc.json();
    //Constante com o nome do pokémon
    const nome = pokemon.name;
    const peso = pokemon.weight;
    const altura = pokemon.height;
    const tipoTamanho = pokemon.types.length;
    const numero = pokemon.id;
    var descricao = desc.flavor_text_entries[0].flavor_text;
    //Tira o caracter \f da descrição
    descricao = descricao.replace(/\f/, '');
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
              <img id='imagemPaginaPoke' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${numero}.png" alt="${nome}"></img>
            </div>
            <div id="nomePoke">${numero} ${nome}</div>
            <div id="pesoPoke">Weight: ${peso}</div>
            <div id="nomePoke">Height: ${altura}</div>
            <div id="tiposPaginaPoke">
              <div style="background-color:${corTipo1};" class="tipo1Poke">
                <img src="assets/icons/types/${tipo1}.svg"></img><span id="textoTipo"> ${tipo1}</span> 
              </div>
              <div style="background-color:${corTipo2};" class="tipo2Poke">
                <img src="assets/icons/types/${tipo2}.svg"></img><span id="textoTipo"> ${tipo2}</span>
              </div>
              <div id ="descricaoPoke">
                <o>${descricao}</p>
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
            <img id='imagemPaginaPoke' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${numero}.png" alt="${nome}"></img>
          </div>
          <div id="nomePoke">${numero} ${nome}</div>
          <div id="pesoPoke">Weight: ${peso}</div>
          <div id="nomePoke">Height: ${altura}</div>
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