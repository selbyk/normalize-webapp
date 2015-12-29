import Ember from 'ember';
import DraggableComponent from 'ember-drag-drop/components/draggable-object';

export default DraggableComponent.extend({
  removeAttribute: 'removeAttribute',
  classNames: ['attributeBtn'],
  classNameBindings: ['content.selected'],
  isDraggable: true,
  isSelectable: true,
  isRemovable: true,
  dragReady: true,
  isSortable: false,
  click() {
    if (this.get('isSelectable')) {
      this.set('content.selected', !this.get('content.selected'));
    }
  },
  touchCancel() {
    if (this.get('isSelectable')) {
      this.set('content.selected', !this.get('content.selected'));
    }
  },
  actions: {
    removeAttribute() {
      console.log('removeAttribute component');
      this.sendAction('removeAttribute', this.get('content'));
    }
  }
});
