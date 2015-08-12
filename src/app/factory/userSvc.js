angular.module('orderCloud-user', [])
    .factory('UserSvc', UserService);

function UserService(Me) {
    var currentUser = {};
    function _getCurrentUser() {
        if (currentUser) {
            console.log('hit');
            Me.Get()
                .then(function(data) {
                    return currentUser = data;
                })
        } else {
            console.log('not hit');
            return currentUser;
        }
    }


    return {
        getCurrentUser: _getCurrentUser
    };

};