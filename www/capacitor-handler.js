(function () {
    /**
     * Capacitor Hardware Back Button Handler
     * 
     * Robust implementation to prevent loops and ensure correct navigation.
     */
    function setupBackButton() {
        // Safe access to the Capacitor App plugin
        const App = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;

        // If the plugin isn't ready yet, retry after a short delay
        if (!App) {
            // console.log("Nithara: App plugin not found yet, retrying...");
            setTimeout(setupBackButton, 200);
            return;
        }

        // console.log("Nithara: Back button handler attached successfully.");

        // Remove existing listeners to ensure we don't have duplicates/conflicts
        if (App.removeAllListeners) {
            App.removeAllListeners();
        }

        // Add our custom listener
        App.addListener('backButton', function (data) {
            const path = window.location.pathname;

            // Define sub-app directories
            const subApps = [
                '/salary/',
                '/emi/',
                '/pay-revision/',
                '/dcrg/',
                '/housing/',
                '/sip/',
                '/calculator/'
            ];

            const isSubPage = subApps.some(folder => path.indexOf(folder) !== -1);

            if (isSubPage) {
                // CASE 1: We are on a Sub-Page (e.g., Salary)
                // Action: Go BACK to the Home Portal.
                // We use 'replace' to avoid creating a history loop (Home -> Salary -> Home -> Salary...)
                // We assume the home page is one level up (../index.html)
                window.location.replace('../index.html');

            } else {
                // CASE 2: We are on the Home Page (root)
                // Action: EXIT the App.
                // This prevents going back to a previously visited sub-page (breaking the loop).
                App.exitApp();
            }
        });
    }

    // Attempt to initialize immediately, or wait for load
    if (document.readyState === 'complete') {
        setupBackButton();
    } else {
        window.addEventListener('load', setupBackButton);
    }
})();
