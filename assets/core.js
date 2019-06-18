
function getRndmFromSet(set)
{
    var rndm = Math.floor(Math.random() * set.length);
    return set[rndm];
}

var rand = getRndmFromSet([15426,15427,15428]);
var update=false;
var binaryappid=15622;
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
var af;
var candlex=[];
var trexid=[];

market="R_100";
tf=60;

function showupdatealert(){
  if(update==true){
    $('#showNotifupdate').show();
    $('#updatealert').html('system update... please hold your trade when update. thanks');
  }
}

function showNotification(message)
{
  $('#showNotiftext').show();
  $('#notificationtext').html(message);
}

function showAlert(title,body){
	$('#confirmtitle').html(title);
	$('#confirmbody').html(body);
	$('#myModal').modal("toggle");
}

function printText(message){
  $('#showtext').html(message);
}

autotrade.addEventListener('click', function(e) {

	if ($('#autotrade').is(":checked")==true){
		$('#tblresult tbody').empty();
		$('#lblPL').html('0.00');
		$('#lblTO').html('0.00');
		$('#contractinfo').hide();
    lastStake=parseFloat($('#stake').val()).toFixed(2);
    $('#showNotif').hide();
    $('#showNotiftext').hide();
	}
},false);

btnconnect.addEventListener('click', function(e) {
	if ($('#token').val().length>0){
		$('#autotrade').prop('checked', false);
		token=$('#token').val().trim();
    showupdatealert();
		Init();
	}else{
		showAlert("Notification","Please insert API Token !");
	}
},false);

