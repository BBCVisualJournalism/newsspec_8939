define(['lib/news_special/bootstrap', 'lib/news_special/share_tools/controller', 'validation', 'model', 'view'], function (news, shareTools, Validation, Model, View) {

    return {
        init: function () {
            news.pubsub.emit('istats', ['app-initiated', 'newsspec-nonuser', true]);
            news.sendMessageToremoveLoadingImage();

            require(['http://www.stage.bbc.co.uk/indepthtoolkit/data-sets/us_midterms_2014/jsonp'],
                function (data) {
                    var error,
                        validationObj,
                        modelObj,
                        viewObj;

                    if (typeof data === 'undefined') {
                        error = true;
                    }

                    if (!error) {
                        validationObj = new Validation(data, true);
                        if (!validationObj.error) {
                            modelObj = new Model(data, true);
                            viewObj = new View(modelObj);
                        }
                    }
                }, function (err) {
                    new View(false, false);
                }
            );
        }
    };

});
