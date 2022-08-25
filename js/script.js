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

// Buttons
const $randSelect = $("#btnRandomizer")
const $submit = $("#getStats")


////////////////////////////
//////// EVENT LISTENERS
////////////////////////////

// listens for the "submit" button and executes getPokeStats fn.
$form.on("submit", getPokeStats);
$randSelect.on("click", randomSelect);

////////////////////////////
//////// FUNCTIONS
////////////////////////////

// randomly selects a pokemon name, places in the "submit" field, and clicks "submit".
function randomSelect(){
	$.ajax(monCp).then(function(data){
		let randIdx = Math.floor(Math.random() * data.length);
		let randName = data[randIdx].pokemon_name.toLowerCase();
		$input.val(randName)
		$submit.click();
	})
}

// gets pokemon stats and image. 
function getPokeStats(event){
	event.preventDefault();
	let userInput = $input.val().trim().toLowerCase();
	if (userInput === '') return;
	// function passes through a name check before loading. 
	$.ajax(monCp).done(function(nameCheck){
		let idNum = nameCheck.findIndex((e) => (e.pokemon_name.toLowerCase() === userInput && e.form === "Normal"));
		if (idNum === -1) {
			$("#inputText").attr("placeholder", "Invalid. Try 'pikachu'!")
		} else {
		// function to display pokemon name and CP
		$.ajax(monCp).done(function (data) {
			let idxNum = data.findIndex((e) => (e.pokemon_name.toLowerCase() === userInput && e.form === "Normal"));
			$pokeName.html(`<span class="head">Name:  </span>${data[idxNum].pokemon_name}`);
			$maxCp.html(`<span class="head">Max Combat Power:  </span>${data[idxNum].max_cp}`);
		});
	
		// function gets pokemon possible moves
		$.ajax(monMoves).done(function (data) {
			let idxNum = data.findIndex((e) => (e.pokemon_name.toLowerCase() === userInput && e.form === "Normal"));
			$chargedLi.html(`<span class="content">Charged Moves: </span>${data[idxNum].charged_moves.join(", ")}`);
			$fastLi.html(`<span class="content">Fast Moves: </span>${data[idxNum].fast_moves.join(", ")}`);
		});
	
		// funciton gets pokemon base stats. 
		$.ajax(monStats).done(function (data) {
			let idxNum = data.findIndex((e) => (e.pokemon_name.toLowerCase() === userInput && e.form === "Normal"));
			$attackLi.html(`<span class="content">Attack: </span>${data[idxNum].base_attack}`);
			$defenseLi.html(`<span class="content">Defense: </span>${data[idxNum].base_defense}`);
			$hpLi.html(`<span class="content">Hit Points: </span>${data[idxNum].base_stamina}`);
		});
	
		// function gets pokemon types. 
		$.ajax(monTypes).done(function (data) {
			let idxNum = data.findIndex((e) => (e.pokemon_name.toLowerCase() === userInput && e.form === "Normal"));
			$pokeType.html(`<span class="head">Type:  </span>${data[idxNum].type.join(", ")}`);
		});

		// function gets pokemon image. using Dream World Art
		$.ajax(`${URL + userInput}`).done(function(data){
			$pokemonImg.attr("src", data.sprites.other.dream_world.front_default);
			$pokemonImg.attr("alt", userInput)
		})
		}
	})
	// clears input box
	$input.val("");
	$("#inputText").attr("placeholder", "Type a Pokemon!");
}
