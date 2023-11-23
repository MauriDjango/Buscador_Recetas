import { loadCategories } from '../functions/categories.js';
import {
  handleCategoryChange,
  handleInfoButtonClick,
  handleInfoCloseButtonClick,
  handleFavouriteButtonClick
  } from "../functions/app.js";


document.addEventListener('DOMContentLoaded', () => {
  const categorySelect = document.querySelector('#categorias');
  const result = document.querySelector('#resultado');

  loadCategories(categorySelect);

  categorySelect.addEventListener('change', () => {
    handleCategoryChange(categorySelect.value, result)
  })

  document.addEventListener('click', async(event) => {
    await handleInfoButtonClick(event, result);
    await handleInfoCloseButtonClick(event, result);
    await handleFavouriteButtonClick(event, result);
  });
});
