# Newsspec-8939

US mid term elections 2014

## Getting started

Set up the project

```
grunt
```

Make images responsive

```
grunt images
```

Build World Service version

```
grunt translate
```

##How it works

This project was created using HTML/CSS/Javascript only. 
1. A request is made to http://www.bbc.co.uk/indepthtoolkit/data_set/us-midterms-2014 for elections data.
2. The data goes through validation, if successful, hydrates a model which works out percentages for a chart. 
3. This is then passed to a view for rendering. The view just adds some divs at a percentage width.

##Troubleshooting

If the data does not pass validation or the data request doesn't succeed for any reason the graph will result to a default display so...

1. Make sure the data is in the correct format

|               | democrat | republican | independent |
| ------------- |---------:| ----------:|------------:|
| senate_total  | 40       | 60         |0            |
| house_total   | 50       | 75         |0            |

```
{"senate_total":{"democrat":"36","republican":"30","independent":"0"},"house_total":{"democrat":"0","republican":"0","independent":"0"}}
```
2. Make sure that there are int values in all required sections. See json above.
3. Make sure the values make sense. If you try to add 100 republicans or democrats into the senate it will not validate. 
 * Senate democrats + republicans should not exceed 100
 * House democrats + republicans should not exceed 435

##Testing

Use fixtures to see and test what impact variances in data have on the chart. This is useful if changing the data at the endpoint is out of the question (this will be the case when the endpoint is being used for live data). 

To use fixture data, add your data to /source/js/spec/fixtures.js then edit /source/js/app.js to use it.

e.g. app.js
```
            require(['http://www.bbc.co.uk/indepthtoolkit/data_set/us-midterms-2014?callback=define'],
                function (data) {
                    var error,
                        validationObj,
                        modelObj,
                        viewObj;

                    //USE FIXTURE DATA INSTEAD
                    data = fixture['14'];

                    if (typeof data === 'undefined') {
                        error = true;
                    }

                    if (!error) {
                        validationObj = new Validation(data, true);
                        if (!validationObj.error) {
                            modelObj = new Model(data, true);
                            viewObj = new View(modelObj);
                        }
                    } else {
                        new View(false, false);
                    }
                }, function (err) {
                    new View(false, false);
                }
            );
```
You may need to add the fixture path as an argument the define function in app.js as well


e.g. in app.js

```
define(['fixture'], function (fixture) 
```

##If all esle fails

Just remove the javascript and hard code the chart and css values.

For example to show senate 50/50 split (with 1 Independent vote), and house 100/100 split (with 2 Independent votes) edit the following files as below.

source/tmpl/index.html.tmpl

```
...
<span class="midterms-widget__senate-results__crats">50*</span>
<span class="midterms-widget__senate-results__gop">50</span>
...
<span class="midterms-widget__senate-results__independent">Independent : 1</span>
...
<span class="midterms-widget__house-results__crats">100</span>
<span class="midterms-widget__house-results__gop">100</span>
<span class="midterms-widget__house-results__independent">Independent : 2</span>
```

source/scss/main.scss

```
...
.midterms-widget__senate-results__chart {
    margin: 10px 0 20px 0;
    height: 2em;
    width: 100%;
    .crat-uc {width:34%; float:left; background: #7A8DA2; height:100%;}
    .crat-c {width:16%; float:left; background: #1C3054; height:100%;}
    .pending {width:0; float:left; background: #FFF; height:100%;}
    .gop-c {width:20%; float:left; background: #AC1315; height:100%;}
    .gop-uc {width:30%; float:left; background: #CC696A; height:100%;}
}
...
```

Then run grunt, grunt live and deploy.

If you are dealing with compiled files you can do the same in the following files

* content/english/index.html
* content/english/css/main.css

## iFrame scaffold

This project was built using the iFrame scaffold v1.5.3

## License
Copyright (c) 2014 BBC
