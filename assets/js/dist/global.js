// ========================================
// SETTINGS
// ========================================

'use strict';
// ========================================
// FUNCTIONS
// ========================================

// return URL in parts in array
function URL( index ) {

    var path;
    index = index || 1;
    path = window.location.pathname.split('/');

    // change '/' to '/home'
    path[index] = ( path[index] == '' ) ? 'home' : path[index];

    return path[index];

}
// ========================================
// MODEL
// ========================================

var Model = (function() {

    function getJSON(callback) {

        fetch('http://dev.js-router.com/assets/js/src/users.json')
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                callback( json );
            });

    }

    function getUsers(name, callback) {

        var x;

        getJSON(function(json) {

            json.data.forEach(function( val, key ) {
                if ( name == val.profile.name ) {
                    x = val;
                }
            });
            callback(x);

        });

    }

    return {
        getUsers : getUsers
    }

})();
// ========================================
// CACHE DOM
// ========================================

var body = document.getElementsByTagName('body')[0];
var html = '';

// ========================================
// PARTIALS
// ========================================

function header() {
    return '<header><h1>header</h1></header>';
}

function footer() {
    return '<footer><p>this is the FOOTER</p></footer>';
}

// ========================================
// VIEWS
// ========================================

var VIEWS = {

    home : function() {

        Model.getUsers('Ed Williams', function(user) {

            html += header();
            html += '<main class="main">';
            html += '    <p>User: ' + user.profile.name + '</p>';
            html += '    <a href="/about">about</a>';
            html += '</main>';
            html += footer();

            body.innerHTML = html;

        });

    },

    about : function() {

        html += header();
        html += '<main class="main">';
        html += '    <p>this is the about page</p>';
        html += '</main>';
        html += footer();

        body.innerHTML = html;

    },

    error : function() {

        html += header();
        html += '<main class="main">';
        html += '    <p>404</p>';
        html += '</main>';
        html += footer();

        body.innerHTML = html;

    }

}


// ========================================
// ROUTER
// ========================================

var startApp = (function() {

    var page = 'error';

    for (let x in VIEWS) {
        if ( URL() == x ) { page = x; }
    }

    VIEWS[page]();

})();