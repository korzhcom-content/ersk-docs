/*
 * Analytics for the docs: a visit count for korzh.com's own collector, and Google Analytics
 * through the same Tag Manager container the main website uses.
 *
 * The docs are served to readers through korzh.com, whose _redirects proxies the docs paths to
 * this site on Netlify. The proxied HTML is ours, not the website's layout, so nothing the
 * website adds reaches a docs page unless this site adds it too.
 *
 * Both scripts run on korzh.com only. This site is also reachable on its own netlify.app address
 * and on deploy previews, which are not readers, and a developer running the docs locally is not
 * a visitor either.
 *
 * The scripts are inlined into every page through Starlight's `head` option rather than served
 * as files: a file would sit under the docs base path and depend on the proxy to reach it.
 */

const GTM_CONTAINER = "GTM-KWL8N67";

/*
 * Counts the visit. Posts to /t/hit on korzh.com itself - the website rewrites /t/* to the
 * collector on account.korzh.com - so the call is a same-origin one.
 *
 * Nothing is stored in the browser and no identifier is sent: the collector counts a visitor by a
 * hash it builds itself from a daily secret, the address and the browser.
 */
function countVisit() {
    var host = window.location.hostname;
    if (host !== "korzh.com" && host !== "www.korzh.com") {
        return;
    }

    try {
        var body = JSON.stringify({
            site: host,
            path: window.location.pathname,
            referrer: document.referrer,
        });

        // text/plain is what sendBeacon sends
        if (navigator.sendBeacon) {
            navigator.sendBeacon("/t/hit", new Blob([body], { type: "text/plain" }));
            return;
        }

        fetch("/t/hit", {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: body,
            keepalive: true,
        }).catch(function () {
            /* the docs must never break over analytics */
        });
    } catch (e) {
        /* the docs must never break over analytics */
    }
}

/* Google Tag Manager's standard loader, behind the same host check. */
function loadTagManager(container) {
    var host = window.location.hostname;
    if (host !== "korzh.com" && host !== "www.korzh.com") {
        return;
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtm.js?id=" + container;

    var first = document.getElementsByTagName("script")[0];
    first.parentNode.insertBefore(script, first);
}

export default [
    { tag: "script", content: `(${countVisit.toString()})();` },
    { tag: "script", content: `(${loadTagManager.toString()})(${JSON.stringify(GTM_CONTAINER)});` },
];
