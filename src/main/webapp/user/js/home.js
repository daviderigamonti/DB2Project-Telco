/**
 *      Script for the home page
 */

(function() {	// Hide from global scope

    window.addEventListener("load", () => {
        if(checkStorageInfo())
            init()
        else {
            clearStorage();
            window.location.href = root() + PAGES.USER + PAGES.LANDING;
        }
    }, false);

    function init() {
        // Message container for errors/messages
        this.message = document.getElementById("message");

        // Greeter
        this.greeter = new Greeter(document.getElementById("greeter"), getStorageInfo().username);
        this.greeter.show();

        // If the user is not logged in, display access, otherwise display logout
        let access = document.getElementById("buttonAccess");
        let logout = document.getElementById("buttonLogout");
        displayAccessOrLogout(access, logout);

        // Menu containing navigation buttons
        this.menu = new Menu(null, access, null, logout, root() + PAGES.USER);
        this.menu.addEvents(this);

        let handler = this;

        // Service packages list
        this.servicePackages = new ObjectList(ServicePackage,
            document.getElementById("servicePackages"), function() {
                let self = this;
                loadObjects(self, self.update, "GET", "LoadServicePackages", null, handler.message,
                    false, 'No available service packages at the moment');
            }, ServicePackage.prototype.visListClickable
        );
        this.servicePackages.load();

        // Rejected orders list if the user is not a guest
        if(strcmp(getStorageInfo().guest, GUEST.FALSE)) {
            this.rejectedOrders = new ObjectList(Order,
                document.getElementById("rejectedOrders"), function () {
                    let self = this;
                    loadObjects(self, self.update, "GET", "LoadRejectedOrdersByUser", false, handler.message,
                        true, '');
                }, Order.prototype.visRejectedList
            );
            this.rejectedOrders.load();
        }

        // Select button
        this.select = document.getElementById("buttonSelect");
        this.select.addEventListener("click", () => {
            window.location.href = root() + PAGES.USER + PAGES.PAGES + PAGES.BUYSERVICE;
        });
    }

})();