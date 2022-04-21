/**
 *      Script for the confirmation
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
        this.menu = new Menu(
            document.getElementById("buttonHome"),
            access,
            document.getElementById("buttonReset"),
            logout);
        this.menu.addEvents(this);

        let handler = this;

        // Load an order from the id if the corresponding parameter is set in the GET request
        let loadSummaryEndpoint = "LoadTrackedOrder";
        let idString = checkGETParameter("orderID");
        if(idString) {
            let id = parseInt(idString);
            if(id && id > 0)
                loadSummaryEndpoint = "LoadOrderByID?orderID=" + id;
        }


        // Summary
        this.summary = new Summary(Order, document.getElementById("summary"), function() {
                let self = this;
                loadObjects(self, self.update, "GET", loadSummaryEndpoint, null, handler.message,
                    false, 'No order found');
            }, Order.prototype.visSummary
        );
        this.summary.load();

        // Buy buttons
        this.buyS = document.getElementById("buttonBuySuccess");
        this.buyS.addEventListener("click", (e) => {
            buttonBuy(e, handler, "success");
        });
        this.buy = document.getElementById("buttonBuy");
        this.buy.addEventListener("click", (e) => {
            buttonBuy(e, handler, null);
        });
        this.buyF = document.getElementById("buttonBuyFailure");
        this.buyF.addEventListener("click", (e) => {
            buttonBuy(e, handler, "failure");
        });
    }

    function buttonBuy(e, handler, value = null) {
        let form = e.target.closest("form");
        appendElement(form, "input", {name: "outcome", value: value ?? "", hidden: true});
        makeCall("POST", "Payment", new FormData(form), handler.message, (req) => {
            alert(strcmp(req.responseText, "true") ? "Payment successful!" : "Payment failed!")
            window.location.href = PAGES.ROOT + PAGES.USER + PAGES.HOME;
        }, false);
    }

})();