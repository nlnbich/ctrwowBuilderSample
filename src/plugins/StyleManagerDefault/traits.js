export default function (editor, opt = {}) {
  const trm = editor.TraitManager;
  //const textTrat = trm.getType('text');
  const contentTrat = trm.getType("content-textarea");

  !contentTrat && trm.addType('content-textarea', {
    events:{
      'keyup': 'onChange',
    },

    onValueChange: function () {
      const md = this.model;
      const target = md.target;
      target.set('content', md.get('value'));
    },

    getInputEl: function() {
      if(!this.inputEl) {
        this.inputEl = document.createElement('textarea');
        this.inputEl.value = this.target.get('content');
      }
      return this.inputEl;
    }
  });
}
