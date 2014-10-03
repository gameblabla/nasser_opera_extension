/*
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
*/

var once = 0;
var proxy_mode = 0;
var i;

/*

Refer to the function Blockurl();

If it finds one of the following key words in the url then it is blocked.
This applies to every URL request.

This list is needed because some popular websites
that needs Javascript are using trackers like Google Analytics.

Firefox users with Noscript can select
which domain they want to allow to execute Javascripts.
However, replicating this on Opera is complicated and way too much to me.

Instead , i made this small blacklist that prohibit the more popular analytics.
It affects files hosted by the Website as well. 

It is affective against analysers like Google Analytics but 
a bit less against analysers like Piwik where it is hosted by web hosters themselves.
A Web hoster can avoid our blacklist by simply modifying the file name to something else.
(Change piwik to pwik and it will go unblocked)

However, doing this is generally a lot of work and most of them if not all don't do this.

And that is why you should never allow Javascript on suspicious websites.

Prohibiting 'Session:' protects users against
tracking by third party HTTP authentication headers.

*/

var words = 
[
'piwik', 'analytics', 'analyser', 'awstats', 'clicktale', 
'addthis', 'ads', 'omniture' ,
'statcounter', 'doubleclick', 'quantserver', 
'adzerk', 'gchq.co.uk',
'scorecard', 'gstatic',
'cloudflare','ad.','cpmstar','http://Session:','Session:',
'www.google','//:google','opera-mini','91.203.99.36','91.203.99.16'
];

	if (once == 0){
			/* Sets Proxy to default on Start-up*/
	
			var config = { 
				  mode: "system",
				  rules: {
					}
			};
	
			/*
				Spoof another User-agent (the one used by Tor Browser)
				If Javascript is enabled, they can still know your real User-Agent
				so watch out !
			*/
	
			var requestFilter = {
					urls: [ "<all_urls>" ]
				},
				extraInfoSpec = ['requestHeaders','blocking'],
				handler = function( details ) {
				 
					var headers = details.requestHeaders,
					  blockingResponse = {};
					for( var i = 0, l = headers.length; i < l; ++i ) {
					  if( headers[i].name == 'User-Agent' ) {
						headers[i].value = 'Mozilla/5.0 (Windows NT 6.1; rv:24.0) Gecko/20100101 Firefox/24.0';
						break;
					  }
					}
				blockingResponse.requestHeaders = headers;
				return blockingResponse;
			};
			
			
			/*
				Spoof another User-agent (For JonDO)
				I had to give up JonDo support because :
				- You can't disable cache memory (or at least, i don't know how to do it)
				- There are no way like Firefox to disable proxy keep alive.
				JonDo users could use this securely only if they only go to HTTPS websites.
				Anyway, i will enable it when Opera and/or Google will change their minds again.
			*/
			var requestFilter_2 = {
					urls: [ "<all_urls>" ]
				},
				extraInfoSpec_2 = ['requestHeaders','blocking'],
				handler_2 = function( details ) {
				 
					var headers_2 = details.requestHeaders,
					  blockingResponse = {};
					for( var i = 0, l = headers_2.length; i < l; ++i ) {
					  if( headers_2[i].name == 'User-Agent' ) {
						headers_2[i].value = 'Mozilla/5.0 (X11; Linux i686; rv:31.0) Gecko/20100101 Firefox/31.0';
						break;
					  }
					}
				blockingResponse.requestHeaders = headers_2;
				return blockingResponse;
			};
			
			/*
				Change HTTP Headers to the default used by Tor Browser/Firefox.
				Unfortunely, the order of the headers are different from Firefox
				so unless Opera decide to change it or Opera/Google adds an API for that,
				there's nothing we can do.
				I'll leave it here in case they decide to change their mind.
				In contrast to User-Agent, it works even with Javascript enabled.
				For now, it only makes it more difficult (but not impossible)
				to identify your browser.
			*/
			
			var requestFilter_4 = {
					urls: [ "<all_urls>" ]
				},
				extraInfoSpec_4 = ['requestHeaders','blocking'],
				change_language = function( details ) {
				 
					var headers_4 = details.requestHeaders,
					  blockingResponse = {};
					for( var i = 0, l = headers_4.length; i < l; ++i ) {
					  if( headers_4[i].name == 'Accept-Language' ) {
						headers_4[i].value = 'en-us,en;q=0.5';
						break;
					  }
					}
				blockingResponse.requestHeaders = headers_4;
				return blockingResponse;
			};
			
			var requestFilter_5 = {
					urls: [ "<all_urls>" ]
				},
				extraInfoSpec_5 = ['requestHeaders','blocking'],
				change_content_types = function( details ) {
				 
					var headers_5 = details.requestHeaders,
					  blockingResponse = {};
					for( var i = 0, l = headers_5.length; i < l; ++i ) {
					  if( headers_5[i].name == 'Accept' ) {
						headers_5[i].value = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';
						break;
					  }
					}
				blockingResponse.requestHeaders = headers_5;
				return blockingResponse;
			};
			
			var requestFilter_6 = {
					urls: [ "<all_urls>" ]
				},
				extraInfoSpec_6 = ['requestHeaders','blocking'],
				change_encoding = function( details ) {
				 
					var headers_6 = details.requestHeaders,
					  blockingResponse = {};
					for( var i = 0, l = headers_6.length; i < l; ++i ) {
					  if( headers_6[i].name == 'Accept-Encoding' ) {
						headers_6[i].value = 'gzip, deflate';
						break;
					  }
					}
				blockingResponse.requestHeaders = headers_6;
				return blockingResponse;
			};
		
			/* 
			Using Off-road is highly not recommended !
			The ip adress never changes and you can still suffer to e-tags attacks and much more.
			In fact , it might be better to use your real ip adress than connecting to proxy servers like the one by Opera.
			Don't turn it on !
			*/
			opr.offroad.enabled.set({'value': false}, function(){});
			
			/*
			Disable autofill, Search Suggest, Spelling service , Translation
			They are largely useless and they can leak data.
			Again, I don't want to take any risks.
			*/
			
			chrome.privacy.services.autofillEnabled.set({ value: false }, function(){});
			chrome.privacy.services.searchSuggestEnabled.set({ value: false }, function(){});
			chrome.privacy.services.spellingServiceEnabled.set({ value: false }, function(){});
			chrome.privacy.services.translationServiceEnabled.set({ value: false }, function(){});
			
			/*
			I chose to disable Third pary cookies by default but it can
			be reverted in the settings.
			*/
			
			chrome.privacy.websites.thirdPartyCookiesAllowed.set({ value: false }, function(){});
			
			/*
			Neither Opera nor Google gives the ability to disable the referrers in the settings. 
			However , they provided this API to disable it. So i disabled referrers.
			*/
			
			chrome.privacy.websites.referrersEnabled.set({ value: false }, function(){});
			
			/*
			Safe Browsing is not Incognito mode.
			Basically, it detects if a website is trying to use Javascript vulnerabilities for exemple.
			However, it's largely ineffective and i think it connects to Opera/Google servers as well...
			*/
			
			chrome.privacy.services.safeBrowsingEnabled.set({ value: false }, function(){});
			
			// Needed in order to send our modified User-Agent to websites
			//chrome.webRequest.onBeforeSendHeaders.addListener( handler, requestFilter, extraInfoSpec );
			
			// Delete all the History on Start
						chrome.browsingData.remove({
			"originTypes": { "unprotectedWeb": true , "protectedWeb": true }
				}, 
			{
			"appcache": true,
			"cache": true,
			"cookies": true,
			"downloads": true,
			"fileSystems": true,
			"formData": true,
			"history": true,
			"indexedDB": true,
			"localStorage": true,
			"serverBoundCertificates": true,
			"pluginData": true,
			"passwords": true,
			"webSQL": true
			});
			
			chrome.browserAction.setBadgeText({ text: "None" });
			proxy_mode = 0;
			once = 1;
	}

	
	// Our function to block trackers and also some attacks
	loop();
	/*
	What this does is to add a header.
	
	chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        details.requestHeaders.push({name:"Encoding",value:"gzip, deflate"});
        return {requestHeaders: details.requestHeaders};
    },
    {urls: ["<all_urls>"]},
    ["requestHeaders", "blocking"]
                      //^^^^^^^^
	);
	*/
	
	


