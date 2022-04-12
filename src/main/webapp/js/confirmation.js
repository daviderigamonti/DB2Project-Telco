/**
 *      Script for the confirmation
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

})();