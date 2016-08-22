/**
 * Created by dmontes on 8/17/16.
 */
angular.module( 'pomodoroApp')
    .controller( 'NoteBookController', [ noteBookController ]);

function noteBookController (){
    var vm = this;

    vm.date = new Date();
    vm.textAreas = [
        { text:" " },
        { text:" " },
        { text:" " },
        { text:" " },
        { text:" " }
    ];

}
