const logger = require('./logger.js')

main();

function main(){
    logger.Applog("I: Premier test");
    const error = "ceci est une erreur";
    logger.Applog("E: Deuxieme test: ", error);
    logger.Applog("d: Ca doit pas marcher");

    logger.SetVerbosity(6);
    logger.Applog("I: Troixieme test");
    const err = "ceci est une erreur";
    logger.Applog("E: Quatrieme test: ", error);
    logger.Applog("d: Cinquieme test");
    
}
