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

/**
 * Generic Page Handler for the purpose of generalizing the various handlers
 * (currently not used)
 */
function PageHandler() {}
PageHandler.prototype = {}

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

    this.update = function(objects) {
        this.show();
        this.list.innerHTML = ""; // Empty the list

        let self = this;

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
 * Service Package object
 * @param {PageHandler} handler Corresponding page handler
 * @param {Element} list Parent list element
 */
function ServicePackage(handler, list) {

    this.list = list;

    this.update = function() {
        //TODO: visualization of a service package
    };
}

/**
 * Order object
 * @param {PageHandler} handler Corresponding page handler
 * @param {Element} list Parent list element
 * @param {Boolean} rejected True for rejected list visualization
 */
function Order(handler, list, rejected) {

    this.list = list;

    this.update = function() {
        //TODO: visualization of an order
    };
}