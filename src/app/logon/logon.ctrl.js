angular.module('orderCloud.logon')
    .controller('LogonCtrl', logonController);

function logonController($state, Credentials, Cookies) {
    var vm = this;
    vm.authenticate = authenticate;
    vm.message = "";


    function authenticate() {
        Credentials.Get(vm.credentials)
            .then(function() {
                $state.go('base.home');
            })
            .catch(function() {
                vm.message = "Wrong username and password";
            })
    }
}