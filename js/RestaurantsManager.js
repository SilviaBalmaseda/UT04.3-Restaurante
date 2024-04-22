"use strict";
import {
    InvalidAccessConstructorException,
    EmptyValueException,
    InvalidValueException
} from './Exceptions.js';
import { Dish, Category, Allergen, Menu, Coordinate, Restaurant } from './ObjectsRestaurants.js';

let RestaurantsManager = (function () {
    let instantiated; // Objeto con la instancia única RestaurantsManager.

    function init() { // Inicialización del Singleton.

        // Declaración de la clase RestaurantsManager.
        class RestaurantsManager {

        }

        let instance = new RestaurantsManager();// Devolvemos el objeto RestaurantsManager para que sea una instancia única.
        Object.freeze(instance);
        return instance;
    } // Fin inicialización del Singleton

    return {
        // Devuelve un objeto con el método getInstance.
        getInstance: function () {
            if (!instantiated) { // Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
                instantiated = init(); // instantiated contiene el objeto único.
            }
            return instantiated; // Si ya está asignado devuelve la asignación.
        }
    };
})();

export {
    InvalidAccessConstructorException,
    EmptyValueException,
    InvalidValueException
};
export { Dish, Category, Allergen, Menu, Coordinate, Restaurant };
export default RestaurantsManager;