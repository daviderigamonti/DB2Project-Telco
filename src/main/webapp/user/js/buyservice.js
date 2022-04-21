/**
 *      Script for the service buying page
 */

(function() {	// Hide from global scope

    window.addEventListener("load", () => {
        if(checkSessionInfo())
            init()
        else {
            clearStorage();
            window.location.href = PAGES.ROOT + PAGES.DEFAULT;
        }
    }, false);

    function init() {
        // Message container for errors/messages
        this.message = document.getElementById("message");

        // Greeter
        this.greeter = new Greeter(document.getElementById("greeter"), getSessionInfo().username);
        this.greeter.show();

        // If the user is not logged in, display access, otherwise display logout
        let access = document.getElementById("buttonAccess");
        let logout = document.getElementById("buttonLogout");
        displayAccessOrLogout(access, logout);

        // Menu containing navigation buttons
        this.menu = new Menu(document.getElementById("buttonHome"), access,
            null, logout);
        this.menu.addEvents(this);

        let handler = this;

        // Form for choosing the service
        this.form = new ServiceForm(
            document.getElementById("servicePackage"),
            document.getElementById("services"),
            document.getElementById("validityPeriod"),
            document.getElementById("optionalProducts"),
            function() {
                let self = this;
                loadObjects(self, self.update, "GET", "LoadServicePackages", null, handler.message,
                    false, 'No available service packages at the moment',
                    () => {
                        // After it loads the service packages check for GET parameter
                        let combo = document.getElementById("servicePackage");
                        let packageID = getRequestPackageID();
                        // noinspection EqualityComparisonWithCoercionJS
                        let option = Array.apply(null, combo.options)
                            .find(p => p.value === packageID);
                        // If there's a package ID inside the request load it, otherwise load the first one
                        if(option) {
                            option.selected = true;
                            combo.dispatchEvent(new CustomEvent('change'));
                        }
                        else
                            self.select(0);
                });
            },
            function(id) {
                let self = this;
                loadObjects(self, self.updateInfo, "GET", "LoadPackageByID?id=" + id, null, handler.message,
                    false, 'No package found with the given id');
            }
        );
        this.form.init();

        // Confirm button
        this.select = document.getElementById("buttonConfirm");
        this.select.addEventListener("click", (e) => {
            let form = e.target.closest("form");
            if(form.checkValidity()) {
                // Add the order to the session
                makeCall("POST", "CreateOrder",  new FormData(form), handler.message, () => {
                    window.location.href = PAGES.ROOT + PAGES.USER + PAGES.CONFIRMATION;
                }, false)
            }
        });
    }

    function getRequestPackageID() {
        // Check if an ID for a service package has been passed through GET parameters
        // in case that it's found, select the corresponding service package inside the form
        let idString = checkGETParameter("ServicePackageID");
        if(idString) {
            let id = parseInt(idString);
            if(id && id > 0)
                return id.toString()
        }
        return null;
    }

})();