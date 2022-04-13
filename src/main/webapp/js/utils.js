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

const PAGES = {
    DEFAULT         : "landing.html",
    LANDING         : "landing.html",
    HOME            : "home.html",
    BUYSERVICE      : "buyservice.html",
    CONFIRMATION    : "confirmation.html",
}

const GUEST = {
    TRUE    : "GUEST_TRUE",
    FALSE   : "GUEST_FALSE"
}


/**
 * Compares two strings using the localeCompare function
 */
function strcmp(a, b) {
    return !a.localeCompare(b);
}

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

/**
 * Loads an aggregate of objects
 * @param {Object} self Reference to the aggregate itself
 * @param {Function} update Update method for the aggregate
 * @param {String} httpMethod HTTP method that will be used for the call
 * @param {String} url Url that will be used for the call
 * @param {Object} data Additional data to insert
 * @param {Element} responseTag Element where the eventual response message will be visualized
 * @param {Boolean} json Flag indicating if the data parameter contains JSON content
 * @param {String} emptyMessage Message that will be visualized in case the returned list is empty
 */
function loadObjects(self, update, httpMethod, url, data,
                     responseTag, json, emptyMessage) {
    makeCall(httpMethod, url, data, responseTag, function(req) {
        let elements = JSON.parse(req.responseText);
        if(elements.length === 0) {
            if(emptyMessage) {
                responseTag.className = "notificationMessage";
                responseTag.textContent = emptyMessage;
            }
            return;
        }
        update(self, elements);
    }, json);
}

/**
 * Puts user info into the session storage
 */
function setUserInfo(userInfoText = null) {
    let guest = GUEST.TRUE;
    clearStorage();
    if(userInfoText) {
        let userInfo = JSON.parse(userInfoText);
        sessionStorage.setItem("userID", userInfo.id);
        sessionStorage.setItem("username", userInfo.username);
        guest = GUEST.FALSE;
    }
    sessionStorage.setItem("guest", guest);
}

/**
 * Retrieves user info from the session storage
 */
function getUserInfo() {
    return {
        id: sessionStorage.getItem("userID"),
        username: sessionStorage.getItem("username"),
        guest: sessionStorage.getItem("guest")
    }
}

/**
 * Returns true if the user is logged in, or has identified themselves as a guest
 */
function checkUserInfo() {
    let userInfo = getUserInfo();
    return (strcmp(userInfo.guest, GUEST.FALSE) && userInfo.id && userInfo.username) ||
        (strcmp(userInfo.guest, GUEST.TRUE) && !userInfo.id && !userInfo.username)
}

/**
 * Clears information from the session storage
 */
function clearStorage() {
    sessionStorage.clear();
}

/*
 * If the number received as parameter is zero or less, substitute it with an infinity character
 */
function visInf(n) {
    if(n != null && n <= 0)
        return "∞";
    return n.toString();
}

/**
 * Creates an HTML element given a tag, fills it with data and appends it to the parent
 * Optional parameters are passed by name using javascript destructuring
 */
function appendElement(parent, tag,
                       {id = null, type = null, name = null,
                           value: value = null, data = null, hidden = null} = {}) {
    const el = document.createElement(tag);

    // DOM Element.id shouldn't be assigned an empty string
    if(id)
        el.id = id;

    el.type = type ?? "";
    el.name = name ?? "";
    el.value = value ?? "";
    el.hidden = hidden ?? false;
    el.innerHTML = data ?? "";

    parent.appendChild(el);

    return el;
}