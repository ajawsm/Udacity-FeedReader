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
        expect(allFeeds[x].url).not.toBe('');
        expect(allFeeds[x].url).toBeDefined();
      }
    });


    /* Loops through the allFeeds array and ensures each feed has a name.
     */
    it('have names', function() {
      for (var x in allFeeds) {
        expect(allFeeds[x].name).not.toBe('');
        expect(allFeeds[x].name).toBeDefined();
      }
    });
  });


  //Menu tests
  describe('The menu', function() {

    /* Checks to make sure that the 'menu-hidden' class is present
    and that the menu is hidden on index.html page load.
     */
    var hiddenMenu = $('body').hasClass('menu-hidden');
    var menuIcon = $('.menu-icon-link');
    it('is hidden', function() {

      expect(hiddenMenu).toBe(true);

    });

    /* Establishes a click icon variable, then clicks it twice to see if menu-hidden class is present in the body.
     */
    it('is visible when clicked', function() {

      menuIcon.click();
      expect($('body').hasClass('menu-hidden')).toBe(false);
      menuIcon.click();
      expect($('body').hasClass('menu-hidden')).toBe(true);


    });
  });
  //Initial Entries
  describe('Initial Entries', function() {
    /*
    Checks to be sure feed has at least one entry.
     */
    beforeEach(function(done) {
      loadFeed(0, done);
    });


    it('loads feed', function() {
      var hasEntries = $('.feed .entry');
      expect(hasEntries.length).not.toBe(0);
    });
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
      loadFeed(1, done);
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
