var cacheController = require('./cacheController');

module.exports = function (app, router) {

  router
    .get('/topStories', cacheController.topStories)
    .get('/showStories', cacheController.showStories)
    .get('/askStories', cacheController.askStories);

};
