/**
 *      Collections of interactive components
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
}