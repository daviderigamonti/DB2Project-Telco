/**
 *      Script for the sales report page
 */

(function() {	// Hide from global scope

    window.addEventListener("load", () => {
        if(checkStorageInfo(true, EMPLOYEE_SESSION))
            init()
        else {
            clearStorage();
            window.location.href = root() + PAGES.PAGES + PAGES.LANDING;
        }
    }, false);

    function init() {
        // Message container for errors/messages
        this.message = document.getElementById("message");

        // Greeter
        this.greeter = new Greeter(document.getElementById("greeter"), getStorageInfo(EMPLOYEE_SESSION).username);
        this.greeter.show();

        // Menu containing navigation buttons
        this.menu = new Menu(document.getElementById("buttonHome"), null,
            null, document.getElementById("buttonLogout"), root() + PAGES.EMPLOYEE);
        this.menu.addEvents(this);

        let handler = this;

        this.report = new SalesReport(document.getElementById("report"), function () {
            let self = this;
            makeCall("GET", "LoadSalesReport", null, handler.message, function(req) {
                let jsonElements = JSON.parse(req.responseText);
                self.update(jsonElements);
            }, false);
        });
        this.report.init();
    }
})();