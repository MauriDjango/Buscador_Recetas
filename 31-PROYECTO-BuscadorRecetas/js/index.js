import {clickHandler, loadCategories, showDishes} from './functions.js'


document.addEventListener('DOMContentLoaded', () => {
  const categorySelect = document.querySelector('#categorias')

  loadCategories(categorySelect)

  categorySelect.addEventListener('change', (event) => {
    showDishes(categorySelect.value)
  })

  document.addEventListener('click', (event) => {
    clickHandler(event.target.id)
  })
})