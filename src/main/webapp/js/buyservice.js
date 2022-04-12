/**
 *      Script for the service buying page
 */

(function() {	// Hide from global scope

    window.addEventListener("load", () => {
        if(true) {   //TODO: check for user info? --- if (userInfo() != null) {
            // Create a new page handler and initialize it
            init();
        }
        else
            window.location.href = PAGES.DEFAULT;
    }, false);

    function init() {
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

        // Form for choosing the service
        this.form = new ServiceForm(
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
                loadObjects(self, self.updateInfo, "GET", "LoadPackageByID?id=" + id, null, handler.message,
                    false, 'No package found with the given id');
            }
        );
        this.form.init();
    }

})();