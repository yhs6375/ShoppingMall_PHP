//셀렉터 부분 411~2620 and 2937~3041

(function( global, factory ) {
	
	if ( typeof module === "object" && typeof module.exports === "object" ) {
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "HOSUNG requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
var arr = [],
	document = window.document,
	getProto = Object.getPrototypeOf,
	slice = arr.slice,
	concat = arr.concat,
	push = arr.push,
	indexOf = arr.indexOf,
	class2type = {},
	toString = class2type.toString,
	hasOwn = class2type.hasOwnProperty,
	fnToString = hasOwn.toString,
	ObjectFunctionString = fnToString.call( Object ),
	support = {},
	classExr=/\S+/g,
	scroll={},
	HSAnim={},


// HOSUNG("#asdf") << 식으로 사용
	version="0.0.1",
	HOSUNG = function( selector, context ) {
		return new HOSUNG.fn.init( selector, context );
	},

	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
	
HOSUNG.fn = HOSUNG.prototype = {	
	constructor: HOSUNG,
	length: 0,
	pushStack: function( elems ) {
		var ret = HOSUNG.merge( this.constructor(), elems );
		ret.prevObject = this;
		return ret;
	},
	each: function( callback ) {
		
		return HOSUNG.each( this, callback );
	},
	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},
	sort: arr.sort,
	index: function( elem ) {

		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		if ( typeof elem === "string" ) {
			return indexOf.call( HOSUNG( elem ), this[ 0 ] );
		}

		return indexOf.call( this,

			elem.HOSUNG ? elem[ 0 ] : elem
		);
	},
	push:push
};

HOSUNG.extend = HOSUNG.fn.extend = scroll.extend = HSAnim.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[ i ] || {};
		i++;
	}
	if ( typeof target !== "object" && !HOSUNG.isFunction( target ) ) {
		target = {};
	}
	if ( i === length ){
		target=this;
		i--;
	}
	for ( ; i < length; i++ ) {
		if ( ( options = arguments[ i ] ) != null ) {
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];
				if ( target === copy ) {
					continue;
				}
				if ( deep && copy && ( HOSUNG.isPlainObject( copy ) ||
					( copyIsArray = HOSUNG.isArray( copy ) ) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && HOSUNG.isArray( src ) ? src : [];
					} else {
						clone = src && HOSUNG.isPlainObject( src ) ? src : {};
					}
					target[ name ] = HOSUNG.extend( deep, clone, copy );
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}
	return target;
};

HOSUNG.extend( {
	expando:"HOSUNG"+(version+Math.random()).replace(/\D/g,""),
	isReady:true,
	error:function(msg) {
		throw new Error(msg);
	},
	noop:function(){},
	isFunction:function(obj){
		return HOSUNG.type(obj)==="function";
	},
	isArray:Array.isArray,
	isWindow:function(obj) {
		return obj!=null&&obj===obj.window;
	},

	isNumeric:function(obj){
		var type=HOSUNG.type(obj);
		return (type==="number"||type==="string")&&
			!isNaN(obj-parseFloat(obj));
	},
	isPlainObject:function( obj ) {
		var proto,Ctor;
		if (!obj||toString.call(obj)!=="[object Object]"){
			return false;
		}
		proto=getProto(obj);
		if (!proto){
			return true;
		}
		Ctor=hasOwn.call(proto,"constructor")&&proto.constructor;
		return typeof Ctor==="function"&&fnToString.call(Ctor)===ObjectFunctionString;
	},
	isEmptyObject:function(obj){ //비어있는 object 체크
		var name;
		for(name in obj){
			return false;
		}
		return true;
	},
	type:function(obj){
		if(obj==null){
			return obj+"";
		}
		return typeof obj==="object"||typeof obj==="function"?
			class2type[toString.call(obj)]||"object":
			typeof obj;
	},
	nodeName:function(elem,name){ //attr에서 사용
		return elem.nodeName&&elem.nodeName.toLowerCase()===name.toLowerCase();
	},
	each:function(obj,callback){
		var length,i=0;
		if(isArrayLike(obj)){
			length=obj.length;
			for(;i<length;i++){
				if(callback.call(obj[i],i,obj[i])===false){
					break;
				}
			}
		}else{
			for(i in obj){
				if(callback.call(obj[i],i,obj[i])===false){
					break;
				}
			}
		}
		return obj;
	},
	makeArray:function(arr,results){ 
		var ret=results||[];
		if(arr!=null){
			if(isArrayLike(Object(arr))){
				HOSUNG.merge(ret,arr);
			}else{
				push.call(ret,arr);
			}
		}
		return ret;
	},
	inArray:function(elem,arr,i) {
		return arr==null?-1:indexOf.call(arr,elem,i);
	},
	merge:function(first,second){ //어떠한 객체안에 배열의 원소들을 집어넣는 메서드
		var len=+second.length,
			j=0,
			i=first.length;
		for(;j<len;j++){
			first[i++]=second[j];
		}
		first.length=i;
		return first;
	},
	map:function(elems,callback,arg){
		var length,value,
			i=0,
			ret=[];
		if(isArrayLike(elems)){
			length=elems.length;
			for (;i<length;i++){
				value=callback(elems[i],i,arg);
				if(value!=null){
					ret.push(value);
				}
			}
		}else{
			for(i in elems){
				value=callback(elems[i],i,arg);
				if(value!=null){
					ret.push(value);
				}
			}
		}
		return concat.apply([],ret);
	},
	//씀
	guid: 1,
	now: Date.now,
	support: support
});
HOSUNG.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
function(i,name){
	console.log(i);
	console.log(name);
	class2type["[object "+name+"]"]=name.toLowerCase();
});

function isArrayLike(obj){ //[]나 new Array로 안만들어도 배열의 형태만 가지면 true 리턴
	var length=!!obj&&"length" in obj&&obj.length,
		type=HOSUNG.type(obj);
	if (type==="function"||HOSUNG.isWindow(obj)){
		return false;
	}
	return type==="array"||length===0||
		typeof length==="number"&&length>0&&(length-1) in obj;
}


var rnotwhite = ( /\S+/g );

//util 코드 시작
var rclass = /[\t\r\n\f]/g,
	rparentsprev = /^(?:parents|prev(?:Until|All))/;

