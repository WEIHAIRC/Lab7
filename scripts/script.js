// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      // also need index to be stored.
      entries.forEach( (entry, index) => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;

        // Make each entry clickable
        newPost.addEventListener("click", () => {
            setState("entry", index, entry, false);
        });

        document.querySelector('main').appendChild(newPost);
      });
    });
});

// Make setting icon clickable
document.querySelector('img').addEventListener("click", clickSetting);

function clickSetting() {
    setState("setting", null, null, false);
};

// Title clickable come back to homepage.
document.querySelector('h1').addEventListener("click", clickTitle);

function clickTitle() {
    setState("home", null, null, false);
};

window.addEventListener('popstate', (event) => {
    setState(event.state, null, null, true);
});
