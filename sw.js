// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests


// Code mostly from https://developers.google.com/web/fundamentals/primers/service-workers

// Register a service worker, copied
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
}

// Install a service worker
var CACHE_NAME = 'Lab7 Cache';
var urlsToCache = [
  // simply put all related files here I guess?
  '/',
  '/scripts/router.js',
  '/scripts/script.js',
  '/components/entry-page.js',
  '/components/journal-entry.js',
  '/style.css',
  '/index.html',
  // Oh god, writeup says "use your service worker to cache and return requests from"
  // this website but I forgot to put it here.
  'https://cse110lab6.herokuapp.com/entries'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          console.log('Opened cache');
          return cache.addAll(urlsToCache);
        })
    );
});

// Update Service Worker, copied
self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});


// Cache and return requests, do we need that more complex one?
// Try, answer is no. Copy the simpler one.
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
  
          return fetch(event.request);
        })
      );
});
