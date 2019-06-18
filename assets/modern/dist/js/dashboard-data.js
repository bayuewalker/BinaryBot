/*Dashboard Init*/

"use strict";

/*****Ready function start*****/
$(document).ready(function(){
	$('#statement').DataTable({
		"bFilter": false,
		"bLengthChange": false,
		"bPaginate": false,
		"bInfo": false,
	});

	if($('#chart_1').length > 0) {
		// Area Chart
		var data=[{
            period: '01',
            iphone: 180,
        }, {
            period: '02',
            iphone: 105,
        },
         {
            period: '03',
            iphone: 250,
        },
		 {
            period: '04',
            iphone: 160,
        },
		 {
            period: '05',
            iphone: 130,
        },
		{
            period: '06',
            iphone: 155,
        },
		{
            period: '07',
            iphone: 150,
        },
		{
            period: '08',
            iphone: 110,
        },
		{
            period: '09',
            iphone: 170,
        },
		{
            period: '10',
            iphone: 150,
        },
		{
            period: '11',
            iphone: 150,
        },
		{
            period: '12',
            iphone: 150,
        },
		{
            period: '13',
            iphone: 150,
        },
		{
            period: '14',
            iphone: 150,
        },
		{
            period: '15',
            iphone: 160,
        },
		{
            period: '16',
            iphone: 180,
        }, {
            period: '17',
            iphone: 105,
        }];
		var areaChart = Morris.Area({
				element: 'chart_1',
				data: data,
				xkey: 'period',
				ykeys: ['iphone'],
				labels: ['iPhone'],
				pointSize: 2,
				lineWidth: 2,
				grid: false,
				axes: false,
				padding: 0,
				pointStrokeColors:['#4dad44'],
				pointFillColors:['#ffffff'],
				behaveLikeLine: true,
				smooth: false,
				hideHover: 'auto',
				lineColors: ['#4dad44'],
				resize: true,
				gridTextColor:'#878787',
				gridTextFamily:"Poppins",
				parseTime: false,
				fillOpacity:0.6
			});
	}
});
/*****Ready function end*****/

/*****Load function start*****/
$(window).on("load",function(){
	window.setTimeout(function(){
		$.toast({
			heading: 'Welcome Back',
			text: 'Wish you get profit using this bot',
			position: 'bottom-right',
			loaderBg:'#e8af48',
			icon: 'info',
			hideAfter: 3500,
			stack: 6
		});
	}, 3000);
});
/*****Load function* end*****/

