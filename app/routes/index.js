import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    let request = new Request('/content/data.json');
    let response = await fetch(request);
    return response.json();
  }
});
