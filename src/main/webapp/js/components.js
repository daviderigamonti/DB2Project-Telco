/**
 *      Collections of interactive components
 */

/**
 * Greeter that displays the user's username
 * @param {Element} greeter Element containing the greeter
 * @param {String} name Username to display
 */
function Greeter(greeter, name) {

    this.name = name;
    this.message = `Welcome ${name}!`

    this.show = function() {
        if(name)
            greeter.textContent = this.message;
    }
}

/**
 * Interactive menu that provides essential buttons for navigation
 * @param {Element} home Element containing the HOME button
 * @param {Element} access Element containing the ACCESS button
 * @param {Element} reset Element containing the RESET button
 * @param {Element} logout Element containing the HOME button
 */
function Menu(home, access, reset, logout) {

    this.home = home;
    this.access = access;
    this.reset = reset;
    this.logout = logout;

    this.addEvents = function() {
        if(this.home)
            this.home.addEventListener("click", () => {
                //TODO: home
            });
        if(this.access)
            this.access.addEventListener("click", () => {
                //TODO: access
            });
        if(this.reset)
            this.reset.addEventListener("click", () => {
                //TODO: reset
            });
        if(this.logout)
            this.logout.addEventListener("click", () => {
                //TODO: logout
            });
    }
}

function ServiceForm(handler, servicePackageCombo, validityPeriodCombo, optionalProductsCombo,
                     loadServices, loadInfo) {

    this.service = new ObjectCombo(handler, servicePackageCombo, null);
    this.validity = new ObjectCombo(handler, validityPeriodCombo, null);
    this.optional = new ObjectList(handler, OptionalProduct, optionalProductsCombo, null, null);
    this.loadServices = loadServices;
    this.loadInfo = loadInfo;

    this.init = function() {
        this.service.combo.addEventListener("change", (e) => {
            this.select(e.target.selectedIndex);
        });
        this.loadServices();
    }

    // Load service package information when selecting a new service package
    this.select = function(index) {
        let value = this.service.combo.options.item(index).value;
        if(value >= 0)
            this.loadInfo(value);
    }

    this.update = function(self, objects) {
        // Extracts the names and ids of the objects
        //TODO: temporary notation for attributes: name, id
        self.service.update(self.service, objects.map(obj => { return {
            name: obj.name,
            id: obj.id
        }}))
        self.select(0);
    }

    this.updateInfo = function(self, object) {
        // Extracts the validity periods from the object
        //TODO: temporary notation for attributes: validityPeriod, name, id
        self.validity.update(self.validity, object.validityPeriod.map(obj => { return {
            name: obj.name,
            id: obj.id
        }}));
        // Extracts optional products from the object
        //TODO: temporary notation for attributes: optionalProducts
        self.optional.update(self.optional, object.optionalProducts);
    }
}

/**
 * List containing generic objects, used for dynamic visualization and grouping of multiple objects
 * @param {PageHandler} handler PageHandler containing the list
 * @param {Function} ListObject Reference to the constructor of the stored objects
 * @param {Element} list Element containing the list
 * @param {Function} load Function that loads the list
 * @param {Object} opt Optional parameters for the object
 */
function ObjectList(handler, ListObject, list, load, opt) {

    this.list = list;
    this.load = load;

    this.update = function(self, objects) {
        self.show();
        self.list.innerHTML = ""; // Empty the list

        // Initializes every single object and updates it
        objects.forEach((object) => {
            let p = new ListObject(handler, self.list, opt);
            p.update(object);
        });
    };

    this.show = () => {
        this.list.hidden = false;
    };

    this.hide = () => {
        this.list.hidden = true;
    };

    this.isHidden = () => {
        return this.list.hidden;
    };
}

/**
 * ComboBox/Select element that can be dynamically filled
 * @param {PageHandler} handler PageHandler containing the combo
 * @param {Element} combo Element containing the combo
 * @param {Function} load Function that loads the combo
 */
function ObjectCombo(handler, combo, load) {

    this.combo = combo;
    this.load = load;

    this.update = function(self, objects) {
        self.combo.innerHTML = ""; // Empty the combo

        // Creates a new entry for each loaded object
        objects.forEach((object) => {
            let option = document.createElement("option");
            option.text = object.name;
            option.value = object.id;
            self.combo.add(option);
        });
    };
}


function ServicePackage(handler, parent) {

    this.parent = parent;
    this.packageDIV = null;
    this.id = null;

    this.update = function(service) {
        //TODO: temporary notation for attributes: id, name

        this.id = service.id;

        this.packageDIV = appendElement(this.parent, "div", null, null, null)
        appendElement(this.packageDIV, "div", null, null, service.id);
        appendElement(this.packageDIV, "div", null, null, service.name);

        // Clickable rejected order
        this.parent.addEventListener("click", this.openPackage, false);
    };

    this.openPackage = function() {
        if(id)
            window.location.href = "buyservice.js.js";
        //TODO: proper redirect
    }
}

function Order(handler, parent) {

    this.parent = parent;

    this.update = function(order) {
        //TODO: visualization of an order
    };
}

function RejectedOrder(handler, parent) {

    this.parent = parent;
    this.orderDIV = null;
    this.id = null;

    this.update = function(order) {
        //TODO: temporary notation for attributes: id, timestamp, status, total

        this.id = order.id;

        this.orderDIV = appendElement(this.parent, "div", null, null, null)
        appendElement(this.orderDIV, "div", null, null, order.id);
        appendElement(this.orderDIV, "div", null, null, order.timestamp);
        appendElement(this.orderDIV, "div", null, null, order.status);
        appendElement(this.orderDIV, "div", null, null, order.total);

        // Clickable rejected order
        this.parent.addEventListener("click", this.openOrder, false);
    };

    this.openOrder = function() {
        if(id)
            window.location.href = "confirmation.js";
        //TODO: proper redirect
    }

}

function OptionalProduct(handler, parent) {

    this.parent = parent;

    this.update = function(product) {
        //TODO: temporary notation for attributes: id, name, monthlyFee

        let productString = product.name + " " + product.monthlyFee + "€/month";

        let label = appendElement(this.parent, "label", null, null, productString);
        appendElement(label, "input", "checkbox", product.id, null);

    };
}