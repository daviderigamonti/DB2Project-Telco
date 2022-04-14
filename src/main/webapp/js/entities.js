class ServicePackage {

    constructor(parent, {id = 0, name = "",
            fixedPhoneServices = [], mobilePhoneServices = [],
            internetServices = []}) {
        this.parent = parent;
        this.id = id;
        this.name = name;
        this.fixedPhone = fixedPhoneServices;
        this.mobilePhone = mobilePhoneServices;
        this.internet = internetServices;
    }

    visListClickable() {
        this.packageDIV = appendElement(this.parent, "div");
        appendElement(this.packageDIV, "div", {data: this.name});

        let fixedPhoneList = new ObjectList(FixedPhoneSvc, appendElement(this.packageDIV, "div"),
            null, FixedPhoneSvc.prototype.visList);
        let mobilePhoneList = new ObjectList(MobilePhoneSvc, appendElement(this.packageDIV, "div"),
            null, MobilePhoneSvc.prototype.visList);
        let internetList = new ObjectList(InternetSvc, appendElement(this.packageDIV, "div"),
            null, InternetSvc.prototype.visList);

        fixedPhoneList.update(fixedPhoneList, this.fixedPhone);
        mobilePhoneList.update(mobilePhoneList, this.mobilePhone);
        internetList.update(internetList, this.internet);

        // Clickable rejected order
        this.packageDIV.addEventListener("click", () => {
            if (this.id && this.id > 0)
                window.location.href = PAGES.BUYSERVICE + "?ServicePackageID=" + this.id;
        }, false);
    }

    // TODO: duplicate code -> find a way to generalize entity visualization methods
    visSummaryServices() {
        this.packageDIV = appendElement(this.parent, "div");
        appendElement(this.packageDIV, "div", {data: this.name});

        let fixedPhoneList = new ObjectList(FixedPhoneSvc, appendElement(this.packageDIV, "div"),
            null, FixedPhoneSvc.prototype.visList);
        let mobilePhoneList = new ObjectList(MobilePhoneSvc, appendElement(this.packageDIV, "div"),
            null, MobilePhoneSvc.prototype.visList);
        let internetList = new ObjectList(InternetSvc, appendElement(this.packageDIV, "div"),
            null, InternetSvc.prototype.visList);

        fixedPhoneList.update(fixedPhoneList, this.fixedPhone);
        mobilePhoneList.update(mobilePhoneList, this.mobilePhone);
        internetList.update(internetList, this.internet);
    }

    visCombo() {
        appendElement(this.parent, "option", {data: this.name, value: this.id});
    }
}


class FixedPhoneSvc {

    constructor(parent) {
        this.parent = parent;
    }

    visList() {
        appendElement(this.parent, "div", {data: "Fixed phone"});
    };
}


class MobilePhoneSvc {

    constructor(parent, {minutes = 0, sms = 0,
            minuteFee = 0.0, smsFee = 0.0}) {
        this.parent = parent;
        this.minutes = minutes;
        this.sms = sms;
        this.minuteFee = minuteFee;
        this.smsFee = smsFee;
    }

    visList() {
        let info = "Mobile Phone: " +
            visInf(this.minutes) + " minutes + " + this.minuteFee + "€/extra minute" + "\n" +
            visInf(this.sms) + " SMS + " + this.smsFee + "€/extra sms";
        appendElement(this.parent, "div", {data: info});
    };
}

class InternetSvc {

    constructor(parent, {is_fixed = 1, gigabytes = 0, gigabyteFee = 0.0}) {
        this.parent = parent;
        this.fixed = is_fixed
        this.gigabytes = gigabytes;
        this.gigabyteFee = gigabyteFee;
    }

    visList() {
        let info = this.fixed ? "Fixed " : "Mobile "
        info += "Internet: " + visInf(this.gigabytes) + " GB + " + this.gigabyteFee + "€/extra GB";
        appendElement(this.parent, "div", {data: info});
    };
}

class Order {

    constructor(parent, {id = 0, servicePackage = null, validityPeriod = null,
            optionalProducts = [], timestamp = null, status = null, total = 0.0}) {
        this.parent = parent;
        this.id = id;
        this.servicePackage = new ServicePackage(parent, {
            id: servicePackage.id, name: servicePackage.name,
            fixedPhoneServices: servicePackage.fixedPhoneServices,
            mobilePhoneServices: servicePackage.mobilePhoneServices,
            internetServices: servicePackage.internetServices
        });
        this.validityPeriod = new ValidityPeriod(parent, {
            id: validityPeriod.id, months: validityPeriod.months, fee: validityPeriod.fee
        });
        this.optionalProducts = optionalProducts;
        this.timestamp = timestamp;
        this.status = status;
        this.total = total;
    }

    visSummary() {
        this.servicePackage.visSummaryServices();
        this.validityPeriod.visSummary();

        let optionalProductsList = new ObjectList(OptionalProduct, appendElement(this.parent, "div"),
            null, OptionalProduct.prototype.visSummary);
        optionalProductsList.update(optionalProductsList, this.optionalProducts);

        appendElement(this.parent, "div", {data: "Total: " + this.total + "€"});
    }

    visRejectedList() {
        let orderDIV = appendElement(this.parent, "div");

        appendElement(orderDIV, "div", {data: this.id});

        this.servicePackage.parent = orderDIV;
        this.servicePackage.visSummaryServices();

        let date = formatDateTime(tsToDate(this.timestamp));

        appendElement(orderDIV, "div", {data: date});
        appendElement(orderDIV, "div", {data: "Status: " + this.status});
        appendElement(orderDIV, "div", {data: "Total: " + this.total + "€"});

        // Clickable rejected order
        orderDIV.addEventListener("click", () => {
            if(this.id)
                window.location.href = PAGES.CONFIRMATION + "?orderID=" + this.id;
        }, false);
    }
}

class ValidityPeriod {

    constructor(parent, {id = 0, months = 0, fee = 0.0}) {
        this.parent = parent;
        this.id = id;
        this.months = months;
        this.fee = fee
    }

    visCombo() {
        let name = this.months + " months @ " + this.fee + " €/month";
        appendElement(this.parent, "option", {data: name, value: this.id});
    }

    visSummary() {
        let info = this.months + " months @ " + this.fee + " €/month";
        appendElement(this.parent, "div", {data: info});
    }
}

class OptionalProduct {

    constructor(parent, {id = 0, name = "", fee = 0.0}) {
        this.parent = parent;
        this.id = id;
        this.name = name;
        this.fee = fee
    }

    visCheck() {
        let productString = this.name + " @ " + this.fee + "€/month";
        let label = appendElement(this.parent, "label", {data: productString});
        appendElement(label, "input", {type: "checkbox",  name: "optionalProducts", value: this.id});
    };

    visSummary() {
        let info = this.name + " @ " + this.fee + "€/month";
        appendElement(this.parent, "div", {data: info});
    };
}