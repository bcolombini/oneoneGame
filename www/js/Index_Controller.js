/**
 * Created by brunocolombini on 01/02/15.
 */
angular.module('starter.controllers', [])

    .controller("IndexCtrl",function($scope,$timeout,$ionicModal){

        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'fade-in'

        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            window.location.href = "#/";
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });

        var stop = true;

        $scope.st = 0;
        $scope.click = 0;

        $scope.cores = [cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor(),cor()];

        $scope.position = 0;
        function cor(){
            return Math.floor(Math.random()*2);
        }

        $scope.change = function(position)
        {
            $scope.click = $scope.click +1;
            if($scope.st == 0)
            {
                $timeout(tick,$scope.tickInterval);
                $timeout(debug_seconds,$scope.tickInterval);
                $scope.st=1;
                stop = true;
            }

            /*Click*/
//            $(".position-"+position).html() == 1?$(".position-"+position).html('0'):$(".position-"+position).html('1')
            $(".position-"+position).hasClass('color-1') == 1?$(".position-"+position).removeClass( "color-1" ).addClass( "color-0" ):$(".position-"+position).removeClass( "color-0" ).addClass( "color-1" )

            /*Click +1*/
            if(position!=5 && position!=11 && position!=17 && position!=23 && position!=29)
            {
                position = position+1;
                $(".position-"+position).hasClass('color-1') == 1?$(".position-"+position).removeClass( "color-1" ).addClass( "color-0" ):$(".position-"+position).removeClass( "color-0" ).addClass( "color-1" )
                position = position-1;
            }
            /*Click -1*/
            if(position!=6 && position!=12 && position!=18 && position!=24 && position!=30)
            {
                position = position-1;
                $(".position-"+position).hasClass('color-1') == 1?$(".position-"+position).removeClass( "color-1" ).addClass( "color-0" ):$(".position-"+position).removeClass( "color-0" ).addClass( "color-1" )
                position = position+1;
            }

            /*above line*/
            position = position+6;
            $(".position-"+position).hasClass('color-1') == 1?$(".position-"+position).removeClass( "color-1" ).addClass( "color-0" ):$(".position-"+position).removeClass( "color-0" ).addClass( "color-1" )
            position = position-6;

            /*under line*/
            position = position-6;
            $(".position-"+position).hasClass('color-1') == 1?$(".position-"+position).removeClass( "color-1" ).addClass( "color-0" ):$(".position-"+position).removeClass( "color-0" ).addClass( "color-1" )
            position = position+6;

            checkWin();
        }

        function checkWin()
        {
            var one = 0;
            var zero = 0;
            for(var i = 0 ; i < 36 ; i++)
            {
                $(".position-"+i).hasClass('color-1') == 1?one++:zero++;
            }
            console.log("Azul = "+one+" Vermelho ="+zero);
            if((one == 35 && zero == 1) || (zero == 35 && one == 1))
            {
                stop = false;
                $timeout($scope.openModal,10);
                $scope.clock = $scope.clock+Math.floor(Math.random()*99);
                add_click($scope.click,$scope.clock);
            }
        }


        $scope.clock = 0; // initialise the time variable
        $scope.tickInterval = 1000 //ms
        $scope.mili = '00';
        $scope.seconds = '00';
        $scope.min = '00';
        $scope.hour = '00';
        $scope.ss_debug = 0;

        var tick = function() {
            if(stop == true)
            {
                $scope.clock = $scope.clock + 100; // get the current time
                $scope.seconds = (Math.floor($scope.clock/100))%60;
                $scope.seconds = $scope.seconds < 10?"0"+$scope.seconds:$scope.seconds;
                $scope.min = (Math.floor($scope.clock/(6000)))%60;
                $scope.min = $scope.min < 10?"0"+$scope.min:$scope.min;
                $scope.hour = Math.floor($scope.clock/(6000*60))
                $scope.hour = $scope.hour < 10?"0"+$scope.hour:$scope.hour;
                $timeout(tick, $scope.tickInterval); // reset the timer
            }


        }
        var debug_seconds = function()
            {
                $scope.ss_debug = $scope.ss_debug  +1;
                console.log($scope.ss_debug);
                $timeout(debug_seconds,1000);
            }

        var db = openDatabase("Oneone", "1.0", "game sql", 2*1024);

