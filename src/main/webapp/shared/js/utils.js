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
    USER            : "user/",
    EMPLOYEE        : "employee/",
    PAGES           : "pages/",
    LANDING         : "landing.html",
    HOME            : "home.html",
    SALESREPORT     : "salesreport.html",
    BUYSERVICE      : "buyservice.html",
    CONFIRMATION    : "confirmation.html",
}

const GUEST = {
    TRUE    : "GUEST_TRUE",
    FALSE   : "GUEST_FALSE"
}

const GUEST_SESSION = 0;
const USER_SESSION = 1;
const EMPLOYEE_SESSION = 2;
const SESSION_NAMES = [
    {
        GUEST       : "guest"
    },
    {
        ID          : "userID",
        USERNAME    : "usr_username"
    },{
        ID          : "employeeID",
        USERNAME    : "emp_username"
}];


/**
 * Compares two strings using the localeCompare function
 */
function strcmp(a, b) {
    return !a.localeCompare(b);
}

/*
 * Returns the root url
 */
function root() {
    let r = new RegExp(/\/[^\/]+\//g);
    let root = r.exec(window.location.pathname);
    if(root)
        return root[0];
    return null;
}

/**
 * Returns the date given a UNIX timestamp
 */
function tsToDate(t) {
    return new Date(t);
}

/**
 * Formats Date and Time given a date
 */
function formatDateTime(date) {
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " @ " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
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
                responseTag.textContent += " - " + req.response;
            }
        }
    };

    req.open(httpMethod, root() + url);

    // If the request contains JSON data, the Content-Type of the request must be specified
    if(json)
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    if (data == null)
        req.send();
    else
        req.send(data);
}

/**
 * Returns the GET parameter identified by the name
 */
function checkGETParameter(name) {
    let urlString = window.location.href
    let url = new URL(urlString);
    let param = url.searchParams.get(name);
    if(param)
        return param;
    return null;
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
 * @param {Function} callback Function that will be called after loading the objects
 */
function loadObjects(self, update, httpMethod, url, data,
                     responseTag, json, emptyMessage, callback = null) {
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
        if(callback)
            callback();
    }, json);
}

/**
 * Puts user or employee info into the session storage
 */
function setSessionInfo(infoText = null, sessionSelector = USER_SESSION) {
    let guest = GUEST.TRUE;

    clearStorage();

    if(infoText) {
        let userInfo = JSON.parse(infoText);
        sessionStorage.setItem(SESSION_NAMES[sessionSelector].ID, userInfo.id);
        sessionStorage.setItem(SESSION_NAMES[sessionSelector].USERNAME, userInfo.username);
        guest = GUEST.FALSE;
    }
    sessionStorage.setItem(SESSION_NAMES[GUEST_SESSION].GUEST, guest);
}

/**
 * Retrieves user or employee info from the session storage
 */
function getSessionInfo(sessionSelector = USER_SESSION) {
    return {
        id: sessionStorage.getItem(SESSION_NAMES[sessionSelector].ID),
        username: sessionStorage.getItem(SESSION_NAMES[sessionSelector].USERNAME),
        guest: sessionStorage.getItem(SESSION_NAMES[GUEST_SESSION].GUEST)
    }
}


/**
 * Returns true if the user is logged in, or has identified themselves as a guest
 * If the login flag is set or the person is an employee, it returns true only if the user/employee has logged in
 */
function checkSessionInfo(loggedIn = false, sessionSelector = USER_SESSION) {
    let logged = loggedIn;
    let userInfo = getSessionInfo(sessionSelector);

    if(sessionSelector === EMPLOYEE_SESSION)
        logged = true;

    return ((!userInfo.guest || strcmp(userInfo.guest, GUEST.FALSE)) && userInfo.id && userInfo.username) ||
        (userInfo.guest && strcmp(userInfo.guest, GUEST.TRUE) && !userInfo.id && !userInfo.username && !logged)
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
function appendElement(parent, tag, info = {}) {
    const el = document.createElement(tag);

    // Put all the info in the new element
    for(let property in info) {
        let value = info[property];
        if(value)
            el[property] = value;
    }

    parent.appendChild(el);

    return el;
}

/*
 * Chooses which buttons (access/logout) to display in case the user is logged in or not
 */
function displayAccessOrLogout(buttonAccess, buttonLogout) {
    if(checkSessionInfo(true)) {
        buttonAccess.remove();
        buttonAccess = null;
    }
    else {
        buttonLogout.remove();
        buttonLogout = null;
    }
    // since the buttons are not primitive types, they are passed by reference,
    // no return statement is needed
}