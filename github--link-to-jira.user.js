// ==UserScript==
// @name        Link to Jira from Github
// @namespace   https://github.com/duncanchung/greasemonkey/
// @description Make Jira ids linkable from Github
// @author      duncanchung
// @copyright   2016
// @license     GNU GPLv3
// @homepage    https://github.com/duncanchung/greasemonkey
// @homepageURL https://github.com/duncanchung/greasemonkey
// @supportURL  https://github.com/duncanchung/greasemonkey/issues
// @version     1
// @grant       none
// @include     https://github.com/*
// ==/UserScript==
(function () {
  function init() {
    var jiraRegex = /\b([A-Z]+-[0-9]+)\b/g;
    var itemsToCheck = new Array();
    document.querySelectorAll('span.js-issue-title').forEach(function (e) {
      itemsToCheck.push(e);
    });
    document.querySelectorAll('a.message').forEach(function (e) {
      itemsToCheck.push(e);
    });
    document.querySelectorAll('p.commit-title').forEach(function (e) {
      itemsToCheck.push(e);
    });
    itemsToCheck.forEach(function (e) {
      if (jiraRegex.test(e.innerHTML)) {
        e.innerHTML = e.innerHTML.replace(jiraRegex, '<a href="https://domain.atlassian.net/browse/$1">$1</a>');
      }
    });
  }  // Page load;

  init();
  // On pjax;
  document.addEventListener('pjax:end', init);
}) ();
