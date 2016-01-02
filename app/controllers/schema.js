import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Controller.extend({
  schemaAttrs: {},
  functDependencies: {},
  attrs: Ember.computed('schemaAttrs', function() {
    return _.values(this.get('schemaAttrs'));
  }),
  fds: Ember.computed('functDependencies', function() {
    return _.chain(this.get('functDependencies'))
      .values()
      .map(fd => {
        return {
          raw: fd,
          pretty: `{${fd.key.join(', ')}} → {${fd.value.join(', ')}}`
        };
      })
      .sortBy('pretty')
      .value();
  }),
  prettySchema: Ember.computed('schemaAttrs', function() {
    return `R(${_.keys(this.get('schemaAttrs')).join(', ')})`;
  }),
  actions: {
    clearSelection() {
        console.log('clearSelection');
        let _this = this;
        _.chain(this.get('attrs'))
          .filter((attr) => {
            return attr.selected;
          })
          .forEach((value) => {
            _this.set(`schemaAttrs.${value.text}.selected`, false);
          }).commit();
      },
      addAttribute(attr) {
        console.log(attr);
        attr = attr ? attr.toUpperCase().replace(/[^A-Z\s]/g, '').trim().replace(/\s+/g, '-') : null;
        if (attr && attr.length > 0) {
          if (!_.includes(this.get('schemaAttrs'), attr)) {
            var attrObj = {};
            attrObj[attr] = {text: attr, selected: false};
            this.set('schemaAttrs', _.chain(attrObj).merge(this.get('schemaAttrs')).value());
          } else {
            Materialize.toast('Attribute already exists!', 4000, 'yellow black-text'); // 4000 is the duration of the toast
          }
        } else if (attr !== '') {
          Materialize.toast('Houston we have a problem!', 4000, 'yellow black-text'); // 4000 is the duration of the toast
        }
      },
      removeAttribute(attr) {
        if (this.get('attribute') === attr) {
          this.set('schemaAttrs', _.omit(this.get('schemaAttrs'), attr.text));
        } else if (attr) {
          this.set('schemaAttrs', _.omit(this.get('schemaAttrs'), attr.text));
        } else {
          attr = this.get('attribute');
          this.set('schemaAttrs', _.omit(this.get('schemaAttrs'), attr.text));
        }
        var fdHashes = _.chain(this.get('functDependencies'))
          .values()
          .filter(fd => {
            return _.includes(fd.key, attr.text) || _.includes(fd.value, attr.text);
          })
          .map(fd => {
            return fd.hash;
          })
          .value();
        this.set('functDependencies', _.omit(this.get('functDependencies'), fdHashes));

      },
      saveFunctDep(fd) {
        console.log('you even working?', fd);
        var fds = this.get('functDependencies');
        console.log('you even working?', fds);

        if (fds[fd.hash]) {
          Materialize.toast('Dependency already exists!', 4000, 'yellow black-text');
        }
        var thing = {};
        thing[fd.hash] = fd;
        this.set('functDependencies', _.merge(thing, this.get('functDependencies')));
      },
      removeFd(fd) {
        console.log(fd);
        this.set('functDependencies', _.omit(this.get('functDependencies'), fd.hash));
      },
      askWebTask() {
        alert('Too tired to do this part rn, but it definitely works: https://github.com/selbyk/fdAlgos.js');
      }
  },
  tabsInfo: [{
    id: 'index',
    title: 'Attributes'
  }, {
    id: 'dependencies',
    title: 'Functional Dependencies'
  }, {
    id: 'normalize',
    title: 'Normalize'
  }],
  selectedTab: 'index',
  tabStwitched: (context) => {
    switch (context.get('selectedTab')) {
      case 'index':
        context.transitionToRoute('schema.index');
        break;
      case 'dependencies':
        context.transitionToRoute('schema.dependencies');
        break;
      case 'normalize':
        context.transitionToRoute('schema.normalize');
        break;
    }
  }.observes('selectedTab'),
  onChildRouteUpdated(routeName) {
    this.set('selectedTab', routeName.slice(7));
  },
  onAskedForData() {
    console.log('ask');
    this.Talk.publish('sentData', {
      schemaAttrs: _.keys(this.get('schemaAttrs')),
      functDependencies: this.get('functDependencies')
    });
  }
});
