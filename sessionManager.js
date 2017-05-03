app.factory('sessionManager', function () {
    return {
        /**
         * Starts counting how many tabs of this system the user has opened. The count decreases as user closes the tabs.
         * And when the count reaches zero, it clears the localStorage of this domain.
         *
         * Note it has to run in pure javascript, cause services ($window, $localStorage) won't run before the window/tab
         * closes. Also, it won't even try to run if the browser doesn't support localStorage.
         *
         * @param {String} [prefix] If defined, only localStorage items with that prefix will be removed. Otherwise, localStorage will be completely cleared.
         */
        start: function (prefix) {
            if (!window.localStorage) {
                return;
            }

            var key = "_openTabs";

            if (prefix) {
                key += '_' + prefix;
            }

            if (!window.localStorage[key] || isNaN(window.localStorage[key]) || window.localStorage[key] < 0) {
                window.localStorage[key] = 0;
            }

            window.localStorage[key]++;

            window.addEventListener('beforeunload', function () {
                window.localStorage[key]--;

                if (window.localStorage[key] === 0) {
                    if (!prefix) {
                        window.localStorage.clear();
                    } else {
                        for (var item in window.localStorage) {
                            if (window.localStorage.hasOwnProperty(item) && item.substring(0, prefix.length) === prefix) {
                                delete window.localStorage[item];
                                delete window.localStorage[key];
                            }
                        }
                    }
                }
            });
        }
    };
});