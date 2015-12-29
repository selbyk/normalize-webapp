import Ember from 'ember';

export default Ember.Route.extend({
  setupController() {
    this.Talk.publish('childRouteUpdated', this.get('routeName'));
  }
});
