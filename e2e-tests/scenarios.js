'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/view1");
  });


  describe('view1', function() {

    beforeEach(function() {
      browser.get('index.html#/view1');
    });


    it('should render view1 when user navigates to /view1', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('route-planner', function() {

    beforeEach(function() {
      browser.get('index.html#/route-planner');
    });


    it('should render route-planner when user navigates to /route-planner', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for route-planner/);
    });

  });
});
