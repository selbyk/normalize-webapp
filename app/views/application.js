import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement() {
    Ember.$(".dropdown-button").dropdown({
      belowOrigin: true
    });
  }
});
