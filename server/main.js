import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish('links', function() {
    return Links.find({});
  });
});

// execute whenever use visit with a route with token
// take the token and find the match link in Links collection
// if we find, redirect, or send our use to normal React app
function onRoute(req, res, next) {
  const link = Links.findOne({ token: req.params.token });
  if(link) {
    //$inc increment
    Links.update(link, { $inc: { clicks: 1 }});
    res.writeHead(307, { 'Location': link.url });
    res.end();
  } else {
    next();
  }
}

const middleware = ConnectRoute(function(router) {
  router.get('/:token', onRoute);
})

WebApp.connectHandlers.use(middleware);