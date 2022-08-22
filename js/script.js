////////////////////////////
//////// API REFERENCES
////////////////////////////

const monMoves = {
	"async": true,
	"crossDomain": true,
	"url": "https://pokemon-go1.p.rapidapi.com/current_pokemon_moves.json",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "e07529496bmsha2822632d264d48p1f5921jsnffeb73a0f472",
		"X-RapidAPI-Host": "pokemon-go1.p.rapidapi.com"
	}
};

const monCp = {
	"async": true,
	"crossDomain": true,
	"url": "https://pokemon-go1.p.rapidapi.com/pokemon_max_cp.json",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "e07529496bmsha2822632d264d48p1f5921jsnffeb73a0f472",
		"X-RapidAPI-Host": "pokemon-go1.p.rapidapi.com"
	}
};

const monStats = {
	"async": true,
	"crossDomain": true,
	"url": "https://pokemon-go1.p.rapidapi.com/pokemon_stats.json",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "e07529496bmsha2822632d264d48p1f5921jsnffeb73a0f472",
		"X-RapidAPI-Host": "pokemon-go1.p.rapidapi.com"
	}
};

const monTypes = {
	"async": true,
	"crossDomain": true,
	"url": "https://pokemon-go1.p.rapidapi.com/pokemon_types.json",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "e07529496bmsha2822632d264d48p1f5921jsnffeb73a0f472",
		"X-RapidAPI-Host": "pokemon-go1.p.rapidapi.com"
	}
};

const URL = "https://pokeapi.co/api/v2/pokemon/";
const dexURL = "https://pokeapi.co/api/v2/pokedex/"

////////////////////////////
//////// VARIABLES
////////////////////////////

// header elements
const $form = $("form")
const $input = $("#inputText")

// main content elements
const $pokeName = $("#pokeName")
const $pokeType = $("#pokeType")
const $maxCp = $("#maxCp")
// base stats elements
const $attackLi = $("#liAttack")
const $defenseLi = $("#liDefense")
const $hpLi = $("#liHP")
// pokemon moves elements
const $chargedLi = $("#chargedLi")
const $fastLi = $("#fastLi")

// side content elements
const $pokedexDiv = $(".divPokedex")
const $pokemonImg = $("#pokemonImg")


////////////////////////////
//////// EVENT LISTENERS
////////////////////////////

// listens for the "submit" button and executes getPokeStats fn.
$form.on("submit", getPokeStats);

////////////////////////////
//////// FUNCTIONS
////////////////////////////

function getPokeStats(event){
	event.preventDefault();
	let userInput = $input.val().toLowerCase();
	if (userInput === '') return;
	// function passes through a name check before loading. 
	$.ajax(monCp).done(function(nameCheck){
		let idNum = nameCheck.findIndex((e) => (e.pokemon_name.toLowerCase() === userInput && e.form === "Normal"));
		if (idNum === -1) return;

		// function to display pokemon name and CP
		$.ajax(monCp).done(function (data) {
			let idxNum = nameCheck.findIndex((e) => (e.pokemon_name.toLowerCase() === userInput && e.form === "Normal"));
			$pokeName.text(`Name: ${data[idxNum].pokemon_name}`);
			$maxCp.text(`Max Combat Power: ${data[idxNum].max_cp}`);
		});
	
		// function gets pokemon possible moves
		$.ajax(monMoves).done(function (data) {
			let idxNum = data.findIndex((e) => (e.pokemon_name.toLowerCase() === userInput && e.form === "Normal"));
			$chargedLi.text(`Charged Moves: ${data[idxNum].charged_moves.join(", ")}`);
			$fastLi.text(`Fast Moves ${data[idxNum].fast_moves.join(", ")}`);
		});
	
		// funciton gets pokemon base stats. 
		$.ajax(monStats).done(function (data) {
			let idxNum = data.findIndex((e) => (e.pokemon_name.toLowerCase() === userInput && e.form === "Normal"));
			$attackLi.text(`Attack: ${data[idxNum].base_attack}`);
			$defenseLi.text(`Defense: ${data[idxNum].base_defense}`);
			$hpLi.text(`Hit Points: ${data[idxNum].base_stamina}`);
		});
	
		// function gets pokemon types. 
		$.ajax(monTypes).done(function (data) {
			let idxNum = data.findIndex((e) => (e.pokemon_name.toLowerCase() === userInput && e.form === "Normal"));
			$pokeType.text(`Type: ${data[idxNum].type.join(", ")}`);
		});

		// function gets pokemon image. using Dream World Art
		$.ajax(`${URL + userInput}`).done(function(data){
			$pokemonImg.attr("src", data.sprites.other.dream_world.front_default);
		})
	})
	// clears input box
	$input.val("");
}
