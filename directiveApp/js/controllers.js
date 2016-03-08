'use strict';

var mainApp = angular.module('mainDirectiveApp', ['mainDirectives', 'selectDirectives', 'cookieService', 'ngSanitize']);

mainApp.controller('directiveController', ['$scope',
    function ($scope) {
        var ctrl = this;

        ctrl.hello = "Hello world";
        ctrl.stateModelFirst = false;
        ctrl.stateModelSecond = false;
        ctrl.stateModelThird = false;
        ctrl.stateModelFour = false;
        ctrl.stateModelFive = false;
        ctrl.stateModelSix = false;
        ctrl.stateModelSeven = false;
        ctrl.stateModelEight = false;


        ctrl.disabledFirst = false;
        ctrl.readonlyFirst = false;

        ctrl.disabledSecond = false;
        ctrl.readonlySecond = false;

        ctrl.disabledThird = false;
        ctrl.readonlyThird = false;

        ctrl.disabledFour = false;
        ctrl.readonlyFour = false;

        ctrl.disabledFive = false;
        ctrl.readonlyFive = false;

        ctrl.disabledSix = false;
        ctrl.readonlySix = false;

        ctrl.disabledSeven = false;
        ctrl.readonlySeven = false;

        ctrl.disabledEight = false;
        ctrl.readonlyEight = false;

        ctrl.checkboxChange = checkboxChange;
        ctrl.changeStateFunk = changeStateFunk;

        ctrl.listItemsFirst = [
            {
                "id": 0,
                "name": "the black eyed peas"
            },
            {
                "id": 1,
                "name": "Home"
            },
            {
                "id": 2,
                "name": "Domm"
            },
            {
                "id": 3,
                "name": "the black eyed peas"
            },
            {
                "id": 4,
                "name": "Home"
            },
            {
                "id": 5,
                "name": "Domm"
            },
            {
                "id": 6,
                "name": "the black eyed peas"
            },
            {
                "id": 7,
                "name": "Home"
            },
            {
                "id": 8,
                "name": "Domm"
            }
        ];
        ctrl.listItemsSecond = [
            {
                "id": 0,
                "name": "Acer"
            },
            {
                "id": 1,
                "name": "Sony"
            },
            {
                "id": 2,
                "name": "Playstation"
            }
        ];
        ctrl.listItemsThird = [
            {
                "id": 0,
                "name": "Raptor"
            },
            {
                "id": 1,
                "name": "Traktor"
            },
            {
                "id": 2,
                "name": "Engine"
            }
        ];
        ctrl.listItemsFour = [
            {
                "id": 0,
                "name": "the black eyed peas"
            },
            {
                "id": 1,
                "name": "Second"
            },
            {
                "id": 2,
                "name": "Lexus"
            },
            {
                "id": 3,
                "name": "Lada"
            },
            {
                "id": 4,
                "name": "Comp"
            }
        ];
        ctrl.listItemsFive = [
            {
                "id": 0,
                "name": "Color"
            },
            {
                "id": 1,
                "name": "Random"
            },
            {
                "id": 2,
                "name": "Skyrim"
            },
            {
                "id": 3,
                "name": "Stalker"
            },
            {
                "id": 4,
                "name": "Enter"
            }
        ];
        ctrl.listItemsSix = [
            {
                "id": 0,
                "name": "Singleton"
            },
            {
                "id": 1,
                "name": "MVC"
            },
            {
                "id": 2,
                "name": "Controller"
            },
            {
                "id": 3,
                "name": "Model"
            },
            {
                "id": 4,
                "name": "Data"
            }
        ];
        ctrl.listItemsSeven = [
            {
                "id": 0,
                "name": "table"
            },
            {
                "id": 1,
                "name": "music"
            },
            {
                "id": 2,
                "name": "Development"
            },
            {
                "id": 3,
                "name": "Sky"
            },
            {
                "id": 4,
                "name": "first"
            }
        ];
        ctrl.listItemsEight = [
            {
                "id": 0,
                "name": "Symfony 2"
            },
            {
                "id": 1,
                "name": "JAVASCRIPT"
            },
            {
                "id": 2,
                "name": "PHP"
            },
            {
                "id": 3,
                "name": "Angular"
            },
            {
                "id": 4,
                "name": "wordpress"
            }
        ];


        ctrl.selectedItems = [];

        ctrl.setSubmitPosition = function (obj) {
            console.log(obj);
        };


        function changeStateFunk() {
            console.log("state changed");
        }


        function checkboxChange() {

            if (ctrl.readonly) {
                console.log("readonly");
            }
            else {
                console.log("Isn't readonly");
            }

        }

    }]);

mainApp.controller('multiSelectController', ['$scope',
    function ($scope) {

        var ctrl = this;



    }]);

mainApp.controller("cookieController", ['$scope', 'controlCookie', function ($scope, controlCookie) {

    var ctrl = this,
        serviceCookie = new controlCookie();

    ctrl.dataInputObj = [{name: '', value: ''}];
    ctrl.allCookies = serviceCookie.getAll();

    ctrl.clearAll = clearAll;
    ctrl.delete = deleteCookie;
    ctrl.saveObject = saveObject;
    ctrl.addFields = addFields;
    ctrl.saveObjectCollection = saveObjectCollection;
    ctrl.deleteFields = deleteFields;


    function clearAll(){
        serviceCookie.clear();
        ctrl.allCookies = serviceCookie.getAll();
    }

    function deleteCookie(data, formDel){

        if (formDel.$valid){
            serviceCookie.remove(data.name);
            ctrl.allCookies = serviceCookie.getAll();

            data.name = "";

            formDel.$setPristine();
            formDel.$setUntouched();
        }

    }

    function saveObject(data, optionsData, formAddCookie) {
        if (formAddCookie.$valid) {
            serviceCookie.add(data.name, data.value, optionsData);
            ctrl.allCookies = serviceCookie.getAll();

            data.name = "";
            data.value = "";
            if(optionsData){
                optionsData.path = "";
                optionsData.domain = "";
                optionsData.expires = "";
            }

            formAddCookie.$setPristine();
            formAddCookie.$setUntouched();

        }



    }

    function addFields(){
        var obj = {name: '', value: ''};
        ctrl.dataInputObj.push(obj);
    }

    function deleteFields(){
        ctrl.dataInputObj.pop();
    }

    function saveObjectCollection(dataCol, optionsDataCol, formAddCookiesCollection){

        var tempObject = {};

        for (var property in ctrl.dataInputObj) {
            tempObject[ctrl.dataInputObj[property].name] = ctrl.dataInputObj[property].value;
        }

        if (formAddCookiesCollection.$valid){
            serviceCookie.set(tempObject, optionsDataCol);
            ctrl.allCookies = serviceCookie.getAll();

            ctrl.dataInputObj = [{name: '', value: ''}];

            formAddCookiesCollection.$setPristine();
            formAddCookiesCollection.$setUntouched();
        }

    }



}]);