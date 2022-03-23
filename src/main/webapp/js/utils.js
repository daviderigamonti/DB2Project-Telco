/**
 *      Collection of utilities
 */

const HTTP_CODES = {
    success			: 200,
    badRequest		: 400,
    unauthorized	: 401,
    forbidden		: 403,
    unavailable		: 404
}
const DEFAULT_PAGE = "landing.html";

/**
 * Makes a call to the server, utilizing the XMLHttpRequest object
 * @param {String} httpMethod HTTP method to use for the call
 * @param {String} url Url to use for the call
 * @param {Object} data Additional data that will be added to the call
 * @param {Element} responseTag Element that will contain the response message
 * @param {Function} callBack Function that will be called after a positive answer from the server
 * @param {Boolean} json Flag indicating if the data parameter contains JSON content
 */
function makeCall(httpMethod, url, data, responseTag,
                  callBack, json) {

    let req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if(req.readyState === XMLHttpRequest.DONE) {
            if(req.status === HTTP_CODES.success)
                callBack(req);
            else if(req.status === HTTP_CODES.unauthorized ||
                    req.status === HTTP_CODES.forbidden) {
                // TODO: empty the current user session
                window.location.href = DEFAULT_PAGE;
            }
            else {
                responseTag.className = "errorMessage";
                responseTag.textContent = "Error " + req.status;
                //responseTag.textContent += " - " + req.response; DEBUG
            }
        }
    };

    req.open(httpMethod, url);

    // If the request contains JSON data, the Content-Type of the request must be specified
    if(json)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    if (data == null)
        req.send();
    else
        req.send(data);
}