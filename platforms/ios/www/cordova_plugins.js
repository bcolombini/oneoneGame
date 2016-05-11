cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.admob.google/www/admob.js",
        "id": "com.admob.google.AdMobAds",
        "clobbers": [
            "window.admob",
            "window.tappx"
        ]
    },
    {
        "file": "plugins/com.google.cordova.admob/www/AdMob.js",
        "id": "com.google.cordova.admob.AdMob",
        "clobbers": [
            "window.AdMob"
        ]
    },
    {
        "file": "plugins/com.ionic.keyboard/www/keyboard.js",
        "id": "com.ionic.keyboard.keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/com.connectivity.monitor/www/connectivity.js",
        "id": "com.connectivity.monitor.connectivity",
        "clobbers": [
            "window.connectivity"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "android.support.v4": "1.0.0",
    "com.admob.google": "2.0.5",
    "com.google.cordova.admob": "2.6.3",
    "com.google.playservices": "19.0.0",
    "com.ionic.keyboard": "1.0.3",
    "org.apache.cordova.device": "0.2.13",
    "com.connectivity.monitor": "1.0.2",
    "com.ios.libgoogleadmobads": "1.0.0",
    "com.rjfun.cordova.extension": "1.0.6"
}
// BOTTOM OF METADATA
});