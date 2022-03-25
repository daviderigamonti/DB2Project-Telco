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
                // TODO: fill the current user session w/ JSON.parse(req.responseText);
                window.location.href = "home.html";
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
                window.location.href = "landing.html";
            }, null);
        }
        else
            form.reportValidity();
    });

    // BROWSING
    document.getElementById("buttonBrowse").addEventListener("click", () => {
        window.location.href = "home.html";
    });

})();