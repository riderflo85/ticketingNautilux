let app = angular.module('ticketNaut', ['ngCookies']);

app.factory('interFactory', ['$http', '$cookies', interFactory]);
app.controller('FormCtrl', ['$scope', 'interFactory', FormCtrl]);
app.controller('IntersCtrl', ['$scope', 'interFactory', IntersCtrl]);
app.controller('IntersActionCtrl', ['$scope', 'interFactory', IntersActionCtrl]);


function interFactory($http, $cookies) {
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.get('csrftoken');

    let inters = {};

    inters.allInters = [];

    inters.getInters = function () {
        return $http.get('/inters');
    };

    inters.addInter = function (data) {
        return $http.post('/add-inter', data);
    };

    inters.removeInter = function (data) {
        return $http.post('/remove-inter', data);
    }
    return inters;
}


function FormCtrl($scope, interFactory) {
    let fact = interFactory;
    $scope.newInterv = {
        status: {
            type: "Brouillon",
            cssStyle: "bg-secondary"
        },
    };
    $scope.allIntersTest = fact.allInters;

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
            
            fact.addInter(data).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    fact.allInters.push(res.data.saved);
                }
            }, (err) => {
                console.warn(err);
            });
        }
    }
}


function IntersCtrl($scope, interFactory) {
    let fact = interFactory;
    $scope.inters = [];

    let init = function() {
        fact.getInters().then((res) => {
            $scope.inters = res.data.inters;
            fact.allInters = res.data.inters;
        }, (err) => {
            console.warn(err);
        });
    }
    init();
}


function IntersActionCtrl($scope, interFactory) {
    let fact = interFactory;
    
    $scope.remove = function(id) {
        console.log('pk for remove : ', id);
        fact.removeInter({pk: id}).then((res) => {
            console.log(res);
            const index = fact.allInters.findIndex((el) => el.pk === id);
            fact.allInters.splice(index, 1);
        }, (err) => {
            console.warn(err);;
        });
    }

    $scope.update = function(id) {
        const index = fact.allInters.findIndex((el) => el.pk === id);
        console.log(fact.allInters[index]);
        let modal = new bootstrap.Modal(document.getElementById('modalUpdate'));
        modal.toggle();
    }
}