/**
 *      Script for the employee landing page
 */

(function() {	// Hide from global scope

    // LOGIN
    document.getElementById("buttonLogin").addEventListener("click", (e) => {
        let form = e.target.closest("form");
        let message = document.getElementById("errorLogin");
        if(form.checkValidity()) {
            makeCall("POST", "CheckEmployeeLogin", new FormData(form), message, function(req) {
                setUserInfo(req.responseText);
                window.location.href = PAGES.ROOT + PAGES.EMPLOYEE + PAGES.HOME;
            }, null);
        }
        else
            form.reportValidity();
    });

    // EMPLOYEE PRIVATE AREA
    document.getElementById("buttonUser").addEventListener("click", () => {
        window.location.href = PAGES.ROOT + PAGES.LANDING;
    });

})();