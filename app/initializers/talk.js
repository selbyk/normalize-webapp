import Talk from 'bcnf-live/services/talk';

export function initialize(container, application) {
  // application.inject('route', 'foo', 'service:foo');
  var talk = Talk.create();

  application.register('talk:current', talk, {
    instantiate: false
  });
  application.inject('route', 'Talk', 'talk:current');
  application.inject('component', 'Talk', 'talk:current');
  application.inject('controller', 'Talk', 'talk:current');
}



export default {
  name: 'talk',
  initialize: initialize
};
