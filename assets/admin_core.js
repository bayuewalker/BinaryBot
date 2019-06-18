var binaryappid=14419;
var url="wss://ws.binaryws.com/websockets/v3?app_id="+ binaryappid +"&l=EN";
var ws,token,market,tf,curency;
var lastReqTime=0;
var newReqTime=0;
var counterTime=0;
var isLive=false;
var OnTrade=false;
var signalTrading="NETRAL";
//global transaksi var
var lastStake=0;
var contractId=0;
var tradeResult=1;
var lastSignal="NETRAL";
var lastOpenTime;
var isNewBar=false;
var barrier,barrier2;
var lastRefNumber,transactionId,buyPrice,sellPrice,profitLoss,payout,longCode,shortCode,purchaseTime,shellTime,entrySpot,exitSpot,isSold,isExpire,isAllowSell,tradeStatus,dateExpired;
var pattern=[];
var candles_o=[];
var	candles_h=[]
var	candles_l=[];
var	candles_c=[];
var	ticker=[];

//appid = 14419;
//datefrom = "2018-10-01 00:00:00";
//dateto = "2018-10-31 23:59:00";
market="R_100";
tf=60;
/*
//default value for test
token="XRblysbeFKP5XFH";
market="R_100";
tf=60;
curency="USD";
var message="Function Disabled!";
function clickIE4(){
if (event.button==2){
alert(message);
return false;
 }
}

function clickNS4(e){
if (document.layers||document.getElementById&&!document.all){
if (e.which==2||e.which==3){
alert(message);
return false;
}
}
}

if (document.layers){
document.captureEvents(Event.MOUSEDOWN);
document.onmousedown=clickNS4;
}
else if (document.all&&!document.getElementById){
document.onmousedown=clickIE4;
}

document.oncontextmenu=new Function("return false") */



function showAlert(title,body){
	$('#confirmtitle').html(title);
	$('#confirmbody').html(body);
	$('#myModal').modal("toggle");
}


btnconnect.addEventListener('click', function(e) {
	if ($('#token').val().length>0){

		token=$('#token').val().trim();
		Init();
	}else{
		showAlert("Notification","Please insert API Token !");
	}
},false);

logout.addEventListener('click', function(e) {
	 Forget_all_spot();
	 Forget_all_price_proposal();
   destroy_all();
	 clearCandle();
	 $('autotrade').prop('checked', false);
	 signalTrading="NETRAL";
	 $('#splash').show();
	 $('#utama').hide();
	 $('#tblresult tbody').empty();
	 $('#lblPL').html('0.00');
	 $('#lblTO').html('0.00');
	 $('#contractinfo').hide();
	 SignOut();
},false);



btncheck.addEventListener('click', function(e) {
appid = $('#app_list').val();
datefrom = $('#datefrom').val();
dateto = $('#dateto').val();
markup_statement();
},false);

CheckStatus();

function CheckStatus(){
	var status=setInterval(function(){
		//console.log(lastReqTime);
		if (lastReqTime>0){
				      if (newReqTime != lastReqTime){
				          newReqTime=lastReqTime;
				          counterTime=0;
				      }else{
				        counterTime++;
			}
		}else{
			counterTime=0;
		}
		if (counterTime>10){
			isLive=false;
			counterTime=0;
			if (navigator.onLine){
				Init();
			}else{
				//console.log("Periksa koneksi internet anda !");
			}
		}
		//console.log(counterTime);
	},1000);
}

function app_list(){
	var msg={
		app_list:1
	}
	ws.send(JSON.stringify(msg));
}

function markup_statement(){
	var msg={
		app_markup_details:1,
		description: 1,
		date_from: datefrom+" 00:00:00",
		date_to: dateto+" 23:59:59",
		app_id: appid,
		sort: "ASC",
	}
	ws.send(JSON.stringify(msg));
}

function Tick_History(){
	var msg={
		ticks_history:market,
		end: "latest",
		style: "candles",
		granularity:tf,
		count: tf,
		subscribe:1
	}
	ws.send(JSON.stringify(msg));
}

