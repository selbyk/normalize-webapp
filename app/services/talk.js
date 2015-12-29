import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented, {
  routeName() {
      var _this = this;
      return new Ember.RSVP.Promise((resolve, reject) => {
        if (_this.get('route')) {
          resolve('test');
        } else {
          _this.addObserver('route', _this, (sender, key, value) => {
            console.log(key, value);
            if (value) {
              resolve(value);
              _this.removeObserver('route', _this, this);
            }

          });
        }

      });
    },
    route: null,

    queue: [],
    publish: function() {
      return this.trigger.apply(this, arguments);
    },
    subscribe: function() {
      return this.on.apply(this, arguments);
    },
    unsubscribe: function() {
      return this.off.apply(this, arguments);
    }
});
