var DateFormatter={settings:{useResourceFile:false,resourceBundle:"",weekDays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],months:["January","February","March","April","May","June","July","August","September","October","November","December"]},token:/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,timezone:/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,timezoneClip:/[^-+\dA-Z]/g,pad:function(e,t){e=String(e);t=t||2;while(e.length<t)e="0"+e;return e},masks:{"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"},format:function(e,t,n){if(arguments.length==1&&Object.prototype.toString.call(e)=="[object String]"&&!/\d/.test(e)){t=e;e=undefined}e=e?new Date(e):new Date;if(isNaN(e)){throw SyntaxError("invalid date")}t=String(this.masks[t]||t||this.masks["default"]);if(t.slice(0,4)=="UTC:"){t=t.slice(4);n=true}var r=n?"getUTC":"get";var i=e[r+"Date"]();var s=e[r+"Month"]();var o=e[r+"FullYear"]();var u=e[r+"Hours"]();var a=e[r+"Minutes"]();var f=e[r+"Seconds"]();var l=e[r+"Milliseconds"]();var c=n?0:e.getTimezoneOffset();var h={d:i,dd:this.pad(i),ddd:this.settings.useResourceFile==true?Util.t("day"+i,this.settings.resourceBundle).substring(0,3):this.settings.weekDays[e.getDay()].substring(0,3),dddd:this.settings.useResourceFile==true?Util.t("day"+i,this.settings.resourceBundle):this.settings.weekDays[e.getDay()],m:s+1,mm:this.pad(s+1),mmm:this.settings.useResourceFile==true?Util.t("month"+s,this.settings.resourceBundle).substring(0,3):this.settings.months[e.getMonth()].substring(0,3),mmmm:this.settings.useResourceFile==true?Util.t("month"+s,this.settings.resourceBundle):this.settings.months[e.getMonth()],yy:String(o).slice(2),yyyy:o,h:u%12||12,hh:this.pad(u%12||12),H:u,HH:this.pad(u),M:a,MM:this.pad(a),s:f,ss:this.pad(f),l:this.pad(l,3),L:this.pad(l>99?Math.round(l/10):l),t:u<12?"a":"p",tt:u<12?"am":"pm",T:u<12?"A":"P",TT:u<12?"AM":"PM",Z:n?"UTC":(String(e).match(this.timezone)||[""]).pop().replace(this.timezoneClip,""),o:(c>0?"-":"+")+this.pad(Math.floor(Math.abs(c)/60)*100+Math.abs(c)%60,4),S:["th","st","nd","rd"][i%10>3?0:(i%100-i%10!=10)*i%10]};return t.replace(this.token,function(e){return e in h?h[e]:e.slice(1,e.length-1)})},parseDate:function(e,t){var n=parseInt(e.substring(0,4));var r=parseInt(e.substring(4,6))-1;var i=parseInt(e.substring(6,8));var s=new Date(n,r,i);return s}};Date.prototype.format=function(e,t){return DateFormatter.format(this,e,t)};Date.prototype.getWeekNumber=function(){var e=new Date(+this);e.setHours(0,0,0);e.setDate(e.getDate()+4-(e.getDay()||7));return Math.ceil(((e-new Date(e.getFullYear(),0,1))/864e5+1)/7)}