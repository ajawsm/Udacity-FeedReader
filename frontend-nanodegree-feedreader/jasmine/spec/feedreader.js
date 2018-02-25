/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {

    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* Checks to make sure that each feed has a URL present by looping through the allFeeds array
     */
    it('have URLs', function() {
      for (var x in allFeeds) {
        expect(allFeeds.url).not.toBe('');
        expect(allFeeds.url).toBeDefined();
      }
    });


    /* Loops through the allFeeds array and ensures each feed has a name.
     */
    it('have names', function() {
      for (var x in allFeeds) {
        expect(allFeeds.name).not.toBe('');
        expect(allFeeds.name).toBeDefined();
      }
    });
  });


  //Menu tests
  describe('The menu', function() {

    /* Checks to make sure that the 'menu-hidden' class is present
    and that the menu is hidden on index.html page load.
     */
    it('is hidden', function() {
      var hidden = $('body').hasClass('menu-hidden');
      expect(hidden).toBe(true);

    });

    /* Establishes a click icon to check that one odd number clicks,
    the menu is shown, and not shown on even numbered clicks of the hamburger icon.
     */
    it('is visible when clicked', function() {
      var visible = $('body').hasClass('slide-menu');
      var menuIcon = $('header').hasClass('a.menu-icon-link');
      clickMenu(function() {
          menuIcon.click();
          expect(visible).toBeTruthy();
          menuIcon.click();
          expect(visible).toBeFalsy();
      });
      clickMenu();
    });
  });

  describe('Initial Entries', function() {
    /* Loads the first feed in async and ensures that entries are present
    Uses beforeEach to ensure final values are present.
    hasEntryLink checks the article class for an entry value, meaning
    the API call has worked and that the entry is present and populated.
     */
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

  });
  it('loads feed', function(done) {
    var hasEntry = $('feed').hasClass('entry');
    var hasEntryLink = $('article').hasClass('entry');
    expect(hasEntry).toBe(true);
    expect(hasEntryLink).toBe(true);
    done();
  });
});

// Runs test to make sure everything is functioning properly when new feeds are selected
describe('New Feed Selection', function() {
  /*
  Uses beforeEach to load the first feed and stores the html in a variable.
  Then loads the second feed, stores that html in a variable.
  Reloads the first feed quickly, so the testing does not impact intended user expereince.
   */
  var feedOne;
  var feedTwo;


  beforeEach(function(done) {
    loadFeed(0, function() {
      feedOne = $('.feed').html();
      loadFeed(1, function() {
        done();
      });
    });
  });

  //Returns to the intended first feed following the check
  afterEach(function(done) {
    loadFeed(0, function() {
      done();
    });
  });

  //Ensures that the two feeds have different content.
  it('changes content with new entry', function(done) {
    feedTwo = $('.feed').html();
    expect(feedOne).not.toEqual(feedTwo);
    done();

  });

});

// This discussion forum question was very helpful: https://discussions.udacity.com/t/feedreader-testing-udacity-project/325668
// Also relied on documentation found here: https://jasmine.github.io/2.0/introduction.html
// And frequented the jQuery documentation: https://api.jquery.com/
