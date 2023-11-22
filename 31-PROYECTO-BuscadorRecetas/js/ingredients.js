import { freeMealsAPI } from './db/FreeMealAPI.js'

export async function showIngredients(dish) {
  const ingredients = await freeMealsAPI.getIngredients(dish);
  const list = document.createElement('ul')
  list.classList.add("list-group", "mb-2", "bg-light", "d-flex")

  console.log("Show ingredients", ingredients)

  ingredients.forEach((ingredient) => {
    const listItem = document.createElement("li")

    listItem.innerText = `${ingredient.amount} ${ingredient.ingredient}`
    list.appendChild(listItem)
  })

  return list
}