function GetSettings(){
	var msg={
		get_settings:1
	}
	ws.send(JSON.stringify(msg));
}
function Authorize(){
	var msg={
		authorize:token
	}
	ws.send(JSON.stringify(msg));
}

function Forget_all_spot(){
	var msg={
		forget_all:["ticks","candles"]
	}
	ws.send(JSON.stringify(msg));

}

function destroy_all(){
	var msg={
		forget_all:["balance","portfolio"]
	}
	ws.send(JSON.stringify(msg));

}

function ActiveSymbol(){
	var msg={
			active_symbols:"full",
			product_type:"basic",
			landing_company:"costarica"
		}
		ws.send(JSON.stringify(msg));
}

function Forget_all_price_proposal(){
	var msg={
		forget_all:["proposal","proposal_array","proposal_open_contract","transaction","portfolio"]
	}
	ws.send(JSON.stringify(msg));


}

function SellExpireContract(){
	var msg={sell_expired:1}
	ws.send(JSON.stringify(msg));
}

function SellContract(){
	if(contractId!=0 && isAllowSell==true){
		var msg={sell:contractId,price:0}
		ws.send(JSON.stringify(msg));
	}
}


function ProposalOpenContract(){
	var msg={
		proposal_open_contract:1,
		contract_id:contractId,
		subscribe:1
	}
	ws.send(JSON.stringify(msg));
}

function Balance(){
	var msg={
		balance:1,
		subscribe: 1
	}
	ws.send(JSON.stringify(msg));
}


function SignOut(){
	var msg={
		logout:1
	}
	ws.send(JSON.stringify(msg));
}

