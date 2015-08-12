angular.module('orderCloud.logon')
    .config(LogonConfig);


function LogonConfig( $stateProvider ) {
    $stateProvider.state( 'logon', {
        url: '/logon',
        templateUrl:'logon/templates/logon.tpl.html',
        controller:'LogonCtrl',
        controllerAs: 'logon',
        data:{ pageTitle: 'Logon' }
    });
}