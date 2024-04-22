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
            let d1 = new Dish("", "descripcion", array, "ejem.jpg");
            console.log(d1.toString());
        } catch (error) {
            console.log(error);
        }

        try {
            // InvalidValueException
            let d1 = new Dish(55);
            console.log(d1.toString());
        } catch (error) {
            console.log(error);
        }

        try {
            // InvalidValueException
            let d1 = new Dish("name", "");
            console.log(d1.toString());
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
            console.log(c1.toString());
        } catch (error) {
            console.log(error);
        }

        try {
            // InvalidValueException
            let c1 = new Category(55, "Descripcion");
            console.log(c1.toString());
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
            console.log(a2.toString());
        } catch (error) {
            console.log(error);
        }

        try {
            // InvalidValueException
            let a2 = new Allergen(55);
            console.log(a2.toString());
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
            console.log(m2.toString());
        } catch (error) {
            console.log(error);
        }

        try {
            // InvalidValueException
            let m2 = new Menu(55);
            console.log(m2.toString());
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
            console.log(co2.toString());
        } catch (error) {
            console.log(error);
        }

        try {
            // InvalidValueException
            let co2 = new Coordinate("prueba");
            console.log(co2.toString());
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
            console.log(r2.toString());
        } catch (error) {
            console.log(error);
        }

        try {
            // InvalidValueException
            let r2 = new Restaurant("Restaurante", "descripcion", "d");
            console.log(r2.toString());
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


}
window.onload = testRestaurante;
