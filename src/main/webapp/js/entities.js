function ServicePackage(parent, {id = 0, name = "",
    fixedPhoneServices = [], mobilePhoneServices = [], internetServices = []}) {

    this.parent = parent;
    this.id = id;
    this.name = name;
    this.fixedPhone = fixedPhoneServices;
    this.mobilePhone = mobilePhoneServices;
    this.internet = internetServices;

    this.listElement = function() {
        this.packageDIV = appendElement(this.parent, "div");
        appendElement(this.packageDIV, "div", {data: this.id});
        appendElement(this.packageDIV, "div", {data: this.name});

        let fixedPhoneList = new ObjectList(FixedPhonePkg, appendElement(this.packageDIV, "div"), null);
        let mobilePhoneList = new ObjectList(MobilePhonePkg, appendElement(this.packageDIV, "div"), null);
        let internetList = new ObjectList(InternetPkg, appendElement(this.packageDIV, "div"), null);

        fixedPhoneList.update(fixedPhoneList, this.fixedPhone);
        mobilePhoneList.update(mobilePhoneList, this.mobilePhone);
        internetList.update(internetList, this.internet);

        // Clickable rejected order
        this.packageDIV.addEventListener("click", () => {
            if(this.id)
                window.location.href = "buyservice.html";
            //TODO: proper redirect
        }, false);
    };

    this.comboElement = function() {
        appendElement(this.parent, "option", {data: this.name, value: this.id});
    }
}

function FixedPhonePkg(parent) {

    this.parent = parent;

    this.listElement = function() {
        appendElement(this.parent, "div", {data: "Fixed phone"});
    };
}

function MobilePhonePkg(parent, {minutes = 0, sms = 0,
    minuteFee = 0.0, smsFee = 0.0}) {

    this.parent = parent;
    this.minutes = minutes;
    this.sms = sms;
    this.minuteFee = minuteFee;
    this.smsFee = smsFee;

    this.listElement = function() {
        let info = "Mobile Phone: " +
            visInf(this.minutes) + " minutes + " + this.minuteFee + "€/extra minute" + "\n" +
            visInf(this.sms) + " SMS + " + this.smsFee + "€/extra sms";
        appendElement(this.parent, "div", {data: info});
    };
}

function InternetPkg(parent, {is_fixed = 1, gigabytes = 0, gigabyteFee = 0.0}) {

    this.parent = parent;
    this.fixed = is_fixed
    this.gigabytes = gigabytes;
    this.gigabyteFee = gigabyteFee;

    this.listElement = function() {
        let info = this.fixed ? "Fixed " : "Mobile "
        info += "Internet: " + visInf(this.gigabytes) + " GB + " + this.gigabyteFee + "€/extra GB";
        appendElement(this.parent, "div", {data: info});
    };
}

function Order(parent) {

    this.parent = parent;

    this.update = function(order) {
        //TODO: visualization of an order
    };
}

function RejectedOrder(parent) {

    this.parent = parent;
    this.orderDIV = null;
    this.id = null;

    this.update = function(order) {
        //TODO: temporary notation for attributes: id, timestamp, status, total

        this.id = order.id;

        this.orderDIV = appendElement(this.parent, "div")
        appendElement(this.orderDIV, "div", {data: order.id});
        appendElement(this.orderDIV, "div", {data: order.timestamp});
        appendElement(this.orderDIV, "div", {data: order.status});
        appendElement(this.orderDIV, "div", {data: order.total});

        // Clickable rejected order
        this.parent.addEventListener("click", () => {
            if(this.id)
                window.location.href = "confirmation.html";
            //TODO: proper redirect
        }, false);
    };
}

function ValidityPeriod(parent, {id = 0, months = 0, fee = 0.0}) {

    this.parent = parent;
    this.id = id;
    this.months = months;
    this.fee = fee

    this.comboElement = function() {
        let name = this.months + " months @ " + this.fee + " €/month";
        appendElement(this.parent, "option", {data: name, value: this.id});
    }
}

function OptionalProduct(parent, {id = 0, name = "", fee = 0.0}) {

    this.parent = parent;
    this.id = id;
    this.name = name;
    this.fee = fee

    this.listElement = function() {
        let productString = this.name + " @ " + this.fee + "€/month";
        let label = appendElement(this.parent, "label", {data: productString});
        appendElement(label, "input", {type: "checkbox", id: this.id});
    };
}