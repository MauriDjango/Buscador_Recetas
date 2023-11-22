import { checkFavourite, createDishCard, showInfo } from '../dish.js'
import { freeMealsAPI } from '../db/FreeMealAPI.js'


document.addEventListener('DOMContentLoaded', async () => {
  const result = document.querySelector('#resultado')

  await Favourites.showFavourites(await Favourites.getFavourites(), result)

  document.addEventListener('click', async (event) => {

    if (event.target.id.includes("info_button"))
    {
      const dishIDMeal = event.target.id.split("-")[1]
      await showInfo(dishIDMeal, result)
    }
    else if (event.target.closest('[id^="info_close_button-"]'))
    {
      const target = event.target.closest('[id^="info_close_button-"]')
      const dishIDMeal = target.id.split("-")[1]

      document.querySelector('#info-' + dishIDMeal).remove()
      await Favourites.showFavourites(await Favourites.getFavourites(), result)
    }
    else if (event.target.closest('[id^="favourite_button-"]'))
    {
      const target = event.target.closest('[id^="favourite_button-"]');
      const dishIDMeal = target.id.split("-")[1];
      const heartIcon = document.getElementById(`heart-icon-${dishIDMeal}`);

      // Toggle the color class for the heart icon when clicked
      heartIcon.classList.remove('bi-heart')
      heartIcon.classList.add('bi-heart-fill')


      const dish = await freeMealsAPI.getDishByID(dishIDMeal);
      await Favourites.addToFavourites(dish);
    }
  })
})


export class Favourites {

  static async getFavourites() {
    const dishes = [];
    const favourites = JSON.parse(localStorage.getItem('favourites')) || {};

    for (const idMeal in favourites) {
      try {
        const meal = await freeMealsAPI.getDishByID(idMeal);
        console.log("Retrieved dish from favourites. ID:", idMeal);
        dishes.push(meal);
      } catch (error) {
        console.error("Error retrieving dish from favourites. ID:", idMeal, "Error:", error);
      }
    }
    return dishes;
  }

  static async addToFavourites(dish) {
    try {
      const favourites = JSON.parse(localStorage.getItem('favourites')) || {};

      if (!(dish.idMeal in favourites)) {
        console.log("Dish not found in favourites, adding.");
        favourites[dish.idMeal] = true
        localStorage.setItem('favourites', JSON.stringify(favourites));
      }
    } catch (error) {
      console.error("Error adding dish to favourites:", error);
    }
  }

  static async showFavourites(favourites, div) {
    try {
      for (const dish of favourites) {
        const dishCard = createDishCard(dish)
        div.appendChild(dishCard);
        checkFavourite(dish.idMeal)
      }
    } catch (error) {
      console.error("Error displaying favourites:", error);
    }
  }
}
