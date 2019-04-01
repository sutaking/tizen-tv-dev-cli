'use strict'

const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const name = 'ConfigInfo';

const Log = function (str, err) {
    if (err) {
        console.error(`[${Date()}][${name}] ${str}`);
        return;
    }
    console.log(`[${Date()}][${name}] ${str}`);
};

const appInfo = (appPath, type) => {

    Log(`launch App Type: ${type}`);

    // tizen-dotnet app, tpk type
    if (type !== '.wgt') {
        return console.log('Todo .....');
    }

    return new Promise((resolve, reject) => {

        // get config.xml path, default is root path of tizen app.
        let xmlPath = path.normalize(`${appPath}/config.xml`);
        Log(`Tizen App config xml path: ${xmlPath}`);

        fs.readFile(xmlPath, (err, data) => {
            if (err) reject(err);

            resolve(data);
        });
    })
        .then(data => {
            // parser xml, get app id
            let parser = new xml2js.Parser();

            return new Promise((resolve, reject) => {
                parser.parseString(data, (err, res) => {
                    if (err) reject(err);

                    let tizenApp = res.widget['tizen:application'][0]['$'].id;
                    Log(tizenApp);

                    resolve(tizenApp.split('.')[1]);
                });
            });
        }).catch(err => {
            Log(err, 'error');
        });

}



module.exports = appInfo;
