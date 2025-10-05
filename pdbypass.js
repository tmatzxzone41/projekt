// ==UserScript==
// @name        Bypass pixeldrain download
// @namespace   Violentmonkey Scripts
// @match       https://pixeldrain.com/u/*
// @grant       none
// @version     2.0
// @author      TmatzXzonE
// @description 1/30/2024, 11:47:15 AM
// ==/UserScript==
(function() {
    'use strict';

    // Get the file code from the URL
    var fileCode = window.location.pathname.split('/').pop();

    // Create and configure the button
    var newButton = document.createElement('button');
    newButton.className = 'button svelte-jngqwx';
    newButton.innerHTML = '<i class="icon">download</i> <span>Bypass Download</span>';

    newButton.addEventListener('click', function() {
        // Open a new tab with the custom URL
        window.open('https://pd.1drv.eu.org/' + fileCode, '_blank');
    });

    // Find the existing download button container
    var downloadContainer = document.querySelector('.description.svelte-jngqwx');

    // Find toolbar element and append the button
    var toolbar = document.querySelector("div.toolbar.svelte-jngqwx.toolbar_visible");
    if (toolbar) {
        toolbar.appendChild(newButton);
    } else {
        console.error('Toolbar element not found.');
    }
})();
