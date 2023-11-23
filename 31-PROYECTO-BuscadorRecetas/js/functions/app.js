import { moreInfoCard, renderCards } from "./dish.js";
import { Favourites } from "./classes/Favourites.js";
import { freeMealsAPI } from "../db/FreeMealAPI.js";

export const handleCategoryChange = async(category, element) => {
    const dishes = await freeMealsAPI.getDishes(category)
    renderCards(dishes, element);
}

export const handleInfoButtonClick = async (event, element) => {
    if (event.target.id.includes("info_button")) {
        const idMeal = event.target.id.split("-")[1];
        element.innerHTML = '';
        element.append(await moreInfoCard(idMeal));
        handleInfoCloseButtonClick(event); // Call the close handler after adding the info card
    }
};

export const handleInfoCloseButtonClick = (event, element) => {
    if (event.target.closest('[id^="info_close_button-"]')) {
        const closest = event.target.closest('[id^="info_close_button-"]');
        const idMeal = closest.id.split("-")[1];
        document.querySelector(`#info-${idMeal}`).remove();
        renderCards(element, Favourites.favouriteDishes);
    }
};

export const handleFavouriteButtonClick = async (event, element) => {
    if (event.target.closest('[id^="favourite_button-"]')) {
        const closest = event.target.closest('[id^="favourite_button-"]');
        const idMeal = closest.id.split("-")[1];
        await Favourites.addFavourite(idMeal);
    }
};