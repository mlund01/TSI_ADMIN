angular.module('orderCloud.base')
    .config(BaseConfig);

function BaseConfig($stateProvider) {
    $stateProvider.state('base', {
        abstract: true,
        url: '',
        views: {
            '': {
                templateUrl: 'base/templates/base.tpl.html'
            },
            'top@base': {
                templateUrl: 'base/templates/base-top.tpl.html'
            },
            'bottom@base': {
                templateUrl: 'base/templates/base-bottom.tpl.html'
            }
        }
    });
}