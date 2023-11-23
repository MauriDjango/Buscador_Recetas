import { freeMealsAPI } from '../db/FreeMealAPI.js'

export const loadCategories = async(categorySelect) => {
  const categories = await freeMealsAPI.getCategories()

  categories.forEach((category) => {
    let option = document.createElement('option')
    option.innerText = category.strCategory
    categorySelect.appendChild(option)
  })
}

