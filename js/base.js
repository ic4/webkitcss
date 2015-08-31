var $ = function(arg) {
	return new Base(arg);
}

/* == constructer == */
function Base(arg) {
	if(typeof arg == "object") {
		this.ele = arg;
	}else {
		this.ele = (document.querySelectorAll(arg).length == 1) ? document.querySelector(arg) : document.querySelectorAll(arg);
	}
}

Base.prototype.ajax = function(url,callback) {
	var xhr = null;
	if(window.ActiveXObject) {
		xhr = new ActiveXObject("Microsoft XMLHTTP");
	}else if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	}
	
	if(xhr != null) {
		xhr.open("GET",url,true);
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(xhr.status == 200) {
					callback(xhr.responseText);
				}
			}
		}
		xhr.send();
	}
}

/* - testing - */
Base.prototype.addTree = function(obj,iconObj,url) {
	var con = this.ele;
	for(var i=0;i<obj.types.length;i++) {
		var pramH2 = document.createElement("h2");
		var pramUl = document.createElement("ul");
		var dataLink = obj[obj.types[i]];
		pramUl.id = obj.types[i];
		pramH2.innerHTML = obj.types[i];
		for(var j=0;j<dataLink.length;j++) {
			var href = dataLink[j].replace("-webkit-",url)+".html";
			pramUl.innerHTML += "<li><a href="+href+" title="+dataLink[j]+">"+dataLink[j]+"</a></li>";
		}

		con.appendChild(pramH2);
		con.appendChild(pramUl);
	}

	if(!!iconObj) {
		for(var prop in iconObj) {
			$("."+this.ele.className+" "+prop).addDom("i",1,"",{"className": iconObj[prop]});
		}
	}
	
}

Base.prototype.addDom = function(tag,num,cont,attrObj,pre) {
	var con = (this.ele.length != undefined) ? this.ele : [this.ele];
	var num = num || 1;
	var pre = pre || false;
	for(var j=0;j<this.ele.length;j++) {
		for(var i=0;i<num;i++) {
			var pram = document.createElement(tag);
			if(!!cont) {
				pram.innerHTML = cont;
			}
			for(var attr in attrObj) {
				pram[attr] = attrObj[attr];
			} 
		}

		if(!!pre) {
			con[j].insertBefore(pram);
		}else {
			con[j].appendChild(pram);
		}
	}
}

Base.prototype.searchBy = function(input,open) {
	var _this = this;

	input.onfocus = function() {
		return function() {
			var tmpProp = $(_this.ele).find("a").ele;
			input.onkeyup = function(e) {
				var e = e || window.event;
				
				for(var i=0;i<tmpProp.length;i++) {
					if(tmpProp[i].innerHTML.indexOf(this.value) == -1) {
						$(tmpProp[i]).hide();
					}else {
						$(tmpProp[i]).show();
						var tmpFn = (function(element) {
							var element = tmpProp[i];
							return function() {
								$(element).parent().parent().addClass("open");
							}
						})();
						tmpFn();
					}
				}

				var ul = $(".categorys ul").ele;

				for(var j=0;j<ul.length;j++) {
					if(ul[j].clientHeight == 0) {
						$(ul[j]).pre().hide();
					}else {
						$(ul[j]).pre().show();
					}
				}

				if(this.value == "" && ( e.keyCode < 65 || e.keyCode > 90 ) ) {
					// console.log(e.keyCode);
					$(".open").removeClass("open");
				}
			}
		}
	}();
}

/* - find return array - */
Base.prototype.find = function(arg) {
	var tmp = [];
	this.ele = (this.ele.length != undefined) ? this.ele : [this.ele];

	for(var i=0;i<this.ele.length;i++) {
		res = this.ele[i].querySelectorAll(arg);
		for(var j=0;j<res.length;j++) {
			tmp.push(res[j]);
		}
	}

	this.ele = tmp;

	return this;
}

