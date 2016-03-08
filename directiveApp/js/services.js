var cookieService = angular.module('cookieService', []);

cookieService.factory("controlCookie", function () {
    return function () {

        this.add = add;
        this.get = get;
        this.remove = remove;
        this.getAll = getAll;
        this.clear = clear;
        this.set = set;

        var localCookie = {};

        init();

        function init() {
            if (localStorage.localCookie) {
                localCookie = JSON.parse(localStorage.getItem("localCookie"));
            }
        }


        function add(name, value, options) {

            var date = new Date(),
                stringCookieOptions = "",
                cloneOption = {},
                setCookieString = "",
                valueProp,
                tempLocalCookie = {};

            angular.copy(options, cloneOption);
            cloneOption.path = cloneOption.path || "/";

            value = JSON.stringify(value);
            cloneOption.expires = cloneOption.expires || 30;
            date.setTime(date.getTime() + cloneOption.expires * 3600000 * 24);
            cloneOption.expires = date.toUTCString();

            tempLocalCookie["value"] = value.replace(/\"/g, "");

            for (var property in cloneOption) {
                valueProp = cloneOption[property];
                if (valueProp !== "") {

                    stringCookieOptions += ";" + property;
                    stringCookieOptions += "=" + valueProp;

                    tempLocalCookie[property] = valueProp;

                }
            }


            if (localStorage.localCookie) {
                localCookie = JSON.parse(localStorage.getItem("localCookie"));
            }
            localCookie[name] = tempLocalCookie;

            localStorage.setItem("localCookie", JSON.stringify(localCookie));

            setCookieString = encodeURIComponent(name) + "=" + encodeURIComponent(value) + stringCookieOptions + ";";
            document.cookie = setCookieString;

            console.log(setCookieString);

        }

        function get(name) {

            return localCookie ? localCookie[name] : null;

        }

        function remove(name) {

            var options = {};

            localCookie[name].expires = -1;
            delete localCookie[name].value;

            add(name, "", localCookie[name]);

            delete localCookie[name];
            localStorage.setItem("localCookie", JSON.stringify(localCookie));

        }

        function getAll() {

            var cookieObject = {};

            for (var property in localCookie) {
                cookieObject[property] = localCookie[property].value;
            }

            return cookieObject;

        }

        function clear() {

            var allCookies = getAll();

            for (var property in allCookies) {
                remove(property);
            }

        }

        function set(object, option) {

            clear();

            for (var property in object) {

                add(property, object[property], option);

            }
        }

    }
});