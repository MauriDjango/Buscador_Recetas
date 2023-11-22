import { freeMealsAPI } from './db/FreeMealAPI.js'
import { showIngredients } from './ingredients.js'
import { dishCardTemplate, dishInfoTemplate } from './templates/templates.js'


//TODO: Think about extracting pre-exisitng HTML elements from functions
//TODO: Figure out how to shift bootstrap from col-4 to col-3 when space is limited
export async function showCards(category, result) {
  try {
    const dishes = await freeMealsAPI.getDishes(category)

    result.innerHTML = ""

    dishes.forEach((dish) => {
      result.appendChild(createDishCard(dish))
      checkFavourite(dish.idMeal)
    })

  } catch (error) {
    console.error('Error fetching dishes:', error)
  }
}

export async function showInfo(idMeal, result) {
  const dish = await freeMealsAPI.getDishByID(idMeal)
  const ingredients = await showIngredients(dish);
  const card = document.createElement("div");

  card.id = `info-${dish.idMeal}`
  card.classList.add(
    'card',
    'col-md-8', // Adjusted card width
    'bg-light',
    'm-3',
    'p-4',
    'rounded'
  );

  card.innerHTML = dishInfoTemplate(dish, ingredients)
  result.innerHTML = ''
  result.appendChild(card);
}

export function createDishCard(dish) {
  const card = document.createElement('div');
  card.classList.add('card', 'col-md-2', 'bg-light', 'm-1')
  card.id = `card-${dish.idMeal}`; // Adjusted padding here
  card.innerHTML = dishCardTemplate(dish)

  return card;
}

export function checkFavourite(idMeal) {
  const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
  console.log(favourites)

  if (idMeal in favourites) {
    console.log("card in favorites")
    const heartIcon = document.getElementById(`heart-icon-${idMeal}`);

    heartIcon.classList.remove('bi-heart')
    heartIcon.classList.add('bi-heart-fill')
  }
}