let app = angular.module('ticketNaut', ['ngCookies']);

app.controller('FormCtrl', ['$scope', '$http', '$cookies', FormCtrl]);
app.controller('GetIntersCtrl', ['$scope', '$http', GetInters]);
app.controller('ActionCtrl', ['$scope', '$http', RemoveInter]);


function ActionCtrl($scope, $http) {
    
}


function GetIntersCtrl($scope, $http) {
    $scope.inters;
    $http.get('/inters').then((res) => {
        $scope.inters = res.data.inters;
    }, (err) => {
        console.warn(err);
    })
}


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