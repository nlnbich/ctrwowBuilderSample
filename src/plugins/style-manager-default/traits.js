export default function (editor, opt = {}) {
  const trm = editor.TraitManager;
  const textTrat = trm.getType('text');

  trm.addType('content', {
    events:{
      'keyup': 'onChange',
    },

    onValueChange: function () {
      var md = this.model;
      var target = md.target;
      target.set('content', md.get('value'));
    },

    getInputEl: function() {
      if(!this.inputEl) {
        this.inputEl = textTrat.prototype.getInputEl.bind(this)();
        this.inputEl.value = this.target.get('content');
      }
      return this.inputEl;
    }
  });
}