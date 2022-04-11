/**
 *      Script for the home page
 */

(function() {	// Hide from global scope

    window.addEventListener("load", () => {
        if(true) {   //TODO: check for user info? --- if (userInfo() != null) {
            init()
        }
        else
            window.location.href = DEFAULT_PAGE;
    }, false);

    function init() {
        // Message container for errors/messages
        this.message = document.getElementById("message");

        // Greeter
        this.greeter = new Greeter(document.getElementById("greeter"), null);
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
                loadObjects(self, self.update, "GET", "LoadServicePackages",
                    null, handler.message, false,
                    'No available service packages at the moment');
            }, null
        );
        this.servicePackages.load();

        // Rejected orders list
        this.rejectedOrders = new ObjectList(RejectedOrder,
            document.getElementById("rejectedOrders"), function() {
                let self = this;
                loadObjects(self, self.update, "GET", "LoadRejectedOrdersByUser?userinfo=" + userInfo(),
                    false, handler.message, true, '');
            }, null
        );
        this.rejectedOrders.load();

        // Select button
        this.select = document.getElementById("buttonSelect");
        this.select.addEventListener("click", () => {
            window.location.href = "buyservice.html";
        });
    }

})();