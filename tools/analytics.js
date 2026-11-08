/*
 * Analytics for the docs: the main website's own collector script, and Google Analytics through
 * the same Tag Manager container the website uses.
 *
 * The docs are served to readers through korzh.com, whose _redirects proxies the docs paths to
 * this site on Netlify. The proxied HTML is ours, not the website's layout, so nothing the
 * website adds reaches a docs page unless this site adds it too.
 *
 * The collector script is not copied here: it is the website's /assets/js/analytics.js
 * (korzhcom-website, source/assets/js/analytics.js), loaded from korzh.com itself. That path lies
 * outside the docs paths, so the website serves it directly. It counts the page view through
 * /t/hit and keeps the UTM campaign the visitor arrived with. If the website moves or renames
 * that file, the docs stop counting without any error - change this along with it.
 *
 * Both scripts load on korzh.com only. This site is also reachable on its own netlify.app address
 * and on deploy previews, which are not readers and where /assets/js/analytics.js does not exist,
 * and a developer running the docs locally is not a visitor either.
 *
 * The loaders are inlined into every page through Starlight's `head` option.
 */

const COLLECTOR_SCRIPT = "/assets/js/analytics.js";
const GTM_CONTAINER = "GTM-KWL8N67";

/* Loads the website's collector script, which reports the page view as soon as it runs. */
function loadCollector(src) {
    var host = window.location.hostname;
    if (host !== "korzh.com" && host !== "www.korzh.com") {
        return;
    }

    var script = document.createElement("script");
    script.async = true;
    script.src = src;

    var first = document.getElementsByTagName("script")[0];
    first.parentNode.insertBefore(script, first);
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
    { tag: "script", content: `(${loadCollector.toString()})(${JSON.stringify(COLLECTOR_SCRIPT)});` },
    { tag: "script", content: `(${loadTagManager.toString()})(${JSON.stringify(GTM_CONTAINER)});` },
];
