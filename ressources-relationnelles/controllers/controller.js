const Constants = require('./constants'); //Importer le fichier constants.js
const View = require('./view'); //Importer le fichier view.js

class Controller {
  constructor(url) {
    this._url = {};
    this._params = [];
    this._post = {};

    if ('/' === url.slice(-1)) {
      url = url.slice(0, -1);
    }

    url = url.split('/');

    if (url[0] === '') {
      url[0] = 'LandingPageController';
    } else {
      url[0] = url[0].charAt(0).toUpperCase() + url[0].slice(1) + 'Controller';
    }

    if (!url[1]) {
      url[1] = 'defaultAction';
    } else {
      url[1] += 'Action';
    }

    this._url.controller = url.shift();
    this._url.action = url.shift();
    this._params = url;
  }

  execute() {
    if (!global[this._url.controller]) {
      // Si le contrôleur n'existe pas, on affiche une erreur 404
      const notFoundMessage = 'Le contrôleur demandé n\'existe pas: ' + this._url.controller;
      View.show('404', { message: notFoundMessage });
      View.show('_layout/document', { body: View.getBufferContents() });
      return;
    }

    const pos = this._url.action.lastIndexOf('-');
    if (pos !== -1) {
      this._url.action = this._url.action.slice(0, pos) + this._url.action.charAt(pos + 1).toUpperCase() + this._url.action.slice(pos + 2);
    }

    const controller = new global[this._url.controller]();

    if (!controller[this._url.action]) {
      // Si l'action n'existe pas, on affiche une erreur 404
      const notFoundMessage = 'L\'action demandée n\'existe pas: ' + this._url.action;
      View.show('404', { message: notFoundMessage });
      View.show('_layout/document', { body: View.getBufferContents() });
      return;
    }

    // Traitement de l'authentification
    if (typeof session !== 'undefined') {
      if (session.user && session.user instanceof User) {
        session.user = User.getById(session.user.getId());
      } else {
        delete session.user;
      }
    }

    const result = controller[this._url.action](this._params, this._post, session);

    if (result === false) {
      throw new ControllerException(`L'action ${this._url.action} du contrôleur ${this._url.controller} a rencontré une erreur.`);
    } else if (result !== undefined) {
      View.resetBuffer();
      console.log(result);
    } else {
      const body = View.getBufferContents();
      View.show('_layout/document', { body });
    }
  }
}

const ControllerHelpers = {
  redirect(endpoint, options = {}) {
    session.alert = options.alert ?? session.alert ?? null;
    window.location = BASE_PATH + endpoint;
  },

  isAuthentified() {
    return !!session.user;
  },

  getCurrentUser() {
    return session.user;
  }
};

module.exports = { Controller, ControllerHelpers };