function Init(){
	ws= new WebSocket(url);
	ws.onmessage = function(msg) {

  		var data = JSON.parse(msg.data);
	  	switch (data.msg_type){

	  		case "authorize":
	  			//console.log(msg);
	  			if(data.hasOwnProperty('error')){
	  			 $('autotrade').prop('checked', false);
	  			 $('#splash').show();
	         	 $('#utama').hide();
	             showAlert("Warrning",data.error.message);
	         	}else{

	         		var namalengkap="";
	         		if (data.authorize.is_virtual=="1"){
	         			namalengkap="Virtual Account";
	         		}else{
	         			namalengkap=data.authorize.fullname;
	         		}
	         		$('#fullname').html(namalengkap);
	         		$('#email').html(data.authorize.email);
	         		$('#balance').html(data.authorize.balance);
	         		$('#loginid').html(data.authorize.loginid);
	         		$('#curency').html(data.authorize.currency);
	         		curency=data.authorize.currency;
	         		var scp=data.authorize.scopes;
	         		var bufscp="";
	         		for (var t=0; t<scp.length;t++){
	         			if (t==0){
	         				bufscp=capitalizeFirstLetter(scp[t]);
	         			}else{
	         				bufscp= bufscp + ", " + capitalizeFirstLetter(scp[t]);
	         			}

	         		}
	         		  $('#scope').html(bufscp);
	         			$('#splash').hide();
		         		$('#utama').show();
		         		Balance();
                app_list();


	         	}

	  		break;
	  		case "balance":
	  			if(data.hasOwnProperty('error')){
	             //console.log(data.error.message);
	         	}else{
	         		$('#balance').html(data.balance.balance);
	         	}

	  		break;
        case "app_markup_details":
        if(data.hasOwnProperty('error')){
             console.log(data.error.message);
          }else{
            for (var i=0;i<data.app_markup_details.transactions.length;i++){
              app_markup_value = data.app_markup_details.transactions[i].app_markup_usd;
              app_markup = data.app_markup_details.transactions[i].app_markup;
              transaction_time = data.app_markup_details.transactions[i].transaction_time;
              transaction_id = data.app_markup_details.transactions[i].transaction_id;
              client_loginid = data.app_markup_details.transactions[i].client_loginid;
              client_currcode = data.app_markup_details.transactions[i].client_currcode;
              var x = 0;
              var markupfloat = x + (parseFloat(app_markup_value)).toFixed(2);
            //  console.log(data.app_markup_details.transactions[i].app_markup_value);
	         		//contract confirmation
              $('#markupsum').html((parseFloat($('#markupsum').text())+parseFloat(markupfloat)).toFixed(2));
              $('#tblmarkup').append("<tr><td>" + transaction_id +"</td><td>" + client_loginid +"</td><td>"+ client_currcode +"."+ parseFloat(app_markup_value).toFixed(2) +"</td></tr>");
              }

          }
          break;
	  		case "candles":
	  			if(data.hasOwnProperty('error')){
	             //console.log(data.error.message);
	         	}else{
	         		for (var i=0;i<data.candles.length-1;i++){
	      				var op=data.candles[i].open;
	      				var hl=data.candles[i].high;
	      				var lo=data.candles[i].low;
	      				var cl=data.candles[i].close;
	      				candles_o.push(op);
	      				candles_h.push(hl);
	      				candles_l.push(lo);
	      				candles_c.push(cl);
	      			}
	         	}

	  		break;

	  		case "active_symbols":
	  			if(data.hasOwnProperty('error')){
	            console.log(data.error.message);
	         	}else{
	         		$('#symbol').find('option').remove()
	         		for (var s=0; s<data.active_symbols.length-1;s++){
	         			var symb=data.active_symbols[s].symbol;
	         			var sname=data.active_symbols[s].display_name;
	         			var stype=data.active_symbols[s].market;
	         			var sopen=data.active_symbols[s].exchange_is_open;
	         			if ((stype=="forex" || stype=="volidx" || stype=="indices" ) && sopen=="1") {

		         			if (symb=="R_100"){
		         				$('#symbol').append("<option value='"+ symb + "' selected>"+ sname + "</option>");
		         			}else{
		         				$('#symbol').append("<option value='"+ symb + "'>"+ sname + "</option>");
		         			}
	         			}


	         		}
	         	}

	  		break;

        case "app_list":
	  			if(data.hasOwnProperty('error')){
	            console.log(data.error.message);
	         	}else{

	         		for (var s=0; s<data.app_list.length;s++){
	         			var app_id = data.app_list[s].app_id;
                var app_markup_percentage = data.app_list[s].app_markup_percentage;
                var name = data.app_list[s].name;
		         				$('#app_list').append("<option value='"+ app_id + "' selected>"+ app_id + " - "+ name + "</option>");
	         		}
	         	}

	  		break;

	  		case "ohlc":
	  			if(data.hasOwnProperty('error')){
	             //console.log(data.error.message);
	         	}else{
	         		lastReqTime=data.ohlc.epoch;
	         		var open_time=data.ohlc.open_time;
		      		var op =data.ohlc.open;
		      		var hl=data.ohlc.high;
		      		var lo=data.ohlc.low;
		      		var cl=data.ohlc.close;
	         		var spot=data.ohlc.close;

	         		//spot
	         		var ts="N";
	         		var price=$('#spot').text();
	         		if (price>0){
		      			if (price<spot){
		      				$('#spot').css('color','#1fc7ff');
		      				ts="U";
		      			}else if (price>spot){
		      				$('#spot').css('color','#ff471a');
		      				ts="D";
		      			}else{
		      				$('#spot').css('color','black');
		      				ts="N";
		      			}
		      		}else{
		      			$('#spot').css('color','black');
		      			ts="N";
		      		}

	         		$('#spot').html(spot);

	         		//pattern
	         		pattern.push(ts);
	         		if (pattern.length>100){
		      				pattern.splice(0, 1); //delete element array pertama
		      		}

	         		//chart
	         		ticker.push(spot);
		      			if (ticker.length>135){
		      				ticker.splice(0, 1); //delete element array pertama
		      			}
		      			//console.log(ticker.length);
		        		$('#linecustom').sparkline(ticker, {type: 'line', lineColor: 'black',lineWidth:'1', height:'200', width:'100%', maxSpotColor:'blue',minSpotColor:'red',spotColor:'green'});

		        	//logic
		        	if (lastOpenTime){
		      				//ganti candle
		      				if (lastOpenTime !=open_time){
		      					isNewBar=true;
		      					lastOpenTime=open_time;
		      					//masukan candle data
		      					candles_o.push(LastOpen);
			      				candles_h.push(LastHigh);
			      				candles_l.push(LastLow);
			      				candles_c.push(LastClose);
			      				//pastikan selalu 60 data
			      				candles_o.splice(0,1);
			      				candles_h.splice(0,1);
			      				candles_l.splice(0,1);
			      				candles_c.splice(0,1);

		      				}else{
		      					isNewBar=false;
		      				}
		      			}else{
		      				lastOpenTime=open_time;
		      				isNewBar=false;
		      			}
		      			LastOpen=op;
		      			LastHigh=hl;
		      			LastLow=lo;
		      			LastClose=cl;


		      			if ($('#autotrade').is(":checked")==true){
		      				switch($('#indicator').val()){
										case "opencandle":
		      						if (isNewBar==true){
		      								var o1=parseFloat(candles_o[candles_o.length-1]);
			      							var c1=parseFloat(candles_c[candles_c.length-1]);
													var o2=parseFloat(candles_o[candles_o.length-2]);
			      							var c2=parseFloat(candles_c[candles_c.length-2]);


			      							if (c1>o1 && c2<o2){
			      								signalTrading="UP";
			      							}else if (c1<o1 && c2>o2){
			      								signalTrading="DOWN";
			      							}else{
			      								signalTrading="NETRAL";
			      							}
			      				//			console.log("SINYAL : " + signalTrading + " OPEN : " + o1 + " CLOSE : " + c1 );

		      							}

		      					break;


		      					case "tickpattern":
		      						var pju=$('#tickpatternup').val();
		      						var pjd=$('#tickpatterndown').val();
		      						var maxpj=0;
		      						signalTrading="NETRAL";
		      						//console.log(pattern);
		      						//console.log(pattern.length);
		      						//console.log(pju.length);
		      						var buf="";
		      						if (pattern.length>=pju.length){
			      						for (var t=pattern.length;t>=pattern.length-pju.length;t--){
			      							if (pattern[t]){
			      								buf=pattern[t] + buf;
			      							}

			      						}
		      						}
		      						if (buf.trim().toUpperCase()==pju.trim().toUpperCase()){
		      							signalTrading="UP";
		      						}
		      						buf="";
		      						if (pattern.length>=pjd.length){
			      						for (var t=pattern.length;t>=pattern.length-pjd.length;t--){
			      							if (pattern[t]){
			      								buf=pattern[t] + buf;
			      							}

			      						}
		      						}
		      						if (buf.trim().toUpperCase()==pjd.trim().toUpperCase()){
		      							signalTrading="DOWN";
		      						}

		      					break;


		      				}
		      			}

	         	}
	  		break;

	  		case "buy":
	  		//console.log(msg);
	  			if(data.hasOwnProperty('error')){
	             showAlert("Buy Contract",data.error.message);
	             OnTrade=false;
	             signal="NETRAL";
	         	}else{
	         		contractId=data.buy.contract_id;
	         		transactionId=data.buy.transaction_id;
	         		ProposalOpenContract();
	         		$('#contractinfo').show();
	         		if ($('#soundplay').is(":checked")==true){
	         			var deal = new Audio();
								deal.src = "/assets/sound/sound_make_deal.wav";
                		deal.play();
                	}
	         	}
	  			break;

	  		case "sell":

	  			if(data.hasOwnProperty('error')){
	             	//showAlert("Buy Contract",data.error.message);
	         	}else{
	         		Forget_all_price_proposal();
	         		ProposalOpenContract();
	         	}
	  		break;

	  		case "sell_expired":
	  			if(data.hasOwnProperty('error')){
	             //console.log(data.error.message);
	         	}else{
	         		Forget_all_price_proposal();
	         		ProposalOpenContract();
	         	}

	  		break;
	  		case "forget_all":
	  			//console.log(msg);

	  		break;

	  		case "proposal_open_contract":
	  			if(data.hasOwnProperty('error')){
	             //console.log(data.error.message);
	         	}else{
	         		contractId=data.proposal_open_contract.contract_id;
	         		longCode=data.proposal_open_contract.longcode;
	         		shortCode=data.proposal_open_contract.shortCode;
	         		dateExpired=data.proposal_open_contract.date_expiry;
	         		isExpire=data.proposal_open_contract.is_expired;
	         		isSold=data.proposal_open_contract.is_sold;
	         		isAllowSell=data.proposal_open_contract.is_valid_to_sell;
	         		buyPrice=data.proposal_open_contract.buy_price;
	         		sellPrice=data.proposal_open_contract.bid_price;
	         		payout=data.proposal_open_contract.payout;
	         		entrySpot=data.proposal_open_contract.entry_spot;
	         		purchaseTime=data.proposal_open_contract.purchase_time;
	         		tradeStatus=data.proposal_open_contract.status;
	         		sellTime=data.proposal_open_contract.sell_time;

	         		var margin=(parseFloat(sellPrice)-parseFloat(buyPrice)).toFixed(2);
	         		if (lastRefNumber !=transactionId && transactionId !=0){
	         			lastRefNumber=transactionId;
	         		}
	         		//contract confirmation
	         		$('#buyprice').html(buyPrice);
	         		$('#longcode').html(longCode);
	         		$('#refnumber').html(lastRefNumber);
	         		$('#payout').html(payout);
	         		$('#entryspot').html(entrySpot);
	         		$('#purchasetime').html(FromUnix(parseFloat(purchaseTime)));
	         		$('#indicative').html(sellPrice);
	         		$('#profitloss').html(margin);

	         		if (margin<=0){
	         			$('#indicative').css('color','red');
	         			$('#profitloss').css('color','red');
	         		}else{
	         			$('#indicative').css('color','green');
	         			$('#profitloss').css('color','green');
	         		}


	         		//paksa sell
	         		if (parseFloat(sellPrice)>=parseFloat(payout)){
	         			SellExpireContract();
	         		}


	         		//cek sam
	         		var pct=0;
	         		pct=(parseFloat(margin)/parseFloat(buyPrice))*100;

	         		if (isAllowSell==1){
	         			$('#btnsam').show();
	         			if ($('#autotrade').is(":checked")==true){

	         				//jika kena sell auto profit
	         				if (parseFloat($('#samprofit').val())>0 && parseFloat(margin)>0){
	         					if (parseFloat(pct)>=parseFloat($('#samprofit').val())){
	         						SellContract();
	         					}
	         				}

	         				//jika kena sell auto profit
	         				if (parseFloat($('#samloss').val())>0 && parseFloat(margin)<0){
	         					if (parseFloat(Math.abs(pct))>=parseFloat($('#samloss').val())){
	         						SellContract();
	         					}
	         				}
	         			}
	         		}else{
	         			$('#btnsam').hide();
	         		}


	         		if (isSold=="1"){
	         			if (tradeStatus=="sold"){
	         				sellPrice=data.proposal_open_contract.sell_price;
	         				margin=(parseFloat(sellPrice)-parseFloat(buyPrice)).toFixed(2);
	         				if (margin>=0){
	         					tradeResult=1;
		         			}

		         			if (margin<0){
		         				tradeResult=0;
		         			}

	         			}else{
	         				margin=(parseFloat(sellPrice)-parseFloat(buyPrice)).toFixed(2);
	         				if (tradeStatus=="won"){
		         				tradeResult=1;
		         			}

		         			if (tradeStatus=="lost"){
		         				tradeResult=0;
		         			}

	         			}



	         			Forget_all_price_proposal();


	         			//masukan ke table
	         			if (transactionId !=0){
	         				var pls=(parseFloat(sellPrice)-parseFloat(buyPrice)).toFixed(2);
		         			if (tradeResult==1){
		         				if ($('#soundplay').is(":checked")==true){
			         				var win = new Audio();
											win.src = "/assets/sound/sound_deal_win.wav";
	                				win.play();
                				}
		         				$('#traderesult').html("<h2>YOU WON !</h2>");
			         				$('#traderesult').css('color',"green");
			         				$('#tblresult').append("<tr class='success'><td>" + FromUnix(parseFloat(purchaseTime)) +"</td><td>" + transactionId +"</td><td>" + payout +"</td><td>" + longCode +"</td><td>" + buyPrice +"</td><td>" + FromUnix(parseFloat(sellTime)) +"</td><td>" + sellPrice +"</td><td>" + pls +"</td>");
		         			}else{
		         				if ($('#soundplay').is(":checked")==true){
		         				 var lost = new Audio();
										 lost.src = "/assets/sound/sound_deal_lose.wav";
                				 lost.play();
                				}
		         				$('#traderesult').html("<h2>YOU LOSS !</h2>");
			         				$('#traderesult').css('color',"red");
			         				$('#tblresult').append("<tr class='danger'><td>" + FromUnix(parseFloat(purchaseTime)) +"</td><td>" + transactionId +"</td><td>" + payout +"</td><td>" + longCode +"</td><td>" + buyPrice +"</td><td>" + FromUnix(parseFloat(sellTime)) +"</td><td>" + sellPrice +"</td><td>" + pls +"</td>");
		         			}
		         			transactionId="0";
		         			$('#lblPL').html((parseFloat($('#lblPL').text())+parseFloat(margin)).toFixed(2));
		         			$('#lblTO').html((parseFloat($('#lblTO').text())+parseFloat(buyPrice)).toFixed(2));


		         			//martingale
		         			if (tradeResult==0){
			         			switch ($('#falsesignal').val()){
			         				case "stoptrade":
			         					$('autotrade').prop('checked', false);
			         				break;
			         				case "continue":
			         					signalTrading=lastSignal;
			         				break;
			         				case "newanalyze":

			         				break;
			         			}
		         			}
	         			}

	         		 	//bersihkan variable
	         			contractId="0";
	         			OnTrade=false;

	         			//cek SL/TP
	         			if (parseFloat($('#lblPL').text())>0 && parseFloat($('#takeprofit').val())>0 && parseFloat($('#lblPL').text())>=parseFloat($('#takeprofit').val())) {
	         				$('#autotrade').prop('checked', false);
	         				signalTrading="NETRAL";

	         				showAlert("Notification","Congratulations, your Take Profit has been reached !");
	         			}

	         			if (parseFloat($('#lblPL').text())<0 && parseFloat($('#stoploss').val())>0 && Math.abs(parseFloat($('#lblPL').text()))>=parseFloat($('#takeprofit').val())) {
	         				$('#autotrade').prop('checked', false);
	         				signalTrading="NETRAL";

	         				showAlert("Notification","Opps, it looks like your Stop Loss has been reached !");
	         			}
	         		}

	         	}
	  		break;
	  	}
	}
	ws.onopen = function(event) {
		//console.log("CONNECT");
		isLive=true;
		ActiveSymbol();
		Authorize();
		Forget_all_spot()
		Forget_all_price_proposal();
		Tick_History();
    destroy_all();
		if (OnTrade==true && contractId !=0){
			ProposalOpenContract();
		}

	}
	ws.onclosed = function(event) {
		console.log("Connection Timeout");

	}
	ws.onclosing = function(event) {
	//  console.log("Menutup Koneksi");

	}
}


//GENARAL FUNCTION

function clearCandle(){
		candles_o=[];
		candles_h=[]
		candles_l=[];
		candles_c=[];
	    ticker=[];
	    pattern=[];
	    $('#spot').html('0.00000');
	    $('#spot').css('color','black');
	}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function FromUnix(ts){
    var gmtDate= new Date(ts*1000);
    return gmtDate.toGMTString();
}

function ToUnix(d){
    return (d.getTime()-d.getMilliseconds())/1000;
}

function sleep(milliseconds) {
	  var start = new Date().getTime();
	  for (var i = 0; i < 1e7; i++) {
	    if ((new Date().getTime() - start) > milliseconds){
	      break;
	    }
	  }
	}

function playSound(url){
  var audio = document.createElement('audio');
  audio.style.display = "none";
  audio.src = url;
  audio.autoplay = true;
  audio.onended = function(){
    audio.remove() //Remove when played.
  };
  document.body.appendChild(audio);
}
