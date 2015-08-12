angular.module('orderCloud.admin')
    .config(AdminConfig);

function AdminConfig($stateProvider) {
    $stateProvider.state( 'base.admin', {
        url: '/admin',
        views: {
            '': {
                templateUrl:'admin/templates/admin.tpl.html',
                controller:'adminCtrl',
                controllerAs: 'admin'
            }
        },
        data:{ pageTitle: 'Administration' }
    });
}