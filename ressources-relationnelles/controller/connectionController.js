const client = require("./connectionDatabase");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Users = require("../model/users.js");
const logger = require("../pkg/logger/logger.js");

app.use(bodyParser.json());

module.exports = app.post("/login", async (req, res) => {
  // Recherche de l'utilisateur correspondant à l'adresse email
  logger.Applog(
    "d: recherche de l'utilisateur correspondant à l'adresse email..."
  );
  const { email, password } = req.body;
  logger.Applog("I: tentative de connexion de ", email, "...");

  const query = `SELECT * FROM users WHERE lower(email) = lower($1);`;
  const params = [email];

  client
    .query(query, params)
    .then((result) => {
      const user_json = result.rows[0];
      try {
        // Essai d'encapsulation
        logger.Applog("d: tentative d'encapsulation");
        const user_obj = new Users(
          user_json.id,
          user_json.firstname,
          user_json.lastname,
          user_json.username,
          user_json.email,
          user_json.password,
          user_json.permissions_level,
          user_json.birthday,
          user_json.sex
        );

        // Vérification du mot de passe
        logger.Applog("d: vérification du mot de passe...");
        user_obj
          .checkPassword(password)
          .then((verified) => {
            if (verified) {
              logger.Applog("d: mot de passe de ", email, " correct");
              return res.json(user_obj.toJSON());
            } else {
              logger.Applog("W: mot de passe de ", email, " incorrect");
              throw "incorrect_pass";
            }
          })
          .catch((err) => {
            logger.Applog(
              "W: nom d'utilisateur ou mot de passe incorrect: ",
              err
            );
            return res
              .status(401)
              .send("Nom d'utilisateur ou mot de passe incorrect.");
          });
      } catch (e) {
        logger.Applog("W: nom d'utilisateur ou mot de passe incorrect: ", err);
        return res
          .status(401)
          .send("Nom d'utilisateur ou mot de passe incorrect.");
      }
    })
    .catch((err) => {
      logger.Applog("E: Echec d'éxecution de la requếte: ", err);
    })
    .finally(() => {
      //
    });
});

app.post("/register", async (req, res) => {
  // Récupération des données envoyées dans la requête POST
  const { firstname, lastname, username, email, password, birthday, sex } =
    req.body;

  const select_query = `SELECT * FROM users WHERE lower(email) = lower($1);`;
  const select_params = [email];
  logger.Applog("I: tentative d'enregistrement de ", email, "...");

  client
    .query(select_query, select_params)
    .then((select_result) => {
      const user_json = select_result.rows[0];
      if (user_json === undefined) {
        Users.hashPassword(password).then((hashed_password) => {
          const insert_query =
            "INSERT INTO users(firstname, lastname, username, email, password, birthday, sex, permissions_level) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
          const insert_params = [
            firstname,
            lastname,
            username,
            email,
            hashed_password,
            birthday ? birthday.slice(0, 10) : null,
            sex,
            1,
          ];
          client
            .query(insert_query, insert_params)
            .then((insert_result) => {
              const newUser_json = insert_result.rows[0];
              const newUser_obj = new Users(
                newUser_json.id,
                newUser_json.firstname,
                newUser_json.lastname,
                newUser_json.username,
                newUser_json.email,
                newUser_json.password,
                newUser_json.permissions_level,
                newUser_json.birthday,
                newUser_json.sex
              );

              res.json(newUser_obj.toJSON());
            })
            .catch((err) => {
              logger.Applog("E: failed to execute query:", err);
              return res.status(401).send("Erreur côté serveur.");
            });
        });
      } else {
        logger.Applog(
          "W: register failed: ",
          "Un compte utilisant cette adresse existe déjà."
        );
        return res
          .status(401)
          .send("Un compte utilisant cette adresse existe déjà.");
      }
    })
    .catch((err) => {
      logger.Applog("E: Failed to execute query:", err);
    })
    .finally(() => {
      //
    });
});
