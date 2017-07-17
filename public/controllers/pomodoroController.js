angular.module( 'pomodoroApp' )
    .controller( 'PomodoroController', [ '$interval', PomodoroCore ]);

function PomodoroCore( $interval ){

    var vm = this;
    var ringSound = new Howl({
        src: ['http://reneroth.org/projects/codepen/pomodoro_ring.ogg', 'http://reneroth.org/projects/codepen/pomodoro_ring.mp3'],
        volume: vm.ringVolume
    });

    var tickSound = new Howl({
        src: ['http://reneroth.org/projects/codepen/pomodoro_tick.ogg', 'http://reneroth.org/projects/codepen/pomodoro_tick.mp3'],
        loop: true,
        volume: 0.1
    });

    vm.isTimerRunning = false;
    vm.fillColor = 'red';
    vm.tickVolume = 0.1;
    vm.ringVolume = 1.0;
    vm.date = new Date();
    vm.sessionCounter = {
        pomodoro: 0,
        break: 0,
        longbreak: 0
    };

    vm.upVolume = upVolume;
    vm.downVolume = downVolume;
    vm.toggleTimer = toggleTimer;
    vm.setSessionType = setSessionType;

    function initializeTimer( time, name ){
        vm.currentSessionType = name;
        vm.sessionLength = time;
        vm.sessionStatus = '';
        vm.fillHeight = '0%';
        vm.timeLeft = vm.sessionLength;
        vm.sessionInSeconds = vm.timeLeft * 60;
        $interval.cancel( vm.isTimerRunning );
        vm.isTimerRunning = false;
    }

    initializeTimer( 25, 'pomodoro' );

    function setSessionType( name ){
        if( name === 'pomodoro') {
            initializeTimer( 25, name);
            tickSound.stop();
        } else if ( name === 'break' ){
            initializeTimer( 5, name );
            tickSound.stop();
        } else {
            initializeTimer( 15, name );
        }
    }

    function toggleTimer(){
        if ( !vm.isTimerRunning ){
            initializeTimer( vm.sessionLength, vm.currentSessionType  );
            vm.isTimerRunning =  $interval( updateTimer, 1000 );
            vm.sessionStatus = 'In progress...'
            tickSound.play();
        } else {
            $interval.cancel( vm.isTimerRunning );
            vm.isTimerRunning = false;
            vm.sessionStatus = 'Stopped';
            tickSound.stop();
        }
    }

    function updateTimer(){
        vm.sessionInSeconds -= 1;
        if ( vm.sessionInSeconds <= 0 ){
            $interval.cancel( vm.isTimerRunning );
            vm.isTimerRunning = false;
            vm.sessionStatus = 'Finished session.'
            upCountSession( vm.currentSessionType );
            tickSound.stop();
            ringSound.stop().play();
        }

        vm.timeLeft = secondsToHourMinuteSeconds( vm.sessionInSeconds );
        vm.fillHeight = calculateFillPercentage();
    }

    function upCountSession( name ){
        vm.sessionCounter[ name ] += 1;
    }

    function calculateFillPercentage(){
        var percentage = Math.round(( vm.sessionLength  - vm.sessionInSeconds / 60 ) /  vm.sessionLength * 100);
        return percentage + '%';
    }

    function secondsToHourMinuteSeconds( secs ) {
        secs = Number(secs)
        var h = Math.floor(secs / 3600);
        var m = Math.floor(secs % 3600 / 60);
        var s = Math.floor(secs % 3600 % 60);
        return (
            (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
        );
    }

    function upVolume(){
        var currentVol = tickSound.volume();
        var newVol = currentVol + 0.1;
        tickSound.volume( newVol );
        vm.tickVolume = tickSound.volume();
    }

    function downVolume(){
        var currentVol = tickSound.volume();
        var newVol = currentVol - 0.1;
        tickSound.volume( newVol );
        vm.tickVolume = tickSound.volume();
    }
}

