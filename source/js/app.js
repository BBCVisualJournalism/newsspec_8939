define(['lib/news_special/bootstrap', 'lib/news_special/share_tools/controller', 'validation', 'model', 'view', 'lib/vendors/atomic'], function (news, shareTools, Validation, Model, View, atomic) {

    return {
        init: function () {
            var error,
                validationObj,
                modelObj,
                viewObj;

            news.pubsub.emit('istats', ['app-initiated', 'newsspec-nonuser', true]);
            news.sendMessageToremoveLoadingImage();

            atomic.get('http://www.bbc.co.uk/indepthtoolkit/data-sets/us-midterms-2014/json')
            .success(function (data) {
                validationObj = new Validation(data, true);
                if (!validationObj.error) {
                    modelObj = new Model(data, true);
                    viewObj = new View(modelObj);
                }
            })
            .error(function (data) {
                new View(false, false);
            });
        }
    };
});
