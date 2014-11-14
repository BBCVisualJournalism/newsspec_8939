define(['lib/news_special/bootstrap'], function (news) {
    var Model = function (data, populate) {
        this.TOTAL_SEATS_IN_CONTENTION = 36;
        this.data = data;
        this.senate_democrats_uncontested = 34;
        this.senate_democrats_contested = -1;
        this.senate_republican_contested = -1;
        this.senate_republican_uncontested = 30;
        this.pending = -1;
        this.house_democrats = -1;
        this.house_republican = -1;
        this.senate_democrats_total = -1;
        this.senate_republican_total = -1;
        this.independent_senate = -1;
        this.independent_house = -1;

        if (populate) {
            this.setValues();
        }
    };

    Model.prototype = {
        setValues: function () {
            /*
            senate
            The senate data comes in a total. Contested and uncontested data are both mixed up in this total.
            We already know how many seats are uncontested. crats = 34, GOP = 30.
            So it is simple subtraction to obtian contested results.
            (democrat uncontested results) = (democrat total) - (democrat uncontested)
            (GOP uncontested results) = (GOP total) - (GOP uncontested)
            */
            this.senate_democrats_contested = parseInt(this.data.senate_total.democrat, 10) - this.senate_democrats_uncontested;
            this.senate_republican_contested = parseInt(this.data.senate_total.republican, 10) - this.senate_republican_uncontested;

            /*
            pending
            There are 36 seats being contested altogether. To work out pending results just take away the sum of contested results for both parties.
            */
            this.pending = this.TOTAL_SEATS_IN_CONTENTION - (this.senate_democrats_contested + this.senate_republican_contested);

            //house
            this.house_democrats = parseInt(this.data.house_total.democrat, 10);
            this.house_republican = parseInt(this.data.house_total.republican, 10);

            //senate totals
            this.senate_democrats_total = parseInt(this.data.senate_total.democrat, 10);
            this.senate_republican_total = parseInt(this.data.senate_total.republican, 10);

            //indie totals
            this.independent_senate = parseInt(this.data.senate_total.independent, 10);
            this.independent_house = parseInt(this.data.house_total.independent, 10);
        }
    };
    return Model;
});