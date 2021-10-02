let app = angular.module('ticketNaut', ['ngCookies']);

app.controller('FormCtrl', ['$scope', '$http', '$cookies', FormCtrl]);
app.controller('GetInters', ['$scope', '$http', GetInters]);


function GetInters($scope, $http) {
    $scope.inters = [];
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
            $scope.newInterv.status.type = "Validé",
            $scope.newInterv.status.cssStyle = "bg-success"
            let data = angular.copy($scope.newInterv);
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