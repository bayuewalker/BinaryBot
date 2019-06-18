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
        },
         {
            period: '18',
            iphone: 250,
        },
		 {
            period: '19',
            iphone: 160,
        },
		 {
            period: '20',
            iphone: 130,
        },
		{
            period: '21',
            iphone: 155,
        },
		{
            period: '22',
            iphone: 150,
        },
		{
            period: '23',
            iphone: 110,
        },
		{
            period: '24',
            iphone: 170,
        },
		{
            period: '25',
            iphone: 150,
        },
		{
            period: '26',
            iphone: 150,
        },
		{
            period: '27',
            iphone: 150,
        },
		{
            period: '28',
            iphone: 150,
        },
		{
            period: '29',
            iphone: 150,
        },
		{
            period: '30',
            iphone: 160,
        }];
		var dataNew=[{
            period: '01',
            iphone: 10,
        }, {
            period: '02',
            iphone: 135,
        },
         {
            period: '03',
            iphone: 150,
        },
		 {
            period: '04',
            iphone: 10,
        },
		 {
            period: '05',
            iphone: 180,
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
            iphone: 90,
        },
		{
            period: '11',
            iphone: 30,
        },
		{
            period: '12',
            iphone: 110,
        },
		{
            period: '13',
            iphone: 170,
        },
		{
            period: '14',
            iphone: 10,
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
        },
         {
            period: '18',
            iphone: 250,
        },
		 {
            period: '19',
            iphone: 170,
        },
		 {
            period: '20',
            iphone: 130,
        },
		{
            period: '21',
            iphone: 155,
        },
		{
            period: '22',
            iphone: 10,
        },
		{
            period: '23',
            iphone: 110,
        },
		{
            period: '24',
            iphone: 170,
        },
		{
            period: '25',
            iphone: 150,
        },
		{
            period: '26',
            iphone: 120,
        },
		{
            period: '27',
            iphone: 110,
        },
		{
            period: '28',
            iphone: 170,
        },
		{
            period: '29',
            iphone: 50,
        },
		{
            period: '30',
            iphone: 10,
        }];
		var areaChart = Morris.Area({
			element: 'chart_1',
			data: data,
			xkey: 'period',
			ykeys: ['iphone'],
			labels: ['iPhone'],
			pointSize: 3,
			lineWidth: 2,
			grid: false,
			pointStrokeColors:['#00b0ec'],
			pointFillColors:['#ffffff'],
			behaveLikeLine: true,
			smooth: false,
			hideHover: 'auto',
			lineColors: ['#00b0ec'],
			resize: true,
			gridTextColor:'#878787',
			gridTextFamily:"Poppins",
			parseTime: false,
			fillOpacity:0.6
		});	
		/* Switchery Init*/
		var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
		$('#morris_switch').each(function() {
			new Switchery($(this)[0], $(this).data());
		});
		var swichMorris = function() {
			if($("#morris_switch").is(":checked")) {
				areaChart.setData(data);
				areaChart.redraw();
			} else {
				areaChart.setData(dataNew);
				areaChart.redraw();
			}
		}
		swichMorris();	
		$(document).on('change', '#morris_switch', function () {
			swichMorris();
		});	
	}
});
/*****Ready function end*****/

/*****Load function start*****/
$(window).on("load",function(){
	window.setTimeout(function(){
		$.toast({
			heading: 'Welcome to Winkle',
			text: 'Use the predefined ones, or specify a custom position object.',
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
}
/*****E-Charts function end*****/

/*****Sparkline function start*****/
var sparklineLogin = function() { 
	if( $('#sparkline_6').length > 0 ){
		$("#sparkline_6").sparkline([9,7,7,8,8,6,8,5,6], {
			type: 'bar',
			width: '100%',
			height: '155',
			barWidth: '8',
			resize: true,
			barSpacing: '10',
			barColor: '#4dad44',
			highlightSpotColor: '#4dad44'
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