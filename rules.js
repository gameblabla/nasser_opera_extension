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

/*

Refer to the function Blockurl();

If it finds one of the following in the url then it is blocked.
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

However, doing this is generally a lot of work and most of them if not all don"t do this anyway.

And that is why you should never allow Javascript on suspicious websites.

Prohibiting "Session:" protects users against
tracking by third party HTTP authentication headers.

*/

var caca;

var words = 
[
	"anal", 
	"doubletrack", 
	"doubleclick", 
	"googleadservices", 
	"google.js", 
	"piwik", 
	"awstats", 
	"clicktale", 
	"addthis", 
	"omniture" ,
	"exoclick" ,
	"statcounter", 
	"gchq.",
	"scorecard", 
	"ad.",
	"ad-",
	"ads",
	"www2",
	"/*.gif?",
	"http://Session:",
	"Session:",
	".gov/stat?",
	"advstats",
	"bluekai",
	"uniblue",
	"piwik",
	"pixel.php",
	"&ctxId=*&pubId=*&objId=",
	'/ajax/pi/phd?abd=0$xmlhttprequest',
	'creative.ak.fbcdn.net',
	'facebook.com/plugins/likebox.php?',
	'*paheal.net/script*',
	'*paheal.net/*/script*',
	'0427d7.se'
];



	blockUrl();

function blockUrl(){


		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[0]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[0]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[1]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[2]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[3]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[4]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[5]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[6]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[7]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[8]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[9]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[10]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[11]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[12]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[13]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[14]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[15]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[16]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[17]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[18]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[19]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[20]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[21]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[22]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[23]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[24]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[25]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[26]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[27]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[28]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[29]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[30]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[31]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[32]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		chrome.webRequest.onBeforeRequest.addListener(function(details) {var hostname = details.url.split("/", 3)[2];return {cancel: hostname.indexOf(words[33]) >= 0};},{urls:[ "<all_urls>" ]},["blocking"]);
		
}

