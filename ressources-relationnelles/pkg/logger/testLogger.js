const logger = require('./logger.js')

main();

function main(){
    logger.Applog("I: Premier test");
    const error = "ceci est une erreur";
    logger.Applog("E: Deuxieme test: ", error);
    logger.Applog("d: Ca doit pas marcher");
    logger.Applog("U: Probleme Urgent !");
    logger.Applog("W: un warning surviens");

    logger.SetVerbosity(8);
    logger.Applog("I: Troisieme test");
    const err = "ceci est une erreur";
    logger.Applog("E: Quatrieme test: ", error);
    logger.Applog("d: Cinquieme test");
    logger.Applog("u: log concernant l'utilisateur");
    logger.Applog("D: besoin de debug ?");
    
}
