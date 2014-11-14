define(['lib/news_special/bootstrap'], function (news) {
    var Validation = function (data, doValidation) {
        this.data = data;
        this.error = false;
        this.houseDataExists = false;
        this.senateDataExists = false;

        if (doValidation) {
            this.senateDataExists = this.validateDataKeys('senate_total');
            this.houseDataExists = this.validateDataKeys('house_total');
            if (this.houseDataExists && this.senateDataExists) {
                if (!this.validateData('senate_total') || !this.validateData('house_total')) {
                    this.error = true;
                }
            } else {
                this.error = true;
            }
        }
    };

    Validation.prototype = {
        propertyChecker: function (property, obj) {
            var hasProp = false;
            if (obj.hasOwnProperty(property)) {
                hasProp = true;
            }
            return hasProp;
        },
        validateDataKeys: function (prop) {
            var validation = true;
            if (!this.propertyChecker(prop, this.data)) {
                validation = false;
            }

            if (validation) {
                if (!this.propertyChecker('democrat', this.data[prop]) ||
                    !this.propertyChecker('republican', this.data[prop]) ||
                    !this.propertyChecker('independent', this.data[prop])
                    ) {
                    validation = false;
                }
            }

            return validation;
        },
        validateData: function (type) {
            var validation = true,
                crat = parseInt(this.data[type].democrat, 10),
                gop = parseInt(this.data[type].republican, 10),
                indie = parseInt(this.data[type].independent, 10);

            if (typeof crat !== 'number' ||
                typeof gop !== 'number' ||
                typeof indie !== 'number' ||
                isNaN(crat) ||
                isNaN(gop) ||
                isNaN(indie)
                ) {
                validation = false;
                //console.log('err 0');
            }

            if (type === 'senate_total') {
                if (crat + gop > 100) {
                    validation = false;
                    //console.log('err 1');
                } else if (crat < 34 || gop < 30) {
                    validation = false;
                    //console.log('err 2');
                }
            } else if (type === 'house_total')  {
                if (crat + gop > 435) {
                    validation = false;
                    //console.log('err 3');
                }
            }
            return validation;
        }
    };

    return Validation;
});