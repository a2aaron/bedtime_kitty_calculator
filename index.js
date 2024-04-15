/**
 * @template T
 * @typedef {new (...args: any[]) => T} Constructor
 */

/**
 * @template ElementType
 * @param {Constructor<ElementType>} ty
 * @param {string} id
 * @returns {ElementType}
 */
function getTypedElementById(ty, id) {
    let element = document.getElementById(id);
    if (element == null) { throw new Error(`Element with id ${id} not found!`); }
    if (!(element instanceof ty)) {
        throw new Error(`Element with id ${id} is type ${element.constructor.name}, wanted ${ty}`);
    }
    return element;
}

let add_cutout_checkbox = getTypedElementById(HTMLInputElement, "add-cutout");
let pin_quantity_dropdown = getTypedElementById(HTMLSelectElement, "pin-quantity");
let shipping_destination_dropdown = getTypedElementById(HTMLSelectElement, "shipping-destination");

function getTotalPrice() {
    let total_price = 0.0;

    switch (pin_quantity_dropdown.value) {
        case "50": total_price += 385.0; break;
        case "75": total_price += 445.0; break;
        case "100": total_price += 490.0; break;
        case "200": total_price += 625.0; break;

    }

    switch (shipping_destination_dropdown.value) {
        case "unitedstates": total_price += 15.0; break;
        case "canada": total_price += 25.0; break;
        case "mexico": total_price += 25.0; break;
        case "europe": total_price += 28.0; break;
        case "asia": total_price += 28.0; break;
    }

    if (add_cutout_checkbox.checked) {
        total_price += 15.0;
    }
    return total_price;
}

function renderTotalPrice() {
    let price_element = getTypedElementById(HTMLParagraphElement, "total-price");
    let total_price = getTotalPrice();
    price_element.innerText = `\$${total_price.toFixed(2)}`;
}

/**
 * @param {HTMLElement} element
 */
function addRerenderEventListener(element) {
    /** @type {keyof HTMLElementEventMap} */
    let type = "click";
    if (element instanceof HTMLSelectElement) {
        type = "change";
    }

    element.addEventListener(type, () => {
        renderTotalPrice();
    });
}

addRerenderEventListener(add_cutout_checkbox);
addRerenderEventListener(pin_quantity_dropdown);
addRerenderEventListener(shipping_destination_dropdown);
renderTotalPrice();