let app = angular.module('ticketNaut', ['ngCookies']);

// app.factory('interFactory', ['$http', interFactory]);
app.controller('FormCtrl', ['$scope', '$http', '$cookies', FormCtrl]);
app.controller('IntersCtrl', ['$scope', '$http', '$cookies', IntersCtrl]);


// function interFactory($http) {
//     let inters = {
//         allInters: [],
//         get: function() {
//             return $http.get('/inters');
//         }
//     };
//     return inters;
// }


function FormCtrl($scope, $http, $cookies) {
    $scope.newInterv = {
        status: {
            type: "Brouillon",
            cssStyle: "bg-secondary"
        },
    };

    $scope.sendInter = function(form) {
        if (form.$valid) {
            // Get timezone
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

            $scope.newInterv.status.type = "Validé",
            $scope.newInterv.status.cssStyle = "bg-success"
            let data = angular.copy($scope.newInterv);
            data.status = $scope.newInterv.status.type;
            data.tz = tz;

            /* Fromated Date object to YYYY-MM-DD */
            const dateInter = data.dateInter;
            data.dateInter = `${dateInter.getFullYear()}-${dateInter.getMonth()}-${dateInter.getDate()}`;
            /* ********************************** */

            $http.defaults.headers.post['X-CSRFToken'] = $cookies.get('csrftoken');
            $http.post('/add-inter', data).then((res) => {
                console.log(res);
            }, (err) => {
                console.warn(err);
            })
        }
    }
}


function IntersCtrl($scope, $http, $cookies) {
    $scope.inters = [];

    $http.get('/inters').then((res) => {
        $scope.inters = res.data.inters;
    }, (err) => {
        console.warn(err);
    });
    
    $scope.remove = function(id) {
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.get('csrftoken');
        $http.post('/remove-inter', {pk: id}).then((res) => {
            const index = $scope.inters.findIndex((el) => el.pk === id);
            $scope.inters.splice(index, 0);
            console.log(index);
        }, (err) => {
            console.warn(err);
        });
    }


}