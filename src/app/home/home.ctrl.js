angular.module('orderCloud.home')
    .controller('homeCtrl', HomeController);


function HomeController(Cookies, Products, Categories) {
    var vm = this;
    vm.example = 'Example Data';
    vm.cookiesPresent = Cookies.cookieCheck();

    getCategories();

    Cookies.goToLogon(!vm.cookiesPresent);


    function getCategories() {
        Categories.List('B1', null, 1, 20)
            .then(function(data) {
                vm.categories = data.Items;
            })
    }

}