var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;
	
	if ( HOSUNG.type( key ) === "object" ) { //key와 value로 안받고 key에 오브젝트로 다중key를 받았을경우
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}
	} else if ( value !== undefined ) {
		chainable = true;
		if ( !HOSUNG.isFunction( value ) ) {
			raw = true;
		}
		if ( bulk ) {
			if ( raw ) {
				fn.call( elems, value );
				fn = null;
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( HOSUNG( elem ), value );
				};
			}
		}
		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value : //일반적인 루트 값을 세팅
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}
	
	return chainable ?
		elems :
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[ 0 ], key ) : emptyGet; //fn(elems[0],key)를 호출하는경우는 css value를 안줬을경우 즉 값을얻어오고싶을때
};

function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

HOSUNG.extend({
	split:function(a,option){
		if(HOSUNG.trim(a)!==""){
			var b=a.split(option);
			for(var i=0;i<b.length;i++){
				b[i]=HOSUNG.trim(b[i]);
				if(b[i]===""){
					b.splice(i,1);
				}
			}
			return b;
		}else{
			return false;
		}
	},
	domMake:function(desc){
		var name = desc[0],attributes=desc[1],el=document.createElement(name),start=1,i;
		if(typeof attributes==="object"&&attributes!==null&&!HOSUNG.isArray(attributes)){
			for(var attr in attributes){
				if(attr==="class"){
					HOSUNG.addClass(el,attributes[attr]);
				}else
					el.setAttribute(attr,attributes[attr]);
			}
			start=2;
		}
		for(i=start;i<desc.length;i++){
			if(HOSUNG.isArray(desc[i])){
				el.appendChild(HOSUNG.domMake(desc[i]));
			}else{
				el.appendChild(document.createTextNode(desc[i]));
			}
		}
		return el;
	},
	find:function(elem,selector){
		var type,newContext = elem && (elem.nodeType===9?elem:elem.ownerDocument),nodeSelectors,nodeSelector,nodes=[],i=0;
		if(selector.charAt(0)==="#"){
			type=1;
		}else if(selector.charAt(0)==="."){
			type=2;
			selector=selector.substring(1);
		}else{
			type=0;
		}
		if(type===1&&(elem.nodeType===1||elem.nodeType===9)){ //ID가져오기
			if(newContext && (nodeSelectors=newContext.querySelectorAll(selector))){
				while(nodeSelector=nodeSelectors[i++]){
					if(nodeSelector&&HOSUNG.contains(elem,nodeSelector)){
						return nodeSelector;
					}
				}
			}
		}else if(type===0&&(elem.nodeType===1||elem.nodeType===9)){ //TAG가져오기
			if(newContext && newContext.getElementsByTagName){
				nodeSelectors=newContext.getElementsByTagName(selector);
			}else{
				nodeSelectors=newContext.querySelectorAll(selector);
			}
			while(nodeSelector=nodeSelectors[i++]){
				if(nodeSelector&&HOSUNG.contains(elem,nodeSelector)){
					nodes[nodes.length]=nodeSelector;
				}
			}
			return nodes;
		}else if(type===2&&(elem.nodeType===1||elem.nodeType===9)){
			if(newContext && newContext.getElementsByClassName){
				nodeSelectors=newContext.getElementsByClassName(selector);
			}else{
				selector="."+selector;
				nodeSelectors=newContext.querySelectorAll(selector);
			}
			while(nodeSelector=nodeSelectors[i++]){
				if(nodeSelector&&HOSUNG.contains(elem,nodeSelector)){
					nodes[nodes.length]=nodeSelector;
				}
			}
			return nodes;
		}else if(elem.nodeType===3){
			return nodes;
		}
	},
	contains:function(a,b){ //compareDocumentPosition = contains Support차이 a에 b가있는지 체크
		var adown=a.nodeType===9?a.documentElement:a,
			bup=b&&b.parentNode;
		return a===bup||!!(bup&&bup.nodeType===1&&(
			adown.contains?
				adown.contains(bup):
				a.compareDocumentPosition&&a.compareDocumentPosition(bup)&16
		));
	},
	isInclude:function(a,b){
		if(a===b||HOSUNG.contains(a,b)){
			return true;
		}
		return false;
	},
	domProcess:function(target,node,callBack){
		var dumNode,i=0;
		if(typeof node==="string"){
			dumNode=target.ownerDocument.createElement("div");
			dumNode.innerHTML=node;
			while(node=dumNode.childNodes[0]){
				callBack(target,node);
			}
		}else{
			callBack(target,node);
		}
	},
	before:function(target,node){
		HOSUNG.domProcess(target,node,function(target,node){
			target.parentNode.insertBefore(node,target);
		})
	},
	after:function(target,node){
		HOSUNG.domProcess(target,node,function(target,node){
			target.parentNode.insertBefore(node,target.nextSibling);
		})
	},
	first:function(target,node){
		HOSUNG.domProcess(target,node,function(target,node){
			target.insertBefore(node,target.firstChild);
		})
	},
	globalEvent:function(type,fun,type2){
		var frames,i;
		frames=document.getElementsByTagName("iframe");
		if(type2){
			document.addEventListener(type,fun);
			for(i=0;i<frames.length;i++){
				frames[i].contentDocument.addEventListener(type,fun);
			}
		}else{
			document.removeEventListener(type,fun);
			for(i=0;i<frames.length;i++){
				frames[i].contentDocument.removeEventListener(type,fun);
			}
		}
	},
	removeStyle: function(node,name) {
		if(node){
			var styles,all=[],pass=true;
			styles=HOSUNG.getAttributeStyleProperty(node);
			for(var i=0;i<styles.length;i++){
				all.push(HOSUNG.split(styles[i],":"));
			}
			node.removeAttribute("style");
			for(i=0;i<all.length;i++){
				if(all[i][0]===name){
					all.splice(i,1);
					pass=false;
					i--;
				}
				if(pass){
					node.style[all[i][0]]=all[i][1];
				}
				pass=true;
			}
		}
	},
	attr:function(elem,name,value){
		var ret,hooks,
			nType=elem.nodeType;
		if(nType!==1){
			return;
		}
		if(value!==undefined){
			if(value===null){
				HOSUNG.removeAttr(elem,name);
				return;
			}
			if(hooks&&"set" in hooks&&(ret=hooks.set(elem,value,name))!==undefined){
				return ret;
			}
			elem.setAttribute(name,value+"");
			return value;
		}
		if(hooks&&"get" in hooks&&(ret=hooks.get(elem,name))!==null){
			return ret;
		}
		ret=HOSUNG.find.attr(elem,name);
		return ret==null?undefined:ret;
	},
	attrHooks:{
		type:{
			set:function(elem,value){
				if (!support.radioValue&&value==="radio"&&
					HOSUNG.nodeName(elem,"input")){
					var val=elem.value;
					elem.setAttribute("type",value);
					if(val){
						elem.value=val;
					}
					return value;
				}
			}
		}
	},
	removeAttr:function(elem,value){
		var name,
			i=0,
			attrNames=value&&value.match(rnotwhite);
		if(attrNames&&elem.nodeType===1){
			while((name=attrNames[i++])){
				elem.removeAttribute(name);
			}
		}
	},
	addClass:function(node,value){
		var classes,cur,curValue,clazz,j,finalValue,i=0;
		if(typeof value==="string"&&value){
			classes=value.match(classExr)||[];
			curValue=node.getAttribute("class")||"";
			cur=(" "+curValue+" ").replace(/[\t\r\n\f]/g," ");
			if(cur){
				j=0;
				while((clazz=classes[j++])){
					if(cur.indexOf(" "+clazz+" ")<0){
						cur+=clazz+" ";
					}
				}
				finalValue=HOSUNG.trim(cur);
				if (curValue!==finalValue){
					node.setAttribute("class",finalValue);
				}
			}
		}
	},
	removeClass:function(node,value){
		if(node){
			var classes,cur,curValue,clazz,j,finalValue,i=0;
			if(!arguments.length){
				node.setAttribute("class","");
			}
			if(typeof value==="string"&&value){
				classes=value.match(classExr)||[];
				curValue=node.getAttribute("class")||"";
				cur=(" "+curValue+ " ").replace(/[\t\r\n\f]/g," ");
				if(cur){
					while((clazz=classes[i++])){
						if(cur.indexOf(" "+clazz+" ")>-1){
							cur=cur.replace(" "+clazz+" "," ");
						}
					}
					finalValue=HOSUNG.trim(cur);
					if(curValue!==finalValue){
						node.setAttribute("class",finalValue);
					}
				}
			}
		}
	},
	hasClass:function(node,selector) {
		var className,a,i=0;
		className=" "+selector+" ";
		a=node.getAttribute("class")||"";
		if(node.nodeType===1&&(" "+a+" ").indexOf(className)>-1){
			return true;
		}
		return false;
	},
	getClassArray:function(node){
		var strClass;
		strClass=HOSUNG.trim(node.getAttribute("class"));
		strClass=HOSUNG.split(strClass," ");
		return strClass?strClass:[];
	},
	trim:function(text) {
		if(text!==null){
			text=text.replace(/^\s+/,"");
			text=text.replace(/\s+$/,"");
		}
		return text==null?"":text;
	}
})

