var once = 0;

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
'scorecard', 'gstatic' ,
'cloudflare','ad.','cpmstar','http://Session:','Session:'
];

	if (once == 0){
	
			/*
			Configure the proxy settings and set it to the port used by default TOR
			
			A JonDo user can user NASSER but they will have to :
			- Change all the ports to 4001
			- Add proxy schemes for socks5 , http and ftp.
			
			They need to change the User-Agent as well to use the one recommended
			by JonDo.
			
			The bypass list is here to allow users to download TOR.
			Of course , it is only allowed through HTTPS in order to avoid snoo-PINGAS !
			Aka Snooping
			*/
			
			var config = { 
				  mode: "fixed_servers",
				  rules: {
					proxyForHttp: { scheme: "socks4",host: "127.0.0.1",port : 9050},
					proxyForHttps: { scheme: "socks4", host: "127.0.0.1",port : 9050}, bypassList: ["www.torproject.org"]
					}
			};
			
			// Set Proxy to TOR , port 9050
			chrome.proxy.settings.set({value: config, scope: 'regular'});
			
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
			
			/*
			
			Someone posted this nice piece of code. (Not mine)
			It sends a different User-Agent to websites.
			It is however only effective if javascript is disabled on the website in question. 
			(I recommend to disable it and to add exceptions)
			
			The User-Agent entered here is usually used by Tor browser Bundle
			users but because NASSER is still not perfect,
			someone can still know if the user is using Opera/NASSER or the Tor Browser Bundle.
			
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
			
			// Needed in order to send our modified User-Agent to websites
			chrome.webRequest.onBeforeSendHeaders.addListener( handler, requestFilter, extraInfoSpec );
			
			// Delete all the History on Start
			chrome.history.deleteAll(function(){});
			once = 1;
	}

	// Our function to block trackers and also some attacks
	blockUrl();
	
	// Our 'loop'. Trigerred every time there's an activity
	chrome.tabs.onUpdated.addListener(loop);
	
	// Needed in order to send our modified User-Agent to websites
	chrome.webRequest.onBeforeSendHeaders.addListener( handler, requestFilter, extraInfoSpec );

function loop(){
	/*
	There are no way to disable the history
	so our only way is to clear the history each time it is 'updated'.
	This way, It never gets filed or even touched.
	*/
	chrome.history.deleteAll(function(){});
}

/*
function clear_history_full(){
			chrome.browsingData.remove({
			"originTypes": { "unprotectedWeb": false , "protectedWeb": false }
				}, 
			{
			"appcache": true,
			"cache": true,
			"cookies": false,
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
}
*/

function blockUrl(){
/*
I tried a for.. loop but it is ignored
by the browser so i had to do this instead.
*/
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

