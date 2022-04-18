/**
 *      Collections of interactive components for the employee application
 */

function PackageCreationForm(servicesDiv, validityPeriodsDiv, optionalProductsCheck,
                             addServiceButton, addValidityPeriodButton) {

    this.addServiceButton = addServiceButton;
    this.addValidityPeriodButton = addValidityPeriodButton;
    this.services = new ObjectList(Service, servicesDiv,
        null, Service.prototype.visCreationForm);
    this.validityPeriods = new ObjectList(ValidityPeriod, validityPeriodsDiv,
        null, ValidityPeriod.prototype.visCreationForm)
    this.optional = new ObjectList(OptionalProduct, optionalProductsCheck, function () {
        let self = this;
        //TODO: handler.message
        loadObjects(self, self.update, "GET", "LoadOptionalProducts", false, self.message,
            false, 'No optional packages available');
        }, OptionalProduct.prototype.visCheck);

    this.init = function() {
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
        this.optional.reset(this.optional);
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
}