/*****E-Charts function start*****/
var echartsConfig = function() {
	if( $('#e_chart_1').length > 0 ){
		var eChart_1= echarts.init(document.getElementById('e_chart_1'));
		var option = {
			timeline: {
				data: ['91', '92', '93', '94', '95', '96', '97', '98', '99', '91'],
				axisType: 'category',
				show: false,
				autoPlay: true,
				playInterval: 1000,
			},
			options: [{
				tooltip: {
					'trigger': 'axis'
				},
				calculable: true,
				grid: {
					show:false
				},
				xAxis: [{
					'type': 'category',
					axisLabel: {
						textStyle: {
							color: '#878787',
							fontStyle: 'normal',
							fontWeight: 'normal',
							fontFamily: "'Roboto', sans-serif",
							fontSize: 12
						}
					},
					axisLine: {
						show:false
					},
					splitLine:{
						show:false
					},
					'data': [
						'x1', ' x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8'
					]
				}],
				yAxis: [{
					'type': 'value',
					'max': 200,
					axisLine: {
						show:false
					},
					axisLabel: {
						textStyle: {
							color: '#878787',
							fontStyle: 'normal',
							fontWeight: 'normal',
							fontFamily: "'Roboto', sans-serif",
							fontSize: 12
						}
					},
					splitLine: {
						show: false,
					},
				}, {
					'type': 'value',
					axisLine: {
						show:false
					},
					splitLine: {
						show: false,
					},
					axisLabel: {
						textStyle: {
							color: '#878787',
							fontStyle: 'normal',
							fontWeight: 'normal',
							fontFamily: "'Roboto', sans-serif",
							fontSize: 12
						}
					},
				}],
				series: [{
					'name': 'tq',
					'yAxisIndex': 1,
					'type': 'line',
					'data': [5, 6, 8, 28, 8, 24, 11, 16],
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(
								0, 1, 0, 0, [{
									offset: 0,
									color: '#4DAD44'
								}, {
									offset: 1,
									color: '#AED581'
								}]
							),
							barBorderRadius: 4
						},
						emphasis: {
							color: new echarts.graphic.LinearGradient(
								0, 1, 0, 0, [{
									offset: 0,
									color: '#4DAD44'
								}, {
									offset: 1,
									color: '#AED581'
								}]
							),
							barBorderRadius: 4
						}
					},
					label: {
						normal: {
							show: true,
							position: 'top',
							formatter: '{c}',
							color: '#878787',
							fontStyle: 'normal',
							fontWeight: 'normal',
							fontFamily: "'Roboto', sans-serif",
							fontSize: 12
						}
					},
				}]
			}, {
				series: [{
					'data': [45, 43, 64, 134, 188, 43, 109, 12]
				}]
			}, {
				series: [{
					'data': [110, 32, 111, 176, 73, 59, 181, 9]
				}]
			}, {
				series: [{
					'data': [94, 37, 64, 55, 56, 41, 70, 17]
				}]
			}, {
				series: [{
					'data': [5, 6, 5, 28, 8, 24, 11, 16]
				}]
			}, {
				series: [{
					'data': [45, 34, 64, 134, 188, 43, 109, 12]
				}]
			}, {
				series: [{
					'data': [5, 6, 34, 28, 8, 24, 11, 16]
				}]
			}, {
				series: [{
					'data': [94, 37, 64, 55, 56, 41, 70, 17]
				}]
			}, {
				series: [{
					'data': [45, 40, 64, 134, 188, 43, 109, 12]
				}]
			}, {
				series: [{
					'data': [5, 6, 10, 28, 8, 24, 11, 16]
				}]
			}, ]
		};
		eChart_1.setOption(option);
		eChart_1.resize();
	}
	if( $('#e_chart_2').length > 0 ){
		var eChart_2 = echarts.init(document.getElementById('e_chart_2'));
		var option = {
			color: ['#4dad44','#2278dd','#e8af48','#fd6421'],
			tooltip: {
				trigger: 'axis',
				backgroundColor: 'rgba(33,33,33,1)',
				borderRadius:0,
				padding:10,
				axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: 'rgba(33,33,33,1)'
					}
				},
				textStyle: {
					color: '#fff',
					fontStyle: 'normal',
					fontWeight: 'normal',
					fontFamily: "'Poppins', sans-serif",
					fontSize: 12
				}
			},
			toolbox: {
				show: true,
				orient: 'vertical',
				left: 'right',
				top: 'center',
				showTitle: false,
				feature: {
					mark: {show: true},
					magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
					restore: {show: true},
				}
			},
			grid: {
				left: '3%',
				right: '10%',
				bottom: '3%',
				containLabel: true
			},
			xAxis : [
				{
					type : 'category',
					data : ['2011','2012','2013','2014','2015','2016','2017'],
					axisLine: {
						show:false
					},
					axisLabel: {
						textStyle: {
							color: '#878787'
						}
					},
				}
			],
			yAxis : [
				{
					type : 'value',
					axisLine: {
						show:false
					},
					axisLabel: {
						textStyle: {
							color: '#878787'
						}
					},
					splitLine: {
						show: false,
					}
				}
			],
			series : [
				{
					name:'1',
					type:'bar',
					data:[320, 332, 301, 334, 390, 330, 320]
				},
				{
					name:'2',
					type:'bar',
					stack: 'st1',
					data:[120, 132, 101, 134, 90, 230, 210]
				},
				{
					name:'3',
					type:'bar',
					stack: 'st1',
					data:[220, 182, 191, 234, 290, 330, 310]
				},
				{
					name:'4',
					type:'bar',
					stack: 'st1',
					data:[150, 232, 201, 154, 190, 330, 410]
				}
			]
		};

		eChart_2.setOption(option);
		eChart_2.resize();
	}
	if( $('#e_chart_3').length > 0 ){
		var eChart_3 = echarts.init(document.getElementById('e_chart_3'));
		function detectionData(str) {
		var color = '#DA4296';
		if (str >= 30 && str <= 60) {
			color = '#DA4296';
		} else if (str > 60) {
			color = '#DA4296';
		}
		return color;
		}
		var option3 = {
			"tooltip": {
				"formatter": "{a} <br/>{b} : {c}%"
			},
			"series": [{
				"name": "traffic",
				"type": "gauge",
				"splitNumber": 5,
				"axisLine": {
					"lineStyle": {
						"color": [
							[0.31, "#f4f4f4"],
							[1, "#f4f4f4"]
						],
						"width": 10
					}
				},
				"axisTick": {
					"lineStyle": {
						"color": '#DA4296',
						"width": 2
					},
					"length": -25,
					"splitNumber": 1
				},
				"axisLabel": {
					"distance": -80,
					"textStyle": {
						"color": "#878787"
					}
				},
				"splitLine": {
					"show": false
				},
				"itemStyle": {
					"normal": {
						"color": "#DA4296"
					}
				},
				"detail": {
					"formatter": "{value}%",
					"offsetCenter": [0, "60%"],
					"textStyle": {
						"fontSize": 12,
						"color": "#878787"
					}
				},
				"title": {
					"offsetCenter": [0, "100%"]
				},
				"data": [{
					"name": "",
					"value": 31

				}]
			}]
		}
		var app = [];
		app.timeTicket = setInterval(function() {
			var value = (Math.random() * 100).toFixed(2) - 0;
			option3.series[0].data[0].value = value;
			option3.series[0].axisLine.lineStyle.color[0][0] = value / 100;
			option3.series[0].axisLine.lineStyle.color[0][1] = detectionData(value);
			eChart_3.setOption(option3, true);
		}, 500);

		eChart_3.setOption(option3);
		eChart_3.resize();
	}
		if( $('#e_chart_4').length > 0 ){
		var eChart_4 = echarts.init(document.getElementById('e_chart_4'));
		var option4 = {
			color: ['#ff354d'],
			tooltip: {
				trigger: 'axis',
				backgroundColor: 'rgba(33,33,33,1)',
				borderRadius:0,
				padding:10,
				axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: 'rgba(33,33,33,1)'
					}
				},
				textStyle: {
					color: '#fff',
					fontStyle: 'normal',
					fontWeight: 'normal',
					fontFamily: "'Poppins', sans-serif",
					fontSize: 12
				}
			},

			xAxis: [{
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed'],
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				}
			}],
			yAxis: {
				type: 'value',
				axisLine: {
					show: false
				},
				axisLabel: {
					textStyle: {
						color: '#878787'
					}
				},
				splitLine: {
					show: false,
				},
				axisTick: {
					show: false
				}
			},
			series: [{
				data: [120, 200, 150, 80, 70, 110, 130,70, 110, 130],
				type: 'bar',
				barMaxWidth: 10,
				barGap: "30%",
			}]
		};
		eChart_4.setOption(option4);
		eChart_4.resize();
	}


}
/*****E-Charts function end*****/

/*****Sparkline function start*****/
var sparklineLogin = function() {
	if( $('#sparkline_1').length > 0 ){
		$("#sparkline_1").sparkline([2,4,4,6,8,5,6,4,8,6,6], {
			type: 'bar',
			width: '100%',
			height: '180',
			barWidth: '8',
			barSpacing: '15',
			barColor: '#ed8739',
			highlightSpotColor: '#ed8739'
		});
	}
}
/*****Sparkline function end*****/

/*****Resize function start*****/
var sparkResize,echartResize;
$(window).on("resize", function () {
	/*Sparkline Resize*/
	clearTimeout(sparkResize);
	sparkResize = setTimeout(sparklineLogin, 200);

	/*E-Chart Resize*/
	clearTimeout(echartResize);
	echartResize = setTimeout(echartsConfig, 200);
}).resize();
/*****Resize function end*****/

/*****Function Call start*****/
sparklineLogin();
echartsConfig();
/*****Function Call end*****/