HOSUNG.fn.extend({
	hasClass: function(selector){
		var i=0,elem;
		while(elem=this[i++]){
			HOSUNG.hasClass(elem,selector);
		}
		return this;
	},
	attr:function(name,value) {
		return access(this,HOSUNG.attr,name,value,arguments.length>1);
	},
	removeAttr: function(name) {
		return this.each(function(){
			HOSUNG.removeAttr(this[i],name);
		} );
	},
	removeStyle:function(name){
		var i=0,elem;
		while(elem=this[i++]){
			HOSUNG.removeStyle(elem,name)
		}
		return this;
	},
	addClass:function(value){
		var i=0,elem;
		while(elem=this[i++]){
			HOSUNG.addClass(elem,value);
		}
		return this;
	},
	removeClass:function(value){
		var i=0,elem;
		while(elem=this[i++]){
			HOSUNG.removeClass(elem,value);
		}
		return this;
	},
	hasClass:function(selector){
		var i=0,elem;
		while(elem=this[i++]){
			if(!HOSUNG.hasClass(elem,selector)){
				return false;
			}
		}
		return true;
	},
	getClassArray:function(){
		var i=0;elem,ret;
		while(elem=this[i++]){
			ret.push(HOSUNG.getClassArray(elem));
		}
		return ret;
	},
	toggleClass:function(value){
		var classes,elem,clazz,i=0,self;
		if (typeof value==="string"&&value){
			classes=value.match(rnotwhite)||[];
			while((elem=this[i++])){
				self=HOSUNG(elem);
				j=0;
				while(clazz=classes[j++]){
					if(self.hasClass(clazz))
						self.removeClass(clazz);
					else 
						self.addClass(clazz);
				}
			}
		}
		return this;
	},
	hasId:function(selector){
		var a,i=0;
		a=node.getAttribute("id")||"";
		if(node.nodeType===1&&a.indexOf(selector)>-1){
			return true;
		}
		return false;
	},
	find:function(selector){
		var i=0,elem,nodes=[],nodes2=[];
		while(elem=this[i++]){
			nodes=HOSUNG.find(elem,selector);
			for(var j=0;j<nodes.length;j++){
				nodes2.push(nodes[j]);
			}
		}
		return HS(nodes2);
	}
})
//util 코드 끝

//셀렉터 코드
var rootHOSUNG,
	init = HOSUNG.fn.init = function( selector, context, root ) {
	var match, elem;
	root = root || rootHOSUNG;
	if ( selector.nodeType ) {
		this[ 0 ] = selector;
		this.length = 1;
		return this;
	}
	return HOSUNG.makeArray( selector, this );
};
init.prototype = HOSUNG.fn;
rootHOSUNG = HOSUNG( document );
//셀렉터 코드 끝

//이벤트 코드 handleFn은 init이벤트
var whitespace = "[\\x20\\t\\r\\n\\f]";
var needsContext=new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
		whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" );
var handleObj,handleFn;
HOSUNG.Event = function( src, props ) {
	if ( !( this instanceof HOSUNG.Event ) ) {
		return new HOSUNG.Event( src, props );
	}
	this.type = src;
	this.timeStamp = src && src.timeStamp || HOSUNG.now();
	this[ HOSUNG.expando ] = true;
};

