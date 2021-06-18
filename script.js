

let API = "https://pokeapi.co/api/v2/pokemon/";

let APIAbilities = "https://pokeapi.co/api/v2/ability/";

let APIHabitat = "https://pokeapi.co/api/v2/pokemon/";


let pokemonName = document.getElementById("pokemonName");
let pokemonSubmit = document.getElementById("pokemonSubmit");

pokemonSubmit.addEventListener("click", function(event) {

    event.preventDefault();

    document.getElementById("measurements").innerHTML = "";
    document.getElementById("abilities").innerHTML = "";
    document.getElementById("habitat").innerHTML = "";
    document.getElementById("pokemonType").innerHTML = "";
    document.getElementById("pokemonName1").innerHTML = "";
    document.getElementById("pokemonImage").src="//:0";
    
    fetch(API + pokemonName.value).then(function(response) {
        if(response.ok) {
            return response.json();
        }
        throw new Error("Unknown");
    }) .then(function(json) {
        document.getElementById("pokemonType").innerHTML = "";
        document.getElementById("pokemonName1").innerHTML = "";

        console.log("general info")
        console.log(json);

        let id = json.id;
        
        let name = json.name;
        let pokemonType = json.types[0].type.name;

        
        let pokemonImage = document.getElementById("pokemonImage");
        let pokemonType1 = document.getElementById("pokemonType");
        let name1 = document.getElementById("pokemonName1");
        name1.appendChild(document.createTextNode(name));

        // HOW TO CLUMP LOTS OF SIMILAR DATA TOGETHER BELOW Need DIV tag in HTML
        let measurements = "<p> Height: " + json.height + " dm " + "</p>" 
        measurements = measurements + "<p> Weight: " + json.weight + " hg " + "</p>";
        measurements = measurements + "<p> Base XP: " + json.base_experience + "</p>";

        document.getElementById("measurements").innerHTML = measurements;


        pokemonType1.appendChild(document.createTextNode("Type: " +pokemonType));


        pokemonImage.src = json.sprites.front_default;

        // call show abilities - pass in json - only show first 
        // call show-characterisitics - pass in json - only show first 
        // if we arent sure use strings to create the elements iterating through

        fetch(APIAbilities + id).then(function(response) {
            if(response.ok) {
                return response.json();
            }
            
        }) .then(function(json) {
            console.log("Abilities");
            console.log(json);
            
            let pokemonAbilities = "<h2> Abilities: </h2>"+ "<p> Ability Name: " + json.name + "<br>" ;

            try{
            pokemonAbilities = pokemonAbilities + "<h4> Short Effect:  </h4> " + "<p>" + json.effect_entries[1].short_effect + "</p>";
            }
            catch(error){
                pokemonAbilities = pokemonAbilities + "<h4> Short Effect: </h4> " + "<p> Short Effect unavailable </p>";

            }
            try{
            pokemonAbilities = pokemonAbilities + "<h4> Effect Description: </h4>" + "<p>" + json.effect_entries[1].effect + "</p>";
            }
            catch(error) {
                pokemonAbilities = pokemonAbilities + "<h4> Effect Description: </h4>" + "<p> Effect Description unavailable </p>";
            }
            document.getElementById("abilities").innerHTML = pokemonAbilities;



            fetch(APIHabitat + pokemonName.value + "/encounters").then(function(response) {
                if(response.ok) {
                    return response.json();
                }
                throw new Error("Unknown");
            }) .then(function(json) {
                console.log("Locations");
                console.log(json);
                console.log(pokemonName.value)
    
                let pokemonHabitats = "<h3> Where can " + pokemonName.value + " be found </h3>";
                pokemonHabitats = pokemonHabitats + "<p>" + pokemonName.value +  " can be found in these regions: \n" + "</p>" ;
                pokemonHabitats += "<div id='habitat-grid'>"
                for(let i = 0; i < json.length; i++) {
    
                    pokemonHabitats += "<span>" +  json[i].location_area.name + "</span>";
                }
                "</div>"
    
                document.getElementById("habitat").innerHTML = pokemonHabitats;
        
            })
    
        })
    
        

    })

  



// pictures are in sprites - front_default
// POINTERS: make 2 more calls to fetch, all going to be one after the other
// 

})


