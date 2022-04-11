function ServicePackage(parent) {

    this.parent = parent;
    this.id = null;

    this.update = function(service) {
        this.id = service.id;

        this.packageDIV = appendElement(this.parent, "div");
        appendElement(this.packageDIV, "div", {data: service.id});
        appendElement(this.packageDIV, "div", {data: service.name});
        let fixedPhoneDIV = appendElement(this.packageDIV, "div");
        let mobilePhoneDIV = appendElement(this.packageDIV, "div");
        let internetDIV = appendElement(this.packageDIV, "div");

        this.fixedPhone = new ObjectList(FixedPhonePkg, fixedPhoneDIV, null);
        this.mobilePhone = new ObjectList(MobilePhonePkg, mobilePhoneDIV, null);
        this.internet = new ObjectList(InternetPkg, internetDIV, null);

        this.fixedPhone.update(this.fixedPhone, service.fixedPhoneServices);
        this.mobilePhone.update(this.mobilePhone, service.mobilePhoneServices);
        this.internet.update(this.internet, service.internetServices);

        // Clickable rejected order
        this.packageDIV.addEventListener("click", () => {
            if(this.id)
                window.location.href = "buyservice.html";
            //TODO: proper redirect
        }, false);
    };
}

//TODO: might wanna do a single class for every package
function FixedPhonePkg(parent) {

    this.parent = parent;

    this.update = function(fixedPhone) {
        appendElement(this.parent, "div", {data: "Fixed phone"});
    };
}

function MobilePhonePkg(parent) {

    this.parent = parent;

    this.update = function(mobilePhone) {
        let info = "Mobile Phone: " +
            visInf(mobilePhone.minutes) + " minutes + " + mobilePhone.minuteFee + "€/extra minute" + "\n" +
            visInf(mobilePhone.sms) + " SMS + " + mobilePhone.minuteFee + "€/extra sms";
        appendElement(this.parent, "div", {data: info});
    };
}

function InternetPkg(parent) {

    this.parent = parent;

    this.update = function(internet) {
        let info = internet.is_fixed ? "Fixed " : "Mobile "
        info += "Internet: " + visInf(internet.gigabytes) + " GB + " + internet.gigabyteFee + "€/extra GB";
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

function OptionalProduct(parent) {

    this.parent = parent;

    this.update = function(product) {
        //TODO: temporary notation for attributes: id, name, monthlyFee

        let productString = product.name + " " + product.monthlyFee + "€/month";

        let label = appendElement(this.parent, "label", {data: productString});
        appendElement(label, "input", {type: "checkbox", id: product.id});
    };
}