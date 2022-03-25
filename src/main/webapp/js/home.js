/**
 *      Script for the home page
 */

(function() {	// Hide from global scope

    let homeHandler;

    window.addEventListener("load", () => {
        if(true) {   //TODO: check for user info? --- if (userInfo() != null) {
            // Create a new page handler and initialize it
            homeHandler = new HomeHandler();
            homeHandler.init();
        }
        else
            window.location.href = DEFAULT_PAGE;
    }, false);

    /**
     * Page handler of the home page, handles its subcomponents and their status
     */
    function HomeHandler() {

        this.message = null;
        this.greeter = null;
        this.menu = null;
        this.servicePackages = null;
        this.rejectedOrders = null;
        this.select = null;

        this.init = function() {
            // Message container for errors/messages
            this.message = document.getElementById("message");

            // Greeter
            this.greeter = new Greeter(document.getElementById("greeter"), null);
            this.greeter.show();

            // Menu containing navigation buttons
            this.menu = new Menu(null, null,
                null, document.getElementById("buttonLogout"));
            this.menu.addEvents(this);

            // Service packages list
            this.servicePackages = new ObjectList(this, ServicePackage,
                document.getElementById("servicePackages"), function() {
                    loadList(this, "GET", "LoadServicePackages",
                        null, self.message, false,
                        'No available service packages at the moment');
                }, null
            );

            // Rejected orders list
            this.rejectedOrders = new ObjectList(this, Order,
                document.getElementById("rejectedOrders"), function() {
                    loadList(this, "GET", "LoadRejectedOrdersByUser?userinfo=" + userInfo(),
                        true, self.message, false, '');
                }, true // opt is set to true to indicate the rejected attribute of the orders
            );

            // Select button
            this.select = document.getElementById("buttonLogout");
            this.select.addEventListener("click", () => {
                //TODO: select
            });

            //TODO: on load home stuff here
        }

        this.update = function() {
            //TODO: ??????????????????
        }

    }
    HomeHandler.prototype = Object.create(PageHandler.prototype);

})();