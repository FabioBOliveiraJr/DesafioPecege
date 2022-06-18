const cores = {
  fire: '#FDDFDF',
  grass: '#49d0b0',
	electric: '#fcc719',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#ba68c8',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#9faba7',
  ghost: '#9745a6'
}

//Chama toda a Pokedex
async function pokedex() {
  for (i=1;i<152;i++){
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
      const corTipo = cores[tipo1]
      document.getElementById("pokes").innerHTML+= `<div style="background-color:${corTipo};" class="containerPokemon" id="containerPokemon">
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
      const corTipo = cores[tipo1]
      document.getElementById("pokes").innerHTML+= `<div style="background-color:${corTipo};" class="containerPokemon" id="containerPokemon">
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