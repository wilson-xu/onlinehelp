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

