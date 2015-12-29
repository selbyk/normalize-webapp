import Ember from 'ember';
import _ from 'lodash/lodash';
var timeout;

export default Ember.Route.extend({
  formatModel(model) {
      model['3nf'] = _.map(_.compact(model['3nf']), (schema) => {
        return `R(${schema.join(', ')})`;
      });
      model['bcnf'] = _.map(_.compact(model['bcnf']), (schema) => {
        return `R(${schema.join(', ')})`;
      });
      console.log(model);
      return model;
    },
    setupController(controller, model) {
      this.Talk.publish('childRouteUpdated', this.get('routeName'));
      controller.set('model', this.formatModel(model));
    },
    model() {
      var _this = this;
      return new Ember.RSVP.Promise((resolve, reject) => {
        var onSentData = (data) => {
          clearTimeout(timeout);
          var fdObjToArray = (fd) => {
            return [fd.key, fd.value];
          };

          var requestData = {
            attrs: _.values(data.schemaAttrs),
            fds: _.map(data.functDependencies, fdObjToArray)
          };

          Ember.$.ajax({
              method: "POST",
              dataType: "json",
              url: "https://webtask.it.auth0.com/api/run/wt-selby_kendrick-gmail_com-0/fdalgos-wt",
              data: JSON.stringify(requestData),
              contentType: "application/json"
            })
            .done(function(response) {
              if (response) {
                resolve(response);
              } else {
                reject('error or something');
              }
            });
        };

        timeout = setTimeout(function() {
          _this.Talk.subscribe('sentData', _this, onSentData);
          _this.transitionTo('schema');
          _this.Talk.unsubscribe('sentData', _this, onSentData);
          reject('ere');
        }, 500);

        _this.Talk.subscribe('sentData', _this, onSentData);
        _this.Talk.publish('askedForData');
      });

    }
});
