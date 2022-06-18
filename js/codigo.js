//Chama toda a Pokedex
async function pokedex() {
  for (i=1;i<650;i++){
    await pokeLoad(i);
  }
  //const responsePokedex = await fetch('https://pokeapi.co/api/v2/pokedex/1');
  //const pokedex = await responsePokedex.json();
  //const numeroDex = pokedex.pokemon_entries[x].entry_number;
  //console.log(numeroDex);
  //console.log(pokedex);
  //document.getElementById("pokes").innerHTML+= "<span id="+numeroDex+"></span></br><span>a</span>"
  //Chama o pokémon a partir do número
  async function pokeLoad(numeroPoke) {
    var tipo1;
    var tipo2;
    const responsePokemon = await fetch('https://pokeapi.co/api/v2/pokemon/'+numeroPoke);
    const pokemon = await responsePokemon.json();
    const nome = pokemon.name;
    const tipoTamanho = pokemon.types.length;
    console.log(nome);
    console.log(numeroPoke);
    console.log(tipoTamanho);
    if (tipoTamanho == 2) {
      tipo1 = pokemon.types[0].type.name;
      tipo2 = pokemon.types[1].type.name;
      document.getElementById("pokes").innerHTML+= `<div class="containerPokemon" id="containerPokemon">
        <div class="numeroPoke">
          ${numeroPoke}
        </div>
        <div class="nomePoke">
          ${nome}
        </div>
        <div class="tipo1Poke">
          <img src="assets/icons/types/${tipo1}.svg"></img> ${tipo1}
        </div>
        <div class="tipo2Poke">
          <img src="assets/icons/types/${tipo2}.svg"></img>${tipo2}
        </div>
        <div class='imagemPoke'>
          <img src="assets/svg/${pokemon.id}.svg" alt="${nome}"></img>
        </div>
      </div>
      `;
    } else {
      tipo1 = pokemon.types[0].type.name;
      document.getElementById("pokes").innerHTML+= `<div class="containerPokemon" id="containerPokemon">
        <div class="numeroPoke">
          ${numeroPoke}
        </div>
        <div class="nomePoke">
          ${nome}
        </div>
        <div class="tipo1Poke">
          <img src="assets/icons/types/${tipo1}.svg"></img> ${tipo1}
        </div>
        <div class='imagemPoke'>
          <img src="assets/svg/${pokemon.id}.svg" alt="${nome}"></img>
        </div>
      </div>
      `;
    }
  }
  //for (var i =0;i<pokedex.pokemon_entries.lenght<5;i++){
    //j = i+1;
    //document.getElementById("pokes").innerHTML+= "<span id="+j+"></span></br><span>a</span>"
    //pokeLoad(j);
  //}
}

pokedex()