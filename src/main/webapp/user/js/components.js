/**
 *      Collections of interactive components for the user application
 */

function ServiceForm(servicePackageCombo, servicesDiv, validityPeriodCombo, optionalProductsCheck,
                     loadServices, loadInfo) {

    this.service = new ObjectCombo(ServicePackage, servicePackageCombo,
        null, ServicePackage.prototype.visCombo);
    this.fixedPhone = new ObjectList(FixedPhoneSvc, appendElement(servicesDiv, "div"),
        null, FixedPhoneSvc.prototype.visList)
    this.mobilePhone = new ObjectList(MobilePhoneSvc, appendElement(servicesDiv, "div"),
        null, MobilePhoneSvc.prototype.visList)
    this.internet = new ObjectList(InternetSvc, appendElement(servicesDiv, "div"),
        null, InternetSvc.prototype.visList)
    this.validity = new ObjectCombo(ValidityPeriod, validityPeriodCombo,
        null, ValidityPeriod.prototype.visCombo);
    this.optional = new ObjectList(OptionalProduct, optionalProductsCheck,
        null, OptionalProduct.prototype.visCheck);
    this.loadServices = loadServices;
    this.loadInfo = loadInfo;

    this.init = function() {
        this.service.combo.addEventListener("change", (e) => {
            this.select(e.target.selectedIndex);
        });
        this.loadServices();
    }

    // Load service package information when selecting a new service package
    this.select = function(index) {
        let value = this.service.combo.options.item(index).value;
        if(value >= 0)
            this.loadInfo(value);
    }

    this.update = function(self, objects) {
        self.service.update(self.service, objects);
    }

    this.updateInfo = function(self, object) {
        // Extracts the services
        self.fixedPhone.update(self.fixedPhone, object.fixedPhoneServices);
        self.mobilePhone.update(self.mobilePhone, object.mobilePhoneServices)
        self.internet.update(self.internet, object.internetServices)
        // Extracts the validity periods
        self.validity.update(self.validity, object.validityPeriods);
        // Extracts the optional products
        self.optional.update(self.optional, object.optionalProducts);
    }
}

function Summary(SummaryObject, summary, load, visualize) {

    this.summary = summary;
    this.load = load;

    this.update = function(self, object) {
        // One object only is expected
        let p = new SummaryObject(self.summary, object);
        visualize.call(p);
    }
}
