"use strict";
import {
    InvalidAccessConstructorException,
    EmptyValueException,
    InvalidValueException,
    ObjectException,
    ExistsObjectException,
    RegisteredException,
    NullObjectException
} from './Exceptions.js';
import { Dish, Category, Allergen, Menu, Coordinate, Restaurant } from './ObjectsRestaurants.js';

let RestaurantsManager = (function () {
    let instantiated; // Objeto con la instancia única RestaurantsManager.

    function init() { // Inicialización del Singleton.

        // Declaración de la clase RestaurantsManager.
        class RestaurantsManager {
            #systemName = "Anonimous";
            // Colección de categorías de platos. Los platos pueden pertenecer a más de una categoría.
            #categories;
            // Colección de tipos a alérgenos. Los platos pueden tener asociado más de un alérgeno.
            #allergens;
            // Colección de platos.
            #dishes;
            // Colección de menús. Se trata de una agregación de platos.
            #menus;
            // Colección de restaurantes.
            #restaurants;

            constructor() {
                if (!new.target) throw new InvalidAccessConstructorException();

                this.#categories = new Map();   // Map de categorías.
                this.#allergens = new Map();    // Map de alérgenos.
                this.#dishes = new Map();       // Map con los platos.
                this.#menus = new Map();        // Map de menús(platos).
                this.#restaurants = new Map();  // Map con los restaurantes.
            }

            // Devuelve un iterador que permite recorrer las categorías del sistema.
            *getCategories() {
                for (let cat of this.#categories) {
                    yield cat;
                }
            }

            // Devuelve un iterador que permite recorrer los menus del sistema.
            *getMenus() {
                for (let men of this.#menus) {
                    yield men;
                }
            }

            // Devuelve un iterador que permite recorrer los alérgenos del sistema.
            *getAllergens() {
                for (let all of this.#allergens) {
                    yield all;
                }
            }

            // Devuelve un iterador que permite recorrer los restaurantes del sistema.
            *getRestaurants() {
                for (let res of this.#restaurants) {
                    yield res;
                }
            }

            // Añade una nueva categoría(multiargumento).
            addCategory(...cats) {
                if (cats.length === 0) throw new NullObjectException();
                cats.forEach((elem) => {
                    // La categoría no puede ser null o no es un objeto Category.
                    if (elem === null || !(elem instanceof Category)) throw new ObjectException("Category");
                    // La categoría ya existe.
                    if (this.#categories.has(elem.name)) throw new ExistsObjectException(elem.name);

                    this.#categories.set(elem.name, elem);
                });
            }

            // Añade un nuevo menú(multiargumento).
            addMenu(...menus) {
                if (menus.length === 0) throw new NullObjectException();
                menus.forEach((elem) => {
                    // El menú no puede ser null o no es un objeto Menú.
                    if (elem === null || !(elem instanceof Menu)) throw new ObjectException("Menu");
                    // El menú ya existe.
                    if (this.#menus.has(elem.name)) throw new ExistsObjectException(elem.name);

                    this.#menus.set(elem.name,
                        {
                            elem,
                            dishes: new Map()
                        });
                });
            }

            // Añade un nuevo alérgeno(multiargumento).
            addAllergen(...alls) {
                if (alls.length === 0) throw new NullObjectException();
                alls.forEach((elem) => {
                    // El alérgeno no puede ser null o no es un objeto Allergen.
                    if (elem === null || !(elem instanceof Allergen)) throw new ObjectException("Allergen");
                    // El alérgeno ya existe.
                    if (this.#allergens.has(elem.name)) throw new ExistsObjectException(elem.name);

                    this.#allergens.set(elem.name, elem);
                });
            }

            // Añade un nuevo plato(multiargumento).
            addDish(...diss) {
                if (diss.length === 0) throw new NullObjectException();
                diss.forEach((elem) => {
                    // El plato no puede ser null o no es un objeto Dish.
                    if (elem === null || !(elem instanceof Dish)) throw new ObjectException("Dish");
                    // El plato ya existe.
                    if (this.#dishes.has(elem.name)) throw new ExistsObjectException(elem.name);

                    this.#dishes.set(elem.name,
                        {
                            elem,
                            categories: new Map(),
                            allergens: new Map(),
                        });
                });
            }

            // Añade un nuevo restaurante(multiargumento).
            addRestaurant(...rests) {
                if (rests.length === 0) throw new NullObjectException();
                rests.forEach((elem) => {
                    // El restaurante no puede ser null o no es un objeto Restaurant.
                    if (elem === null || !(elem instanceof Restaurant)) throw new ObjectException("Restaurant");
                    // El restaurante ya existe.
                    if (this.#restaurants.has(elem.name)) throw new ExistsObjectException(elem.name);

                    this.#restaurants.set(elem.name, elem);
                });
            }

            // Elimina una categoría. Los platos quedarán desasignados de la categoría.
            removeCategory(...cats) {
                cats.forEach((elem) => {
                    // La categoría no está registrada.
                    if (!this.#categories.has(elem.name)) throw new RegisteredException(elem.name);

                    this.#dishes.entries().forEach(([key, value]) => {
                        let categor = value.categories.values().next().value; // Variable para comprobar que es esa categoría.
                        if (categor === elem) {
                            // Desasignar los platos.
                            this.deassignCategoryToDish(elem, value.elem);
                        }
                    });

                    // Eliminar la categoría.
                    this.#categories.delete(elem.name);
                });
                return this;
            }

            // Elimina un menú(multiargumento).
            removeMenu(...menus) {
                menus.forEach((elem) => {
                    // El menú no está registrado.
                    if (!this.#menus.has(elem.name)) throw new RegisteredException(elem.name);

                    this.#menus.delete(elem.name);
                });
                return this;
            }

            // Elimina un alérgeno(multiargumento).
            removeAllergen(...alls) {
                alls.forEach((elem) => {
                    // El alérgeno no está registrado.
                    if (!this.#allergens.has(elem.name)) throw new RegisteredException(elem.name);

                    this.#dishes.entries().forEach(([key, value]) => {
                        let allerge = value.allergens.values().next().value; // Variable para comprobar que es ese alérgeno.
                        if (allerge === elem) {
                            // Desasignar los platos.
                            this.deassignAllergenToDish(elem, value.elem);
                        }
                    });

                    this.#allergens.delete(elem.name);
                });
                return this;
            }

            // Elimina un plato y todas sus asignaciones a categorías, alérgenos y menús(multiargumento).
            removeDish(...diss) {
                diss.forEach((elem) => {
                    // Los platos no están registrados.
                    if (!this.#dishes.has(elem.name)) throw new RegisteredException(elem.name);

                    // Comprobar si tiene categorías ese plato.
                    if (this.#dishes.get(elem.name).categories.size !== 0) {
                        let ite = this.#dishes.get(elem.name).categories.values(); // Iterador.
                        let des = ite.next().value; // Variable para desasignar la categoría.
                        this.deassignCategoryToDish(des, elem); // Desasignar las categorías.
                    }

                    // Comprobar si tiene alérgenos ese plato.
                    if (this.#dishes.get(elem.name).allergens.size !== 0) {
                        let des = this.#dishes.get(elem.name).allergens.values().next().value; // Variable para desasignar el alérgeno.

                        this.deassignAllergenToDish(des, elem); // Desasignar los alérgenos.
                    }

                    // Comprobar si tiene platos ese menu.
                    if (this.#menus.values().next().value.dishes.size !== 0) {
                        let des = this.#menus.values().next().value.elem; // Variable para desasignar el menú.

                        this.deassignDishToMenu(elem, des); // Desasignar los menús.
                    }

                    // Eliminar el plato.
                    this.#dishes.delete(elem.name);
                });
                return this;
            }

            // Elimina un restaurante(multiargumento).
            removeRestaurant(...rests) {
                rests.forEach((elem) => {
                    // El restaurante no está registrado.
                    if (!this.#restaurants.has(elem.name)) throw new RegisteredException(elem.name);

                    this.#restaurants.delete(elem.name);
                });
                return this;
            }

            // Asigna un plato a una categoría(multiargumento). 
            assignCategoryToDish(cat, ...diss) {
                // La categoría no puede ser NULL.
                if (cat === undefined) throw new NullObjectException();
                if (!(cat instanceof Category)) throw new ObjectException("Category");

                // Si el objeto Category no existe se añade al sistema.
                if (!this.#categories.has(cat.name)) {
                    this.addCategory(cat);
                }

                // Los platos no pueden ser NULL.
                if (diss.length === 0) throw new NullObjectException();

                diss.forEach((elem) => {
                    if (!(elem instanceof Dish)) throw new ObjectException("Dish");

                    // Si los objetos Dish no existen se añaden al sistema.
                    if (!this.#dishes.has(elem.name)) {
                        this.addDish(elem);
                    }

                    this.#dishes.get(elem.name).categories.set(cat.name, cat);
                });
                return this;
            }

            // Asigna un alérgeno a un plato(multiargumento).
            assignAllergenToDish(all, ...diss) {
                // El alérgeno no puede ser NULL.
                if (all === undefined) throw new NullObjectException();
                if (!(all instanceof Allergen)) throw new ObjectException("Allergen");

                // Si el objeto Allergen no existe se añade al sistema.
                if (!this.#allergens.has(all.name)) {
                    this.addAllergen(all);
                }

                // Los platos no pueden ser NULL.
                if (diss.length === 0) throw new NullObjectException();

                diss.forEach((elem) => {
                    if (!(elem instanceof Dish)) throw new ObjectException("Dish");

                    // Si los objetos Dish no existen se añaden al sistema.
                    if (!this.#dishes.has(elem.name)) {
                        this.addDish(elem);
                    }

                    this.#dishes.get(elem.name).allergens.set(all.name, all);
                });
                return this;
            }

            // Asigna un plato a una menú(multiargumento).
            assignDishToMenu(dis, ...menus) {
                // El plato no puede ser NULL.
                if (dis === undefined) throw new NullObjectException();
                if (!(dis instanceof Dish)) throw new ObjectException("Dish");

                // Si el objeto Dish no existe se añade al sistema.
                if (!this.#dishes.has(dis.name)) {
                    this.addDish(dis);
                }

                // Los menus no pueden ser NULL.
                if (menus.length === 0) throw new NullObjectException();

                menus.forEach((elem) => {
                    if (!(elem instanceof Menu)) throw new ObjectException("Menu");

                    // Si los objetos Menu no existen se añaden al sistema.
                    if (!this.#menus.has(elem.name)) {
                        this.addMenu(elem);
                    }

                    this.#menus.get(elem.name).dishes.set(dis.name, dis);
                });
                return this;
            }

            // Desasigna un plato de una categoría(multiargumento).
            deassignCategoryToDish(cat, ...diss) {
                // Category no puede ser NULL.
                if (cat === undefined) throw new NullObjectException();
                if (!(cat instanceof Category)) throw new ObjectException("Category");
                // Si Category no está registrada.
                if (!this.#categories.has(cat.name)) throw new RegisteredException(cat.name);

                // Dish no puede ser NULL.
                if (diss.length === 0) throw new NullObjectException();

                diss.forEach((elem) => {
                    if (!(elem instanceof Dish)) throw new ObjectException("Dish");
                    // Si Dish no está registrado.
                    if (!this.#dishes.has(elem.name)) throw new RegisteredException(elem.name);

                    this.#dishes.get(elem.name).categories.delete(cat.name);
                });
                return this;
            }

            // Desasigna un alérgeno(multiargumento).
            deassignAllergenToDish(all, ...diss) {
                // Allergen no puede ser NULL.
                if (all === undefined) throw new NullObjectException();
                if (!(all instanceof Allergen)) throw new ObjectException("Allergen");

                // Si Allergen no está registrada.
                if (!this.#allergens.has(all.name)) throw new RegisteredException(all.name);

                // Dish no puede ser NULL.
                if (diss.length === 0) throw new NullObjectException();

                diss.forEach((elem) => {
                    if (!(elem instanceof Dish)) throw new ObjectException("Dish");
                    // Si Dish no está registrado.
                    if (!this.#dishes.has(elem.name)) throw new RegisteredException(elem.name);

                    this.#dishes.get(elem.name).allergens.delete(all.name);
                });

                return this;
            }

            // Desasigna un plato de un menú(multiargumento).
            deassignDishToMenu(dis, ...menus) {
                // Dish no puede ser NULL.
                if (dis === undefined) throw new NullObjectException();
                if (!(dis instanceof Dish)) throw new ObjectException("Dish");
                // Si Dish no está registrada.
                if (!this.#dishes.has(dis.name)) throw new RegisteredException(dis.name);

                // Menu no puede ser NULL.
                if (menus.length === 0) throw new NullObjectException();

                menus.forEach((elem) => {
                    if (!(elem instanceof Menu)) throw new ObjectException("Menu");
                    // Si Menu no está registrado.
                    if (!this.#menus.has(elem.name)) throw new RegisteredException(elem.name);

                    this.#menus.get(elem.name).dishes.delete(dis.name);
                });
                return this;
            }




            // const orden = (a, b) => a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase();

            // const criterio = (dish) => dish.name === "Plato";

            // Obtiene un iterador que cumpla un criterio concreto en base a una función de callback.
            *findDishes(dis, criterion, ordered) {

                // Dish no puede ser NULL.
                if (dis === undefined) throw new NullObjectException();

                // Si Dish no está registrado.
                if (!this.#dishes.has(dis.name)) throw new RegisteredException(dis.name);

                let array = []; // Variable para ordenar los datos.

                // Si coincide con el criterio pasado, se añade al array.
                if (this.#dishes.values()) {
                    if (criterion(dis)) array.push(dis);
                }

                // El iterador puede estar ordenado.
                if (ordered) {
                    array.sort(ordered);
                }

                // Iterador.
                for (let diss of array) {
                    yield diss;
                }
            }

            // Devuelve un objeto Dish si está registrado, o crea un nuevo.
            createDish(name, description, ingredients, image) {
                let dis = this.#dishes.get(name);
                if (!dis) {
                    dis = new Dish(name, description, ingredients, image);
                } else {
                    dis = dis.dish;
                }
                return dis;
            }

            // Devuelve un objeto Menu si está registrado, o crea un nuevo.
            createMenu(name, description) {
                let men = this.#menus.get(name);
                if (!men) {
                    men = new Menu(name, description);
                } else {
                    men = men.menu;
                }
                return men;
            }

            // Devuelve un objeto Allergen si está registrado, o crea un nuevo.
            createAllergen(name, description) {
                let all = this.#allergens.get(name);
                if (!all) {
                    all = new Allergen(name, description);
                } else {
                    all = all.allergen;
                }
                return all;
            }

            // Devuelve un objeto Category si está registrado, o crea un nuevo.
            createCategory(name, description) {
                let cat = this.#categories.get(name);
                if (!cat) {
                    cat = new Category(name, description);
                } else {
                    cat = cat.category;
                }
                return cat;
            }

            //Devuelve un objeto Restaurant si está registrado, o crea un nuevo.
            createRestaurant(name, description, location) {
                let res = this.#restaurants.get(name);
                if (!res) {
                    res = new Restaurant(name, description, location);
                } else {
                    res = res.restaurant;
                }
                return res;
            }


        }

        let instance = new RestaurantsManager();// Devolvemos el objeto RestaurantsManager para que sea una instancia única.
        Object.freeze(instance);
        return instance;
    } // Fin inicialización del Singleton.

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