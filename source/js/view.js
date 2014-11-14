define(['lib/news_special/bootstrap'], function (news) {

    var View = function (data, error) {
        this.data = data;
        this.error = error;

        if (this.data && !error) {
            this.renderSenateChart();
            this.renderSenateResults();
            this.renderHouseResults();
            this.renderIndependentResults();
        }
    };

    View.prototype = {
        renderSenateChart: function () {
            news.$('.crat-uc').css('width', this.data.senate_democrats_uncontested + '%');
            news.$('.crat-c').css('width', this.data.senate_democrats_contested + '%');
            news.$('.pending').css('width', this.data.pending + '%');
            news.$('.gop-c').css('width', this.data.senate_republican_contested + '%');
            news.$('.gop-uc').css('width', this.data.senate_republican_uncontested + '%');
        },
        renderSenateResults: function () {
            news.$('.midterms-widget__senate-results__crats').html(this.data.senate_democrats_total + '&#42;');
            news.$('.midterms-widget__senate-results__gop').html(this.data.senate_republican_total);
        },
        renderHouseResults: function () {
            news.$('.midterms-widget__house-results__crats').html(this.data.house_democrats);
            news.$('.midterms-widget__house-results__gop').html(this.data.house_republican);
        },
        renderIndependentResults: function () {
            if (this.data.independent_senate > 0) {
                news.$('.midterms-widget__senate-results__independent').html('Independent &#58; ' + this.data.independent_senate);
            }
            if (this.data.independent_house > 0) {
                news.$('.midterms-widget__house-results__independent').html('<p>Independent &#58; ' + this.data.independent_house);
            }
        }
    };

    return View;
});