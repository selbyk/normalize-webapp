import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Controller.extend({
  schema: Ember.inject.controller('schema'),
  fds: Ember.computed.reads('schema.fds'),
  fdKey: {},
  fdValue: {},
  keyAttrs: Ember.computed('fdKey', function() {
    return _.values(this.get('fdKey'));
  }),
  valueAttrs: Ember.computed('fdValue', function() {
    return _.values(this.get('fdValue'));
  }),
  actions: {
    droppedAsKey(attr) {
        //console.log(attr, 'droppedAsKey');
        if (attr.text) {
          this.set('fdKey', _.chain(this.get('fdKey'))
            .union([attr.text])
            .value());
        } else if (attr) {
          this.set('fdKey', _.chain(this.get('fdKey'))
            .union([attr])
            .value());
        }
      },
      droppedAsSchema(attr) {
        //console.log(attr, 'droppedAsSchema');
        if (attr.text) {
          this.set('fdValue', _.chain(this.get('fdValue'))
            .union([attr.text])
            .value());
        } else if (attr) {
          this.set('fdValue', _.chain(this.get('fdValue'))
            .union([attr])
            .value());
        }
      },
      selectedAsKey() {
        console.log('selectedAsKey');
        this.set('fdKey', _.chain(this.get('schema.attrs'))
          .filter((attr) => {
            return attr.selected;
          })
          .map((attr) => {
            return attr.text;
          })
          .union(this.get('fdKey'))
          .value());
        this.get('schema').send('clearSelection');
      },
      selectedAsValue() {
        console.log('selectedAsValue');
        this.set('fdValue', _.chain(this.get('schema.attrs'))
          .filter((attr) => {
            return attr.selected;
          })
          .map((attr) => {
            return attr.text;
          })
          .union(this.get('fdValue'))
          .value());
        this.get('schema').send('clearSelection');
      },
      saveFunctDep() {
        var key = this.get('fdKey');
        var value = this.get('fdValue');
        if (!_.isEmpty(key) && !_.isEmpty(value)) {
          let newFd = {
            key: key.sort(),
            value: value.sort()
          };
          newFd.hash = newFd.key.join('') + newFd.value.join('');
          this.set('fdKey', {});
          this.set('fdValue', {});
          this.get('schema').send('saveFunctDep', newFd);
        }
      },
      removeFd(fd) {
        this.get('schema').send('removeFd', fd);
      }
  }
});
