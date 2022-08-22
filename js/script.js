////////////////////////////
//////// MVP TO-DO's 
////////////////////////////

// write a funciton to pull data from your api for stats
// research your API, or others, to pull a pokemon image to display. 
// check the pokemon api that was on the project 1 markdown
// style your webpage more with CSS and grid. 

////////////////////////////
//////// API CODE
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


////////////////////////////
//////// VARIABLES
////////////////////////////

// header elements
const $form = $("form")
const $input = $("#inputText")

// main content elements
const $pokeName = $("#pokeName")
const $maxCp = $(".maxCp")
// base stats elements
const $attackLi = $("#liAttack")
const $defenseLi = $("#liDefense")
const $hpLi = $("#liHP")
// pokemon moves elements
const $chargedLi = $("#chargedLi")
const $fastLi = $("#fastLi")

// side content elements
const $pokedexDiv = $(".divPokedex")
const $pokemonImg = $("pokemonImg")


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
	// funtion gets pokemon name and max CP
	$.ajax(monCp).done(function (data) {
		// "data" is the entire array of the api data for maxCP pokemon. 
		// structured as [{k:v, k:v, k:v},{},{}]
		let idxNum = data.findIndex((e) => e.pokemon_name.toLowerCase() === userInput);
		$pokeName.text(`Name: ${data[idxNum].pokemon_name}`);
		$maxCp.text(`Max Combat Power: ${data[idxNum].max_cp}`);
	});

	// function gets pokemon possible moves
	$.ajax(monMoves).done(function (data) {
		let idxNum = data.findIndex((e) => e.pokemon_name.toLowerCase() === userInput);
		console.log(`charged move idx: ${idxNum}`)
		console.log(`chargedLi Text: ${$chargedLi.text()}`)
		$chargedLi.text(`Charged Moves: ${data[idxNum].charged_moves.join(", ")}`)
	});

	// funciton gets pokemon base stats. 
	$.ajax(monStats).done(function (data) {
		let idxNum = data.findIndex((e) => e.pokemon_name.toLowerCase() === userInput);
		$attackLi.text(`Attack: ${data[idxNum].base_attack}`);
		$defenseLi.text(`Defense: ${data[idxNum].base_defense}`);
		$hpLi.text(`Hit Points: ${data[idxNum].base_stamina}`);
	});
	$input.val("");
}
