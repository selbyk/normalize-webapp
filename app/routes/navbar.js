import Ember from 'ember';

export default Ember.Route.extend({
  setupController() {
      alert(this.routeName);
    },
    model() {

    }
});