Base.prototype.click = function(fn) {
	var tmp = (this.ele.length != undefined) ? this.ele : [this.ele];
	for(var i=0;i<tmp.length;i++) {
		tmp[i].onclick = fn;
	}
}

Base.prototype.toggleClass = function (className) {
	var tmp = (this.ele.length != undefined) ? this.ele : [this.ele];
	if(!this.hasClass(className)) {
		$(tmp[0]).addClass(className);
	}else {
		$(tmp[0]).removeClass(className);
	}
}

Base.prototype.hasClass = function(className) {
	var tmp = (this.ele.length != undefined) ? this.ele : [this.ele];
	var pat = new RegExp("\\b"+className+"\\b","gi");
	for(var i=0;i<tmp.length;i++) {
		if(!pat.test(tmp[i].className)) {
			return false;
		}else {
			continue;
		}
	}
	return true;
}

Base.prototype.addClass = function(className) {
	var tmp = (this.ele.length != undefined) ? this.ele : [this.ele];
	for(var i=0;i<tmp.length;i++) {
		if(!$(tmp[i]).hasClass(className)) {
			tmp[i].className += (/\s/.test(tmp[i].className)) ? (" "+className) : className;
		}
	}
}

Base.prototype.removeClass = function(className) {
	var tmp = (this.ele.length != undefined) ? this.ele : [this.ele];
	for(var i=0;i<tmp.length;i++) {
		if($(tmp[i]).hasClass(className)) {
			tmp[i].className = tmp[i].className.replace(className,"");
		}
	}
}

Base.prototype.css = function (key,value) {
	var tmp = (this.ele.length != undefined) ? this.ele : [this.ele];
	for(var i=0;i<tmp.length;i++) {
		tmp[i].style[key] = value;
	}
}

Base.prototype.show = function() {
	if(this.ele.length != undefined) {
		for(var i=0;i<this.ele.length;i++) {
			this.ele[i].style.display = "block";
		}
	}else {
		this.ele.style.display = "block";
	}
}

Base.prototype.hide = function() {
	if(this.ele.length != undefined) {
		for(var i=0;i<this.ele.length;i++) {
			this.ele[i].style.display = "none";
		}
	}else {
		this.ele.style.display = "none";
	}
}

Base.prototype.eq = function(num) {
	if(this.ele.length != undefined) {
		this.ele = this.ele[num];
	}
	return this;
}

Base.prototype.pre = function() {
	var tmp = [];
	if(typeof this.ele == "array") {
		for(var i=0;i<this.ele.length;i++) {
			tmp.push(this.ele[i].previousElementSibling);
		}
		this.ele = tmp;
	}else {
		this.ele = this.ele.previousElementSibling;
	}
	
	return this;
}

Base.prototype.next = function() {
	var tmp = [];
	this.ele = (this.ele.length != undefined) ? this.ele : [this.ele];
	for(var i=0;i<this.ele.length;i++) {
		tmp.push(this.ele[i].nextElementSibling);
	}
	this.ele = tmp;

	return this;
}

Base.prototype.parent = function() {
	var tmp = [];
	if(typeof this.ele == "array") {
		for(var i=0;i<this.ele.length;i++) {
			tmp.push(this.ele[i].parentElement);
		}
		this.ele = tmp;
	}else {
		this.ele = this.ele.parentElement;
	}
	
	return this;
}

/* == controller == */
window.onload = function() {
	$(".categorys").ajax("../js/dataJson.json",function(str) {
		var obj = JSON.parse(str);
		$(".categorys").addTree(obj,{
			"h2": "tree_folder",
			"a": "tree_file"
		},"");
	});

	$(".categorys").click(function(e) {
		var e = e || window.event , target = e.target || e.srcElement;
		if(target.nodeName == "H2") {
			$(target).next().toggleClass("open");
		}
	});

	/* == search == */
	$(".categorys").searchBy($("#key").ele,true);

	/* == test == */
	$("iframe").addClass("scroller");
}


