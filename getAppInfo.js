'use strict'

const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const name = 'AppInfo';

const Log = function(str, err) {
    if (err) {
        console.error(`[${Date()}][${name}] ${str}`);
        return;
    }
    console.log(`[${Date()}][${name}] ${str}`);
};

const appInfo = appPath => {
     // get config.xml path, default is root path of tizen app.
     let xmlPath = path.normalize(`${appPath}/config.xml`);
     Log(`Tizen App config xml path: ${xmlPath}`);

     return new Promise((resolve, reject) => {
        fs.readFile(xmlPath, (err, data) => {
            if (err) reject(err);

            resolve(data)
         });
     })
    .then(data => {
        // parser xml, get app id
        let parser = new xml2js.Parser();

        return new Promise(resolve => {
            parser.parseString(data, (err, res) => {
                if(!err) resolve(res.widget.name[0]);
            });
        });
     }).catch(err => {
        Log(err, 'error'); 
     });
     
}



module.exports = appInfo;
