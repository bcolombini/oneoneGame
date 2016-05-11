// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','starter.controllers'])

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('game', {
                url: "/game",
                cache:false,
                templateUrl: "view/game.html",
                controller: "IndexCtrl"
            })

            .state('start', {
                url: "/",
                cache:false,
                templateUrl: "view/start.html",
                controller: "StartCtrl"
            })
            .state('help', {
                url: "/help",
                cache:false,
                templateUrl: "view/help.html",
                controller: "HelpCtrl"
            })

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');

    });
