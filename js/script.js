// console.log("JS LINKED")
// window.alert("jQuery is linked")

// const $name = $("#name")

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

$.ajax(monMoves).done(function (data) {
	// console.log(data);
    // console.log(response[0]); // returns bulbasaur pokemon moves
});

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

$.ajax(monCp).done(function (data) {
    console.log(data[0].pokemon_name); //returns idx "0" pokemon name : bulbasaur
    // const found = data.find((pokeName) => pokeName === "Bulbasaur");
    // console.log(`found the data!: ${found}`);
});