angular.module('orderCloud.home')
    .config(HomeConfig);



function HomeConfig( $stateProvider ) {
    $stateProvider.state( 'base.home', {
        url: '/home',
        views: {
            '': {templateUrl:'home/templates/home.tpl.html',
                controller:'homeCtrl',
                controllerAs: 'home'
            }
        },
        data:{ pageTitle: 'Home' }
    });
}