/**
 *      Script for the employee home page
 */

(function() {	// Hide from global scope

    window.addEventListener("load", () => {
        if(checkUserInfo())
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
        this.greeter = new Greeter(document.getElementById("greeter"), getUserInfo().username);
        this.greeter.show();

        // Menu containing navigation buttons
        this.menu = new Menu(null, null, null, document.getElementById("buttonLogout"));
        this.menu.addEvents(this);

        let handler = this;

        // Service package form
        this.servicePackageForm = new PackageCreationForm(
            document.getElementById("servicesFSP"),
            document.getElementById("validityPeriodsFSP"),
            document.getElementById("optionalProductsFSP"),
            document.getElementById("buttonAddServiceFSP"),
            document.getElementById("buttonAddValidityPeriodFSP"),
            null
        )
        this.servicePackageForm.init();

        // Create button for service package form
        let servicePackageFormButton = document.getElementById("buttonCreateFSP");
        servicePackageFormButton.addEventListener("click", (e) => {
            let form = e.target.closest("form");
            let message = document.getElementById("message");
            if(form.checkValidity()) {
                makeCall("GET", "LoadOptionalProducts", new FormData(form), message, function() {   //TODO: POST request to createServicePackage
                    alert("Service package created!");
                    form.reset();
                }, null);
            }
            else
                form.reportValidity();
        }, false);

        // Create button for optional product form
        let optionalProductFormButton = document.getElementById("buttonCreateFOP");
        optionalProductFormButton.addEventListener("click", (e) => {
            let form = e.target.closest("form");
            let message = document.getElementById("message");
            if(form.checkValidity()) {
                makeCall("GET", "LoadOptionalProducts", new FormData(form), message, function() {   //TODO: POST request to createOptionalProduct
                    alert("Optional product created!");
                    form.reset();
                    // Refresh the list of optional products in the service package form
                    handler.servicePackageForm.refresh();
                }, null);
            }
            else
                form.reportValidity();
        }, false);

        // Button that goes to the sales report
        this.select = document.getElementById("buttonSelect");
        this.select.addEventListener("click", () => {
            window.location.href = PAGES.ROOT + PAGES.EMPLOYEE + PAGES.SALESREPORT;
        });
    }

})();