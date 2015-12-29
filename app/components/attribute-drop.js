import Ember from 'ember';
import DropTargetComponent from 'ember-drag-drop/components/draggable-object-target';

export default DropTargetComponent.extend({
  classNames: "card-panel",
  click() {
    console.log('click');
    this.send('acceptForPress');
    //pressedAction
    //if (this.get('isSelectable')) {
    //this.set('selected', !this.get('selected'));
    //}
  },
  touchCancel() {
    console.log('touch');
    this.send('acceptForPress');
    //pressedAction
    //if (this.get('isSelectable')) {
    //this.set('selected', !this.get('selected'));
    //}
  },
  actions: {
    acceptForPress: function() {
      console.log('pressed', this.get('pressedAction'));
      this.sendAction('pressedAction');
    }
  }
});
