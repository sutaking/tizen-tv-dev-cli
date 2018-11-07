'use strict'

const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const app = function(appPath) {
    const name = 'AppInfo';
    let appName;

    const Log = function(str, err) {
        if (err) {
            console.error(`[${Date()}][${name}] ${str}`);
            return;
        }
        console.log(`[${Date()}][${name}] ${str}`);
    };

    // get config.xml path, default is root path of tizen app.
    let xmlPath = path.normalize(`${appPath}/config.xml`);
    Log(`Tizen App config xml path: ${xmlPath}`);

    // parser xml, get app id
    let parser = new xml2js.Parser();
    fs.readFile(xmlPath, (err, data) => {
        parser.parseString(data, (err, res) => {
            if (err) {
                Log(err, 'error');
                return;
            }            
            Log(`Read App Name: ${res.widget.name[0]}`);
            appName = res.widget.name[0];
        })
    });


    return {
        getName : appName
    }
    
}

module.exports = app;
