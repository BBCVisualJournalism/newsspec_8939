define(['lib/news_special/bootstrap', 'lib/news_special/share_tools/controller', 'validation', 'model', 'view'], function (news, shareTools, Validation, Model, View) {

    return {
        init: function () {
            news.pubsub.emit('istats', ['app-initiated', 'newsspec-nonuser', true]);
            news.sendMessageToremoveLoadingImage();

            require(['http://www.bbc.co.uk/indepthtoolkit/data_set/us-midterms-2014?callback=define'],
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
