angular.module( 'orderCloud', [
	'templates-app',
	'ngSanitize',
	'ngAnimate',
	'ngMessages',
	'ngTouch',
	'ui.router',
	'ui.bootstrap',
	'ui.bootstrap.tpls',
	'ui.bootstrap.collapse',
	'orderCloud.sdk',
	'orderCloud.logon',
	'orderCloud.base',
	'orderCloud.home',
	'orderCloud.productList',
	'orderCloud.admin',
	'orderCloud-cookies',
	'orderCloud-user',
	'orderCloud-orderSvc'
])

	.config( Routing )
	.config( ErrorHandling )
	.controller( 'AppCtrl', AppCtrl )
	.constant('ocscope', 'FullAccess')
	.constant('appname', 'OrderCloud')

	// Test
	 .constant('authurl', 'https://testauth.ordercloud.io/oauth/token')
	 .constant('apiurl', 'https://testapi.ordercloud.io')
	 .constant('clientid', '5fef89e8-3753-4728-a126-0566816c5b2d') //Distributor
	//.constant('clientid', 'EFD5A537-FD69-44C9-AA80-97195A461392') //Buyer

	//Local
	/*.constant('authurl', 'http://core.four51.com:11629/OAuth/token')
	.constant('apiurl', 'http://core.four51.com:9002/v1')
	.constant('clientid', '5e841037-b21c-4784-8cbb-746c4f1468ed')
	*/
;

//function AppCtrl( $scope ) {
//	var vm = this;
//	$scope.$on('$stateChangeSuccess', function( event, toState, toParams, fromState, fromParams ){
//		if ( angular.isDefined( toState.data.pageTitle ) ) {
//			vm.pageTitle = 'OrderCloud | ' + toState.data.pageTitle;
//		}
//	});
//}


function AppCtrl( $state, Credentials ) {
	var vm = this;
	vm.logout = function() {
		Credentials.Delete();
		$state.go('login');
	}
}

function Routing( $urlRouterProvider, $urlMatcherFactoryProvider ) {
	$urlMatcherFactoryProvider.strictMode(false);
	$urlRouterProvider.otherwise( '/home' );
	//$locationProvider.html5Mode(true);
	//TODO: For HTML5 mode to work we need to always return index.html as the entry point on the serverside
}

function ErrorHandling( $provide ) {
	$provide.decorator('$exceptionHandler', handler );

	function handler( $delegate, $injector ) {
		return function $broadcastingExceptionHandler( ex, cause ) {
			ex.status != 500 ?
				$delegate( ex, cause ) :
				( function() {
					try {
						//TODO: implement track js
						console.log(JSON.stringify( ex ));
						//trackJs.error("API: " + JSON.stringify(ex));
					}
					catch ( ex ) {
						console.log(JSON.stringify( ex ));
					}
				})();
			$injector.get( '$rootScope' ).$broadcast( 'exception', ex, cause );
		}
	}
}