chrome.browserAction.onClicked.addListener(function(){		
		proxy_mode = proxy_mode + 1;
		
		/* JonDO/JAP users , uncomment the line below */
		// if (proxy_mode > 2) proxy_mode = 0;
		if (proxy_mode > 1) proxy_mode = 0;
		
		if (proxy_mode == 0) {
			var config = { 
				  mode: "system",
				  rules: {
					}
			};
		chrome.browserAction.setBadgeText({ text: "None" });
		}
		else if (proxy_mode == 1) {
			var config = { 
				  mode: "fixed_servers",
				  rules: {
					proxyForHttp: { scheme: "socks4",host: "127.0.0.1",port : 9050},
					proxyForHttps: { scheme: "socks4", host: "127.0.0.1",port : 9050}, bypassList: ["www.torproject.org"]
					}
			};
		chrome.browserAction.setBadgeText({ text: "Tor" });
		}
		else if (proxy_mode == 2) {
			var config = { 
				  mode: "fixed_servers",
				  rules: {
						proxyForHttps : {
							scheme: "http",
							host: "127.0.0.1",
							port: 4001
						},
						proxyForHttp : {
							scheme: "http",
							host: "127.0.0.1",
							port: 4001
						},
						proxyForFtp : {
							host: "127.0.0.1",
							port: 4001
						}
					}
			};
		chrome.browserAction.setBadgeText({ text: "JAP" });
		}
		
		chrome.proxy.settings.set({value: config, scope: 'regular'});
		// Needed in order to send our modified User-Agent to websites
});

	
function loop(){
	/*
	There are no way to disable the history
	so our only way is to clear the history each time it is 'updated'.
	This way, It never gets filed or even touched.
	*/
			chrome.browsingData.remove({
			"originTypes": { "unprotectedWeb": false , "protectedWeb": false }
				}, 
			{
			"appcache": true,
			"cache": true,
			"cookies": false,
			"downloads": true,
			"fileSystems": false,
			"formData": true,
			"history": true,
			"indexedDB": true,
			"localStorage": true,
			"serverBoundCertificates": false,
			"pluginData": true,
			"passwords": true,
			"webSQL": true
			});
			
			if (proxy_mode == 2) {
				chrome.webRequest.onBeforeSendHeaders.addListener( handler_2, requestFilter_2, extraInfoSpec_2 );
				}
			else{
				chrome.webRequest.onBeforeSendHeaders.addListener( handler, requestFilter, extraInfoSpec );
			}

				chrome.webRequest.onBeforeSendHeaders.addListener( change_encoding, requestFilter_6, extraInfoSpec_6 );
				chrome.webRequest.onBeforeSendHeaders.addListener( change_language, requestFilter_4, extraInfoSpec_4 );
				chrome.webRequest.onBeforeSendHeaders.addListener( change_content_types, requestFilter_5, extraInfoSpec_5 );
				
				
			blockUrl();
}


function blockUrl(){
/*
I tried a for.. loop but it is ignored
by the browser so i had to do this instead.

	for (i=0;i<words.length;i++){
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[i]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		//alert(i);
	}
*/

		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[0]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		

		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[0]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[1]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[2]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[3]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[4]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[5]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[6]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[7]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[8]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[9]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[10]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[11]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[12]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[13]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[14]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[15]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[16]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[17]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[18]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[19]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[20]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[21]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[22]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[23]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[24]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[25]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[26]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[27]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[28]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[29]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split('/', 3)[2];return {cancel: hostname.indexOf(words[30]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);

		
}

