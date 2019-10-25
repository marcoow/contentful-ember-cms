import Controller from '@ember/controller';

export default Controller.extend({
  get titles() {
    return this.model.map((model) => model.fields.title['en-US']);
  }
});
