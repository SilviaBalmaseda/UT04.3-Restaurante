"use strict";

function BaseException(message = "Default Message", fileName, lineNumber) {
    let instance = new Error(message, fileName, lineNumber);
    instance.name = "MyError";
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    if (Error.captureStackTrace) {
        Error.captureStackTrace(instance, BaseException);
    }
    return instance;
}
BaseException.prototype = Object.create(Error.prototype, {
    constructor: {
        value: BaseException,
        enumerable: false,
        writable: true,
        configurable: true,
    },
});

//Excepción acceso inválido a constructor
function InvalidAccessConstructorException() {
    let instance = BaseException.call(
        this,
        "El constructor no se puede llamar como una función."
    );
    instance.name = "InvalidAccessConstructorException";
    return instance;
}
InvalidAccessConstructorException.prototype = Object.create(
    BaseException.prototype
);
InvalidAccessConstructorException.prototype.constructor =
    InvalidAccessConstructorException;

//Excepción personalizada para indicar valores vacios.
function EmptyValueException(param) {
    let instance = BaseException.call(
        this,
        "Error: el parámetro " + param + " no puede estar vacío."
    );
    instance.name = "EmptyValueException";
    instance.param = param;
    return instance;
}
EmptyValueException.prototype = Object.create(BaseException.prototype);
EmptyValueException.prototype.constructor = EmptyValueException;

//Excepción de valor inválido
function InvalidValueException(param, value) {
    let instance = BaseException.call(
        this,
        "Error: el parámetro " + param + " tiene un valor inválido. (" + param + ": " + value + ")"
    );
    instance.name = "InvalidValueException";
    instance.param = param;
    instance.param = value;
    return instance;
}
InvalidValueException.prototype = Object.create(BaseException.prototype);
InvalidValueException.prototype.constructor = InvalidValueException;

//Excepción personalizada para indicar valores(lista) llenos.
function FullValueException(param) {
    let instance = BaseException.call(
        this,
        "Error: El parámetro " + param + " ya está lleno."
    );
    instance.name = "FullValueException";
    instance.param = param;
    return instance;
}
FullValueException.prototype = Object.create(BaseException.prototype);
FullValueException.prototype.constructor = FullValueException;

// Excepción personalizada para indicar que es una clase abstracta.
function AbstractClassException(className) {
    let instance = BaseException.call(
        this,
        "Error: la clase " + className + " es abstracta."
    );
    instance.name = "AbstractClassException";
    instance.className = className;
    return instance;
}
AbstractClassException.prototype = Object.create(BaseException.prototype);
AbstractClassException.prototype.constructor = AbstractClassException;

// Excepción personalizada para indicar la fuera de límite.
function PositionOutBoundsException() {
    let instance = BaseException.call(
        this,
        "Error: La posición está fuera del límite."
    );
    instance.name = "PositionOutBoundsException";
    return instance;
}
PositionOutBoundsException.prototype = Object.create(BaseException.prototype);
PositionOutBoundsException.prototype.constructor = PositionOutBoundsException;
