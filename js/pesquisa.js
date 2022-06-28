//Faz o input da pesquisa funcionar
async function pesquisa() {
  var x = document.getElementById("search").value;
  x = x.toLowerCase();
  carregaPoke(x);
  switch (true) {
    case x>898:
      alert('Pokémon inválido, tentar entre 1 e 898');
    break;
    case x<=898:
      location.href='poke.html';
    break;
    case typeof x == 'string':
     await fetch('https://pokeapi.co/api/v2/pokemon/'+x).then(function (data) {
        if (!data.ok) {
          alert('Nome de Pokémon inválido');
        } else {
          location.href='poke.html';
        }
      });
    break;
  }
}

//Carrega o id do pokémon na local storage do navegador
function carregaPoke (numeroPoke) {
  var text = numeroPoke;
  localStorage.setItem('valueText', text);
}

var barra = document.getElementById("search");
barra.addEventListener("keypress", function(enter){
  if (enter.key === "Enter"){
    enter.preventDefault();
    pesquisa()}
})