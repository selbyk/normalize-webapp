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
        console.log(attr, 'droppedAsKey');
        if (attr.text) {
          let newFdKey = {};
          newFdKey[attr.text] = attr.text;
          this.set('fdKey', _.merge(newFdKey, this.get('fdKey')));
        } else if (attr) {
          let newFdKey = {};
          newFdKey[attr] = attr;
          this.set('fdKey', _.merge(newFdKey, this.get('fdKey')));
        }
      },
      droppedAsSchema(attr) {
        console.log(attr, 'droppedAsSchema');
        if (attr.text) {
          let newFdValue = {};
          newFdValue[attr.text] = attr.text;
          this.set('fdValue', _.merge(newFdValue, this.get('fdValue')));
        } else if (attr) {
          let newFdValue = {};
          newFdValue[attr] = attr;
          this.set('fdValue', _.merge(newFdValue, this.get('fdValue')));
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
