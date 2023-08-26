# Pokédex
Welcome to my Pokédex repo! This is a preliminary approach to providing a visual and functional use case to aid the presentation of the utilizing the pokeapi.co API

## Features List
- Search for Pokémon by name or ID (Fuzzy Search capabilities)
- Add Pokémon to your favorites list
- View Pokémon's stats
- View favorites list (Persistent data)
- Clear filter functionality
- Scroll to top functionality
- Error Handling

## Demo
Site demo can be found [here!](https://pokedex-nine-psi-31.vercel.app/)

## Installation
1. Clone the project / Unzip to directory
2. Open Command Prompt/Terminal and navigate to project folder 'Pokedex'
3. Run 'npm install'

## Usage
1. Run 'npm run dev'
2. The server will start on port 3000 by default.
3. Open a browser and open page 'http://localhost:3000/'

## Searching for Pokémon
1. In the search bar, which utilizies fuzzy searching, type in either a partial or full name of a Pokémon, or an ID number and hit "enter" or click the search icon.
2. A list of Pokémon will be shown, with their image, name and ID number.
3. If the list is too long, a "Load More" button will appear, click on the button to load the next page of Pokémon.

## Pokémon Details
Clicking on an item in the list of Pokémon will bring up a modal that shows the Pokémon's details, which includes their
- Image
- Name
- ID
- Height
- Weight
- Hp
- Attack
- Defense
- Special-Attack
- Special-Defense
- Speed

## Favorite Pokémon
1. In the list of Pokémon or in the Pokémon's details page, click on the "heart" icon to save the Pokémon as one of your favorites!
2. The Icon will be red if it has been added to your favorites list and grey if not.
3. Upon opening the site or refreshing, your favorite Pokémon will be the default list that you see.
4. Click on the "Show Favorites" button to refresh the list to show your favorite Pokémon.

## Clear List
1. Click on the "Clear List" button to reset the current search criteria you are looking for.

## Scroll To Top
1. If the list in too long, either in desktop view or mobile view. A scroll to top button will appear on the bottom right hand corner of your screen.
2. Click on the button to be sent back to the top of the page.

## Future Enhancements
Future Enhancements that could be implemented

1. Filter features based on Pokémon's Abilities, Types (single and multiple), Type Weakness, Generation
2. More details shown in Pokémon's details page, e.g. Type Strengths/Weaknesses, Evolution Chart (Leading to being able to view other Pokémon's details), Move Lists, etc.
3. Comparison feature to compare details between two or more Pokémon.

## Libraries Used
1. [Axios](https://github.com/axios/axios) - API Request handler
2. [Fuse.js](https://github.com/krisk/Fuse) - Fuzzy Search
3. [React-toastify](https://github.com/fkhadra/react-toastify) - Error Toasts
4. [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) - CSS Framework