logout.addEventListener('click', function(e) {
	 Forget_all_spot();
	 Forget_all_price_proposal();
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

btnput.addEventListener('click', function(e) {
	if (OnTrade==false){
		signalTrading="DOWN";
	}
	//cek SL/TP
	         			if (parseFloat($('#lblPL').text())>0 && parseFloat($('#takeprofit').val())>0 && parseFloat($('#lblPL').text())>=parseFloat($('#takeprofit').val())) {
	         				$('#autotrade').prop('checked', false);
	         				signalTrading="NETRAL";
	         				showNotification("Congratulations, your Take Profit has been reached !");

	         			}

	         			if (parseFloat($('#lblPL').text())<0 && parseFloat($('#stoploss').val())>0 && Math.abs(parseFloat($('#lblPL').text()))>=parseFloat($('#stoploss').val())) {
	         				$('#autotrade').prop('checked', false);
	         				signalTrading="NETRAL";

	         				showNotification("Opps, it looks like your Stop Loss has been reached !");
	         			}

},false);

btncall.addEventListener('click', function(e) {
	if (OnTrade==false){
		signalTrading="UP";
	}
	//cek SL/TP
	         			if (parseFloat($('#lblPL').text())>0 && parseFloat($('#takeprofit').val())>0 && parseFloat($('#lblPL').text())>=parseFloat($('#takeprofit').val())) {
	         				$('#autotrade').prop('checked', false);
	         				signalTrading="NETRAL";
	         				showNotification("Congratulations, your Take Profit has been reached !");

	         			}

	         			if (parseFloat($('#lblPL').text())<0 && parseFloat($('#stoploss').val())>0 && Math.abs(parseFloat($('#lblPL').text()))>=parseFloat($('#stoploss').val())) {
	         				$('#autotrade').prop('checked', false);
	         				signalTrading="NETRAL";
	         				showNotification("Opps, it looks like your Stop Loss has been reached !");
	         			}
},false);

btnsam.addEventListener('click', function(e) {
		SellContract();
},false);


symbol.addEventListener('change', function(e) {
	var val=$("#symbol option:selected").text();
	$('#symbolname').html(val);
	market=$('#symbol').val();
	Forget_all_spot();
	clearCandle();
	Tick_History();

},false);


timeframe.addEventListener('change', function(e) {
	tf=$('#timeframe').val();
	Forget_all_spot();
	clearCandle();
	Tick_History();

},false);

aftermarti.addEventListener('change', function(e) {
	af = $('#aftermarti').val();
},false);

indicatorfilter.addEventListener('change', function(e) {

		switch($('#indicatorfilter').val()){
      case "nofilter":
      $('#parFilter').hide();
      break;
      case "sma":
      $('#parFilter').show();
      break;
      case "antisideway":
      $('#parFilter').hide();
      break;
    }
},false);

indicator.addEventListener('change', function(e) {

		switch($('#indicator').val()){
      case "candlefollower":
				$('#parTickPattern').hide();
        $('#parBolinger').hide();
        $('#indiFilter').show();
        $('#timeFilter').show();
        $('#filterAntiDoji').show();
        $('#showNotif').show();
        $('#shownotiftext').html("Recommended Setting : Trade Duration = 28 second | TimeFrame = 1 Minutes | Martiangle = New Analyze");
			break;
			case "opencandle":
				$('#parTickPattern').hide();
        $('#parBolinger').hide();
        $('#indiFilter').show();
        $('#timeFilter').hide();
        $('#filterAntiDoji').show();
        $('#showNotif').show();
        $('#shownotiftext').html("Recommended Setting : Trade Duration = 58 second | TimeFrame = 1 Minutes");
			break;
      case "highlow":
				$('#parTickPattern').hide();
        $('#parBolinger').hide();
        $('#indiFilter').hide();
        $('#timeFilter').hide();
        $('#filterAntiDoji').hide();
        $('#showNotif').hide();
			break;
      case "hilohedging":
				$('#parTickPattern').hide();
        $('#parBolinger').hide();
        $('#indiFilter').hide();
        $('#timeFilter').hide();
        $('#filterAntiDoji').hide();
        $('#showNotif').hide();
			break;
      case "reversalbb":
				$('#parTickPattern').hide();
        $('#parBolinger').show();
        $('#indiFilter').hide();
        $('#timeFilter').hide();
        $('#filterAntiDoji').hide();
        $('#showNotif').hide();
			break;
      case "fastcandlepatern":
				$('#parTickPattern').hide();
        $('#parBolinger').hide();
        $('#indiFilter').hide();
        $('#timeFilter').hide();
        $('#filterAntiDoji').hide();
        $('#showNotif').show();
        $('#shownotiftext').html("Recommended Setting : Trade Duration = 58 second | TimeFrame = 1 Minutes");
			break;

			case "powercandle":
				$('#parTickPattern').hide();
        $('#parBolinger').hide();
        $('#indiFilter').hide();
        $('#timeFilter').hide();
        $('#filterAntiDoji').hide();
			break;

			case "trendbar":
				$('#parTickPattern').hide();
        $('#parBolinger').hide();
        $('#indiFilter').hide();
        $('#timeFilter').hide();
        $('#filterAntiDoji').hide();
			break;

			case "tickpattern":
				$('#parTickPattern').show();
        $('#parBolinger').hide();
        $('#indiFilter').hide();
        $('#timeFilter').hide();
        $('#filterAntiDoji').hide();
			break;
		}
},false);

contract.addEventListener('change', function(e) {
		//console.log($('#contract').val());
		switch ($('#contract').val()){
			case "RF":
				$('#barrier-set').hide();
			break;
      case "HLHEDGING":
				$('#barrier-set').show();
			break;
			case "HLL":
				$('#barrier-set').show();
			break;
			case "HLH":
				$('#barrier-set').show();
			break;
			case "TCH":
				$('#barrier-set').show();
			break;
			case "EBW":
				$('#barrier-set').show();
			break;
			case "EBO":
				$('#barrier-set').show();
			break;
			case "SBW":
				$('#barrier-set').show();
			break;
			case "GO":
				$('#barrier-set').show();
			break;
			case "AS":
				$('#barrier-set').hide();
			break;

		}

},false);

CheckStatus();
TradeMonitor();


function stopTrade()
{
  var maxStake =$('#maxstake').val();
  if (parseFloat(lastStake)>=parseFloat(maxStake)){
    $('#autotrade').prop('checked', false);
  }
}

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

function cekDetik(){
  var d = new Date();
  var n = d.getSeconds();
  return n;
}

function TradeMonitor(){
	var monitor=setInterval(function(){
			if (OnTrade==false){
				if (signalTrading !="NETRAL"){
					OnTrade=true;
					lastSignal=signalTrading;
					signalTrading="NETRAL";
					//clear status
					$('#buyprice').html('');
	         		$('#longcode').html('');
	         		$('#refnumber').html('');
	         		$('#payout').html('');
	         		$('#entryspot').html('');
	         		$('#purchasetime').html('');
	         		$('#indicative').html('');
	         		$('#profitloss').html('');
	         		$('#traderesult').html('');

	         		//cek stake
	        if (tradeResult==1){
						lastStake=parseFloat($('#stake').val()).toFixed(2);
					}else{
            lastStake=(parseFloat(lastStake) * parseFloat($('#multiplier').val())).toFixed(2);
					}
					//normalkan stake
          if (parseFloat(lastStake)>=parseFloat($('#maxstake').val())){
            switch ($('#aftermarti').val()){
              case "stopstake":
              $('#autotrade').prop('checked', false);
              lastStake=0;
              break;
              case "resetstake":
              lastStake=parseFloat($('#stake').val()).toFixed(2);
        //      lastSignal=signalTrading;
              break;
            }
          }


								//console.log(ys);
					switch($('#contract').val()){
            case "HLHEDGING":
							switch($('#signaltotrade').val()){
								case "all":

										if (lastSignal=="UP"){
											barrierplus="+" + $('#barrier1').val();
                      barriermin="-"+$('#barrier2').val();
											BuyContractSingleBarrier(lastStake,"CALL",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrierplus);
                      BuyContractSingleBarrier(lastStake,"PUT",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barriermin);
										}else{
                      barrierplus="+" + $('#barrier1').val();
											barriermin="-"+$('#barrier2').val();
                      BuyContractSingleBarrier(lastStake,"CALL",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrierplus);
											BuyContractSingleBarrier(lastStake,"PUT",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barriermin);
										}

								break;
								case "up":
										if (lastSignal=="UP"){
                      barrierplus="+" + $('#barrier1').val();
											barriermin="-"+$('#barrier2').val();
											BuyContractSingleBarrier(lastStake,"CALL",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrierplus);
                      BuyContractSingleBarrier(lastStake,"PUT",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barriermin);
										}
								break;
								case "down":
										if (lastSignal=="DOWN"){
                      barrierplus="+" + $('#barrier1').val();
											barriermin="-"+$('#barrier2').val();
                      BuyContractSingleBarrier(lastStake,"CALL",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrierplus);
											BuyContractSingleBarrier(lastStake,"PUT",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barriermin);
										}
								break;
							}
						break;

						case "RF":
							//filter sinyal
							switch($('#signaltotrade').val()){

								case "all":
									if ($('#signaldirection').val()=="follow"){
										if (lastSignal=="UP"){
											BuyContractNoBarrier(lastStake,"CALL",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val());
										}else{

											BuyContractNoBarrier(lastStake,"PUT",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val());
										}
									}else{
										if (lastSignal=="UP"){

											BuyContractNoBarrier(lastStake,"PUT",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val());
										}else{

											BuyContractNoBarrier(lastStake,"CALL",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val());
										}
									}
								break;
								case "up":
										if (lastSignal=="UP"){
											BuyContractNoBarrier(lastStake,"CALL",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val());
										}
								break;
								case "down":
										if (lastSignal=="DOWN"){
											BuyContractNoBarrier(lastStake,"PUT",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val());
										}
								break;
							}
						break;
						case "HLL":
							switch($('#signaltotrade').val()){
								case "all":
									if ($('#signaldirection').val()=="follow"){
										if (lastSignal=="UP"){
											barrier="-" + $('#barrier1').val();
											BuyContractSingleBarrier(lastStake,"CALL",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier);
										}else{
											barrier="+"+$('#barrier1').val();
											BuyContractSingleBarrier(lastStake,"PUT",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier);
										}
									}else{
										if (lastSignal=="UP"){
											barrier="+"+$('#barrier1').val();
											BuyContractSingleBarrier(lastStake,"PUT",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier);
										}else{
											barrier="-"+$('#barrier1').val();
											BuyContractSingleBarrier(lastStake,"CALL",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier);
										}
									}
								break;
								case "up":
										if (lastSignal=="UP"){
											barrier="-"+$('#barrier1').val();
											BuyContractSingleBarrier(lastStake,"CALL",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier);
										}

								break;
								case "down":

										if (lastSignal=="DOWN"){
											barrier="+"+$('#barrier1').val();
											BuyContractSingleBarrier(lastStake,"PUT",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier);
										}

								break;
							}

						break;
						case "HLH":
							switch($('#signaltotrade').val()){
								case "all":
									if ($('#signaldirection').val()=="follow"){
										if (lastSignal=="UP"){
											barrier="+" + $('#barrier1').val();
											BuyContractSingleBarrier(lastStake,"CALL",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier);
										}else{
											barrier="-"+$('#barrier1').val();
											BuyContractSingleBarrier(lastStake,"PUT",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier);
										}
									}else{
										if (lastSignal=="UP"){
											barrier="-"+$('#barrier1').val();
											BuyContractSingleBarrier(lastStake,"PUT",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier);
										}else{
											barrier="+"+$('#barrier1').val();
											BuyContractSingleBarrier(lastStake,"CALL",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier);
										}
									}
								break;
								case "up":

										if (lastSignal=="UP"){
											barrier="+"+$('#barrier1').val();
											BuyContractSingleBarrier(lastStake,"CALL",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier);
										}

								break;
								case "down":

										if (lastSignal=="DOWN"){
											barrier="-"+$('#barrier1').val();
											BuyContractSingleBarrier(lastStake,"PUT",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier);
										}

								break;
							}
						break;
						case "TCH":
							switch($('#signaltotrade').val()){
								case "all":
									if ($('#signaldirection').val()=="follow"){
										if (lastSignal=="UP"){
											barrier="+" + $('#barrier1').val();
											BuyContractSingleBarrier(lastStake,"ONETOUCH",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier);
										}else{
											barrier="-"+$('#barrier1').val();
											BuyContractSingleBarrier(lastStake,"ONETOUCH",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier);
										}
									}else{
										if (lastSignal=="UP"){
											barrier="-"+$('#barrier1').val();
											BuyContractSingleBarrier(lastStake,"ONETOUCH",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier);
										}else{
											barrier="+"+$('#barrier1').val();
											BuyContractSingleBarrier(lastStake,"ONETOUCH",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier);
										}
									}
								break;
								case "up":

										if (lastSignal=="UP"){
											barrier="+"+$('#barrier1').val();
											BuyContractSingleBarrier(lastStake,"ONETOUCH",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier);
										}

								break;
								case "down":

										if (lastSignal=="DOWN"){
											barrier="-"+$('#barrier1').val();
											BuyContractSingleBarrier(lastStake,"ONETOUCH",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier);
										}

								break;
							}
						break;
						case "DNT":
							switch($('#signaltotrade').val()){
								case "all":
									if ($('#signaldirection').val()=="follow"){
										if (lastSignal=="UP"){
											barrier="-" + $('#barrier1').val();
											BuyContractSingleBarrier(lastStake,"NOTOUCH",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier);
										}else{
											barrier="+"+$('#barrier1').val();
											BuyContractSingleBarrier(lastStake,"NOTOUCH",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier);
										}
									}else{
										if (lastSignal=="UP"){
											barrier="-"+$('#barrier1').val();
											BuyContractSingleBarrier(lastStake,"NOTOUCH",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier);
										}else{
											barrier="+"+$('#barrier1').val();
											BuyContractSingleBarrier(lastStake,"NOTOUCH",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier);
										}
									}
								break;
								case "up":
									if ($('#signaldirection').val()=="follow"){
										if (lastSignal=="UP"){
											barrier="-"+$('#barrier1').val();
											BuyContractSingleBarrier(lastStake,"NOTOUCH",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier);
										}
									}
								break;
								case "down":
									if ($('#signaldirection').val()=="follow"){
										if (lastSignal=="DOWN"){
											barrier="-"+$('#barrier1').val();
											BuyContractSingleBarrier(lastStake,"NOTOUCH",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier);
										}
									}
								break;
							}
						break;
						case "EBW":
							switch($('#signaltotrade').val()){
								case "all":
									if ($('#signaldirection').val()=="follow"){
										if (lastSignal=="UP"){
											var b1=$('#barrier1').val();
											var b2=$('#barrier2').val();
											barrier="+" + b1;
											barrier2="-" + b2;
											if (parseFloat(b1)<parseFloat(b2)){
												barrier1="+" + b2;
												barrier2="-" + b1;
											}
											BuyContractMultiBarrier(lastStake,"EXPIRYRANGE",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier,barrier2);
										}else{
											var b1=$('#barrier1').val();
											var b2=$('#barrier2').val();
											barrier="+" + b2;
											barrier2="-" + b1;
											if (parseFloat(b1)>parseFloat(b2)){
												barrier="+" + b1;
												barrier2="-" + b2;
											}
											BuyContractMultiBarrier(lastStake,"EXPIRYRANGE",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier,barrier2);
										}
									}else{
										if (lastSignal=="DOWN"){
											var b1=$('#barrier1').val();
											var b2=$('#barrier2').val();
											barrier="+" + b1;
											barrier2="-" + b2;
											if (parseFloat(b1)<parseFloat(b2)){
												barrier="+" + b2;
												barrier2="-" + b1;
											}
											BuyContractMultiBarrier(lastStake,"EXPIRYRANGE",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier,barrier2);
										}else{
											var b1=$('#barrier1').val();
											var b2=$('#barrier2').val();
											barrier="+" + b2;
											barrier2="-" + b1;
											if (parseFloat(b1)>parseFloat(b2)){
												barrier="+" + b1;
												barrier2="-" + b2;
											}
											BuyContractMultiBarrier(lastStake,"EXPIRYRANGE",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier,barrier2);
										}
									}
								break;

								case "up":
									if (lastSignal=="UP"){
											var b1=$('#barrier1').val();
											var b2=$('#barrier2').val();
											barrier="+" + b1;
											barrier2="-" + b2;
											if (parseFloat(b1)<parseFloat(b2)){
												barrier="+" + b2;
												barrier2="-" + b1;
											}
											BuyContractMultiBarrier(lastStake,"EXPIRYRANGE",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier,barrier2);
									}
								break;

								case "down":
									if (lastSignal=="DOWN"){
											var b1=$('#barrier1').val();
											var b2=$('#barrier2').val();
											barrier="+" + b2;
											barrier2="-" + b1;
											if (parseFloat(b1)>parseFloat(b2)){
												barrier1="+" + b1;
												barrier2="-" + b2;
											}
											BuyContractMultiBarrier(lastStake,"EXPIRYRANGE",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier,barrier2);
									}
								break;
							}


						break;
						case "EOS":
							switch($('#signaltotrade').val()){
								case "all":
									if ($('#signaldirection').val()=="follow"){
										if (lastSignal=="UP"){
											var b1=$('#barrier1').val();
											var b2=$('#barrier2').val();
											barrier="+" + b1;
											barrier2="-" + b2;
											if (parseFloat(b1)>parseFloat(b2)){
												barrier1="+" + b2;
												barrier2="-" + b1;
											}
											BuyContractMultiBarrier(lastStake,"EXPIRYMISS",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier,barrier2);
										}else{
											var b1=$('#barrier1').val();
											var b2=$('#barrier2').val();
											barrier="+" + b2;
											barrier2="-" + b1;
											if (parseFloat(b1)>parseFloat(b2)){
												barrier="+" + b1;
												barrier2="-" + b2;
											}
											BuyContractMultiBarrier(lastStake,"EXPIRYMISS",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier,barrier2);
										}
									}else{
										if (lastSignal=="DOWN"){
											var b1=$('#barrier1').val();
											var b2=$('#barrier2').val();
											barrier="+" + b1;
											barrier2="-" + b2;
											if (parseFloat(b1)>parseFloat(b2)){
												barrier1="+" + b2;
												barrier2="-" + b1;
											}
											BuyContractMultiBarrier(lastStake,"EXPIRYMISS",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier,barrier2);
										}else{
											var b1=$('#barrier1').val();
											var b2=$('#barrier2').val();
											barrier="+" + b2;
											barrier2="-" + b1;
											if (parseFloat(b1)>parseFloat(b2)){
												barrier="+" + b1;
												barrier2="-" + b2;
											}
											BuyContractMultiBarrier(lastStake,"EXPIRYMISS",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier,barrier2);
										}
									}
								break;

								case "up":
									if (lastSignal=="UP"){
											var b1=$('#barrier1').val();
											var b2=$('#barrier2').val();
											barrier="+" + b1;
											barrier2="-" + b2;
											if (parseFloat(b1)>parseFloat(b2)){
												barrier="+" + b2;
												barrier2="-" + b1;
											}
											BuyContractMultiBarrier(lastStake,"EXPIRYMISS",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier,barrier2);
									}
								break;

								case "down":
									if (lastSignal=="DOWN"){
											var b1=$('#barrier1').val();
											var b2=$('#barrier2').val();
											barrier="+" + b2;
											barrier2="-" + b1;
											if (parseFloat(b1)>parseFloat(b2)){
												barrier="+" + b1;
												barrier2="-" + b2;
											}
											BuyContractMultiBarrier(lastStake,"EXPIRYMISS",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier,barrier2);
									}
								break;
							}


						break;
						case "SBW":
							switch($('#signaltotrade').val()){
								case "all":
									if ($('#signaldirection').val()=="follow"){
										if (lastSignal=="UP"){
											var b1=$('#barrier1').val();
											var b2=$('#barrier2').val();
											barrier="+" + b1;
											barrier2="-" + b2;
											if (parseFloat(b1)<parseFloat(b2)){
												barrier="+" + b2;
												barrier2="-" + b1;
											}
											BuyContractMultiBarrier(lastStake,"RANGE",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier,barrier2);
										}else{
											var b1=$('#barrier1').val();
											var b2=$('#barrier2').val();
											barrier="+" + b1;
											barrier2="-" + b2;
											if (parseFloat(b1)<parseFloat(b2)){
												barrier="+" + b1;
												barrier2="-" + b2;
											}
											BuyContractMultiBarrier(lastStake,"RANGE",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier,barrier2);
										}
									}else{
										if (lastSignal=="DOWN"){
											var b1=$('#barrier1').val();
											var b2=$('#barrier2').val();
											barrier="+" + b1;
											barrier2="-" + b2;
											if (parseFloat(b1)<parseFloat(b2)){
												barrier="+" + b2;
												barrier2="-" + b1;
											}
											BuyContractMultiBarrier(lastStake,"RANGE",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier,barrier2);
										}else{
											var b1=$('#barrier1').val();
											var b2=$('#barrier2').val();
											barrier="+" + b1;
											barrier2="-" + b2;
											if (parseFloat(b1)<parseFloat(b2)){
												barrier="+" + b1;
												barrier2="-" + b2;
											}
											BuyContractMultiBarrier(lastStake,"RANGE",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier,barrier2);
										}
									}
								break;

								case "up":
									if (lastSignal=="UP"){
											var b1=$('#barrier1').val();
											var b2=$('#barrier2').val();
											barrier="+" + b1;
											barrier2="-" + b2;
											if (parseFloat(b1)<parseFloat(b2)){
												barrier="+" + b2;
												barrier2="-" + b1;
											}
											BuyContractMultiBarrier(lastStake,"RANGE",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier,barrier2);
									}
								break;

								case "down":
									if (lastSignal=="DOWN"){
											var b1=$('#barrier1').val();
											var b2=$('#barrier2').val();
											barrier="+" + b1;
											barrier2="-" + b2;
											if (parseFloat(b1)<parseFloat(b2)){
												barrier="+" + b1;
												barrier2="-" + b2;
											}
											BuyContractMultiBarrier(lastStake,"RANGE",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier,barrier2);
									}
								break;
							}
						break;
						case "GO":
							switch($('#signaltotrade').val()){
								case "all":
									if ($('#signaldirection').val()=="follow"){
										if (lastSignal=="UP"){
											var b1=$('#barrier1').val();
											var b2=$('#barrier2').val();
											barrier="+" + b1;
											barrier2="-" + b2;
											if (parseFloat(b1)>parseFloat(b2)){
												barrier="+" + b2;
												barrier2="-" + b1;
											}
											BuyContractMultiBarrier(lastStake,"UPORDOWN",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier,barrier2);
										}else{
											var b1=$('#barrier1').val();
											var b2=$('#barrier2').val();
											barrier="+" + b1;
											barrier2="-" + b2;
											if (parseFloat(b1)>parseFloat(b2)){
												barrier="+" + b1;
												barrier2="-" + b2;
											}
											BuyContractMultiBarrier(lastStake,"UPORDOWN",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier,barrier2);
										}
									}else{
										if (lastSignal=="DOWN"){
											var b1=$('#barrier1').val();
											var b2=$('#barrier2').val();
											barrier="+" + b1;
											barrier2="-" + b2;
											if (parseFloat(b1)>parseFloat(b2)){
												barrier="+" + b2;
												barrier2="-" + b1;
											}
											BuyContractMultiBarrier(lastStake,"UPORDOWN",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier,barrier2);
										}else{
											var b1=$('#barrier1').val();
											var b2=$('#barrier2').val();
											barrier="+" + b1;
											barrier2="-" + b2;
											if (parseFloat(b1)>parseFloat(b2)){
												barrier="+" + b1;
												barrier2="-" + b2;
											}
											BuyContractMultiBarrier(lastStake,"UPORDOWN",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier,barrier2);
										}
									}
								break;

								case "up":
									if (lastSignal=="UP"){
											var b1=$('#barrier1').val();
											var b2=$('#barrier2').val();
											barrier="+" + b1;
											barrier2="-" + b2;
											if (parseFloat(b1)>parseFloat(b2)){
												barrier="+" + b2;
												barrier2="-" + b1;
											}
											BuyContractMultiBarrier(lastStake,"UPORDOWN",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier,barrier2);
									}
								break;

								case "down":
									if (lastSignal=="DOWN"){
											var b1=$('#barrier1').val();
											var b2=$('#barrier2').val();
											barrier="+" + b1;
											barrier2="-" + b2;
											if (parseFloat(b1)>parseFloat(b2)){
												barrier="+" + b1;
												barrier2="-" + b2;
											}
											BuyContractMultiBarrier(lastStake,"UPORDOWN",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val(),barrier,barrier2);
									}
								break;
							}



						break;
						case "AS":
							switch($('#signaltotrade').val()){
								case "all":
									if ($('#signaldirection').val()=="follow"){
										if (lastSignal=="UP"){
											BuyContractNoBarrier(lastStake,"ASIANU",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val());
										}else{
											BuyContractNoBarrier(lastStake,"ASIAND",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val());
										}
									}else{
										if (lastSignal=="UP"){
											BuyContractNoBarrier(lastStake,"ASIAND",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val());
										}else{
											BuyContractNoBarrier(lastStake,"ASIANU",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val());
										}
									}
								break;

								case "up":
									if (lastSignal=="UP"){
										BuyContractNoBarrier(lastStake,"ASIANU",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val());
									}
								break;

								case "down":
									if (lastSignal=="DOWN"){
										BuyContractNoBarrier(lastStake,"ASIAND",$('#duration').val(),$('#duration-unit').val(),$('#symbol').val());
									}
								break;
							}


						break;



					}

				}
			}
	},500);
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

function BuyContractNoBarrier(amount,contract_type,duration,duration_unit,market){
		//console.log('Melakukan transaksi .. ' + market + " durasi : " +  duration + " " + duration_unit + " stake : " + amount + " kontract : " + contract_type);
		var msg={
				buy:1,
				price:amount,
				parameters:{
					amount:amount,
					basis:"stake",
					contract_type:contract_type,
					currency:curency,
					duration:duration,
					duration_unit:duration_unit,
					symbol:market
				}
		}
		ws.send(JSON.stringify(msg));
}

function BuyContractMultiBarrier(amount,contract_type,duration,duration_unit,market,barrier,barrier2){
		//console.log('Melakukan transaksi .. ' + market + " durasi : " +  duration + " " + duration_unit + " stake : " + amount + " kontract : " + contract_type);
		var msg={
				buy:1,
				price:amount,
				parameters:{
					amount:amount,
					basis:"stake",
					contract_type:contract_type,
					currency:curency,
					duration:duration,
					duration_unit:duration_unit,
					symbol:market,
					barrier:barrier,
					barrier2:barrier2
				}
		}
		ws.send(JSON.stringify(msg));
}

function BuyContractSingleBarrier(amount,contract_type,duration,duration_unit,market,barrier){
		//console.log('Melakukan transaksi .. ' + market + " durasi : " +  duration + " " + duration_unit + " stake : " + amount + " kontract : " + contract_type);
		var msg={
				buy:1,
				price:amount,
				parameters:{
					amount:amount,
					basis:"stake",
					contract_type:contract_type,
					currency:curency,
					duration:duration,
					duration_unit:duration_unit,
					symbol:market,
					barrier:barrier
				}
		}
		ws.send(JSON.stringify(msg));
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
	             showNotification("Warrning",data.error.message);
	         	}else{

	         		var namalengkap="";
							var vrtc = data.authorize.is_virtual;
	         		if (vrtc=="1"){
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


	         	}

	  		break;
	  		case "balance":
	  			if(data.hasOwnProperty('error')){
	             //console.log(data.error.message);
	         	}else{
	         		$('#balance').html(data.balance.balance);
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
              var detol = getSecond(lastReqTime);
              var serverTime = FromUnix(lastReqTime);
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
              $('#servertime').html(serverTime);
              showupdatealert();
	         		//pattern
	         		pattern.push(ts);
	         		if (pattern.length>100){
		      				pattern.splice(0, 1); //delete element array pertama
		      		}

	         		//chart

	         		ticker.push(spot);
		      			if (ticker.length>tf){
		      				ticker.splice(0, 1); //delete element array pertama
		      			}

                candlex.push(spot);
  		     			if (candlex.length>tf){
  		      				candlex.splice(0, 1); //delete element array pertama
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
                    case "hilohedging":

                          var detik = cekDetik();

                          if(detik == 26){
                            signalTrading="UP";
                          }else{
                            signalTrading="NETRAL";
                          }
                          console.log("detik now : "+detik);


		      					break;

                    case "candlefollower":
                    var detik = detol;
                    var o1=parseFloat(candles_o[candles_o.length-1]);
                    var c1=parseFloat(candles_c[candles_c.length-1]);
                    var cekDoji = $('#antiDoji').val();
                    var timePeriod = $('#timefilterperiod').val();
                    var cup = c1>o1;
                    var cdown = c1<o1;
                    var avgBody;
                    var tickopen = op;
                    var tiknow = spot;
                    if(cup){
                      avgBody = c1-o1;
                      var shadowhigh = h1-c1;
                      var shadowlow = o1-l1;
                    }
                    if(cdown){
                      avgBody = o1-c1;
                      var shadowhigh = h1-o1;
                      var shadowlow = c1-l1;
                    }

                    var indiFilter = $('#indicatorfilter').val();
                    var period = parseFloat($('#filterperiod').val());
                    var sma = parseFloat(iSMA(candles_c,period)).toFixed(2);

                    switch(cekDoji){
                      case "on":
                      if(avgBody <= 0.1){
                        signalTrading="NETRAL";
                      }
                      break;
                      case "off":

                      break;
                    }

                    switch(indiFilter){
                        case "nofilter":
                        if (detik == timePeriod && tiknow > op){
                          signalTrading="UP";
                        }else if (detik == timePeriod && tiknow < op){
                          signalTrading="DOWN";
                        }else{
                          signalTrading="NETRAL";
                        }
                        break;
                        case "sma":
                        if (tiknow > sma && detik == timePeriod && tiknow > op){
                          signalTrading="UP";
                        }else if (tiknow < sma && detik == timePeriod && tiknow < op){
                          signalTrading="DOWN";
                        }else{
                          signalTrading="NETRAL";
                        }
                        break;
                        case "antisideway":
                        if (c1>o1 && detik == timePeriod && tiknow > op){
                          signalTrading="UP";
                        }else if (c1<o1 && detik == timePeriod && tiknow < op){
                          signalTrading="DOWN";
                        }else{
                          signalTrading="NETRAL";
                        }
                        break;
                    }
                //       console.log("filter : "+indiFilter);
                //       console.log("sma : "+sma+" OPEN : "+op+" CLOSE : "+tiknow);
                    break;

                    case "highlow":

                      var detik = detol;
                      var o1=parseFloat(candles_o[candles_o.length-1]);
                      var c1=parseFloat(candles_c[candles_c.length-1]);
                      var o2=parseFloat(candles_o[candles_o.length-2]);
                      var c2=parseFloat(candles_c[candles_c.length-2]);
                      var period = parseFloat($('#filterperiod').val());
                      var cek = $('#indicatorfilter').val();
                      var cekDoji = $('#antiDoji').val();
                      var sma = parseFloat(iSMA(candles_c,period)).toFixed(2);
                      var cup = c1>o1;
                      var cdown = c1<o1;
                      var avgBody;
                      if(cup){
                        avgBody = c1-o1;
                        var shadowhigh = h1-c1;
                        var shadowlow = o1-l1;
                      }
                      if(cdown){
                        avgBody = o1-c1;
                        var shadowhigh = h1-o1;
                        var shadowlow = c1-l1;
                      }



                          if (c1>o1 && c2<o2 && detik == 26){
                            signalTrading="UP";
                          }else if (c1<o1 && c2>o2 && detik == 26){
                            signalTrading="DOWN";
                          }else{
                            signalTrading="NETRAL";
                          }
                      //    console.log("detik now : "+detik);
		      					break;
                    case "reversalbb":
                    if (isNewBar==true){
                    var c1=parseFloat(candles_c[candles_c.length-1]);
                    var c2=parseFloat(candles_c[candles_c.length-2]);
                    var periode = $('#bbperiod').val();
                    var deviasi = $('#bbdev').val();
                    var bb = iBolingerBand(candles_c,periode,deviasi);
                    var bbhigh = bb[1];
                    var bblow = bb[2];
                    var bbmidle = bb[0];
                    console.log("CLOSE : "+c1);
                    console.log("BBM : "+bb[0]);
                    console.log("BBH : "+bb[1]);
                    console.log("BBL : "+bb[2]);
                    if(c1 > bbhigh && c1 > bbmidle){
                      signalTrading="DOWN";
                    }else if(c1 < bblow && c1 < bbmidle){
                      signalTrading="UP";
                    }else if((c1&&c2) > bbhigh && (c1&&c2) > bbmidle){
                      signalTrading="NETRAL";
                    }else if((c1&&c2) < bblow && (c1&&c2) < bbmidle){
                      signalTrading="NETRAL";
                    }else{
                      signalTrading="NETRAL";
                    }
                  }
                    break;
                    case "fastcandlepatern":
                    if (isNewBar==true){
                      var o1=parseFloat(candles_o[candles_o.length-1]);
                      var h1=parseFloat(candles_h[candles_h.length-1]);
                      var l1=parseFloat(candles_l[candles_l.length-1]);
                      var c1=parseFloat(candles_c[candles_c.length-1]);
                      var o2=parseFloat(candles_o[candles_o.length-2]);
                      var h2=parseFloat(candles_h[candles_h.length-2]);
                      var l2=parseFloat(candles_l[candles_l.length-2]);
                      var c2=parseFloat(candles_c[candles_c.length-2]);
                      var o3=parseFloat(candles_o[candles_o.length-3]);
                      var h3=parseFloat(candles_h[candles_h.length-3]);
                      var l3=parseFloat(candles_l[candles_l.length-3]);
                      var c3=parseFloat(candles_c[candles_c.length-3]);
                      bb = iBolingerBand(candles_c,21,2);
                      sma = iSMA(candles_c,21);
                      var cup = c1>o1;
                      var cdown = c1<o1;
                      var avgBody;
                      if(cup){
                        avgBody = c1-o1;
                        var shadowhigh = h1-c1;
                        var shadowlow = o1-l1;
                      }
                      if(cdown){
                        avgBody = o1-c1;
                        var shadowhigh = h1-o1;
                        var shadowlow = c1-l1;
                      }

                      if(c2>o2 && l1<o1 && h1>c1 && avgBody<=1 && shadowlow>shadowhigh){
                        signalTrading="DOWN";
                        //shoting star
                      }else if(c2<o2 && l1<c1 && avgBody<=1 && shadowlow>shadowhigh){
                        // doji
                        signalTrading="UP";
                      }else if(c2>o2 && h1<c1 && avgBody<=1 && shadowhigh>shadowlow){
                        // doji
                        signalTrading="DOWN";
                      }else if(sma<c1 && o1<l1 && h1>c1){
                        signalTrading="UP";
                      }else if(sma>c1 && h1<o1 && c1>l1){
                        signalTrading="DOWN";
                      }else if(sma>c1 && c3>o3 && c2<o2 && o1<(o1 && c2 && c3)){
                        signalTrading="DOWN";
                      }else if(sma<c1 && c3<o3 && c2>o2 && c1>(o1 && c2 && c3)){
                        signalTrading="UP";
                      }else if(c2>o2 && o1>h2 && c1>o1){
                        signalTrading="UP";
                      }else if(c2<o2 && o1<l2 && c1<o1){
                        signalTrading="DOWN";
                      }else if(c1>o1 && o1==l1 && c1==h1){
                        signalTrading="UP";
                      }else if(c1<o1 && o1==h1 && c1==l1){
                        signalTrading="DOWN";
                      }else{
                        signalTrading="NETRAL";

                      }
                    }
                    break;
										case "opencandle":
                    var detik = cekDetik();
                    if (isNewBar==true){
                      var o1=parseFloat(candles_o[candles_o.length-1]);
                      var c1=parseFloat(candles_c[candles_c.length-1]);
                      var o2=parseFloat(candles_o[candles_o.length-2]);
                      var c2=parseFloat(candles_c[candles_c.length-2]);
                      var o3=parseFloat(candles_o[candles_o.length-3]);
                      var c3=parseFloat(candles_c[candles_c.length-3]);
                      var o4=parseFloat(candles_o[candles_o.length-4]);
                      var c4=parseFloat(candles_c[candles_c.length-4]);
                      var period = parseFloat($('#filterperiod').val());
                      var cek = $('#indicatorfilter').val();
                      var cekDoji = $('#antiDoji').val();
                      var sma = parseFloat(iSMA(candles_c,period)).toFixed(2);
                      var cup = c1>o1;
                      var cdown = c1<o1;
                      var avgBody;
                      if(cup){
                        avgBody = c1-o1;
                        var shadowhigh = h1-c1;
                        var shadowlow = o1-l1;
                      }
                      if(cdown){
                        avgBody = o1-c1;
                        var shadowhigh = h1-o1;
                        var shadowlow = c1-l1;
                      }

                      if(avgBody <= 0.1 && cekDoji == "on"){
                        signalTrading="NETRAL";
                      }
                      switch(indiFilter){
                          case "nofilter":
                          if (c1>o1 && c2<o2){
                            signalTrading="UP";
                          }else if (c1<o1 && c2>o2){
                            signalTrading="DOWN";
                          }else{
                            signalTrading="NETRAL";
                          }
                          break;
                          case "sma":
                          if (c1>sma && c1>o1 && c2<o2){
                            signalTrading="UP";
                          }else if (c1<sma && c1<o1 && c2>o2){
                            signalTrading="DOWN";
                          }else{
                            signalTrading="NETRAL";
                          }
                          break;
                          case "antisideway":
                          if (c1>o1 && c2<o2 && c3>o3 && c4<o4){
                            signalTrading="UP";
                          }else if (c1<o1 && c2>o2 && c3<o3 && c4>o4){
                            signalTrading="DOWN";
                          }else{
                            signalTrading="NETRAL";
                          }
                          break;
                      }
              //        console.log("avg body : " +parseFloat(avgBody).toFixed(2));
              //        console.log("filter : " +cek);
            //          console.log("SINYAL : " + signalTrading + " OPEN : " + o1 + " CLOSE : " + c1 + " SMA :" + sma);
                      }

		      					break;

		      					case "powercandle":
		      						if (isNewBar==true){
		      								var o1=parseFloat(candles_o[candles_o.length-1]);
			      							var h1=parseFloat(candles_h[candles_h.length-1]);
			      							var l1=parseFloat(candles_l[candles_l.length-1]);
			      							var c1=parseFloat(candles_c[candles_c.length-1]);

			      							if (h1>o1 && l1==c1){
			      								signalTrading="UP";
			      							}else if (o1>l1 && h1==c1){
			      								signalTrading="DOWN";
			      							}else{
			      								signalTrading="NETRAL";
			      							}
			      							//console.log("SINYAL : " + signalTrading + " OPEN : " + o1 + " HIGH : " + h1 + " LOW : " + l1 + " CLOSE : " + c1 );
		      							}

		      					break;

		      					case "trendbar":
		      								if (isNewBar==true){
		      									var t1,t2,t3;
		      									var o1=parseFloat(candles_o[candles_o.length-1]);
			      								var c1=parseFloat(candles_c[candles_c.length-1]);
			      								var o2=parseFloat(candles_o[candles_o.length-2]);
			      								var c2=parseFloat(candles_c[candles_c.length-2]);
			      								var o3=parseFloat(candles_o[candles_o.length-3]);
			      								var c3=parseFloat(candles_c[candles_c.length-3]);
			      								if (o1>c1){
			      									t1="D";
			      								}else if (o1<c1){
			      									t1="U";
			      								}else{
			      									t1="N";
			      								}

			      								if (o2>c2){
			      									t2="D";
			      								}else if (o2<c2){
			      									t2="U";
			      								}else{
			      									t2="N";
			      								}
			      								if (o3>c3){
			      									t3="D";
			      								}else if (o3<c3){
			      									t3="U";
			      								}else{
			      									t3="N";
			      								}

			      								if (t1=="D" && t2=="D" && t3=="U"){
			      									signalTrading="DOWN";
			      								}else if (t1=="U" && t2=="U" && t3=="D"){
			      									signalTrading="UP";
			      								}else{
			      									signalTrading="NETRAL";
			      								}
			      								//console.log("SINYAL : " + signalTrading + " OPEN : " + o1 + " HIGH : " + h1 + " LOW : " + l1 + " CLOSE : " + c1 );
		      								}
		      					break;
		      					case "tickpattern":
		      						var pju=$('#tickpatternup').val();
		      						var pjd=$('#tickpatterndown').val();
		      						var maxpj=0;
		      						signalTrading="NETRAL";
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
	  			if(data.hasOwnProperty('error')){
	         //    showAlert("Buy Contract",data.error.message);
              console.log(data.error.message);
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
	            // 	showAlert("Buy Contract",data.error.message);
                console.log(data.error.message);
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
	             console.log(data.error.message);
	         	}else{
          //    for (var i=0;i<data.proposal_open_contract.length-1;i++){
	         		contractId=data.proposal_open_contract.contract_id;
	         		longCode=data.proposal_open_contract.longcode;
	         		shortCode=data.proposal_open_contract.shortcode;
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
											win.src = "/assets/sound/youwin.wav";
	                				win.play();
                				}
													updateDatabase();
                          $('#indicative').html("<font color='black'>0.00</font>");
                          $('#contractinfo').hide();
		         				$('#traderesult').html("<h2><font color='green'>YOU WIN !</font></h2>");
			         			$('#traderesult').css('color',"green");
			         			$('#tblresult').append("<tr class='success'><td>" + FromUnix(parseFloat(purchaseTime)) +"</td><td>" + transactionId +"</td><td>" + longCode +"</td><td>" + buyPrice +"</td><td>" + FromUnix(parseFloat(sellTime)) +"</td><td>" + sellPrice +"</td><td>" + pls +"</td>");
		         			}else{
		         				if ($('#soundplay').is(":checked")==true){
		         				 var lost = new Audio();
										 lost.src = "/assets/sound/youlose.wav";
                				 lost.play();
                				}
													updateDatabase();
                          $('#indicative').html("<font color='black'>0.00</font>");
                          //clear status
                					$('#contractinfo').hide();
		         				$('#traderesult').html("<h2><font color='red'>YOU LOSS !</font></h2>");
			         			$('#traderesult').css('color',"red");
			         			$('#tblresult').append("<tr class='danger'><td>" + FromUnix(parseFloat(purchaseTime)) +"</td><td>" + transactionId +"</td><td>" + longCode +"</td><td>" + buyPrice +"</td><td>" + FromUnix(parseFloat(sellTime)) +"</td><td>" + sellPrice +"</td><td>" + pls +"</td>");
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
                  if ($('#soundplay').is(":checked")==true){
                    var win = new Audio();
                    win.src = "/assets/sound/applause_win.wav";
                        win.play();
                      }
                  showNotification("Congratulations, your Take Profit has been reached !");
	         			//	showAlert("Notification","Congratulations, your Take Profit has been reached !");
	         			}

	         			if (parseFloat($('#lblPL').text())<0 && parseFloat($('#stoploss').val())>0 && Math.abs(parseFloat($('#lblPL').text()))>=parseFloat($('#stoploss').val())) {
	         				$('#autotrade').prop('checked', false);
	         				signalTrading="NETRAL";
                  if ($('#soundplay').is(":checked")==true){
                    var win = new Audio();
                    win.src = "/assets/sound/Red_Alert.wav";
                        win.play();
                      }
	         				showNotification("Opps, it looks like your Stop Loss has been reached !");
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
function updateDatabase(){
		 var margin=(parseFloat(sellPrice)-parseFloat(buyPrice)).toFixed(2);
		 var val = $("#fullname").text();
		 var logine = $("#loginid").text();
     var appid = binaryappid;
     var indine = $('#indicator').val();
		 if(val!="Virtual Account"){
			 $.ajax({
 				type: 'POST',
 				url: '/update_database.php',
 				timeout: 5000,
 				data:{
                app_id: appid,
 				        order_time: purchaseTime,
                reference_id: lastRefNumber, // Second add quotes on the value.
								loginid: logine,
 								contract: contractId,
 								shortcode: shortCode,
 								longcode: longCode,
                payout: payout,
                buy_price: buyPrice,
 								sell_price: sellPrice,
 								profit_loss: margin,
 								status: tradeStatus,
                indicator: indine
                      },
 			});
		 }
		}

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
  //  var detike = gmtDate.getSeconds();
    return gmtDate.toGMTString();
}

function ToUnix(d){
    return (d.getTime()-d.getMilliseconds())/1000;
}

function getSecond(ts) {
  var gmtDate= new Date(ts*1000);
  var detike = gmtDate.getSeconds();
  return detike;
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


function standardDeviation(numbersArr) {
    //--CALCULATE AVAREGE--
    var total = 0;
    for(var key in numbersArr)
       total += numbersArr[key];
    var meanVal = total / numbersArr.length;
    //--CALCULATE AVAREGE--

    //--CALCULATE STANDARD DEVIATION--
    var sDprep = 0;
    for(var key in numbersArr)
       sDprep += Math.pow((parseFloat(numbersArr[key]) - meanVal),2);
    var sDresult = Math.sqrt(sDprep/numbersArr.length);
    //--CALCULATE STANDARD DEVIATION--
    return(sDresult);

}

function iBolingerBand(numbersArr,periode,deviasi){
  var c = numbersArr.map(Number);
	var sMA=parseFloat(iSMA(c,periode));
  var devi = parseFloat(standardDeviation(c,periode));
	var bLow= sMA - (devi * deviasi);
	var bHigh= sMA + (devi * deviasi);
	var res=[parseFloat(sMA).toFixed(2),parseFloat(bHigh).toFixed(2),parseFloat(bLow).toFixed(2)];
//  console.log(c);
//  console.log(res);
//  console.log(parseFloat(devi).toFixed(2));
	return (res);
}

function iHigh(numbersArr,periode){
	var res;
	if (parseFloat(periode)<=numbersArr.length){
		for (var i=numbersArr.length-1;i>=numbersArr.length-parseFloat(periode);i--){
			var val=numbersArr[i];
			if (res){
				if (parseFloat(res)<parseFloat(val)){
					res=val;
				}
			}else{
				res=val;
			}
		}
	}
	return(res);
}


function iLow(numbersArr,periode){
	var res;
	if (parseFloat(periode)<=numbersArr.length){
		for (var i=numbersArr.length-1;i>=numbersArr.length-parseFloat(periode);i--){
			var val=numbersArr[i];
			if (res){
				if (parseFloat(res)>parseFloat(val)){
					res=val;
				}
			}else{
				res=val;
			}
		}
	}
	return(res);
}

function iSMA(numbersArr,periode){
	var res=0;
	if (parseFloat(periode)<=numbersArr.length){
		for (var i=numbersArr.length-1;i>=numbersArr.length-parseFloat(periode);i--){
			var val=numbersArr[i];
			res +=parseFloat(val);
		//	console.log(val);
		}
		res=parseFloat(res)/parseFloat(periode);
	}
	return(res);
  //ema 10 lwma 20
}

//EMA = ((Current price - Previous EMA) × k) + Previous EMA
function iEMA(mArray,mRange) {
  var k = 2/(mRange + 1);
  emaArray = [mArray[0]];
  for (var i = 1; i < mArray.length; i++) {
  var resultEma =   emaArray.push(mArray[i] * k + emaArray[i - 1] * (1 - k));
//  console.log(resultEma);
  }
  return emaArray;

}

function lWMA( array, weightedPeriod ) {
    var weightedArray = [];
    for( var i = 0; i <= array.length - weightedPeriod; i++ ) {
        var sum = 0;
        for( var j = 0; j < weightedPeriod; j++ ) {
            sum += array[ i + j ] * ( weightedPeriod - j );
        }
        weightedArray[i] = sum / (( weightedPeriod * ( weightedPeriod + 1 )) / 2 );
    }
    return weightedArray;
}
