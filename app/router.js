import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  //this.route('about');
  this.route('schema', function() {
    this.route('dependencies');
    this.route('normalize');
  });
});

export default Router;