// deverá mostrar "Database"
        console.log(db);

// de qualquer forma, sempre teste que o objeto foi instanciado direito antes de usá-lo
        if(!db){
            alert('deu pau!');
        }


        function add_click(val,time)
        {
            db.transaction(function(query){
                query.executeSql('INSERT INTO click_rank("click") VALUES (?)',[val],function(tx){console.log("Success");console.log(tx)},function(tx,error){"Add = "+console.log(error)});
                query.executeSql('INSERT INTO time_rank("time") VALUES (?)',[time],function(tx){console.log("Success");console.log(tx)},function(tx,error){"Add = "+console.log(error)});
            });
        }

    })

    .controller("StartCtrl",function($scope){

        $scope.min_click = 0;
        $scope.min_time = 0;

        var db = openDatabase("Oneone", "1.0", "game sql", 2*1024);

// deverá mostrar "Database"
        console.log(db);

// de qualquer forma, sempre teste que o objeto foi instanciado direito antes de usá-lo
        if(!db){
            alert('deu pau!');
        }

        db.transaction(function(query){
            query.executeSql('CREATE TABLE IF NOT EXISTS click_rank("click" INTEGER)',null,function(tx){console.log(tx)},function(tx,error){console.log("Criar= "+error)});
            query.executeSql('CREATE TABLE IF NOT EXISTS time_rank("time" INTEGER)',null,function(tx){console.log(tx)},function(tx,error){console.log("Criar= "+error)});
        });

//        db.transaction(function(query){
//                query.executeSql('INSERT INTO click_rank("click") VALUES (?)',[1000],function(tx){console.log("Success");console.log(tx)},function(tx,error){"Add = "+console.log(error)});
//                query.executeSql('INSERT INTO time_rank("time") VALUES (?)',[45692],function(tx){console.log("Success");console.log(tx)},function(tx,error){"Add = "+console.log(error)});
//
//        });


        db.transaction(function(transaction){
            transaction.executeSql(
                "SELECT * FROM click_rank ORDER BY click asc limit 0,1",
                [],
                function(transaction, result){
                    console.log('deu certo!');
                    console.log(result);

                    if(result.rows.length == 0)
                    {
                        $scope.min_click = 0;
                    }
                    for(var i = 0; i < result.rows.length; i++){
                        $scope.min_click = result.rows.item(0)[['click']];
                        $scope.$apply();
                        console.log(result.rows.item(0)[['click']]);
                    }
                },
                function(transaction, error){
                    console.log('deu pau!');
                    console.log(error);
                }
            );
            transaction.executeSql(
                "SELECT * FROM time_rank ORDER BY time asc limit 0,1",
                [],
                function(transaction, result){
                    console.log('deu certo!');
                    console.log(result);

                    if(result.rows.length == 0)
                    {
                        $scope.min_time = 0;
                        $scope.$apply();
                    }
                    for(var i = 0; i < result.rows.length; i++){
                        $scope.min_time = format_time(result.rows.item(0)[['time']]);
                        $scope.$apply();
                        console.log(result.rows.item(0)[['time']]);
                    }
                },
                function(transaction, error){
                    console.log('deu pau!');
                    console.log(error);
                }
            );
        });

        function format_time(time)
        {
            ms = time%100;
            sg = Math.floor(time/100)%60;
            min = Math.floor(time/6000)%60;
            hr = Math.floor(time/(6000*60));

            ms = ms < 10?"0"+ms:ms;
            sg = sg < 10?"0"+sg:sg;
            min = min < 10?"0"+min:min;
            hr = hr < 10?"0"+hr:hr;

            certo = hr+":"+min+":"+sg+":"+ms;
            return certo;
        }

        $scope.game = function()
        {
            window.location.href = "#/game";
        }
        $scope.help = function()
        {
            window.location.href = "#/help";
        }

    })

.controller("HelpCtrl",function($scope){

    })