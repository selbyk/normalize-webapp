import Ember from 'ember';
import _ from 'lodash/lodash';

var fixtures = {
  schemaAttrs: ['SECTION', 'STUDENT', 'TEACHER', 'TIME', 'COURSE', 'ROOM'],
  functDependencies: [{
    key: ['TIME', 'ROOM'],
    value: ['SECTION', 'STUDENT', 'TEACHER', 'COURSE']
  }, {
    key: ['SECTION', 'TIME'],
    value: ['SECTION', 'STUDENT', 'TEACHER', 'COURSE', 'ROOM']
  }, {
    key: ['STUDENT', 'SECTION', 'COURSE'],
    value: ['TEACHER', 'TIME', 'ROOM']
  }, {
    key: ['COURSE', 'SECTION'],
    value: ['TEACHER', 'TIME', 'ROOM']
  }, {
    key: ['STUDENT', 'TEACHER', 'TIME'],
    value: ['COURSE', 'SECTION', 'ROOM']
  }]
};

export default Ember.Route.extend({
  setupController(controller) {
    controller.Talk.subscribe('childRouteUpdated', controller, 'onChildRouteUpdated');
    controller.Talk.subscribe('askedForData', controller, 'onAskedForData');

    controller.set('schemaAttrs', _.chain(fixtures.schemaAttrs)
      .sort()
      .map(attr => {
        return {
          selected: false,
          text: attr
        };
      })
      .indexBy('text')
      .value());

    controller.set('functDependencies', _.chain(fixtures.functDependencies)
      .map(fd => {
        let newFd = {
          key: fd.key.sort(),
          value: fd.value.sort()
        };
        newFd.hash = newFd.key.join('') + newFd.value.join('');
        return newFd;
      })
      .indexBy('hash')
      .value());
  }
});
