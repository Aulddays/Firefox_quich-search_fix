// ==UserScript==
// @name     Firefox quick-search fix
// @description  Disallow webpage to capture '/' key, but keep the default quick-seach of Firefox
// @namespace    http://live.aulddays.com/
// @include      http://*.baidu.com/*
// @include      https://*.baidu.com/*
// @include      https://github.com/*
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @author       Aulddays
// @version  2
// @grant    none
// @run-at       document-start
// ==/UserScript==

// Copyright 2019 Aulddays
/*
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

this.$ = this.jQuery = jQuery.noConflict(true);

document.addEventListener ("DOMContentLoaded", run);
window.addEventListener ("pageFullyLoaded", run);

function run()
{
	fix();
	setTimeout(fix, 1000);
	setTimeout(fix, 2000);
	setTimeout(fix, 3000);
}

function fix()
{
	console.log("Firefox quick-search fix run");
	//document.documentElement.onkeypress =
	document.body.onkeypress = 
			function(e) {
		//console.log("Firefox quick-search on key press " + e.charCode.toString() + " " + e.target.toString());
		if (e.charCode == 47 && e.target.tagName.toUpperCase() == 'BODY') {
			e.stopImmediatePropagation();
			console.log("Firefox quick-search prevent keypress");
//      return false;
		}
	};
	document.body.onkeydown = 
			function(e) {
		//console.log("Firefox quick-search on key down " + e.keyCode.toString() + " " + e.target.toString());
		if (e.keyCode == 191 && !e.altKey && !e.ctrlKey && !e.shiftKey && e.target.tagName.toUpperCase() == 'BODY') {
			e.stopImmediatePropagation();
			console.log("Firefox quick-search prevent keydown");
		}
	};
	// baike
	if (window.location.hostname == "baike.baidu.com")
	{
		var focused = $(document.activeElement);
		if (focused.attr('id') == "query" && !focused.hasClass("aulddays_blurred"))
		{
			focused.addClass("aulddays_blurred");
			focused.blur();
			console.log("Firefox quick-search fix baike");
		}
	}
	console.log("Firefox quick-search fix end");
}
