define(['lib/news_special/bootstrap', 'validation', 'spec/fixtures', 'model'],  function (news, Validation, fixtures, Model) {

    describe('Validation', function () {
        var data,
            validationObj

        beforeEach(function () {
            data = {'senate_total':{'democrat':'','republican':'','independent':''},'house_total':{'democrat':'','republican':'','independent':''}};
            validationObj = new Validation(data);
        });

        it('propertyChecker returns correct values', function () {
            expect(validationObj.propertyChecker('senate_total', validationObj.data)).toBeTruthy();
            expect(validationObj.propertyChecker('house_total', validationObj.data)).toBeTruthy();
            expect(validationObj.propertyChecker('test', validationObj.data)).toBeFalsy();
            expect(validationObj.propertyChecker('democrat', validationObj.data)).toBeFalsy();
            expect(validationObj.propertyChecker('republican', validationObj.data)).toBeFalsy();
            expect(validationObj.propertyChecker('independent', validationObj.data)).toBeFalsy();
            //second level
            expect(validationObj.propertyChecker('democrat', validationObj.data.senate_total)).toBeTruthy();
            expect(validationObj.propertyChecker('republican', validationObj.data.senate_total)).toBeTruthy();
            expect(validationObj.propertyChecker('independent', validationObj.data.senate_total)).toBeTruthy();
            expect(validationObj.propertyChecker('democrat', validationObj.data.house_total)).toBeTruthy();
            expect(validationObj.propertyChecker('republican', validationObj.data.house_total)).toBeTruthy();
            expect(validationObj.propertyChecker('independent', validationObj.data.house_total)).toBeTruthy();
        });

        it('validateDataKeys returns correct values', function () {
            expect(validationObj.validateDataKeys('senate_total')).toBeTruthy();
            expect(validationObj.validateDataKeys('house_total')).toBeTruthy();
            expect(validationObj.validateDataKeys('test')).toBeFalsy();
            expect(validationObj.validateDataKeys('house_totalz')).toBeFalsy();
        });

        it('validateDataKeys returns correct value when SENATE GOP data doesnt exist', function () {
            delete validationObj.data.senate_total.republican;
            expect(validationObj.validateDataKeys('senate_total')).toBeFalsy();
            expect(validationObj.validateDataKeys('house_total')).toBeTruthy();
        });

        it('validateDataKeys returns correct value when SENATE DEMOCRAT data doesnt exist', function () {
            delete validationObj.data.senate_total.democrat;
            expect(validationObj.validateDataKeys('senate_total')).toBeFalsy();
            expect(validationObj.validateDataKeys('house_total')).toBeTruthy();
        });

        it('validateDataKeys returns correct value when HOUSE GOP data doesnt exist', function () {
            delete validationObj.data.house_total.republican;
            expect(validationObj.validateDataKeys('senate_total')).toBeTruthy();
            expect(validationObj.validateDataKeys('house_total')).toBeFalsy();
        });

        it('validateDataKeys returns correct value when HOUSE DEMOCRAT data doesnt exist', function () {
            delete validationObj.data.house_total.democrat;
            expect(validationObj.validateDataKeys('senate_total')).toBeTruthy();
            expect(validationObj.validateDataKeys('house_total')).toBeFalsy();
        });

        it('validateData returns correct values with no data', function () {
            expect(validationObj.validateData('senate_total')).toBeFalsy();
            expect(validationObj.validateData('house_total')).toBeFalsy();
        });

        it('validateData returns correct values with SENATE 50/50 split and HOUSE majority (dataset 1)', function () {
            validationObj.data = fixtures['1'];
            expect(validationObj.validateData('senate_total')).toBeTruthy();
            expect(validationObj.validateData('house_total')).toBeTruthy();
        });

        it('validateData returns correct values with GOP winning SENATE and HOUSE w/pending senate votes (dataset 2)', function () {
            validationObj.data = fixtures['2'];
            expect(validationObj.validateData('senate_total')).toBeTruthy();
            expect(validationObj.validateData('house_total')).toBeTruthy();
        });

        it('validateData returns correct values with GOP winning SENATE and HOUSE including independents w/pending senate votes (dataset 3)', function () {
            validationObj.data = fixtures['3'];
            expect(validationObj.validateData('senate_total')).toBeTruthy();
            expect(validationObj.validateData('house_total')).toBeTruthy();
        });

        it('validateData returns correct with GOP winning SENATE and HOUSE (dataset 4)', function () {
            validationObj.data = fixtures['4'];
            expect(validationObj.validateData('senate_total')).toBeTruthy();
            expect(validationObj.validateData('house_total')).toBeTruthy();
        });

        it('validateData returns correct values with DEMOCRATS winning SENATE and HOUSE including independents w/pending senate votes (dataset 5)', function () {
            validationObj.data = fixtures['5'];
            expect(validationObj.validateData('senate_total')).toBeTruthy();
            expect(validationObj.validateData('house_total')).toBeTruthy();
        });

        it('validateData returns correct values with GOP winning SENATE and DEMOCRATS winning HOUSE (dataset 6)', function () {
            validationObj.data = fixtures['6'];
            expect(validationObj.validateData('senate_total')).toBeTruthy();
            expect(validationObj.validateData('house_total')).toBeTruthy();
        });

        it('validateData returns correct values with DEMOCRATS winning SENATE and HOUSE 50/50 split w/pending senate votes (dataset 7)', function () {
            validationObj.data = fixtures['7'];
            expect(validationObj.validateData('senate_total')).toBeTruthy();
            expect(validationObj.validateData('house_total')).toBeTruthy();
        });

        it('validateData returns correct values with suspect data (dataset 8)', function () {
            validationObj.data = fixtures['8'];
            expect(validationObj.validateData('senate_total')).toBeFalsy();
            expect(validationObj.validateData('house_total')).toBeTruthy();
        });

        it('validateData returns correct values with suspect data (dataset 9)', function () {
            validationObj.data = fixtures['9'];
            expect(validationObj.validateData('senate_total')).toBeTruthy();
            expect(validationObj.validateData('house_total')).toBeFalsy();
        });

        it('validateData returns correct values with suspect data (dataset 10)', function () {
            //this highlights that another rule may need to be added 
            //democrats will never have 70 in senate
            validationObj.data = fixtures['10'];
            expect(validationObj.validateData('senate_total')).toBeTruthy();
            expect(validationObj.validateData('house_total')).toBeTruthy();
        });

        it('validateData returns correct values with suspect data (dataset 11)', function () {
            validationObj.data = fixtures['11'];
            expect(validationObj.validateData('senate_total')).toBeFalsy();
            expect(validationObj.validateData('house_total')).toBeTruthy();
        });

        it('validateData returns correct values with suspect data (dataset 12)', function () {
            validationObj.data = fixtures['12'];
            expect(validationObj.validateData('senate_total')).toBeFalsy();
            expect(validationObj.validateData('house_total')).toBeTruthy();
        });

        it('validateData returns correct values with suspect data (dataset 13)', function () {
            validationObj.data = fixtures['13'];
            expect(validationObj.validateData('senate_total')).toBeFalsy();
            expect(validationObj.validateData('house_total')).toBeFalsy();
        });
    });

    describe('Model', function () {
        var data,
            modelObj;
        it('Model hydrates correctly with SENATE 50/50 split and HOUSE majority (dataset 1)', function () {
            modelObj = new Model(fixtures['1'], true);
            //house
            expect(modelObj.house_democrats).toEqual(100);
            expect(modelObj.house_republican).toEqual(135);
            //independent
            expect(modelObj.independent_house).toEqual(0);
            expect(modelObj.independent_senate).toEqual(0);
            //senate
            expect(modelObj.senate_democrats_contested).toEqual(16);
            expect(modelObj.senate_democrats_total).toEqual(50);
            expect(modelObj.senate_democrats_uncontested).toEqual(34);
            expect(modelObj.senate_republican_contested).toEqual(20);
            expect(modelObj.senate_republican_total).toEqual(50);
            expect(modelObj.senate_republican_uncontested).toEqual(30);
            //pending
            expect(modelObj.pending).toEqual(0);
        });

        it('Model hydrates correctly with GOP winning SENATE and HOUSE with pending votes (dataset 2)', function () {
            modelObj = new Model(fixtures['2'], true);
            //house
            expect(modelObj.house_democrats).toEqual(50);
            expect(modelObj.house_republican).toEqual(61);
            //independent
            expect(modelObj.independent_house).toEqual(0);
            expect(modelObj.independent_senate).toEqual(0);
            //senate
            expect(modelObj.senate_democrats_contested).toEqual(0);
            expect(modelObj.senate_democrats_total).toEqual(34);
            expect(modelObj.senate_democrats_uncontested).toEqual(34);
            expect(modelObj.senate_republican_contested).toEqual(0);
            expect(modelObj.senate_republican_total).toEqual(30);
            expect(modelObj.senate_republican_uncontested).toEqual(30);
            //pending
            expect(modelObj.pending).toEqual(36);
        });

        it('Model hydrates correctly with GOP winning SENATE and HOUSE including independents w/pending senate votes (dataset 3)', function () {
            modelObj = new Model(fixtures['3'], true);
            //house
            expect(modelObj.house_democrats).toEqual(10);
            expect(modelObj.house_republican).toEqual(20);
            //independent
            expect(modelObj.independent_house).toEqual(1);
            expect(modelObj.independent_senate).toEqual(1);
            //senate
            expect(modelObj.senate_democrats_contested).toEqual(5);
            expect(modelObj.senate_democrats_total).toEqual(39);
            expect(modelObj.senate_democrats_uncontested).toEqual(34);
            expect(modelObj.senate_republican_contested).toEqual(15);
            expect(modelObj.senate_republican_total).toEqual(45);
            expect(modelObj.senate_republican_uncontested).toEqual(30);
            //pending
            expect(modelObj.pending).toEqual(16);
        });

        it('Model hydrates correctly with GOP winning SENATE and HOUSE (dataset 4)', function () {
            modelObj = new Model(fixtures['4'], true);
            //house
            expect(modelObj.house_democrats).toEqual(135);
            expect(modelObj.house_republican).toEqual(156);
            //independent
            expect(modelObj.independent_house).toEqual(0);
            expect(modelObj.independent_senate).toEqual(0);
            //senate
            expect(modelObj.senate_democrats_contested).toEqual(6);
            expect(modelObj.senate_democrats_total).toEqual(40);
            expect(modelObj.senate_democrats_uncontested).toEqual(34);
            expect(modelObj.senate_republican_contested).toEqual(30);
            expect(modelObj.senate_republican_total).toEqual(60);
            expect(modelObj.senate_republican_uncontested).toEqual(30);
            //pending
            expect(modelObj.pending).toEqual(0);
        });

        it('Model hydrates correctly with DEMOCRATS winning SENATE and HOUSE including independents w/pending senate votes (dataset 5)', function () {
            modelObj = new Model(fixtures['5'], true);
            //house
            expect(modelObj.house_democrats).toEqual(5);
            expect(modelObj.house_republican).toEqual(2);
            //independent
            expect(modelObj.independent_house).toEqual(3);
            expect(modelObj.independent_senate).toEqual(0);
            //senate
            expect(modelObj.senate_democrats_contested).toEqual(11);
            expect(modelObj.senate_democrats_total).toEqual(45);
            expect(modelObj.senate_democrats_uncontested).toEqual(34);
            expect(modelObj.senate_republican_contested).toEqual(10);
            expect(modelObj.senate_republican_total).toEqual(40);
            expect(modelObj.senate_republican_uncontested).toEqual(30);
            //pending
            expect(modelObj.pending).toEqual(15);
        });

        it('Model hydrates correctly with GOP winning SENATE and DEMOCRATS winning HOUSE (dataset 6)', function () {
            modelObj = new Model(fixtures['6'], true);
            //house
            expect(modelObj.house_democrats).toEqual(150);
            expect(modelObj.house_republican).toEqual(105);
            //independent
            expect(modelObj.independent_house).toEqual(0);
            expect(modelObj.independent_senate).toEqual(0);
            //senate
            expect(modelObj.senate_democrats_contested).toEqual(11);
            expect(modelObj.senate_democrats_total).toEqual(45);
            expect(modelObj.senate_democrats_uncontested).toEqual(34);
            expect(modelObj.senate_republican_contested).toEqual(25);
            expect(modelObj.senate_republican_total).toEqual(55);
            expect(modelObj.senate_republican_uncontested).toEqual(30);
            //pending
            expect(modelObj.pending).toEqual(0);
        });

        it('Model hydrates correctly with DEMOCRATS winning SENATE and HOUSE 50/50 split w/pending senate votes (dataset 7)', function () {
            modelObj = new Model(fixtures['7'], true);
            //house
            expect(modelObj.house_democrats).toEqual(200);
            expect(modelObj.house_republican).toEqual(200);
            //independent
            expect(modelObj.independent_house).toEqual(0);
            expect(modelObj.independent_senate).toEqual(0);
            //senate
            expect(modelObj.senate_democrats_contested).toEqual(5);
            expect(modelObj.senate_democrats_total).toEqual(39);
            expect(modelObj.senate_democrats_uncontested).toEqual(34);
            expect(modelObj.senate_republican_contested).toEqual(5);
            expect(modelObj.senate_republican_total).toEqual(35);
            expect(modelObj.senate_republican_uncontested).toEqual(30);
            //pending
            expect(modelObj.pending).toEqual(26);
        });
    });
});