"use strict";
import {
    BaseException,
    InvalidAccessConstructorException,
    EmptyValueException,
    ParameterValidationException,
    InvalidValueException,
    AbstractClassException
} from './Exceptions.js';
import { Dish, Category, Allergen, Menu, Coordinate, Restaurant } from './ObjectsRestaurants.js';
import RestaurantsManager from './RestaurantsManager.js';


function testRestaurante() {
    console.log("***  Testeo Restaurante  ***");

    function testDish() {
        console.log("***  Testeo Dish  ***");

        try {
            let array = ["1", "2"];
            let d1 = new Dish("nombre", "descripcion", array, "ejem.jpg");
            console.log(d1.toString());
        } catch (error) {
            console.log(error);
        }

        try {
            // EmptyValueException.
            let d1 = new Dish("", "descripcion");
        } catch (error) {
            console.log(error);
        }

        try {
            // InvalidValueException
            let d1 = new Dish(55);
        } catch (error) {
            console.log(error);
        }

        try {
            // EmptyValueException
            let d1 = new Dish();
        } catch (error) {
            console.log(error);
        }
    }

    function testCategory() {
        console.log("***  Testeo Category  ***");

        try {
            let array = ["1", "2"];
            let c1 = new Category("Categoria", "Descripcion");
            console.log(c1.toString());
        } catch (error) {
            console.log(error);
        }

        try {
            // EmptyValueException.
            let c1 = new Category();
        } catch (error) {
            console.log(error);
        }

        try {
            // InvalidValueException
            let c1 = new Category(55, "Descripcion");
        } catch (error) {
            console.log(error);
        }
    }

    function testAllergen() {
        console.log("***  Testeo Allergen  ***");

        try {
            let array = ["1", "2"];
            let a1 = new Allergen("Alergenos", "Descripcion.");
            console.log(a1.toString());
        } catch (error) {
            console.log(error);
        }

        try {
            // EmptyValueException.
            let a2 = new Allergen("");
        } catch (error) {
            console.log(error);
        }

        try {
            // InvalidValueException
            let a2 = new Allergen(55);
        } catch (error) {
            console.log(error);
        }
    }

    function testMenu() {
        console.log("***  Testeo Menu  ***");

        try {
            let array = ["1", "2"];
            let m1 = new Menu("Menú", "Descripciones");
            console.log(m1.toString());
        } catch (error) {
            console.log(error);
        }

        try {
            // EmptyValueException.
            let m2 = new Menu("");
        } catch (error) {
            console.log(error);
        }

        try {
            // InvalidValueException
            let m2 = new Menu(55);
        } catch (error) {
            console.log(error);
        }
    }

    function testCoordinate() {
        console.log("***  Testeo Coordinate  ***");

        try {
            let co1 = new Coordinate(10, 20);
            console.log(co1.toString());
        } catch (error) {
            console.log(error);
        }

        try {
            // InvalidValueException.
            let co2 = new Coordinate(10);
        } catch (error) {
            console.log(error);
        }

        try {
            // InvalidValueException
            let co2 = new Coordinate("prueba");
        } catch (error) {
            console.log(error);
        }
    }

    function testRestaurant() {
        console.log("***  Testeo Restaurant  ***");

        try {
            let co1 = new Coordinate(10, 20);
            let r1 = new Restaurant("Restaurante", "descripcion", co1);
            console.log(r1.toString());
        } catch (error) {
            console.log(error);
        }

        try {
            // EmptyValueException.
            let r2 = new Restaurant("");
        } catch (error) {
            console.log(error);
        }

        try {
            // InvalidValueException
            let r2 = new Restaurant("Restaurante", "descripcion", "d");
        } catch (error) {
            console.log(error);
        }
    }

    function testRestaurantsManager() {
        console.log("***  Testeo RestaurantsManager  ***");

        const manager = RestaurantsManager.getInstance();

        try {
            console.log("Métodos de Create...");
            const dis1 = manager.createDish("Plato", "des", ["array"], "image.jpg");
            const dis2 = manager.createDish("Pla");
            const men1 = manager.createMenu("Menu", "des");
            const men2 = manager.createMenu("Men");
            const all1 = manager.createAllergen("Alergeno", "des");
            const all2 = manager.createAllergen("Ale");
            const cat1 = manager.createCategory("Categoria", "des");
            const cat2 = manager.createCategory("Cat");
            const res1 = manager.createRestaurant("Restaurante", "des", new Coordinate(10, 20));
            const res2 = manager.createRestaurant("Res");

            console.log("Métodos de add...");
            manager.addDish(dis1, dis2);
            manager.addMenu(men1, men2);
            manager.addAllergen(all1, all2);
            manager.addCategory(cat1, cat2);
            manager.addRestaurant(res1, res2);

            console.log("Métodos de getters...");
            for (let cats of manager.getCategories()) {
                console.log(cats);
            }

            for (let menus of manager.getMenus()) {
                console.log(menus);
            }

            for (let alls of manager.getAllergens()) {
                console.log(alls);
            }

            for (let rests of manager.getRestaurants()) {
                console.log(rests);
            }

            console.log("Métodos de assign...");
            manager.assignCategoryToDish(cat2, dis1, dis2);
            manager.assignAllergenToDish(all2, dis1, dis2);
            manager.assignDishToMenu(dis1, men1, men2);
            // console.log(manager.assignDishToMenu(dis1, men1, men2)); // El console para comprobar que los datos se han asignado bien.

            console.log("Métodos de deassign...");
            manager.deassignCategoryToDish(cat2, dis2);
            manager.deassignAllergenToDish(all2, dis1);
            manager.deassignDishToMenu(dis1, men2);
            // console.log(manager.deassignDishToMenu(dis1, men2)); // El console para comprobar que los datos se han designado bien.




            // Criterio.
            const criterion = (dish) => dish.name === "Plato";

            // Para que este ordenado.
            const ordered = (a, b) => a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase();

            console.log("Métodos de findDishes...");

            for (let da of manager.findDishes(dis1, criterion, ordered)) {
                console.log(da);
            }


            console.log("Métodos de remove...");
            // manager.removeCategory(cat2);
            // manager.removeMenu(men2);
            // manager.removeAllergen(all2);
            // manager.removeDish(dis2);
            // console.log(manager.removeRestaurant(res2)); // El console para comprobar que los datos se han eliminado bien.

        } catch (error) {
            console.log(error);
        }
    }

    function testErroresManager() {
        console.log("****  ERRORES  ****");
        const manager = RestaurantsManager.getInstance();
        const dis1 = manager.createDish("Plato", "des", ["array"], "image.jpg");
        const dis2 = manager.createDish("Pla");
        const men1 = manager.createMenu("Menu", "des");
        const men2 = manager.createMenu("Men");
        const all1 = manager.createAllergen("Alergeno", "des");
        const all2 = manager.createAllergen("Ale");
        const cat1 = manager.createCategory("Categoria", "des");
        const cat2 = manager.createCategory("Cat");
        const res1 = manager.createRestaurant("Restaurante", "des", new Coordinate(10, 20));
        const res2 = manager.createRestaurant("Res");

        console.log("Métodos de Create...");

        try {
            const dis2 = manager.createDish();    // EmptyVaueException.
            // const dis2 = manager.createDish(55);    // InvalidValueException.

        } catch (error) {
            console.log(error);
        }

        try {
            const men2 = manager.createMenu(); // EmptyVaueException.
            // const men2 = manager.createMenu(55); // InvalidValueException.

        } catch (error) {
            console.log(error);
        }

        try {
            const all2 = manager.createAllergen();  // EmptyVaueException.
            // const all2 = manager.createAllergen(55);  // InvalidValueException.
        } catch (error) {
            console.log(error);
        }

        try {
            // const cat2 = manager.createCategory();  // EmptyVaueException.
            const cat2 = manager.createCategory(55);  // InvalidValueException.
        } catch (error) {
            console.log(error);
        }

        try {
            // const res2 = manager.createRestaurant();    // EmptyVaueException.
            const res2 = manager.createRestaurant("Restaurante", "des", "nada");    // InvalidValueException.
        } catch (error) {
            console.log(error);
        }

        console.log("Métodos de add...");
        try {
            manager.addDish();  // NullObjectException.
            // manager.addDish(men1);  // ObjectException.
            // manager.addDish(dis1);
            // manager.addDish(dis1);  // ExistsObjectException.
        } catch (error) {
            console.log(error);
        }

        try {
            // manager.addMenu();  // NullObjectException.
            manager.addMenu(dis2);  // ObjectException
            // manager.addMenu(men2);
            // manager.addMenu(men2);  // ExistsObjectException
        } catch (error) {
            console.log(error);
        }

        try {
            // manager.addAllergen();  // NullObjectException.
            // manager.addAllergen(dis2);  // ObjectException
            manager.addAllergen(all1);
            manager.addAllergen(all1);  // ExistsObjectException
        } catch (error) {
            console.log(error);
        }

        try {
            manager.addCategory();  // NullObjectException.
            // manager.addCategory(dis2);  // ObjectException
            // manager.addCategory(cat2);
            // manager.addCategory(cat2);  // ExistsObjectException
        } catch (error) {
            console.log(error);
        }

        try {
            // manager.addRestaurant();  // NullObjectException.
            manager.addRestaurant(dis2);  // ObjectException
            // manager.addRestaurant(res1);
            // manager.addRestaurant(res1);  // ExistsObjectException
        } catch (error) {
            console.log(error);
        }

        manager.addDish(dis1, dis2);
        manager.addMenu(men1, men2);
        manager.addAllergen(all2);
        manager.addCategory(cat1, cat2);
        manager.addRestaurant(res1, res2);

        console.log("Métodos de assign...");
        try {
            manager.assignCategoryToDish(); // NullObjectException.
            // manager.assignCategoryToDish(cat1); // NullObjectException.
            // manager.assignCategoryToDish(cat1, all1); // ObjectException.
        } catch (error) {
            console.log(error);
        }

        try {
            // manager.assignAllergenToDish(); // NullObjectException.
            manager.assignAllergenToDish(all1); // NullObjectException.
            // manager.assignAllergenToDish(cat1); // ObjectException.
        } catch (error) {
            console.log(error);
        }

        try {
            // manager.assignDishToMenu(); // NullObjectException.
            // manager.assignDishToMenu(dis1); // NullObjectException.
            manager.assignDishToMenu(cat1); // ObjectException.
        } catch (error) {
            console.log(error);
        }

        console.log("Métodos de deassign...");
        try {
            // manager.deassignCategoryToDish(); // NullObjectException.
            // manager.deassignCategoryToDish(cat1); // NullObjectException.
            manager.deassignCategoryToDish(cat1, all1); // ObjectException.
        } catch (error) {
            console.log(error);
        }

        try {
            // manager.deassignAllergenToDish(); // NullObjectException.
            manager.deassignAllergenToDish(all1); // NullObjectException.
            // manager.deassignAllergenToDish(cat1); // ObjectException.
        } catch (error) {
            console.log(error);
        }

        try {
            manager.deassignDishToMenu(); // NullObjectException.
            // manager.deassignDishToMenu(dis1); // NullObjectException.
            // manager.deassignDishToMenu(cat1); // ObjectException.
        } catch (error) {
            console.log(error);
        }

        manager.assignCategoryToDish(cat2, dis1, dis2);
        manager.assignAllergenToDish(all2, dis1, dis2);
        manager.assignDishToMenu(dis1, men1, men2);

        console.log("Métodos de remove...");
        try {
            manager.removeCategory(cat1);
            manager.removeCategory(cat1); // RegisteredException.
        } catch (error) {
            console.log(error);
        }

        try {
            manager.removeMenu(men1);
            manager.removeMenu(men1); // RegisteredException.
        } catch (error) {
            console.log(error);
        }

        try {
            manager.removeAllergen(all2);
            manager.removeAllergen(all2); // RegisteredException.
        } catch (error) {
            console.log(error);
        }

        try {
            manager.removeDish(dis1);
            manager.removeDish(dis1); // RegisteredException.
        } catch (error) {
            console.log(error);
        }

    }

    // testDish();
    // testCategory();
    // testAllergen();
    // testMenu();
    // testCoordinate();
    // testRestaurant();
    testRestaurantsManager();
    // testErroresManager();
}
window.onload = testRestaurante;
