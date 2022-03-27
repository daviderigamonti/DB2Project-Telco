/**
 *      Script for the service buying page
 */

(function() {	// Hide from global scope

    let serviceHandler;

    window.addEventListener("load", () => {
        if(true) {   //TODO: check for user info? --- if (userInfo() != null) {
            // Create a new page handler and initialize it
            serviceHandler = new ServiceHandler();
            serviceHandler.init();
        }
        else
            window.location.href = DEFAULT_PAGE;
    }, false);

    /**
     * Page handler of the home page, handles its subcomponents and their status
     */
    function ServiceHandler() {

        this.message = null;
        this.greeter = null;
        this.menu = null;
        this.form = null;
        this.servicePackages = null;
        this.optionalProducts = null;
        this.select = null;

        this.init = function() {

            // Message container for errors/messages
            this.message = document.getElementById("message");

            // Greeter
            this.greeter = new Greeter(document.getElementById("greeter"), null);
            this.greeter.show();

            // Menu containing navigation buttons
            this.menu = new Menu(document.getElementById("buttonHome"), null,
                null, document.getElementById("buttonLogout"));
            this.menu.addEvents(this);

            let handler = this;
            this.form = new ServiceForm(handler,
                document.getElementById("servicePackage"),
                document.getElementById("validityPeriod"),
                document.getElementById("optionalProducts"),
                function() {
                    let self = this;
                    loadObjects(self, self.update, "GET", "LoadServicePackages", null, handler.message,
                        false, 'No available service packages at the moment');
                },
                function(id) {
                    let self = this;
                    loadObjects(self, self.updateInfo, "GET", "LoadPackageById?id=" + id, null, handler.message,
                        false, 'No package found with the given id');
                }
            );
            this.form.init();
        }

        this.update = function() {
            //TODO: ??????????????????
        }

    }
    ServiceHandler.prototype = Object.create(PageHandler.prototype);

})();