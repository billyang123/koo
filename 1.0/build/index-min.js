/*!build time : 2014-08-23 2:12:55 PM*/
KISSY.add("gallery/koo/1.0/index",function(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p;return d=b.all,l=b.one,i=!0,a.UA.ie&&a.UA.ie<9&&(i=!1),k=parseInt(1e5*Math.random()),n=!1,p=null,f=null,g=null,j=function(a,b,c,e,h,i,j){var k;return"object"==typeof a&&a.target?(a.calendar&&(f=a.calendar),a.editor&&(g=a.editor),a.callback&&"function"==typeof b&&(this.callback=a.callback),a.calConfig&&(this.calConfig=a.calConfig),a.editorConfig&&(this.editorConfig=a.editorConfig),a.addValidation&&(p=a.addValidation),k=a.target):(k=a,f=e,g=i,b&&"function"==typeof b&&(this.callback=b),h&&(this.calConfig=h),j&&(this.editorConfig=j),c&&(p=c)),!k||(this.form="string"==typeof k?d(k):k,this.form.length<1)?void 0:("FORM"!==this.form[0].tagName&&(this.form=d("form",this.form)),this.form.on("submit",this.check),this.editors=[],this.bind(),this.bindSelect(),this.bindArea())},j.prototype.check=function(a){var b,c,e,f,g,i,j,k;if(n)return a.halt(),!1;for(n=!0,e=!1,c=d("input,select,textarea",this.form),f=j=0,k=c.length;k>=0?k>j:j>k;f=k>=0?++j:--j)b=d(c[f]),i=h(b),void 0!==i&&i.length>0&&!o(b,i)&&(e=!0);return n=!1,this.callback&&(g=this.callback(!e),"boolean"==typeof g&&(e=!g)),e&&a.halt(),!e},j.prototype.bind=function(){var b,c,e,g,j,k,l,m,n,p,q,r,s;for(c=d("input",this.form),s=[],g=q=0,r=c.length;r>=0?r>q:q>r;g=r>=0?++q:--q)p=d(c[g]),l=h(p),l&&(p.on("focusout",function(a){var b,c,e;return e=d(a.currentTarget),b=h(e),b&&b[0].length>0&&o(e,b),i||""!==e.val()?void 0:(c=" "+e.attr("placeholder")+"  ",e.addClass("koo-holder"),e.val(c))}),e=p.attr("placeholder"),e&&!i&&(e=" "+e+"  ",p.addClass("koo-holder"),p.val(e),p.on("focusin",function(a){var b;return b=d(a.currentTarget),e=" "+b.attr("placeholder")+"  ",b.val()===e?(b.val(""),b.removeClass("koo-holder")):void 0})),!l||l.length<1||(j=p.attr("type"),"radio"===j&&l[0]===p.val()&&p.attr("checked","true"),"checkbox"===j&&(b=","+l[0]+",",m=","+p.val()+",",b.indexOf(m)>-1&&p.attr("checked","true")),f&&s.push(function(){var b,c,e;for(e=[],b=0,c=l.length;c>b;b++)k=l[b],"date"===k?(n=p,this.calConfig||(this.calConfig={popup:!0,triggerType:["click"],closable:!0}),e.push(new f(n,this.calConfig).on("select",function(b){var c;return c=d("#"+b.currentTarget.id),c.val(a.Date.format(b.date,"yyyy-mm-dd"))}))):e.push(void 0);return e}.call(this))));return s},j.prototype.bindSelect=function(){var a,b,e,f,g,i,j,k,l,m,n,p;for(b=d("select",this.form),l=0,n=b.length;n>l;l++){if(a=b[l],i=h(a))for(j=","+i[0]+",",e=d("option",a),f=m=0,p=e.length;p>=0?p>m:m>p;f=p>=0?++m:--m)j.indexOf(e[f].value)>-1&&d(e[f]).attr("selected","selected");d(a).hasClass("decorate")&&(k=d(a).width(),g=c.Select.decorate(a,{prefixCls:"bns-",width:k+"px",menuCfg:{align:{points:["tl","tl"],offset:[0,-1]},elStyle:{"max-height":"200px",overflow:"auto",overflowX:"hidden"}}}))}return b.on("change",function(a){var b;return b=d(a.target),i=h(b),i?o(b,i):void 0})},j.prototype.bindArea=function(){var a,b,c,e,f,i,j,k;for(a=d("textarea",this.form),k=[],b=i=0,j=a.length;j>=0?j>i:i>j;b=j>=0?++i:--i)f=d(a[b]),e=h(f),e&&("editor"===e[0]&&g?(this.editorConfig||(this.editorConfig="htmldataprocessor,enterkey,clipboard,sourcearea,preview,separator,undo,separator,removeformat,font,color,separator,list,indent,justify,separator,link,image,smiley,separator,table,resize,maximize"),c=g(f,{attachForm:!0,baseZIndex:99}).use(this.editorConfig),k.push(this.editors.push(c))):k.push(f.on("focusout",function(a){var b,c;return c=l(a.currentTarget),b=h(c),!b||b.length<1?void 0:null!==b&&b[0].length>0?o(c,b):void 0})));return k},h=function(a){var b;return b=d(a).attr("koo"),b?b.split("-"):void 0},o=function(b,c){var e,f,g,h,i,j,k,l,n,o,q,r,s,t,u,v,w,x;for(h=!1,k="",s=b.val(),i=t=0,v=c.length;v>=0?v>t:t>v;i=v>=0?++t:--t){if(r=c[i],"!"===c[i].charAt(0)){if(""===s){h=!1;continue}r=c[i].substr(1,c[i].length-1)}switch(j=!1,r){case"need":a.trim(s)!==s&&(s=d.trim(s),b.val(s)),""===s&&(h=!0,k="\u4e0d\u80fd\u4e3a\u7a7a");break;case"digit":/^[0-9]\d*$/.test(s)||(h=!0,k="\u8bf7\u8f93\u5165\u6570\u5b57"),j=!0;break;case"chinese":""!==s&&/^[\u4e00-\u9fff]*$/.test(s)||(h=!0,k="\u8bf7\u8f93\u5165\u6c49\u5b57");break;case"money":/^\d+(\.\d{1,2})?$/.test(s)||(h=!0,k="\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u91d1\u989d"),j=!0;break;case"card":/^\d{15}|\d{18}$/.test(s)||(h=!0,k="\u8bf7\u8f93\u5165\u8eab\u4efd\u8bc1\u53f7"),j=!0;break;case"zip":/^[0-9]\d{5}(?!\d)$/.test(s)||(h=!0,k="\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u90ae\u7f16"),j=!0;break;case"float":/^(-|\+)?\d+(\.\d+)?$/.test(s)||(h=!0,k="\u8bf7\u8f93\u5165\u6d6e\u70b9\u6570\u5b57"),j=!0;break;case"tel":/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$|^\d{11}$|^\d{10}$/.test(s)||(h=!0,k="\u8bf7\u8f93\u5165\u7535\u8bdd\u53f7\u7801"),j=!0;break;case"mobile":/^(\+?86)?(13[0-9]|15[0-9]|18[0-9])\d{8}$/.test(s)||(h=!0,k="\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801"),j=!0;break;case"char":""!==s&&/^[a-z\_\-A-Z]*$/.test(s)||(h=!0,k="\u8bf7\u8f93\u5165\u82f1\u6587\u5b57\u7b26\u4e32"),j=!0;break;case"date":""===s||/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/.test(s)||(h=!0,k="\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u65e5\u671f"),j=!0;break;case"mail":/^[a-zA-Z0-9_\-]+(\.[_\-|a-z|A-Z|0-9]+)*@[a-z0-9]+(\.[a-z0-9-_]+){1,3}$/.test(s)||(h=!0,k="\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u90ae\u7bb1"),j=!0;break;default:switch(l=r.substr(1,r.length-1).replace("$","-"),r.charAt(0)){case"l":n=parseInt(r.substr(1),10),(""===s||s.length!==n)&&(h=!0,k="\u957f\u5ea6\u5fc5\u987b\u7b49\u4e8e"+n+"\u4f4d");break;case"s":n=parseInt(r.substr(1),10),(""===s||s.length>n)&&(h=!0,k="\u957f\u5ea6\u5fc5\u987b\u5c0f\u4e8e"+n+"\u4f4d");break;case"b":n=parseInt(r.substr(1),10),(""===s||s.length<n)&&(h=!0,k="\u957f\u5ea6\u5fc5\u987b\u5927\u4e8e"+n+"\u4f4d");break;case"<":r=r.substr(1),o=parseInt(r,10),isNaN(o)&&(o=parseInt(d("#"+r).val(),10),k="\u4e0d\u80fd\u5c0f\u4e8e\u5b83"),(""===s||!/^-?([1-9]\d*\.?\d*|0\.?\d*[1-9]\d*|0?\.?0+|0)$/.test(s)||parseFloat(s)>=o)&&(h=!0,k="\u5fc5\u987b\u5c0f\u4e8e"+o);break;case">":r=r.substr(1),q=parseInt(r,10),isNaN(q)&&(q=parseInt(d("#"+r).val(),10),k="\u4e0d\u80fd\u5c0f\u4e8e\u5b83"),(""===s||!/^-?([1-9]\d*\.?\d*|0\.?\d*[1-9]\d*|0?\.?0+|0)$/.test(s)||parseFloat(s)<=q)&&(h=!0,k="\u5fc5\u987b\u5927\u4e8e"+q);break;case"=":document.getElementById(l).value!==s&&(h=!0,k="\u4e24\u6b21\u8f93\u5165\u4e0d\u4e00\u81f4");break;case"/":""===s&&""===document.getElementById(l).value&&(h=!0,k="\u81f3\u5c11\u8981\u586b\u5199\u4e00\u9879");break;case"*":if(k="\u5fc5\u987b\u5927\u4e8e\u524d\u9762\u65f6\u95f4",(""===s||""===document.getElementById(l).value)&&(h=!0),e=document.getElementById(l).value.split("-"),g=s.split("-"),e.length!==g.length)h=!0;else for(f=u=0,w=e.length;(w>=0?w>u:u>w)&&!(parseInt(e[f],10)<parseInt(g[f],10));f=w>=0?++u:--u)if(parseInt(e[f],10)>parseInt(g[f],10)){h=!0;break}break;default:p&&p[r]&&(x=p[r],new RegExp(x[0]).test(s)||(h=!0,k=x[1]))}}if(j&&b.css("ime-mode","disabled"),h)return m(b,!0,k)}return m(b,!1)},m=function(a,b,c){var e,f,g,h;return e=a.attr("koo"),g=a.data("rndID"),g||(k++,g="k"+k,a.data("rndID",g)),h=d("#"+g),0===h.length&&(f=d(a.next()),f||"B"!==f[0].tagName||(f.attr("id",g),h=d(f))),b||0!==h.length&&"B"!==h[0].nodeName?(a.attr("warn")&&(c=a.attr("warn")),h.length>0&&"B"===h[0].nodeName?(h.attr("class","koo-error"),h.html(c)):a.after('<b id="'+g+'" class="koo-error">'+c+"</b>"),!1):-1===e.indexOf("success")?h.remove():(h.length>0?(h.attr("class","koo-success"),h.html("&nbsp;")):a.after('<b id="'+g+'" class="koo-success">&nbsp;</b>'),!0)},e={},e.init=function(a,b,c,d,e,f,g){return new j(a,b,c,d,e,f,g)},e},{requires:["node","menubutton"]});