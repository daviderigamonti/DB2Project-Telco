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
                window.location.href = PAGES.ROOT + PAGES.USER + PAGES.BUYSERVICE + "?ServicePackageID=" + this.id;
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


class Service {

    services = [{svc: FixedPhoneSvc, name: "Fixed Phone"},
                {svc: MobilePhoneSvc, name: "Mobile Phone"},
                {svc: InternetSvc, name: "Internet"}];

    constructor(parent) {
        this.parent = parent;
        this.container = null;
    }

    visCreationForm() {
        // Create the combobox for the service selection
        this.container = appendElement(this.parent, "div");
        let combo = appendElement(this.container, "select");
        for(let i = 0; i < this.services.length; i++)
            appendElement(combo, "option", {data: this.services[i].name, value: i});

        let contentDiv = appendElement(this.container, "div");

        // Change the content of the service based on the combobox selection
        combo.addEventListener("change", (e) => {
            let index = e.target.selectedIndex;
            contentDiv.innerHTML = "";
            // Instantiate the new object of the chosen type
            let svc = new this.services[index].svc(contentDiv);
            svc.visCreationForm();
        });

        // Button to remove the service
        let remove = appendElement(this.container, "input", {type: "button", value: "Remove"});
        remove.addEventListener("click", () => {
            if(this.container)
                this.container.remove();
        });

        // Select the first option and fire the corresponding event
        combo.options[0].selected = true;
        combo.dispatchEvent(new CustomEvent('change'));
    }

}

class FixedPhoneSvc {

    constructor(parent) {
        this.parent = parent;
    }

    visList() {
        appendElement(this.parent, "div", {data: "Fixed Phone"});
    };

    visCreationForm() {
        this.visList();
    }
}


class MobilePhoneSvc {

    constructor(parent, {minutes = 0, sms = 0,
            minuteFee = 0.0, smsFee = 0.0} = {}) {
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

    visCreationForm() {
        appendElement(this.parent, "div", {data: "Mobile Phone"});
        let minutesLabel = appendElement(this.parent, "label", {data: "Minutes:"});
        appendElement(minutesLabel, "input", {type: "number", name: "minutes"});
        let minutesFeeLabel = appendElement(this.parent, "label", {data: "Extra minute fee:"});
        appendElement(minutesFeeLabel, "input", {type: "number", name: "minuteFee"});
        let smsLabel = appendElement(this.parent, "label", {data: "SMS:"});
        appendElement(smsLabel, "input", {type: "number", name: "sms"});
        let smsFeeLabel = appendElement(this.parent, "label", {data: "Extra SMS fee:"});
        appendElement(smsFeeLabel, "input", {type: "number", name: "smsFee"});
    }
}

class InternetSvc {

    constructor(parent, {is_fixed = 1, gigabytes = 0, gigabyteFee = 0.0} = {}) {
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

    visCreationForm() {
        appendElement(this.parent, "div", {data: "Internet"});
        let fixedLabel = appendElement(this.parent, "label", {data: "Fixed:"});
        appendElement(fixedLabel, "input", {type: "checkbox",  name: "fixed", value: this.id});
        let gigabytesLabel = appendElement(this.parent, "label", {data: "Gigabytes:"});
        appendElement(gigabytesLabel, "input", {type: "number", name: "gigabytes"});
        let gigabyteFee = appendElement(this.parent, "label", {data: "Gigabyte Fee:"});
        appendElement(gigabyteFee, "input", {type: "number", name: "gigabyteFee"});
    }
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
                window.location.href = PAGES.ROOT + PAGES.USER + PAGES.CONFIRMATION + "?orderID=" + this.id;
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

    visCreationForm() {
        let validityPeriodDiv = appendElement(this.parent, "div");

        // Validity period data
        let monthsLabel = appendElement(validityPeriodDiv, "label", {data: "Months:"});
        appendElement(monthsLabel, "input", {type: "number", name: "months"});
        let feeLabel = appendElement(validityPeriodDiv, "label", {data: "Fee:"});
        appendElement(feeLabel, "input", {type: "number", name: "fee"});

        // Button to remove the validity period
        let remove = appendElement(validityPeriodDiv, "input", {type: "button", value: "Remove"});
        remove.addEventListener("click", () => {
            if(validityPeriodDiv)
                validityPeriodDiv.remove();
        });
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