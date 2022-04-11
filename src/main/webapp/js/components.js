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
 * @param {Function} ListObject Reference to the constructor of the stored objects
 * @param {Element} list Element containing the list
 * @param {Function} load Function that loads the list
 * @param {Object} opt Optional parameters for the object
 */
function ObjectList(ListObject, list, load, opt) {

    this.list = list;
    this.load = load;

    this.update = function(self, objects) {
        self.show();
        self.list.innerHTML = ""; // Empty the list

        // Initializes every single object and updates it
        objects.forEach((object) => {
            let p = new ListObject(self.list, opt);
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
 * @param {Element} combo Element containing the combo
 * @param {Function} load Function that loads the combo
 */
function ObjectCombo(combo, load) {

    this.combo = combo;
    this.load = load;

    this.update = function(self, objects) {
        self.combo.innerHTML = ""; // Empty the combo

        // Creates a new entry for each loaded object
        objects.forEach((object) => {
            appendElement(self.combo, "option", {name: object.name, value: object.id});
        });
    };
}
