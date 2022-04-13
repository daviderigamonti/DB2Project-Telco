/**
 *      Script for the landing page
 */

(function() {	// Hide from global scope

    // LOGIN
    document.getElementById("buttonLogin").addEventListener("click", (e) => {
        let form = e.target.closest("form");
        let message = document.getElementById("errorLogin");
        if(form.checkValidity()) {
            makeCall("POST", "CheckLogin", new FormData(form), message, function(req) {
                setUserInfo(req.responseText);
                window.location.href = PAGES.HOME;
            }, null);
        }
        else
            form.reportValidity();
    });

    // REGISTRATION
    document.getElementById("buttonRegister").addEventListener("click", (e) => {
        let form = e.target.closest("form");
        let message = document.getElementById("errorRegister");
        if(form.checkValidity()) {
            makeCall("POST", "RegisterUser", new FormData(form), message, function(req) {
                // TODO: something?
                window.location.href = PAGES.LANDING;
            }, null);
        }
        else
            form.reportValidity();
    });

    // BROWSING
    document.getElementById("buttonBrowse").addEventListener("click", (e) => {
        let form = e.target.closest("form");
        appendElement(form, "input", {name: "guest", value: "true", hidden: true});
        let message = document.getElementById("errorRegister");
        makeCall("POST", "CheckLogin", new FormData(form), message, function(req) {
            // TODO: something?
            setUserInfo();
            window.location.href = PAGES.HOME;
        }, null);
    });

})();