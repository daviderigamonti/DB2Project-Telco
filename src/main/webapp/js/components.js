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
    this.message = name ? `Welcome ${name}!` : `Welcome guest, please create an account or log in`;

    this.show = function() {
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
                window.location.href = PAGES.HOME;
            });
        if(this.access)
            this.access.addEventListener("click", () => {
                window.location.href = PAGES.LANDING;
                //TODO: probably access == logout?
            });
        if(this.reset)
            this.reset.addEventListener("click", () => {
                //TODO: remove and directly add inside confirmation page
            });
        if(this.logout)
            this.logout.addEventListener("click", () => {
                window.location.href = PAGES.LANDING;
            });
    }
}

function ServiceForm(servicePackageCombo, validityPeriodCombo, optionalProductsCheck,
                     loadServices, loadInfo) {

    this.service = new ObjectCombo(ServicePackage, servicePackageCombo,
        null, ServicePackage.prototype.visCombo);
    this.validity = new ObjectCombo(ValidityPeriod, validityPeriodCombo,
        null, ValidityPeriod.prototype.visCombo);
    this.optional = new ObjectList(OptionalProduct, optionalProductsCheck,
        null, OptionalProduct.prototype.visCheck);
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
        self.service.update(self.service, objects);
        self.select(0);
    }

    this.updateInfo = function(self, object) {
        // Extracts the validity periods
        self.validity.update(self.validity, object.validityPeriods);
        // Extracts the optional products
        self.optional.update(self.optional, object.optionalProducts);
    }
}

function Summary(SummaryObject, summary, load, visualize) {

    this.summary = summary;
    this.load = load;

    this.update = function(self, object) {
        // One object only is expected
        let p = new SummaryObject(self.summary, object);
        visualize.call(p);
    }
}

/**
 * List containing generic objects, used for dynamic visualization and grouping of multiple objects
 * @param {Function} ListObject Reference to the constructor of the stored objects
 * @param {Element} list Element containing the list
 * @param {Function} load Function that loads the list
 * @param {Function} visualize Function that visualizes the single element of the list
 */
function ObjectList(ListObject, list, load, visualize) {

    this.list = list;
    this.load = load;

    this.update = function(self, objects) {
        self.list.innerHTML = ""; // Empty the list

        // Initializes every single object and updates it
        objects.forEach((object) => {
            let p = new ListObject(self.list, object);
            visualize.call(p);
        });
    };
}

/**
 * ComboBox/Select element that can be dynamically filled
 * @param {Function} ComboObject Reference to the constructor of the stored objects
 * @param {Element} combo Element containing the combo
 * @param {Function} load Function that loads the combo
 * @param {Function} visualize Function that visualizes the single element of the list
 */
function ObjectCombo(ComboObject, combo, load, visualize) {

    this.combo = combo;
    this.load = load;

    this.update = function(self, objects) {
        self.combo.innerHTML = ""; // Empty the combo

        // Creates a new entry for each loaded object
        objects.forEach((object) => {
            let p = new ComboObject(self.combo, object);
            visualize.call(p);
        });
    };
}
