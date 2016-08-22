/**
 * Created by dmontes on 8/17/16.
 */
angular.module( 'pomodoroApp' )
    .controller( 'PomodoroController', [ '$interval', PomodoroCore ]);

function PomodoroCore( $interval ){

    var vm = this;

    vm.sessionLength = 1;
    vm.min = 0;
    vm.max = vm.sessionLength;
    vm.sessionStatus = '';
    vm.isTimerRunning = false;
    vm.fillHeight = '0%';
    vm.fillColor = 'red';
    vm.timeLeft = vm.sessionLength;
    vm.sessionInSeconds = vm.timeLeft * 60;

    vm.toggleTimer = toggleTimer;

    function toggleTimer(){
        if ( !vm.isTimerRunning ){
            updateTimer();
            vm.isTimerRunning =  $interval( updateTimer, 1000 );
            vm.sessionStatus = 'In progress...'
        } else {
            $interval.cancel( vm.isTimerRunning );
            vm.isTimerRunning = false;
            vm.sessionStatus = 'Stopped'
        }
    }

    function updateTimer( ){
        vm.sessionInSeconds -= 1;
        if ( vm.sessionInSeconds <= 0 ){
            $interval.cancel( vm.isTimerRunning );
            vm.isTimerRunning = false;
            vm.sessionStatus = 'Finished session.'
        }
        vm.timeLeft = secondsToHourMinuteSeconds( vm.sessionInSeconds );
        vm.fillHeight = calculateFillPercentage();
    }

    function calculateFillPercentage( ){
        var percentage = Math.round(( vm.sessionLength  - vm.sessionInSeconds / 60 ) /  vm.sessionLength * 100);
        return percentage + '%';
    }

    function secondsToHourMinuteSeconds(secs) {
        secs = Number(secs)
        var h = Math.floor(secs / 3600);
        var m = Math.floor(secs % 3600 / 60);
        var s = Math.floor(secs % 3600 % 60);
        return (
            (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
        );
    }
}

