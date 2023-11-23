import { freeMealsAPI } from '../db/FreeMealAPI.js'
import { showIngredients } from './ingredients.js'
import { dishCardTemplate, moreInfoTemplate } from '../templates/templates.js'


//TODO: Think about extracting pre-exisitng HTML elements from functions
//TODO: Figure out how to shift bootstrap from col-4 to col-3 when space is limited
export const dishToCard = (dishes) => {
  try {
    const cards = []
    console.log("dishToCard", dishes)

    dishes.forEach((dish) => {
      cards.add(createDishCard(dish))
      checkFavourite(dish.idMeal)
    })
    return cards
  } catch (error) {
    console.error('Error fetching dishes:', error)
  }
}

export const renderCards = (dishes, result) => {
  try {
    console.log("showCards", dishes)
    result.innerHTML = ""

    dishes.forEach((dish) => {
      result.appendChild(createDishCard(dish))
      })

  } catch (error) {
    console.error('Error fetching dishes:', error)
  }
}

export const moreInfoCard = async (idMeal) => {
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
  card.innerHTML = moreInfoTemplate(dish, ingredients)
  return card
}

export const createDishCard = (dish) => {
  const card = document.createElement('div');
  card.classList.add('card', 'col-md-2', 'bg-light', 'm-1')
  card.id = `card-${dish.idMeal}`; // Adjusted padding here
  card.innerHTML = dishCardTemplate(dish)

  return card;
}

export const checkFavourite = (idMeal) => {
  const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
  console.log(favourites)

  if (idMeal in favourites) {
    console.log("card in favorites")
    const heartIcon = document.getElementById(`heart-icon-${idMeal}`);

    heartIcon.classList.remove('bi-heart')
    heartIcon.classList.add('bi-heart-fill')
  }
}