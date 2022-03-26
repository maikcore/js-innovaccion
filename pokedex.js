
var pokenames;
var nombre;
var i=0;
const fetchAllPokemon = () =>{
    const url = 'https://pokeapi.co/api/v2/pokemon/?limit=1126';
    fetch(url).then((res) => {
        return res.json();
    }).then((data) => {
        pokeProcess(data.results);
    })
}

fetchAllPokemon();

const pokeProcess = (url) => {
    pokenames = url;
    fetchPokemon(pokenames[i].name);
    nombre = pokenames[i].name;
    //for(i=0; i<1126; i++){
      //  console.log("Pokemon #" + i + "-" +url[i].name);
    //}
}

const cambiaPokemonPlus = () => {
    if(i<1126){
        i++;
        fetchPokemon(pokenames[i].name);
        nombre = pokenames[i].name;
    }
}

const cambiaPokemonLess = () => {
    if(i>0){
        i--;
        fetchPokemon(pokenames[i].name);
        nombre = pokenames[i].name;
    }    
}

const cambiaPokemonText = () => {
    const pokeText = document.getElementById("fname");
    let pokeName = pokeText.value;
    pokeName = pokeName.toLowerCase();
    nombre = pokeName;
    document.getElementById("fname").value="";
    fetchPokemon(pokeName);

}

const fetchPokemon = (name) => {
    //const pokeNameInput = document.getElementById("pokeName");
    //let pokeName = pokeNameInput.value;
    //pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    fetch(url).then((res) => { 
        if (res.status != "200") {
           // console.log(res);
            pokeImage("/images/pokemon-sad.gif")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
           // console.log(data);
            let pokeImg = data.sprites.other.home.front_default;
            pokeImage(pokeImg);
            despliegaInfo(data);
        }
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
    const info = document.getElementById("pokeData");
    if(url=="/images/pokemon-sad.gif"){
        info.innerHTML = "no existe";
    }else{
        info.innerHTML = nombre;
    }
}

const despliegaInfo = (url) => {
    const myNode = document.getElementById('info');
    myNode.innerHTML = '';

    var img = document.createElement('img');
    img.src = url.sprites.front_default;
    document.getElementById('info').appendChild(img);
    
    var titulo = document.createElement('h1');
    titulo.innerHTML = url.name;
    document.getElementById('info').appendChild(titulo);
    
    var space = document.createElement('p');
    space.innerHTML = "<br>";
    document.getElementById('info').appendChild(space);

    var tc = document.createElement('h2');
    tc.innerHTML = "Tipo de pokemon";
    document.getElementById('info').appendChild(tc);

    var p = document.createElement('p');
    //tipos 
    var tipo = "/ ";
    for(a=0; a<url.types.length; a++){
        tipo += url.types[a].type.name;
        tipo += " / ";
        console.log(url.types[a].type.name);
    }
    p.innerHTML = tipo;
    document.getElementById('info').appendChild(p);
    

    tc = document.createElement('h2');
    tc.innerHTML = "Estadísticas";
    document.getElementById('info').appendChild(tc);
    var p2 = document.createElement('p');
    //estadísticas
    var stats = "";
    for(a=0; a<url.stats.length; a++){
        stats  += url.stats[a].stat.name + " -> " + url.stats[a].base_stat + "<br>";

    }
    p2.innerHTML = stats;
    document.getElementById('info').appendChild(p2);


    tc = document.createElement('h2');
    tc.innerHTML = "Movimientos";
    document.getElementById('info').appendChild(tc);
    var p3 = document.createElement('p');
    //movimientos
    var movs = "";
    for(a=0; a<url.moves.length; a++){
        movs += url.moves[a].move.name + "<br>";
    }
    p3.innerHTML = movs;
    document.getElementById('info').appendChild(p3);

}