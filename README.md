KANOPE is an Opera extension that allows you to connect for TOR.
KANOPE also protects you against some attacks like :
- Referrer & History sniffing
- User-Agent sniffing (if Javascript is disabled)
- Tracking by third party HTTP authentication headers.
- Some trackers (Google Analytics, AddThis, Omniture, Piwik etc...)
- Third-party cookies

Install it and then go to http://ip-check.info/ to see how much effective it is. <br>
The only big problems are :  <br>
- The HTTP headers order is not same as Firefox so the signature is different from TorBrowser.
- The referer is disabled but it can break some websites.
- An attacker can indirectly know the fonts you have installed on your PC with @font-face.

Modifying the referer to only send the current domain needs additional code 
<br>(and i don't know how to do this),<br>
the signature thingy can't be solved by an extension (only by Opera or Google) 
<br>and blocking @font-face is possible but i have no idea how to do to this.<br>
<br>
It's my first extension for any browser. <br>
I made it because no addons on https://addons.opera.com/ filled my needs. <br>
See it as a all-in-one privacy package for Opera. <br>

