/**
 *      Script for the confirmation
 */

(function() {	// Hide from global scope

    let confirmationHandler;

    window.addEventListener("load", () => {
        if(true) {   //TODO: check for user info? --- if (userInfo() != null) {
            // Create a new page handler and initialize it
            confirmationHandler = new ConfirmationHandler();
            confirmationHandler.init();
        }
        else
            window.location.href = DEFAULT_PAGE;
    }, false);

    /**
     * Page handler of the home page, handles its subcomponents and their status
     */
    function ConfirmationHandler() {

        this.message = null;
        this.greeter = null;
        this.menu = null;
        this.servicePackages = null;
        this.buy = null;

        this.init = function() {

            // Message container for errors/messages
            this.message = document.getElementById("message");

            // Greeter
            this.greeter = new Greeter(document.getElementById("greeter"), null);
            this.greeter.show();

            // Menu containing navigation buttons
            this.menu = new Menu(
                document.getElementById("buttonHome"),
                document.getElementById("buttonAccess"),
                document.getElementById("buttonReset"),
                null);
            this.menu.addEvents(this);

            // Buy button
            this.buy = document.getElementById("buttonBuy");
            this.buy.addEventListener("click", () => {
                //TODO: buy button
            });
        }

        this.load = function() {
            //TODO: on load confirmation stuff here
        }

    }

})();