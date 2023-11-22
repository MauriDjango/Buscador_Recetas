import { loadCategories } from '../categories.js'
import { showInfo, showCards, checkFavourite } from '../dish.js'
import { freeMealsAPI } from '../db/FreeMealAPI.js'
import { Favourites } from './favorito.js'


document.addEventListener('DOMContentLoaded', () => {
  const categorySelect = document.querySelector('#categorias')
  const result = document.querySelector('#resultado');

  loadCategories(categorySelect)

  categorySelect.addEventListener('change', (event) => {
    showCards(categorySelect.value, result)
  })

  document.addEventListener('click', async (event) => {

    if (event.target.id.includes("info_button"))
    {
      const idMeal = target.id.split("-")[1]
      showInfo(idMeal, result)
    }
    else if (event.target.closest('[id^="info_close_button-"]'))
    {
      const target = event.target.closest('[id^="info_close_button-"]')
      const dishIDMeal = target.id.split("-")[1]

      document.querySelector('#info-' + dishIDMeal).remove()
      showCards(categorySelect.value, result)
    }
    else if (event.target.closest('[id^="favourite_button-"]'))
    {
      const target = event.target.closest('[id^="favourite_button-"]');
      const idMeal = target.id.split("-")[1];

      const dish = await freeMealsAPI.getDishByID(idMeal);
      await Favourites.addToFavourites(dish);

      checkFavourite(idMeal)
    }
  })
})