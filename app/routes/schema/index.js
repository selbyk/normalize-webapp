import Ember from 'ember';

export default Ember.Route.extend({
  notifyParent: () => {
    this.Talk.publish('childRouteUpdated', this.get('routeName'));
  }.on('didTransition')
});
