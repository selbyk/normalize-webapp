import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement() {
    Ember.$('#schemaTabNav').pushpin({
      offset: Ember.$('#navbar').height()
    });
  }
});
