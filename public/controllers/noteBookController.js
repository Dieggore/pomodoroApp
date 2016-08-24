/**
 * Created by dmontes on 8/17/16.
 */
angular.module( 'pomodoroApp')
    .controller( 'NoteBookController', [ noteBookController ]);

function noteBookController (){

    var vm = this;
    var storage = sessionStorage;
    var storageNameSpace = "noteBookStorage";
    var currentStorage = null;

    storage[ storageNameSpace ] = storage[ storageNameSpace ] || null;
    //=== binded variables

    //====================

    //=== public functions
    vm.saveToSessionStorage = saveToSessionStorage;

    //====================

    if ( hasSomethingSavedInSessionStorage() ){
        vm.textAreas = currentStorage;
    } else {
        vm.textAreas = [ {}, {}, {}, {}];
    }

    //===============
    function saveToSessionStorage(){
        storage[ storageNameSpace ] = JSON.stringify( vm.textAreas );
    }

    function hasSomethingSavedInSessionStorage(){
        currentStorage = JSON.parse( storage[ storageNameSpace ] );
        if( _.isObject( currentStorage ) ){
            return true;
        }
        return false;
    }


}
