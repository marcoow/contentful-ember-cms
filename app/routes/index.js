import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    let request = new Request('/content/entries.json');
    let response = await fetch(request);
    return response.json();
  }
});
