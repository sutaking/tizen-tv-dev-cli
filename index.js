/**
* author: zhaofeng.vip@gmail.com
*
 */
'use strict';

var TizenSDK = {
    get buildPackage() { return require('./buildPackage'); },
    get launchTarget() { return require('./launchTarget'); }
};

module.exports = TizenSDK;