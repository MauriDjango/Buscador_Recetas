import { Favourites } from "../functions/classes/Favourites.js";
import {dishToCard, renderCards} from "../functions/dish.js";


document.addEventListener('DOMContentLoaded', () => {
  const result = document.querySelector('#resultado')

  console.log("DomContentLoaded", Object.values(Favourites.favouriteDishes))
  renderCards(
      dishToCard(
          Object.values(Favourites.favouriteDishes)
      ),
      result)

  document.addEventListener('click', async(event) => {
    await handleInfoButtonClick(event, result);
    await handleFavouriteButtonClick(event, result);
    await handleInfoCloseButtonClick(event, result);
  });
})

