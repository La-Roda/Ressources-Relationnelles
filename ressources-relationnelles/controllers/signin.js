const ControllerHelpers = require('./ControllerHelpers');
const User = require('./User');
const View = require('./View');
const SignupController = require('./SignupController');
const password = require('password-hash');

class SigninController {
  defaultAction(params, post, session) {
    if (this.isAuthentified()) {
      this.redirect('/', {
        alert: {message: 'Vous êtes déjà connecté.', type: 'blue'}
      });
    }

    View.show('signin', {
      authentified: false,
      user: null,
      alert: session.alert ?? null
    });
  }

  authAction(params, post, session) {
    if (this.isAuthentified()) {
      this.redirect('/', {
        alert: {message: 'Vous êtes déjà connecté.', type: 'blue'}
      });
    } else if (!post.email || !post.password) {
      this.userError('Veuillez remplir tous les champs.');
    }

    this.checkCredentials(post.email, post.password);
  }

  logoutAction(params, post, session) {
    if (this.isAuthentified()) {
      session.destroy();
      this.redirect('/', {
        alert: {message: 'Déconnexion réussie.', type: 'green'}
      });
    } else {
      this.redirect('/', {
        alert: {
          message: 'Vous devez déjà être connecté pour pouvoir vous déconnecter.',
          type: 'red'
        }
      });
    }
  }

  checkCredentials(email, password) {
    const user = User.getByEmail(email);
    if (user) {
      if (password.verify(password, user.getHash())) {
        if (user.getConnectionCount() > 0) {
          session.user = user;
          this.redirect('/', {
            alert: {message: 'Connexion réussie.', type: 'green'}
          });
        } else {
          session.user_to_auth = user;
          this.redirect('/signin/edit-password', {
            alert: {
              message: 'Veuillez changer votre mot de passe.',
              type: 'green'
            }
          });
        }
      } else {
        this.userError('Vos identifiants sont incorrects.');
      }
    } else {
      this.userError('Aucun utilisateur avec cet identifiant existe.');
    }
  }

  userError(msg, type = 'red') {
    this.redirect('/signin', {
      alert: {message: msg, type: type}
    });
  }

  editPasswordAction(params, post, session) {
    if (post.password1 && post.password2) {
      const user = session.user_to_auth;
      if (post.password1 === post.password2) {
        user.setHash(password.generate(post.password1));
        user.setConnectionCount(user.getConnectionCount() + 1);
        user.update();

        session.user = user;
        this.redirect('/', {
          alert: {message: 'Mot de passe changé avec succès', type: 'green'}
        });
      } else {
        this.redirect('/signin/edit-password', {
          alert: {message: 'Les mots de passe ne correspondent pas', type: 'red'}
        });
      }
    }

    View.show('editPassword', {
      authentified: this.isAuthentified(),
      user: session.user ?? null,
      alert: session.alert ?? null
    });
  }

function resetPasswordAction(params, post, session) {
    if (!params.email) {
        // redirection si l'email n'est pas fourni
        res.redirect('/', {
            alert: {
                message: 'Veuillez renseigner votre adresse e-mail.',
                type: 'red'
            }
        });
    }

    const user = User.getByEmail(params.email);

    if (!user) {
        // redirection si aucun utilisateur n'est trouvé pour cet email
        res.redirect('/', {
            alert: {
                message: 'Aucun utilisateur avec cet e-mail n\'a été trouvé.',
                type: 'red'
            }
        });
    }

    const password = SignupController.generateRandomPassword(); // générer un mot de passe aléatoire
    user.setHash(password_hash(password, PASSWORD_DEFAULT));
    user.update();

    const to = user.getEmail();
    const subject = 'Changement de mot de passe !';
    const message = 'Votre mot de passe a été réinitialisé' + "\n" +
        'Voici vos identifiants pour se connecter aux Ressources Rellationnelles' + "\n" +
        'Email: ' + user.getEmail() + "\n" +
        'Mot de passe: ' + password + "\n" +
        'Votre mot de passe est généré aléatoirement, vous devrez le changer lors de votre première connexion.';
    // envoyer un email avec les informations de connexion
    sendMail(to, subject, message)
        .then(() => {
            res.redirect('/', {
                alert: {
                    message: 'Votre mot de passe a été réinitialisé, vous allez recevoir un mail contenant vos identifiants.',
                    type: 'green'
                }
            });
        })
        .catch((err) => {
            throw new Error('Erreur lors de l\'envoi du mail');
        });
}
