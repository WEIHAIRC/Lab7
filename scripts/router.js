// router.js

export const router = {};

// selectors to use later
var bodySelector = document.querySelector("body");
var titleSelector = document.querySelector("h1");
var entrySelector= document.querySelector("entry-page");

/**
 * Changes the "page" (state) that your SPA app is currently set to
 */
router.setState = function(page, index, entry, backward) {
    // page parameter is a string telling which page to load

    // Set to homepage, modify body
    // *** A huge bug here! page could be null when history is empty!
    if (page == null || page == "home") {
        bodySelector.className = "index";
        titleSelector.innerHTML = "Journal Entries";
        if (!backward) {
            history.pushState(page, "home", '/');
        }

        // follow 4.2 hint.
        let newPage = document.createElement("entry-page");
        entrySelector.replaceWith(newPage);
        
    }
    // Set to Settings, modify body
    if (page == "setting") {
        bodySelector.className = "settings";
        titleSelector.innerHTML = "Settings";
        if (!backward) {
            history.pushState(page,"settings", '#settings');
        }
        
        let newPage = document.createElement("entry-page");
        entrySelector.replaceWith(newPage);
    }
    // Set to an entry page, modify body and entry-page
    if (page == "entry") {
        bodySelector.className = "single-entry";
        entrySelector = document.querySelector("entry-page");
        titleSelector.innerHTML = `Entry ${index+1}`;
        if (!backward) {
            history.pushState(page, "entry", `#entry${index+1}`);
        }

        let newPage = document.createElement("entry-page");
        // something wrong here, should be an entry, not a page.
        // entrySelector.replaceWith(newPage);

        // We need this entry. Finally I found that we should pass it in through func param
        newPage.entry = entry;
        entrySelector.replaceWith(newPage);
    }
}
