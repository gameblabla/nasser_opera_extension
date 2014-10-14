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


	if (once == 0){
			/* Sets Proxy to default on Start-up*/
	
			var config = { 
				  mode: "system",
				  rules: {
					}
			};
	
	
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
		
		chrome.proxy.settings.set({value: config, scope: 'regular'});
		// Needed in order to send our modified User-Agent to websites
});

	
function loop(){
	/*
	There are no way to disable the history
	so our only way is to clear the history each time it is 'updated'.
	
	*/
			chrome.browsingData.remove({
			"originTypes": { "unprotectedWeb": false , "protectedWeb": false }
				}, 
			{
			"appcache": false,
			"cache": true,
			"cookies": false,
			"downloads": true,
			"fileSystems": false,
			"formData": false,
			"history": true,
			"indexedDB": false,
			"localStorage": true,
			"serverBoundCertificates": false,
			"pluginData": false,
			"passwords": false,
			"webSQL": false
			});
			
				chrome.webRequest.onBeforeSendHeaders.addListener( handler, requestFilter, extraInfoSpec );
				chrome.webRequest.onBeforeSendHeaders.addListener( change_encoding, requestFilter_6, extraInfoSpec_6 );
				chrome.webRequest.onBeforeSendHeaders.addListener( change_language, requestFilter_4, extraInfoSpec_4 );
				chrome.webRequest.onBeforeSendHeaders.addListener( change_content_types, requestFilter_5, extraInfoSpec_5 );
}


