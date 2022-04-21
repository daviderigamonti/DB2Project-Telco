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

                setSessionInfo(req.responseText);

                // Check if the user has a tracked order
                // If it is found, redirect to confirmation page
                makeCall("GET", "CheckTrackedOrder", null, message, function(req) {
                    if(req.responseText != null && strcmp(req.responseText, "true"))
                        window.location.href = root() + PAGES.USER + PAGES.CONFIRMATION;
                    else
                        window.location.href = root() + PAGES.USER + PAGES.HOME;
                }, null);

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
            makeCall("POST", "RegisterUser", new FormData(form), message, function() {
                alert("Registration successful!");
                window.location.href = root() + PAGES.LANDING;
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
        makeCall("POST", "CheckLogin", new FormData(form), message, function() {
            setSessionInfo();
            window.location.href = root() + PAGES.USER + PAGES.HOME;
        }, null);
    });

    // EMPLOYEE PRIVATE AREA
    document.getElementById("buttonEmployee").addEventListener("click", () => {
        window.location.href = root() + PAGES.EMP_LANDING;
    });

})();