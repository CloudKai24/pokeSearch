require('dotenv').config()
const pokemonApiKey = process.env.POKEMON_API_KEY;
console.log("Pokemon API Key:", pokemonApiKey);

const pokemon = require('pokemontcgsdk');
pokemon.configure({pokemonApiKey: process.env.POKEMON_API_KEY});