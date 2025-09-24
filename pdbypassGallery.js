// ==UserScript==
// @name        Bypass pixeldrain download (gallery)
// @namespace   http://tampermonkey.net/
// @match       https://pixeldrain.com/l/*
// @grant       none
// @version     1.0
// @author      TmatzXzonEv
// ==/UserScript==
(function() {
    'use strict';
    // Click the button and then paste it
    // Function to copy text to clipboard
    function copyToClipboard(text) {
        var textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";

        document.body.appendChild(textarea);

        textarea.select();
        document.execCommand("copy");

        document.body.removeChild(textarea);
    }

    // Function to handle button click
    function handleButtonClick() {
        // Extract file IDs and construct single URLs
        const fileData = window.viewer_data.api_response.files;
        const baseDownloadUrl = 'https://pd.cybar.xyz/';
        const singleUrls = fileData.map(file => `${baseDownloadUrl}${file.id}`).join('\n');

        // Copy URLs to clipboard
        copyToClipboard(singleUrls);
        console.log(singleUrls);
    }

    // Create and configure the button
    var newButton = document.createElement('button');
    newButton.className = 'button svelte-jngqwx';
    newButton.innerHTML = '<i class="icon">content_copy</i> <span>Copy Single Link</span>';
    newButton.addEventListener('click', handleButtonClick);

    // Find toolbar element and append the button
    var toolbar = document.querySelector("div.toolbar.svelte-jngqwx.toolbar_visible");
    if (toolbar) {
        toolbar.appendChild(newButton);
    } else {
        console.error('Toolbar element not found.');
    }
})();
