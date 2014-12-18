var app = angular.module('app',[]);

var content,body,style,catal;

function readHTML(docUrl) {
	$.ajax({
		type: "get",
		async : false,
		url : docUrl,
		dataType:"text",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success : function(result) {
			//console.log(result);
			content = result;

		}
	});
}


function setContent() {  //设置内容
	body = /<body ([\s\S]*)<\/body>/.exec(content);
	style = /<style>([\s\S]*)<\/style>/g.exec(content);
	
	if(style) {
		$('#content').append(style[0]);
	}
	if(body) {
		$('#content').append(body[0]);
	};
	
	
	
}

function setCatal() {  //设置目录
	var catal = $('a[href*=#_Toc]').parent();

	for (var i = 0; i < catal.length; i++) {
		
		$('#catal').append("<li style='text-decoration:none'>"+catal[i].outerHTML+'</li>');
	}
	
	//console.log	($('#catal'));

}


function clearContent() {  //清除上次加载内容
	$('#content').empty();
	$('#catal').empty();
}

function doIt(docUrl) {  //加载页面
	clearContent();
	readHTML(docUrl);
	setContent();
	setCatal();
}

app.controller('ShowController',['$scope','$http',function($scope,$http){
	
	$scope.show = function(docurl) {
		
		doIt(encodeURI(docurl));
				
	};
	
	
	
}]);


document.onkeydown = function() {
	if (event.keyCode == 116) {
		event.keyCode = 0;
		event.returnValue = false;
	}
	
	if (event.ctrlKey && window.event.keyCode == 67) { //屏蔽Crtl+C
		return false;
	}
	if ((event.ctrlKey) && (event.keyCode == 86)) {//屏蔽Crtl+V
		return false;
	}
	
}

document.oncontextmenu = function() {
	event.returnValue = false;
}

document.body.oncopy = function() {
	return false;
}
document.onselectstart = function() {
	return false;
}

