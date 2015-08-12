angular.module('orderCloud-cookies', [])
    .service('Cookies', cookieService);


function cookieService($cookies, $state) {
    var vm = this;
    vm.cookieCheck = cookieCheck;
    vm.goToLogon = goToLogon;


    function cookieCheck() {
        if ($cookies.get('OrderCloud.token')) {
            return true
        } else {
            return false
        }
    }

    function goToLogon(bool) {
        if (bool) {
            $state.go('logon')
        } else {
            return
        }
    }
}