HOSUNG.Event.prototype = {
		constructor: HOSUNG.Event,
		isDefaultPrevented: false,
		isPropagationStopped: false,
		isImmediatePropagationStopped: false,
		isSimulated: false,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = true;

			if ( e && !this.isSimulated ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = true;

			if ( e && !this.isSimulated ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = true;

			if ( e && !this.isSimulated ) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
};

HOSUNG.event={
		add:function(elem,types,selector,fn){
			var handle,events;
			if (typeof fn !== "function" || typeof types !== "string") {
				return false;
			}
			if(types.substring(0,3)==="pjax"){
				
			}else{
				
			}
			if(!elem.eventObj){ //elem event init코드
				elem.eventObj={};
			}
			if(!elem.eventObj[types]){
				handleFn=function(e){
					HOSUNG.event.dispatch.apply(elem,arguments);
				};
				elem.eventObj[types]=[];
				elem.eventObj.handleFn=handleFn;
				elem.addEventListener(types,elem.eventObj.handleFn);
			}
			events=elem.eventObj[types];
			if(!events.lengthN){
				events.lengthN=0;
			}
			if(selector==null){
				events[events.length]={
					type:types,
					fn:fn,
					elem:elem
				}
			}else{
				events[events.length]={
					type:types,
					fn:fn,
					selector:selector,
					needsContext:selector&&needsContext.test(selector)
				}	
			}
		},
		trigger:function(elem,event,param){
			if(elem.eventObj){
				var events=elem.eventObj[event];
				if(events){
					for(i=0;i<events.length;i++){
						events[i].fn(param);
					}
				}
			}
		},
		dispatch:function(event){
			var type=event.type,
			cur=event.target,
			events=this.eventObj[type],
			len=events.length,
			i,j,
			handleObj,matches,handlerQueue=[],nonSelState=false;
			for(;cur!==document;cur=cur.parentNode||this){
				matches=[];
				for(i=0,j=0;i<len;i++){
					handleObj = events[i];
					if(handleObj.selector){
						sel=handleObj.selector+" ";
						if(matches[sel]===undefined){
							matches[sel]=handleObj.needsContext ? 
									HOSUNG(sel,this).index(cur)>-1:
									HOSUNG.find(sel,this,null,[cur]).length;
						}
						if(matches[sel]){
							matches[matches.length]=handleObj;
						}	
					}else if(!nonSelState&&this==events[i].elem){
						matches[matches.length]=handleObj;
					}
				}
				nonSelState=true;
				if(matches.length){
					handlerQueue[handlerQueue.length]=({elem:cur,handlers:matches})
				}
			}
			
			/*여기서부터 이벤트 실행 코드
			click이벤트로 예를들면 한번클릭하면 그거에 해당하는 타겟
			1차로 li.asdf를 클릭시 document를제외한 html body ul li.asdf 4개가 타겟이 될수있음.
			해당타겟에 이벤트가 들어있으면 그만큼 반복
			2차로 해당타겟에 중복이벤트가 있을경우 li.asdf에 click 이벤트가 여러개있을경우 그만큼 반복문을 돈다.
			*/
			i=0;
			
			while(matched=handlerQueue[i++]){
				
				j=0;
				while(handleObj=matched.handlers[j++]){
					//이벤트 실행
					if(handleObj.fn.call(matched.elem,event)===false){
						event.stopPropagation();
						event.preventDefault();
					}
				}
			}
		},
		remove:function(elem,type,selector){
			if(elem.eventObj&&elem.eventObj[type]){
				var events=elem.eventObj[type],i=0;
				if(selector==null&&events.lengthN>0){
					while(events.lengthN){
						delete events["N"+events.lengthN];
						events.lengthN--;
					}
				}else if(selector!==null){
					for(i=0;i<events.length;i++){
						if(events[i].selector===selector){
							events.splice(i,1);
						}
					}
				}
				if(events.lengthN===0 && (!events.length||events.length===0)){
					if(elem.removeEventListener){
						elem.removeEventListener(type,elem.eventObj.handleFn)	
					}
					elem.eventObj=null;
				}
			}
		},
		//test부분
		props: []
		//test부분 끝
}

function on(elem,types,selector,fn,one){
	var origFn,type;
	if (fn==null){
		fn=selector;
		selector=undefined;
	}
	return elem.each(function(){
		HOSUNG.event.add(this,types,selector,fn);
	});
}

//이벤트 코드 메인 시작
HOSUNG.fn.extend( {
	on:function(types,selector,fn){
		return on(this,types,selector,fn);
	},
	off:function(types,selector){
		if(typeof types==="object"){
			for(type in types){
				this.off(type,selector);
			}
			return this;
		}
		return this.each(function(){
			HOSUNG.event.remove(this,types,selector);
		})
	},
	trigger:function(types,param){
		HOSUNG.event.trigger(this[0],types,param);
	}
} );
//이벤트 코드 메인 끝


//이벤트 코드 끝


//css 코드 시작
HOSUNG.fn.extend( {
	css: function( name, value ) {
		var _name;
		i=0;
		while(this[i]){
			if(typeof name==="string"){
				this[i].style[name]=value;
			}else if(typeof name==="object"){
				for(_name in name){
					this[i].style[_name]=name[_name];
				}
			}
			i++;
		}
		return this;
	}
} );
//css 코드 끝

//ajax 코드부분
var xhr=new XMLHttpRequest();
HOSUNG.extend({
	ajax:function(options){
		var type,url,async,dataType,data,isSuccess=true,isLoaded=false;
		if(!options){
			return false;
		}
		typeof options.type==="string"&&options.type?type=options.type.toUpperCase():type="POST";
		typeof options.url==="string"&&options.url?url=options.url:url=window.location.href;
		typeof options.async==="boolean"&&options.async===false?async=false:async=true;
		typeof options.dataType==="string"&&options.dataType?dataType=options.dataType.toLowerCase():dataType="html";
		typeof options.timeout==="number"&&options.timeout?timeout=options.timeout:timeout=2000;
		if(dataType==="jsonp"&&type==="POST"){
			type="GET";
			console.log("HS개발로그:jsonp는 type(GET)만 가능합니다.(가독성을 위해 수정해주세요)");
		}
		function errorProcess(errorCode){
			if(options.error){
				options.error(xhr,errorCode);
				isSuccess=false;
			}
		}
		xhr.onreadystatechange=function(){
			if(xhr.readyState===3){
				isLoaded=true;
				if(dataType==="json"){
					try{
						xhr.parseData=JSON.parse(xhr.responseText);
					}catch(e){
						//parseError error진입
						errorProcess("parseError");
					}
				}else if(dataType==="xml"){
					try{
						xhr.parseData=(new window.DOMParser()).parseFromString(xhr.responseText,"text/xml");
					}catch(e){
						//parseError error진입
						errorProcess("parseError");
						
					}
				}
				//성공시에 success함수 진입
				if(isSuccess){
					if(options.success){
						options.success(xhr.parseData||xhr.responseText,xhr);
					}
				}
			}else if(xhr.readyState===4){
				if(!async&&xhr.status===200){ //동기방식일 경우 success가 readyState4에서 작동
					if(dataType==="json"){
						try{
							xhr.parseData=JSON.parse(xhr.responseText);
						}catch(e){
							//parseError error진입
							errorProcess("parseError");
						}
					}else if(dataType==="xml"){
						try{
							xhr.parseData=(new window.DOMParser()).parseFromString(xhr.responseText,"text/xml");
						}catch(e){
							//parseError error진입
							errorProcess("parseError");
							
						}
					}
					options.success(xhr.parseData||xhr.responseText,xhr);
				}else if(!isLoaded&&async){ //비동기방식이고 readyState3을 거치지 않은경우
					errorProcess("서버로부터 받을 수 없거나 응답받은 메시지가 비어있습니다.");
				}
				//Complete시에 작동(success,error)후에 작동
				if(options.complete){
					options.complete(xhr);
					xhr.abort();
				}
			}
		}
		if(!async&&xhr.timeout!==0){
			xhr.timeout=undefined;
		}
		xhr.open("POST",url,async); //ajax 열기
		if(async){
			xhr.timeout=timeout;
			xhr.ontimeout=function(e){
				errorProcess("timeout");
			};
		}
		if(!options.contentType){
			if(dataType!=="multiform"){
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
			}
		}else{
			xhr.setRequestHeader("Content-Type",options.contentType);
		}
		
		if(!options.Accept){
			if(dataType==="html"){
				xhr.setRequestHeader("Accept","text/html, */*; q=0.1");
			}else if(dataType==="json"){
				xhr.setRequestHeader("Accept","application/json, text/javascript, */*; q=0.1");
			}else if(dataType==="text"){
				xhr.setRequestHeader("Accept","text/plain, */*; q=0.1");
			}else if(dataType==="jsonp"){
				xhr.setRequestHeader("Accept","text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.1");
			}else if(dataType==="xml"){
				xhr.setRequestHeader("Accept","application/xml, text/xml, */*; q=0.1");
			}
		}else{
			xhr.setRequestHeader("Accept",options.Accept); //custom Accept Header
		}
		if(options.beforeSend){
			options.beforeSend(xhr,options);
		}
		(data=options.data)?xhr.send(data):xhr.send(); //ajax 시작
	}
})

//ajax 끝

//pjax 시작
function onPjaxpopstate(e){ //container 복원
	var state=e.state,		
		container;
	if(state){
		for(var i=0;i<e.state.count+1;i++){
			container=document.getElementById(e.state["containerId"+i]);
			container.innerHTML=e.state["html"+i];
		}
	}
}
HOSUNG.pjax=function(options){
	if(!options.container){
		return false;
	}
	var successFun=options.success,
		beforeSendFun=options.beforeSend,
		completeFun=options.complete,
		errorFun=options.error,
		save=typeof options.save&&options.save===true?true:false,
		i;
	HOSUNG.pjax.container.push(options.container);
	options.beforeSend = function(xhr,options) {
		xhr.setRequestHeader('HS-PJAX', 'true')
		if(beforeSendFun)beforeSendFun(xhr,options);
	}
	options.complete=function(xhr,type){
		if(completeFun)completeFun(xhr,type);
	}
	options.success=function(responseText,xhr){
		if(!HOSUNG.pjax.state){
			HOSUNG.pjax.state = {
				id : uniqueId()+10,
				url : options.url,
				title : document.title,
				count:0
			};
		}else{
			HOSUNG.pjax.state.count++;
		}
		i=HOSUNG.pjax.state.count;
		HOSUNG.pjax.state["containerId"+i]=HOSUNG.pjax.container[i].id;
		HOSUNG.pjax.state["html"+i]=responseText;
		if(!save){
			for(i=0;i<HOSUNG.pjax.container.length;i++){
				HOSUNG.pjax.container[i].innerHTML=HOSUNG.pjax.state["html"+i];
			}
			if(HOSUNG.pjax.movePage){
				window.history.pushState(HOSUNG.pjax.state, HOSUNG.pjax.state.title,HOSUNG.pjax.state.url);
			}else{
				window.history.pushState(HOSUNG.pjax.state, HOSUNG.pjax.state.title);
			}
			HOSUNG.pjax.container=[];
			HOSUNG.pjax.state=null;
			HOSUNG.pjax.oldState=null;
			HOSUNG.pjax.movePage=true;
		}
		if(successFun){
			successFun(responseText,xhr);
		}
		
	}
	options.error=function(xhr,status,errorType){
		HOSUNG.pjax.container=[];
		HOSUNG.pjax.state=null;
		HOSUNG.pjax.oldState=null;
		HOSUNG.pjax.movePage=true;
		if(errorFun)errorFun(xhr,status,errorType);
	}
	options.dataType="HTML";
	
	if(!HOSUNG.pjax.oldState){
		HOSUNG.pjax.oldState = {
			id:uniqueId()+5,
			url:window.location.href,
			title:document.title,
			count:0
		};
		if(!options.movePage){
			HOSUNG.pjax.movePage=false;
		}
	}else{
		HOSUNG.pjax.oldState.count++;
	}
	i=HOSUNG.pjax.oldState.count;
	HOSUNG.pjax.oldState["containerId"+i]=HOSUNG.pjax.container[i].id;
	HOSUNG.pjax.oldState["html"+i]=HOSUNG.pjax.container[i].innerHTML;
	if(!save){
		window.history.replaceState(HOSUNG.pjax.oldState, document.title,window.location.href);
		if(options.title){
			options.title=document.title;
		}
	}
	HS.ajax(options);
}
HOSUNG.pjax.container=[];
HOSUNG.pjax.movePage=true;
window.addEventListener('popstate', onPjaxpopstate);
function uniqueId() {
	return (new Date).getTime()
}
support.pjax = window.history&& window.history.pushState&& window.history.replaceState&&
!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/);
//pjax 끝
//popup 시작
function Popup(title){ //Popup클래스의 생성자,Popup을 인스턴스화하자마자 이 생성자가 실행
	//Popup에 관련된 것들을 설정 (받은 options를 통해서);
	Popup.prototype.count++;
	if(!title){
		this.id=(new Date).getTime()*10+Popup.prototype.count;//맨마지막에 이 팝업의 id지정(id는 시간값을 이용하여 popup창마다 서로다르게 생성)
	}else{
		this.title = title;							//받은 options들 저장
		this.id=(new Date).getTime()*10+Popup.prototype.count;//맨마지막에 이 팝업의 id지정(id는 시간값을 이용하여 popup창마다 서로다르게 생성)
	}
}
Popup.prototype.count=0;
Popup.prototype.show=function(x,y){ //var a = HS.popup({ }).show() 또는 var a = HS.popup({ }); a.show()로 사용가능
	style = this.pop.style;
	style.display="block";
	style.position="absolute";
	style.border="1px solid black";
	style.backgroundColor="white";
	if(x>=0)
		style.left=x;
	else{
		style.left=50+"%";
		style.marginLeft= - this.width / 2 +"px";
	}
	if(y>=0)
		style.top=y;
	else
		style.top=80+"px";
}
Popup.prototype.block=function(){
	this.block=block=document.createElement("div");
	document.body.appendChild(block);
	block.id="pop-block";
	style=block.style;
	style.position="absolute";
	style.left=0;
	style.top=0;
	style.width=100+"%";
	style.height=100+"%";
	style.backgroundColor="black";
	style.opacity=0.65;
	style.zIndex=9998;
}
Popup.prototype.set=function(width,height,headHeight,contentsHtml){
	this.height = height;
	this.width = width;
	this.headHeight = headHeight;
	this.cHtml = contentsHtml;
}
Popup.prototype.close=function(){
	Popup.prototype.count--;
	document.body.removeChild(this.pop);
	document.body.removeChild(this.block);
}
Popup.prototype.getPop=function(){
	if(this.width && this.height){
		if(this.title){
			var pop,popHead,self=this;
			this.pop=pop=document.createElement("div");
			pop.id = "popup"+this.id;
			pop.innerHTML="<div class='popup-head'><label class='popup-title'>"+this.title+"</label><div class='popup-close'>X</div></div><div class='popup-contents'></div>";
			document.body.appendChild(pop);
			pop.style.height = this.height +"px";
			pop.style.width = this.width +"px";
			popHead = document.getElementsByClassName("popup-head")[0];
			popHead.style.height = this.headHeight +"px";
			popHead.style.width = this.width;
			popClose = document.getElementsByClassName("popup-close")[0];
			HS(popClose).on("click",function(){
				self.close();
			})
			popClose.style.width = this.headHeight +"px";
			popClose.style.height = this.headHeight +"px";
			pop.style.zIndex=9999;
		}else{
			var pop,popHead,self=this,pick;
			this.pop=pop=document.createElement("div");
			pop.id = "popup"+this.id;
			pop.innerHTML="<div class='popup-head'><div class='popup-close'>X</div></div><div class='popup-contents'></div>";
			document.body.appendChild(pop);
			pop.style.height = this.height +"px";
			pop.style.width = this.width +"px";
			popClose = document.getElementsByClassName("popup-close")[0];
			HS(popClose).on("click",function(){
				self.close();
			})
			popClose.style.width = this.headHeight +"px";
			popClose.style.height = this.headHeight +"px";
			pop.style.zIndex=9999;
		}
	}
}
HOSUNG.extend({ 
	popup:function(e){ //HOSUNG.popup() 또는 HS.popup() 으로 접근 가능.
		return new Popup(e); //Popup클래스를 인스턴스화한 인스턴스를 리턴받음
	}
})
//popup 끝
//box Make 시작
function Box(setting){
	var node,i,content,box=HOSUNG.domMake(["hs-box",{id:setting.id},["div",{"class":"hs-box-selecting-off hs-box"},["label",{"class":"hs-normal-text hs-left"},setting.baseText],["span",{"class":"hs-box-open"},["img",{src:"./img/arrow1.svg"}]]],["div",{"class":"hs-box-list-wrap"},["div",{"class":"hs-box-list"}]]]),
		scrollEl,listWrap,kkk;
	this.box=box;
	this.listWrap=listWrap=box.children[1];
	contentWrap=listWrap.children[0];
	if(setting.width){
		box.children[0].style.width=setting.width;
	}
	kkk=function(e){
		if(e.which===1||e.target===window){
			var selectBox=box.children,label;
				label=document.getElementsByClassName("hs-normal-text")[0];
				selectBox[1].style.display="none";
				HOSUNG.removeClass(selectBox[0],"hs-box-selecting-on");
				HOSUNG.addClass(selectBox[0],"hs-box-selecting-off");
				HOSUNG.globalEvent("mousedown",selectOffFun,false);
				console.log(this.textContent)
				console.log(label.textContent)
				label.textContent=""+this.textContent+"";
		}
	}
	i=0;
	//멤버 만들어지는 코드
	while(content=setting.members[i]){
		node=HOSUNG.domMake(["div",{"class":"hs-list-mem","title":content.title},content.text]);
		if(content.size){
			node.style.fontSize=content.size;
		}
		if(content.font){
			node.style.fontFamily=content.font;
		}
		contentWrap.appendChild(node);
		if(!content.event){
			setting.event(content[setting.eventParam],node);
		}else{
			node.addEventListener("click",content.event);
			node.addEventListener("click",kkk);
		}
		i++;
	}
	//멤버 만들어지는 코드 끝
	//box 이벤트 등록
	var boxOpenFun,openUpFun,closeUpFun,selectOffFun;
	selectOffFun=function(e){
		if(e.which===1||e.target===window){
			var selectBox=box.children;
			if(!(e.target===box||HOSUNG.contains(box,e.target))||e.target===window){
				selectBox[1].style.display="none";
				HOSUNG.removeClass(selectBox[0],"hs-box-selecting-on");
				HOSUNG.addClass(selectBox[0],"hs-box-selecting-off");
				HOSUNG.globalEvent("mousedown",selectOffFun,false);
			}else{
				
			}
		}
	}
	openUpFun=function(e){
		if(e.target===box||HOSUNG.contains(box,e.target)){
			var list=box.children[1];
			list.style.display="block";
			if(HOSUNG.find(list,"hs-scroll").length===0){
				scrollEl=scroll.make(list,12);
				scrollEl.setting(list);
			}
			HOSUNG.globalEvent("mousedown",selectOffFun,true);
		}else{
			HOSUNG.removeClass(box.children[0],"hs-box-selecting-on");
			HOSUNG.addClass(box.children[0],"hs-box-selecting-off");
		}
		HOSUNG.globalEvent("mouseup",openUpFun,false);
	}
	closeUpFun=function(e){
		if(e.which===1){
			if(e.target===box.children[0]||HOSUNG.contains(box.children[0],e.target)){
				box.children[1].style.display="none";
				HOSUNG.removeClass(box.children[0],"hs-box-selecting-on");
				HOSUNG.addClass(box.children[0],"hs-box-selecting-off");
				HOSUNG.globalEvent("mouseup",closeUpFun,false);
			}
		}
	}
	boxOpenFun=function(e){
		if(e.which===1){
			if(HOSUNG.hasClass(this,"hs-box-selecting-off")){
				HOSUNG.removeClass(this,"hs-box-selecting-off");
				HOSUNG.addClass(this,"hs-box-selecting-on");
				HOSUNG.globalEvent("mouseup",openUpFun,true);
			}else if(HOSUNG.hasClass(this,"hs-box-selecting-on")){
				HOSUNG.globalEvent("mouseup",closeUpFun,true);
			}
		}
	}
	box.children[0].addEventListener("mousedown",boxOpenFun);
	box.addEventListener("contextmenu",function(e){
		e.preventDefault();
	})
	if(setting.parent){
		setting.parent.appendChild(box);
	}
}
Box.prototype.setBaseText=function(){
	
}
HOSUNG.extend({
	box:function(options){
		return new Box(options);
	}
})
//box Make 끝
//scroll 시작
function bodyScrollSet(deltaY){
	var dragger=this.dragger,rail=this.rail,sHeight=this.body.scrollHeight,cHeight=this.body.clientHeight,
		rHeight=rail.clientHeight;
	if(this.bHeight<=sHeight-cHeight&&this.bHeight>=0&&!(deltaY>0&&this.bHeight===sHeight-cHeight)&&!(deltaY<0&&this.bHeight===0)){
		this.bHeight+=deltaY;
		if(this.bHeight>sHeight-cHeight)this.bHeight=sHeight-cHeight;
		if(this.bHeight<0)this.bHeight=0;
		HSAnim.stop(this.body);
		HSAnim.animate(this.body,{"scrollTop":this.bHeight},200);
	}
}

function draggerScrollSet(deltaY){
	var dragger=this.dragger,rail=this.rail,sHeight=this.body.scrollHeight,cHeight=this.body.clientHeight,
		rHeight=rail.clientHeight,dHeight=parseFloat(dragger.style.height);
	if(dHeight<20){
		dHeight=20;
	}
	this.dTop=this.dTop||0;
	if(this.dTop+dHeight<=rHeight&&this.dTop>=0&&!(deltaY>0&&this.dTop+dHeight===rHeight)&&!(deltaY<0&&this.dTop+dHeight===0)){
		this.dTop=parseFloat(this.dTop)+(rHeight-parseFloat(dHeight))/((sHeight-cHeight)/deltaY);
		if(this.dTop+dHeight>rHeight)this.dTop=rHeight-dHeight;
		if(this.dTop<0)this.dTop=0;
		HSAnim.stop(this.dragger);
		HSAnim.animate(dragger,{"top":this.dTop},200);
	}
}

function Scroll(node,width,height){
	var scrollWrap,dragger,rail,upTime,downTime,buttonEndFun,railFun,self=this,draggerClick=false,upButtonFun,downButtonFun,
		downFun=true,upFun=true,draggerMoveFun;
	buttonEndFun=function(){
		clearInterval(self.downTime);
		clearInterval(self.upTime);
		scrollWrap.children[1].removeEventListener("mouseover",railFun);
		document.removeEventListener("mouseup",buttonEndFun);
		if(!upFun){
			scrollWrap.children[0].addEventListener("mousedown",upButtonFun)
			upFun=true;
		}
		if(!downFun){
			scrollWrap.children[2].addEventListener("mousedown",downButtonFun)
			downFun=true;
		}
	}
	this.scrollWrap=scrollWrap;
	this.body=node.children[0];
	scrollWrap=document.createElement("hs-scroll");
	scrollWrap.style.width=width+"px";
	scrollWrap.innerHTML="<div class='hs-scroll-button-top'></div>"+
		"<div class='hs-scroll'><div class='hs-scroll-dragger-wrap'><div class='hs-scroll-dragger'></div></div><div class='hs-scroll-rail'></div></div>"+
		"<div class='hs-scroll-button-bottom'></div>";
	node.appendChild(scrollWrap);
	this.dragger=HS(node).find(".hs-scroll-dragger-wrap")[0];
	this.rail=HS(node).find(".hs-scroll-rail")[0];
	this.bHeight=this.body.scrollTop;
	this.dTop=this.dTop||0;
	this.body.addEventListener("mousewheel",function(e){
		var deltaY=ieOn?~e.wheelDelta*+1:e.deltaY;
		bodyScrollSet.call(self,e.deltaY);
		draggerScrollSet.call(self,e.deltaY);
		e.preventDefault();
	})
	upButtonFun=function(e){
		var deltaY=-40;
		bodyScrollSet.call(self,deltaY);
		draggerScrollSet.call(self,deltaY)
		self.upTime=setInterval(function(){
			bodyScrollSet.call(self,deltaY);
			draggerScrollSet.call(self,deltaY)
		},100)
		upFun=false;
		scrollWrap.children[0].removeEventListener("mousedown",upButtonFun);
		document.addEventListener("mouseup",buttonEndFun);
		e.stopPropagation();
		e.preventDefault();
	}
	downButtonFun=function(e){
		var deltaY=40;
		bodyScrollSet.call(self,deltaY);
		draggerScrollSet.call(self,deltaY)
		self.downTime=setInterval(function(){
			bodyScrollSet.call(self,deltaY);
			draggerScrollSet.call(self,deltaY)
		},100);
		downFun=false;
		scrollWrap.children[2].removeEventListener("mousedown",downButtonFun);
		document.addEventListener("mouseup",buttonEndFun);
		e.stopPropagation();
		e.preventDefault();
	}
	scrollWrap.children[0].addEventListener("mousedown",upButtonFun)
	scrollWrap.children[2].addEventListener("mousedown",downButtonFun)
	
	scrollWrap.children[0].addEventListener("contextmenu",function(e){
		e.preventDefault();
	})
	scrollWrap.children[2].addEventListener("contextmenu",function(e){
		e.preventDefault();
	})
	this.rail.addEventListener("click",function(e){
		var deltaY,getMouseY,mouseY;
		if(self.dTop+self.dragger.clientHeight<e.layerY){
			deltaY=self.body.clientHeight*0.875;
		}else if(self.dTop>e.layerY){
			deltaY=-(self.body.clientHeight*0.875);
		}
		bodyScrollSet.call(self,deltaY);
		draggerScrollSet.call(self,deltaY);
	})
	
	draggerMoveFun=function(e){
		var dTop=parseFloat(self.dragger.style.top||0),frames;
		moveFun=function(e2){
			var t=self.dTop+((e2.screenY-e.screenY)/window.devicePixelRatio);
			var draggerHeight=parseFloat(self.dragger.style.height);
			if(draggerHeight<20){
				draggerHeight=20;
			}
			if(t<0){
				self.bHeight=0;
				dTop=0;
			}else if(t+self.dragger.clientHeight>self.rail.clientHeight){
				self.bHeight=self.body.scrollHeight-self.body.clientHeight;
				dTop=self.rail.clientHeight-parseFloat(draggerHeight);
			}else{
				self.bHeight=t*((self.body.scrollHeight-self.body.clientHeight)/(self.rail.clientHeight-draggerHeight));
				dTop=t;
			}
			HSAnim.stop(self.body);
			HSAnim.animate(self.body,{"scrollTop":self.bHeight},200);
			self.dragger.style.top=dTop+"px"
		}
		eventRemove=function(){
			self.dTop=dTop;
			document.removeEventListener("mousemove",moveFun);
			document.removeEventListener("mouseup",eventRemove);
			for(i=0;i<frames.length;i++){
				frames[i].contentDocument.removeEventListener("mousemove",moveFun);
				frames[i].contentDocument.removeEventListener("mouseup",eventRemove);
			}
			self.dragger.addEventListener("mousedown",draggerMoveFun);
		}
		frames=document.getElementsByTagName("iframe");
		document.addEventListener("mousemove",moveFun);
		document.addEventListener("mouseup",eventRemove);
		for(i=0;i<frames.length;i++){
			frames[i].contentDocument.addEventListener("mousemove",moveFun);
			frames[i].contentDocument.addEventListener("mouseup",eventRemove);
		}
		this.removeEventListener("mousedown",draggerMoveFun)
		e.preventDefault();
	}
	this.dragger.addEventListener("mousedown",draggerMoveFun);
}
Scroll.prototype.setting=function(node,railHeight,scrollHeight){
	var scrollWrap=HOSUNG.find(node,"hs-scroll")[0],dragger,rail;
	dragger=HOSUNG.find(scrollWrap,".hs-scroll-dragger-wrap")[0];
	rail=HOSUNG.find(scrollWrap,".hs-scroll-rail")[0];
	var railHeight=railHeight||rail.clientHeight,
		scrollHeight=scrollHeight||node.childNodes[0].scrollHeight;
	dragger.style.height=railHeight*railHeight/scrollHeight+"px";
}
scroll.extend({
	make:function(node,width,height){
		return new Scroll(node,width,height);
	}
})
window.HSScroll = scroll;
//scroll 끝
//animation 시작 (미완성)
var list=[],listCur=0,render,lpos=0;
	window.requestAnimationFrame=(function(){
		return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		function (callback) {
			window.setTimeout(callback,1000/60);
		};
	})()
	window.cancelAnimationFrame=(function(){
		return window.cancelAnimationFrame ||
		window.webkitCancelAnimationFrame ||
		window.mozCancelAnimationFrame ||
		window.oCancelAnimationFrame ||
		function (id) {
			window.clearTimeout(id);
		};
	})()
	function tick(i){
		var type=list[i].type,name=list[i].name,speed=list[i].speed,value=list[i].value;
		if(!list[i].notCss){
			list[i].node.style[name]=(list[i].cur+=speed)+"px";
			if((type===0&&list[i].cur>value)||(type===1&&list[i].cur<=value)){
				list[i].node.style[name]=value+"px";
				if(list[i].endFun){
					list[i].endFun();
				}
				list.splice(i,1)
				
			}
		}else if(list[i].notCss===1){
			list[i].node.style[name]=(list[i].cur+=speed);
			if((type===0&&list[i].cur>value)||(type===1&&list[i].cur<value)){
				list[i].node.style[name]=value;
				if(list[i].endFun){
					list[i].endFun();
				}
				list.splice(i,1)
			}
		}else if(list[i].notCss===2){
			list[i].node[name]=(list[i].cur+=speed);
			if((type===0&&list[i].cur>value)||(type===1&&list[i].cur<value)){
				list[i].node[name]=value;
				if(list[i].endFun){
					list[i].endFun();
				}
				list.splice(i,1)
			}
		}
	}
	function frameCompute(){
		for(i=0;i<list.length;i++){
			tick(i);
		}
		if(list.length!==0){
			render=requestAnimationFrame(frameCompute);
		}else{
			cancelAnimationFrame(render);
			render=undefined;
		}
	}
	
	function Animate(node,name,value,speed,count,endFun,fCur){
		var cur,vLen,notCss=0,frame={},type;
		if(name==="width"){
			cur=node.clientWidth;
			if(value-node.clientWidth>0){
				type=0;
			}else{
				type=1;
			}
		}else if(name==="height"){
			cur=node.clientHeight;
			if(value-node.clientHeight>0){
				type=0;
			}else{
				type=1;
			}
		}else if(name==="scrollTop"){
			cur=node.scrollTop;
			if(value-node.scrollTop>0){
				type=0;
			}else{
				type=1;
			}
			notCss=2;
		}else if(name==="opacity"){
			if(fCur!==null){
				cur=fCur;
			}else{
				cur=parseFloat(node.style[name])||1;
			}
			
			if(value-cur>0){
				type=0;
			}else{
				type=1;
			}
			notCss=1;
		}else{
			cur=parseInt(node.style[name])||0;
			if(value-parseInt(node.style[name]||0)>0){
				type=0;
			}else{
				type=1;
			}
		}
		speed=(value-cur)/(60*speed/1000);
		
		frame={node:node,type:type,speed:speed,value:value,cur:cur,name:name,notCss:notCss};
		if(endFun){
			frame.endFun=endFun;
		}
		list[list.length]=frame;
		if(!render){
			render=requestAnimationFrame(frameCompute);
		}
	}
	HSAnim.extend({
		animate:function(node,css,speed,endFun,fCur){
			var save,_name;
			if(!Array.isArray(node)){
				save=node;
				node=[];
				node[node.length]=save;
			}
			i=0;
			
			while(node[i]){
				for(_name in css){
					Animate(node[i],_name,css[_name],speed,list.length,endFun,fCur);
				}
				i++;
			}
		},
		stop:function(node){
			var i=0;
			
			while(list[i]){
				if(list[i].node===node){
					list.splice(i--,1);
				}
				i++;
			}
		}
	})
	window.HSAnim=HSAnim;
//animation 끝
var _load = HOSUNG.fn.load;
function getWindow( elem ) {
	return HOSUNG.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}
HOSUNG.fn.andSelf = HOSUNG.fn.addBack;
HOSUNG.parseJSON = JSON.parse;
if ( typeof define === "function" && define.amd ) {
	define( "HOSUNG", [], function() {
		return HOSUNG;
	} );
}
var _HOSUNG = window.HOSUNG,_HS = window.HS;
HOSUNG.noConflict = function( deep ) {
	if ( window.HS === HOSUNG ) {
		window.HS = _HS;
	}
	
	if ( deep && window.HOSUNG === HOSUNG ) {
		window.HOSUNG = _HOSUNG;
	}

	return HOSUNG;
};


if ( !noGlobal ) {
	window.HOSUNG = window.HS = HOSUNG;
}

return HOSUNG;
}));
