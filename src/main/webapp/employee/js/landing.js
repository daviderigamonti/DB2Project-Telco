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
                setSessionInfo(req.responseText, EMPLOYEE_SESSION);
                window.location.href = root() + PAGES.EMPLOYEE + PAGES.PAGES + PAGES.HOME;
            }, null);
        }
        else
            form.reportValidity();
    });

    // USER PRIVATE AREA
    document.getElementById("buttonUser").addEventListener("click", () => {
        window.location.href = root() + PAGES.USER + PAGES.LANDING;
    });

})();