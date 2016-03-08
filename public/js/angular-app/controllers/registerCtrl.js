



/* global app */

app.controller('errorHandlerTemplateCtrl', function ($scope, $rootScope) {
    $scope.error = false;
    if ($rootScope.errorJson) {
        $scope.errorMessage = $rootScope.errorJson.message;
        $scope.error = true;
    }
    $rootScope.errorJson = undefined;

});

app.controller('registerCtrl', function ($scope, $http, $rootScope, $state) {

    $scope.sendRegisterPost = function () {
        $http.post('/api/register', $scope.registerData).
                then(function (object) {

                    $rootScope.session = {};
                    $rootScope.session.user = object.user;
                    $rootScope.errorJson = undefined;
                    $state.go("home", {'username': object.user});
                }).
                catch(function (object, status) {
                    console.log(object);
                    $rootScope.session = undefined;
                    $rootScope.errorJson = object;
                    $state.go($state.current, {}, {reload: true});
                });
    };
});

