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
        appendElement(this.packageDIV, "div", {innerHTML: this.name});

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
                window.location.href = root() + PAGES.USER + PAGES.PAGES + PAGES.BUYSERVICE +
                    "?ServicePackageID=" + this.id;
        }, false);
    }

    visSummaryServices() {
        this.packageDIV = appendElement(this.parent, "div");
        appendElement(this.packageDIV, "div", {innerHTML: this.name});

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
        appendElement(this.parent, "option", {innerHTML: this.name, value: this.id});
    }
}


class Service {

    constructor(parent) {
        this.parent = parent;
        this.container = null;
        this.service = null;
    }

    visCreationForm() {
        // Create the combobox for the service selection
        this.container = appendElement(this.parent, "div");
        let combo = appendElement(this.container, "select", {name: "serviceType"});
        for(let i = 0; i < Service.prototype.services.length; i++)
            appendElement(combo, "option", {innerHTML: Service.prototype.services[i].name, value: i});

        let contentDiv = appendElement(this.container, "div");

        // Change the content of the service based on the combobox selection
        combo.addEventListener("change", (e) => {
            let index = e.target.selectedIndex;
            contentDiv.innerHTML = "";
            // Instantiate the new object of the chosen type
            this.service = new Service.prototype.services[index].svc(contentDiv);
            this.service.visCreationForm();
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

    toObject() {
        return this.service.toObject();
    }

}

class FixedPhoneSvc {

    constructor(parent) {
        this.parent = parent;
    }

    visList() {
        appendElement(this.parent, "div", {innerHTML: Service.prototype.services[0].name});
    };

    visCreationForm() {
        this.visList();
    }

    toObject() {
        return {type: FixedPhoneSvc};
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
        appendElement(this.parent, "div", {innerHTML: info});
    };

    visCreationForm() {
        appendElement(this.parent, "div", {innerHTML: Service.prototype.services[1].name});
        let minutesLabel = appendElement(this.parent, "label", {innerHTML: "Minutes:"});
        let minutesInput = appendElement(minutesLabel, "input",
            {type: "number", name: "minutes", min: 0});
        minutesInput.addEventListener("input", (e) => this.minutes = e.currentTarget.value);
        let minutesFeeLabel = appendElement(this.parent, "label", {innerHTML: "Extra minute fee:"});
        let minutesFeeInput = appendElement(minutesFeeLabel, "input",
            {type: "number", name: "minuteFee", step: 0.01, min: 0});
        minutesFeeInput.addEventListener("input", (e) => this.minuteFee = e.currentTarget.value);
        let smsLabel = appendElement(this.parent, "label", {innerHTML: "SMS:"});
        let smsInput = appendElement(smsLabel, "input", {type: "number",
            name: "sms", min: 0});
        smsInput.addEventListener("input", (e) => this.sms = e.currentTarget.value);
        let smsFeeLabel = appendElement(this.parent, "label", {innerHTML: "Extra SMS fee:"});
        let smsFeeInput = appendElement(smsFeeLabel, "input",
            {type: "number", name: "smsFee", step: 0.01, min: 0});
        smsFeeInput.addEventListener("input", (e) => this.smsFee = e.currentTarget.value);
    }

    toObject() {
        return {type: MobilePhoneSvc, minutes: this.minutes, minuteFee: this.minuteFee, sms: this.sms, smsFee: this.smsFee};
    }
}

class InternetSvc {

    constructor(parent, {is_fixed = false, gigabytes = 0, gigabyteFee = 0.0} = {}) {
        this.parent = parent;
        this.fixed = is_fixed
        this.gigabytes = gigabytes;
        this.gigabyteFee = gigabyteFee;
    }

    visList() {
        let info = this.fixed ? "Fixed " : "Mobile "
        info += "Internet: " + visInf(this.gigabytes) + " GB + " + this.gigabyteFee + "€/extra GB";
        appendElement(this.parent, "div", {innerHTML: info});
    };

    visCreationForm() {
        appendElement(this.parent, "div", {innerHTML: Service.prototype.services[2].name});
        let fixedLabel = appendElement(this.parent, "label", {innerHTML: "Fixed:"});
        let fixedInput = appendElement(fixedLabel, "input", {type: "checkbox",  name: "fixed"});
        fixedInput.addEventListener("input", (e) => this.fixed = e.currentTarget.checked || false);
        let gigabytesLabel = appendElement(this.parent, "label", {innerHTML: "Gigabytes:"});
        let gigabytesInput = appendElement(gigabytesLabel, "input",
            {type: "number", name: "gigabytes", min: 0});
        gigabytesInput.addEventListener("input", (e) => this.gigabytes = e.currentTarget.value);
        let gigabyteFee = appendElement(this.parent, "label", {innerHTML: "Gigabyte Fee:"});
        let gigabyteFeeInput = appendElement(gigabyteFee, "input",
            {type: "number", name: "gigabyteFee", step: 0.01, min: 0});
        gigabyteFeeInput.addEventListener("input", (e) => this.gigabyteFee = e.currentTarget.value);
    }

    toObject() {
        return {type: InternetSvc, is_fixed: this.fixed || false, gigabytes: this.gigabytes, gigabyteFee: this.gigabyteFee};
    }
}

Service.prototype.services = [  {svc: FixedPhoneSvc, name: "Fixed Phone", nameJSON: "fixedPhoneServices"},
                                {svc: MobilePhoneSvc, name: "Mobile Phone", nameJSON: "mobilePhoneServices"},
                                {svc: InternetSvc, name: "Internet", nameJSON: "internetServices"}];

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

        appendElement(this.parent, "div", {innerHTML: "Total: " + this.total + "€"});
    }

    visRejectedList() {
        let orderDIV = appendElement(this.parent, "div");

        appendElement(orderDIV, "div", {innerHTML: this.id});

        this.servicePackage.parent = orderDIV;
        this.servicePackage.visSummaryServices();

        let date = formatDateTime(tsToDate(this.timestamp));

        appendElement(orderDIV, "div", {innerHTML: date});
        appendElement(orderDIV, "div", {innerHTML: "Status: " + this.status});
        appendElement(orderDIV, "div", {innerHTML: "Total: " + this.total + "€"});

        // Clickable rejected order
        orderDIV.addEventListener("click", () => {
            if(this.id)
                window.location.href = root() + PAGES.USER + PAGES.PAGES + PAGES.CONFIRMATION + "?orderID=" + this.id;
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
        appendElement(this.parent, "option", {innerHTML: name, value: this.id});
    }

    visSummary() {
        let info = this.months + " months @ " + this.fee + " €/month";
        appendElement(this.parent, "div", {innerHTML: info});
    }

    visCreationForm() {
        let validityPeriodDiv = appendElement(this.parent, "div");

        // Validity period data
        let monthsLabel = appendElement(validityPeriodDiv, "label", {innerHTML: "Months:"});
        let monthsInput = appendElement(monthsLabel, "input",
            {type: "number", name: "months", value: this.months || "", min: 0});
        monthsInput.addEventListener("input", (e) => this.months = e.currentTarget.value);
        let feeLabel = appendElement(validityPeriodDiv, "label", {innerHTML: "Monthly fee:"});
        let feeInput = appendElement(feeLabel, "input",
            {type: "number", name: "fee", value: this.fee || "", step: 0.01, min: 0});
        feeInput.addEventListener("input", (e) => this.fee = e.currentTarget.value);

        // Button to remove the validity period
        let remove = appendElement(validityPeriodDiv, "input", {type: "button", value: "Remove"});
        remove.addEventListener("click", () => {
            if(validityPeriodDiv)
                validityPeriodDiv.remove();
        });
    }

    toObject() {
        return {months: this.months, fee: this.fee};
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
        let label = appendElement(this.parent, "label", {innerHTML: productString});
        appendElement(label, "input", {type: "checkbox",  name: "optionalProducts", value: this.id});
    };

    visSummary() {
        let info = this.name + " @ " + this.fee + "€/month";
        appendElement(this.parent, "div", {innerHTML: info});
    };
}

class SalesReportElement {

    constructor(parent, elem = {}) {
        this.parent = parent;
        // Retrieve the element type
        this.elementType = elem[SalesReportElement.prototype.type];
        this.elem = elem;
    }

    visReport() {
        let row = appendElement(this.parent, "tr");
        for (let i = 0; i < this.elementType.properties.length; i++) {
            let value = this.elem[this.elementType.properties[i]];
            let data = value != null ? value.toString() : "N/D";
            appendElement(row, "td", {innerHTML: data});
        }
    }
}
SalesReportElement.prototype.type = "typeJSON";
SalesReportElement.prototype.elements = [
    {nameJSON: "PurchasesPerPackage", name: "Purchases for a given package",
        properties: ["id", "name", "purchases"]},
    {nameJSON: "PurchasesPerPackagePeriod", name: "Purchases for a given package and validity period",
        properties: ["id", "name", "months", "purchases"]},
    {nameJSON: "TotalPerPackage", name: "Total earnings for a given package",
        properties: ["id", "name", "total", "totalBeforeOptionals"]},
    {nameJSON: "AvgOptPerPackage", name: "Average optional packages chosen",
        properties: ["id", "name", "avgOptionals"]},
    {nameJSON: "InsolventUsers", name: "Insolvent users",
        properties: ["id", "mail", "username", "failed_payments", "is_insolvent"]},
    // mail and username are unwrapped from user, name is unwrapped from servicePackage
    {nameJSON: "RejectedOrders", name: "Suspended orders",
        properties: ["id", "mail", "username", "name", "timestamp", "status", "total"]},
    {nameJSON: "Audits", name: "Audits",
        properties: ["userID", "timestamp", "mail", "username", "amount"]},
    {nameJSON: "BestSellerOptional", name: "Best selling optional",
        properties: ["id", "name", "totalSales"]},
];
