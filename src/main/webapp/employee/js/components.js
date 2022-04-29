/**
 *      Collections of interactive components for the employee application
 */

function PackageCreationForm(servicesDiv, validityPeriodsDiv, optionalProductsCheck,
                             addServiceButton, addValidityPeriodButton, loadOptional) {

    this.addServiceButton = addServiceButton;
    this.addValidityPeriodButton = addValidityPeriodButton;
    this.services = new ObjectList(Service, servicesDiv,
        null, Service.prototype.visCreationForm);
    this.validityPeriods = new ObjectList(ValidityPeriod, validityPeriodsDiv,
        null, ValidityPeriod.prototype.visCreationForm)
    this.optional = new ObjectList(OptionalProduct, optionalProductsCheck,
        loadOptional, OptionalProduct.prototype.visCheck);

    this.init = function() {
        this.loadDefaults();
        this.optional.load();
        this.addServiceButton.addEventListener("click", () => {
            this.services.add(this.services, {})
        });
        this.addValidityPeriodButton.addEventListener("click", () => {
            this.validityPeriods.add(this.validityPeriods, {})
        });
    }

    this.refresh = function() {
        this.optional.load();
    }

    this.reset = function() {
        this.services.reset(this.services);
        this.validityPeriods.reset(this.validityPeriods);
        this.loadDefaults();
        // Optionals are not reset
    }

    this.toObject = function() {

        let servicePackage = {};

        // Services
        let serviceTypes = Service.prototype.services;
        let allServices = this.services.toObject(this.services);
        for(let i = 0; i < serviceTypes.length; i++)
            servicePackage[serviceTypes[i].nameJSON] =
                allServices.filter(service => service.type === serviceTypes[i].svc);

        // Validity Periods
        servicePackage.validityPeriods = this.validityPeriods.toObject(this.validityPeriods);

        // Optional Products and the name are retrieved via DOM elements since it is easier

        return servicePackage;
    }

    this.loadDefaults = function() {
        this.validityPeriods.add(this.validityPeriods, {months: 12});
        this.validityPeriods.add(this.validityPeriods, {months: 24});
        this.validityPeriods.add(this.validityPeriods, {months: 36});
    }
}

function SalesReport(reportDiv, loadReport) {

    this.reportDiv = reportDiv;
    this.loadReport = loadReport;
    this.elements = [];

    this.init = function() {
        this.loadReport();
    }

    this.update = function(jsonElements) {
        // Repeat for every type of element present in the sales report
        for(let i = 0; i < SalesReportElement.prototype.elements.length; i++) {

            // Retrieve type and element list for the current iteration
            let jsonElementType = SalesReportElement.prototype.elements[i];
            let jsonElementGroup = jsonElements[jsonElementType.nameJSON];

            if(jsonElementGroup && jsonElementGroup.length > 0) {

                // Table heading and caption
                let elemTABLE = appendElement(this.reportDiv, "table");
                appendElement(elemTABLE, "caption", {innerHTML: jsonElementType.name});
                let elemHEADING = appendElement(elemTABLE, "tr");
                for (let j = 0; j < jsonElementType.properties.length; j++)
                    appendElement(elemHEADING, "th", {innerHTML: jsonElementType.properties[j]});

                // Create and fill a list with elements of the given type
                let elemGroupList = new ObjectList(SalesReportElement, elemTABLE,
                    null, SalesReportElement.prototype.visReport);
                for (let j = 0; j < jsonElementGroup.length; j++) {
                    // Add the type of the element to the element that needs to be created
                    jsonElementGroup[j][SalesReportElement.prototype.type] = jsonElementType;
                    // Add the element itself to its list
                    elemGroupList.add(elemGroupList, jsonElementGroup[j]);
                }

                this.elements.push(elemGroupList);
            }
        }
    }
}
