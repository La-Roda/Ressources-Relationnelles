const User = require('./User');
const View = require('./View');

class SignupController {
    defaultAction(params, post, session) {
        if (this.isAuthentified()) {
            this.redirect('/', { alert: { message: 'Vous êtes déjà connecté.', type: 'blue' }});
        }
        View.show('signup', {
            authentified: false,
            user: null,
            alert: session.alert ?? null,
        });
    }

    postAction() {
        if (this.isAuthentified()) {
            this.redirect('/', { alert: { message: 'Vous êtes déjà connecté.', type: 'blue' }});
        } else if (!post.email || !post.lastName || !post.firstName) {
            this.userError('Veuillez remplir tous les champs.');
        }

        const user = User.getByEmail(post.email);
        
        if (user) {
            this.userError('Votre compte existe déjà, ou cette adresse-mail est déjà utilisée');
        } else {
            this.createUser();
        }
    }

    createUser(req, res) {
    const { email, firstName, lastName } = req.body;

    const user = new User(email, firstName, lastName, '$2y$10$ecbqAqsHQZ.xXVzCN93P5ucVv7J4vUlNDeCZ315HsxLzPdaYwXsMC');

    const password = this.generateRandomPassword();
    user.setHash(bcrypt.hashSync(password, 10));
    user.save();

    sendMail(email, password)
        .then(() => {
            const sessionData = {
                user,
                alert: {
                    message: 'Inscription réussie.\nVous venez de recevoir un email avec vos identifiants de connexion (regardez dans vos spams)',
                    type: 'green'
                }
            };
            req.session = sessionData;
            res.redirect('/');
        })
        .catch((err) => {
            console.error(err);
            this.userError('Erreur lors de l\'envoi du mail', 'red');
        });
	}

	userError(msg, type = 'red') {
    	res.redirect('/signup/', { alert: { message: msg, type: type } });
	}

	generateRandomPassword(chars = 12) {
		const comb = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		const shfl = comb.split('').sort(() => 0.5 - Math.random()).join('');
		return shfl.substr(0, chars);
	}
}
module.exports = SignupController;
