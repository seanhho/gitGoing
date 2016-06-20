const router = require('express').Router();
const passport = require('passport');
const redisUtil = require('../util/redisUtil'); 

module.exports = function(app, redisClient) {
  let rUtil = redisUtil(redisClient);
  router.route('/auth/github')
    .get(passport.authenticate('github', { scope: [ 'user:email' ] }));

  router.route('/auth/github/callback') 
    .get(passport.authenticate('github', { failureRedirect: '/signin' }),
    function(req, res) {
      if(req.user) {
        const userId = req.user.profile.id;
        const userObj = {
          id: userId,
          accessToken: req.user.accessToken,
          displayName: req.user.profile.displayName,
          username: req.user.profile.username,
          profileUrl: req.user.profile.profileUrl,
          provider: req.user.profile.provider,
          photos: req.user.profile.photos 
        }
        rUtil.checkAndSet(userId,JSON.stringify(userObj));
      }
      
      res.redirect('/');
    });

  app.use('/api', router);
}

