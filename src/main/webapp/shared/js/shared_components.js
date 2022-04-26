/**
 *      Collections of generic interactive components
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
 * @param {String} rootLocation Root for the redirects
 */
function Menu(home, access, reset, logout, rootLocation) {

    this.home = home;
    this.access = access;
    this.reset = reset;
    this.logout = logout;

    this.addEvents = function() {
        if(this.home)
            this.home.addEventListener("click", () => {
                window.location.href = rootLocation + PAGES.PAGES + PAGES.HOME;
            });
        if(this.reset)
            this.reset.addEventListener("click", () => {
                // Delete the tracked order, if it exists, and return to home page
                makeCall("GET", "CheckTrackedOrder?delete=true", null, null, function() {
                        window.location.href = rootLocation + PAGES.PAGES + PAGES.HOME;
                }, null);
            });
        // Access WILL NOT clear server-side session
        if(this.access)
            this.access.addEventListener("click", () => {
                clearStorage();
                window.location.href = rootLocation + PAGES.LANDING;
            });
        // Logout WILL clear server-side session
        if(this.logout)
            this.logout.addEventListener("click", () => {
                // Logout the user from the session, clear the storage and return to landing page
                makeCall("GET", "Logout", null, null, function() {
                    clearStorage();
                    window.location.href = rootLocation + PAGES.LANDING;
                }, null);
            });
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
    this.objects = [];

    this.reset = function(self) {
        self.objects.splice(0, self.objects.length)
        self.list.innerHTML = "";

    }

    this.update = function(self, objects) {
        // Empty the list
        self.reset(self);

        // Initializes every single object and updates it
        if(Array.isArray(objects))
            // Treat array differently
            objects.forEach((object) => {
                self.add(self, object)
            });
        else
            for(let object in objects)
                self.add(self, object)

    };

    this.add = function(self, object) {
        let p = new ListObject(self.list, object);
        self.objects.push(p);
        visualize.call(p);
    }

    this.toObject = function(self) {
        return self.objects.map(object => object.toObject())
    }
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
