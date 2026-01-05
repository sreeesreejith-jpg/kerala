(function () {
    /**
     * Capacitor Hardware Back Button Handler
     */
    function setupBackButton() {
        const App = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;

        if (!App) {
            setTimeout(setupBackButton, 200);
            return;
        }

        if (App.removeAllListeners) {
            App.removeAllListeners();
        }

        App.addListener('backButton', function () {
            const path = window.location.pathname;

            // Sub-apps checks
            const subApps = ['/salary/', '/pay-revision/', '/dcrg/', '/emi/', '/sip/', '/housing/', '/calculator/'];
            const isSubApp = subApps.some(app => path.includes(app));

            // Home check: If at root, or /kerala/ or /kerala/index.html
            const isHomePage = path === '/' ||
                path === '/kerala/' ||
                path.endsWith('/kerala/index.html') ||
                (path.endsWith('/index.html') && !isSubApp);

            if (isHomePage) {
                // If on Home page, Exit
                if (App.exitApp) App.exitApp();
            } else {
                // If in sub-app, Go Back
                if (window.history.length > 1) {
                    window.history.back();
                } else {
                    // Fallback to portal
                    window.location.href = '../index.html';
                }
            }
        });
    }

    if (document.readyState === 'complete') {
        setupBackButton();
    } else {
        window.addEventListener('load', setupBackButton);
    }
})();
