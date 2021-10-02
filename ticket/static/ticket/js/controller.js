let app = angular.module('ticketNaut', ['ngCookies']);

app.controller('FormCtrl', ['$scope', '$http', '$cookies', FormCtrl]);

function FormCtrl($scope, $http, $cookies) {
    $scope.newInterv = {
        status: {
            type: "Brouillon",
            cssStyle: "bg-secondary"
        },
    };

    $scope.sendInter = function(form) {
        console.log(form.$valid);
        if (form.$valid) {
            $scope.newInterv.status.type = "Validé",
            $scope.newInterv.status.cssStyle = "bg-success"
            let data = angular.copy($scope.newInterv);
            /*  */
            const dateInter = data.dateInter;
            data.dateInter = dateInter.getFullYear();
            console.log(data.dateInter);
            // data.dateInter = `${data.dateInter.getFullYear()}-${data.dateInter.getMonth()}-${data.dateInter.getDate()}`;
            $http.defaults.headers.post['X-CSRFToken'] = $cookies.get('csrftoken');
            $http.post('/add-inter', data).then((res) => {
                console.log(res);
            }, (err) => {
                console.warn(err);
            })
        }
    }
}