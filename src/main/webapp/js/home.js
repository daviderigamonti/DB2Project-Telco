/**
 *      Script for the home page
 */

(function() {	// Hide from global scope

    window.addEventListener("load", () => {
        if(checkUserInfo())
            init()
        else {
            clearStorage();
            window.location.href = PAGES.DEFAULT;
        }
    }, false);

    function init() {
        // Message container for errors/messages
        this.message = document.getElementById("message");

        // Greeter
        this.greeter = new Greeter(document.getElementById("greeter"), getUserInfo().username);
        this.greeter.show();

        // Menu containing navigation buttons
        this.menu = new Menu(null, null,
            null, document.getElementById("buttonLogout"));
        this.menu.addEvents(this);

        let handler = this;

        // Service packages list
        this.servicePackages = new ObjectList(ServicePackage,
            document.getElementById("servicePackages"), function() {
                let self = this;
                loadObjects(self, self.update, "GET", "LoadServicePackages", null, handler.message, false, 'No available service packages at the moment');
            }, ServicePackage.prototype.visListClickable
        );
        this.servicePackages.load();

        // Rejected orders list if the user is not a guest
        if(strcmp(getUserInfo().guest, GUEST.FALSE)) {
            this.rejectedOrders = new ObjectList(Order,
                document.getElementById("rejectedOrders"), function () {
                    let self = this;
                    loadObjects(self, self.update, "GET", "LoadRejectedOrdersByUser?userID=" + getUserInfo().id, false, handler.message, true, '');
                }, Order.prototype.visRejectedList
            );
            this.rejectedOrders.load();
        }

        // Select button
        this.select = document.getElementById("buttonSelect");
        this.select.addEventListener("click", () => {
            window.location.href = PAGES.BUYSERVICE;
        });
    }

})();