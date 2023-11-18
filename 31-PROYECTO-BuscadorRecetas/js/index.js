import { loadCategories, showDishes } from './functions.js'


document.addEventListener('DOMContentLoaded', () => {
  const categorySelect = document.querySelector('#categorias')

  loadCategories(categorySelect)

  categorySelect.addEventListener('change', (event) => {
    showDishes(categorySelect.value) //Returns value of select field
  })
})