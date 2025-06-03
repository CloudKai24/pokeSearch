const express = require('express');
const app = express();
const PORT = 3000;
require('dotenv').config()
const pokemonApiKey = process.env.POKEMON_API_KEY;
console.log("Pokemon API Key:", pokemonApiKey);
const pokemon = require('pokemontcgsdk');
pokemon.configure({pokemonApiKey: process.env.POKEMON_API_KEY});
app.get('/api/random-card', async (req, res) => {
    try {
      const page = Math.floor(Math.random() * 100);
      const response = await fetch(`https://api.pokemontcg.io/v2/cards?pageSize=1&page=${page}`, {
        headers: {
          'X-Api-Key': process.env.POKEMON_API_KEY
        }
      });
  
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
  
      const data = await response.json();
      const card = data.data?.[0];
  
      if (!card || !card.images?.large) {
        return res.status(404).json({ error: 'Card image not found' });
      }
  
      res.json(card);
    } catch (error) {
      console.error('Fetch error:', error.message);
      res.status(500).json({ error: 'Failed to fetch card' });
    }
  });