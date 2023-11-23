import { freeMealsAPI } from "../../db/FreeMealAPI.js";


export class Favourites {
    static favouriteDishes = () => JSON.parse(localStorage.getItem('favourites')) || {}

    static addFavourite = async (idMeal) => {
        const favourites = this.favouriteDishes
        console.log("Add favourite", favourites)
        const matches = Object.values(favourites).filter((dish) => dish.idMeal === idMeal);

        if (matches.length === 0) {
            console.log("Dish not found in favourites, adding.");
            favourites[idMeal] = await freeMealsAPI.getDishByID(idMeal);
            localStorage.setItem('favourites', JSON.stringify(favourites));
        } else {
            console.log("Dish already in favourites", matches);
        }
    }
}
