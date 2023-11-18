import { freeMealsAPI } from './FreeMealDBAPI/DBAPI.js'


export async function loadCategories(categorySelect) {
  const categories = await freeMealsAPI.getCategories()

  categories.forEach((category) => {
    let option = document.createElement('option')
    option.innerText = category.strCategory
    categorySelect.appendChild(option)
  })
}

export async function showDishes (category) {
  const dishes = await freeMealsAPI.getDishes(category)
}