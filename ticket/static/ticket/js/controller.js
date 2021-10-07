let app = angular.module('ticketNaut', ['ngCookies']);

app.factory('interFactory', ['$http', '$cookies', interFactory]);
app.controller('FormCtrl', ['$scope', 'interFactory', FormCtrl]);
app.controller('IntersCtrl', ['$scope', 'interFactory', IntersCtrl]);
app.controller('IntersActionCtrl', ['$scope', 'interFactory', IntersActionCtrl]);


function interFactory($http, $cookies) {
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.get('csrftoken');

    let inters = {};

    inters.allInters = [];

    inters.interForUpdate = {
        status: {
            type: "Validé",
            cssStyle: "bg-success"
        },
        data: {}
    };

    // Get client timezone
    inters.tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

    inters.getInters = function () {
        return $http.get('/inters');
    };

    inters.addInter = function (data) {
        return $http.post('/add-inter', data);
    };

    inters.removeInter = function (data) {
        return $http.post('/remove-inter', data);
    };

    inters.updateInter = function (data) {
        return $http.post('/update-inter', data);
    };

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
    $scope.interForUpdateData = fact.interForUpdate;

    $scope.sendInter = function(form) {
        if (form.$valid) {
            $scope.newInterv.status.type = "Validé",
            $scope.newInterv.status.cssStyle = "bg-success"
            let data = angular.copy($scope.newInterv);
            data.status = $scope.newInterv.status.type;
            data.tz = fact.tz;
            
            /* Fromated Date object to YYYY-MM-DD */
            const dateInter = data.dateInter;
            data.dateInter = `${dateInter.getFullYear()}-${dateInter.getMonth()+1}-${dateInter.getDate()}`;
            /* ********************************** */
            
            fact.addInter(data).then((res) => {
                if (res.status === 200) {
                    fact.allInters.push(res.data.saved);
                }
            }, (err) => {
                console.warn(err);
            });
        }
    }

    $scope.updateInter = function(form) {
        if (form.$valid) {
            const index = fact.allInters.findIndex((el) => el.pk === $scope.interForUpdateData.data.pk);
            /* Fromated Date object to YYYY-MM-DD */
            const dateInter = $scope.interForUpdateData.data.date;
            $scope.interForUpdateData.data.dateString = `${dateInter.getFullYear()}/${dateInter.getMonth()+1}/${dateInter.getDate()}`;
            /* ********************************** */
            $scope.interForUpdateData.data.status = $scope.interForUpdateData.status.type;
            $scope.interForUpdateData.data.tz = fact.tz;

            fact.updateInter($scope.interForUpdateData.data).then((res) => {
                if (res.data.status === "ok") {
                    // Convert date YYYY/MM/DD to DD/MM/YYYY
                    // const dateSplited = $scope.interForUpdateData.data.date.split('/');
                    // const dateInter = $scope.interForUpdateData.data.date;
                    // $scope.interForUpdateData.data.dateString = `${dateInter.getDate()}/${dateInter.getMonth()+1}/${dateInter.getFullYear()}`;
                    /* ********************************** */ 

                    fact.allInters[index] = $scope.interForUpdateData.data;
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
            for (let i = 0; i < res.data.inters.length; i++) {
                const dataInter = res.data.inters[i];
                // Cast date string to date object
                const dateSplited = dataInter.date.split('/');
                const dateObj = new Date();
                dateObj.setYear(dateSplited[2]);
                dateObj.setMonth(dateSplited[1]-1);
                dateObj.setDate(dateSplited[0]);
                // -------------------------------
                res.data.inters[i].date = dateObj;
            }
            console.log(res.data.inters);
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
        fact.removeInter({pk: id}).then((res) => {
            if (res.data.status === "ok") {
                const index = fact.allInters.findIndex((el) => el.pk === id);
                fact.allInters.splice(index, 1);
            }
        }, (err) => {
            console.warn(err);;
        });
    }

    $scope.update = function(id) {
        const index = fact.allInters.findIndex((el) => el.pk === id);
        let interSelected = angular.copy(fact.allInters[index]);
        // Cast date string to date object
        // if (typeof(interSelected.date) === "string") {
        //     const dateSplited = interSelected.date.split('/');
        //     const dateObj = new Date();
        //     dateObj.setYear(dateSplited[2]);
        //     dateObj.setMonth(dateSplited[1]-1);
        //     dateObj.setDate(dateSplited[0]);
        //     interSelected.dateObject = dateObj;
        // }
        // -----------------------------
        fact.interForUpdate.data = interSelected;
        let modal = new bootstrap.Modal(document.getElementById('modalUpdate'));
        modal.toggle();
    }
}