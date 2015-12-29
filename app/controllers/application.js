import Ember from 'ember';

export default Ember.Controller.extend({
  year: Ember.computed(() => {
    var time = new Date();
    return time.getFullYear() > 2015 ? ` - ${time.getFullYear()} ` : '';
  })
});
