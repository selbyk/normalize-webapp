import Ember from 'ember';

export default Ember.Controller.extend({
  schema: Ember.inject.controller('schema'),
  attribute: null,
  actions: {
    addAttribute() {
        this.get('schema').send('addAttribute', this.get('attribute'));
        this.set('attribute', null);
      },
      clearAttribute() {
        this.set('attribute', null);
      },
      removeAttribute(attr) {
        this.get('schema').send('removeAttribute', attr);
        if (this.get('attribute') === attr) {
          this.set('attribute', null);
        }
      },
  }
});
