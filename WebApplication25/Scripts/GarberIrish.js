/* Contains general scripts that may be used in any page. 
 * If this file starts to get large it can be split into page-specific files. */

/* The following code is the Garber-Irish implementation, a way to run relevant JavaScript on page-load
 * based on the MVC action that produced the page. It's an unobtrusive approach, which means that the
 * code to call the relevant JavaScript functions is all here instead of being hardcoded into the HTML.
 * All this code needs from the page is data-controller and data-action attributes on the body tag.
 * Since JavaScript is case-sensitive, the controller and action names we use here must be an exact match.
 * http://viget.com/inspire/extending-paul-irishs-comprehensive-dom-ready-execution */

SAMPLEAPP = {
    common: {
        init: function () {

            // application-wide code
            console.log("code that executes accross all actions");
        }
    },

    Home: {
        init: function () {
            // controller-wide code
            console.log("code that executes accross all Home Controller actions");
        },

        Index: function () {
            // action-specific code
            console.log("hello from the index action");
        },

        About: function () {
            console.log("hello from the about action");
        }

        // add more actions if needed...
    },
    Thing: {
        Index: function () {
            console.log("Thing controller and Index Action")
        }
    }

    // Add more controllers if needed...
};

UTIL = {
    exec: function (controller, action) {
        var namespace = SAMPLEAPP;
        action = (action === undefined) ? "init" : action;

        if (controller !== "" && namespace[controller] && typeof namespace[controller][action] == "function") {
            namespace[controller][action]();
        }
    },

    init: function () {
        var body = document.body;
        var controller = body.getAttribute("data-controller");
        var action = body.getAttribute("data-action");

        UTIL.exec("common");
        UTIL.exec(controller);
        UTIL.exec(controller, action);
    }
};

$(document).ready(UTIL.init);
/* END: Garber-Irish */