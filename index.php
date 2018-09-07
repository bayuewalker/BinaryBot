<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Binary FastBot</title>
<meta name="Description" content="Robot trading binary gratis dengan fitur terlengkap dan profitable ">
<meta name="Keywords" content="robot trading binary gratis, robot trading gratis, bot binary gratis, bot binary profit">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <link rel="stylesheet" href="./css/style.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script src="./js/spark.js"></script>
  
</head>
<Body>

<div class="container-fluid">

  <div class="row" id="utama" style="display: none">
  	<div class="col-md-12">
		  <ul class="nav nav-tabs pills navbar-fixed-top" style="background-color: #222c61; color:white; border-color:orange; border-width:5px">
		    <li class="active"><a data-toggle="tab" href="#home">Account</a></li>
		    <li><a data-toggle="tab" href="#general-settings">General Settings</a></li>
		    <li><a data-toggle="tab" href="#tradepanel">Trade Panel</a></li>
		    <li><a data-toggle="tab" href="#profittable">Profit Table</a></li>
		    <li><a data-toggle="tab" href="#" id="logout">Logout</a></li>
		  
		  </ul>
		  <div class="clearfix"></div><br><br>
		  <div class="tab-content">
		    <div id="home" class="tab-pane fade in active">

		    	
		      <h3>Account Info</h3><hr>
		      <fieldset style="padding: 10px; border:1px solid #f0f0f0; border-radius:10px">
		      <div class="row mt2">
		      		<div class="col-sm-2"><b>Nama Lengkap</b></div>
		      		<div class="col-sm-10"><span id="fullname"></span></div>
		      </div>
		      <div class="row mt2">
		      		<div class="col-sm-2"><b>Email Address</b></div>
		      		<div class="col-sm-10"><span id="email"></span></div>
		      </div>
		      <div class="row mt2">
		      		<div class="col-sm-2"><b>Login Id</b></div>
		      		<div class="col-sm-10"><span id="loginid"></span></div>
		      </div>
		      <div class="row mt2">
		      		<div class="col-sm-2"><b>Account Balance</b></div>
		      		<div class="col-sm-10"><span id="balance"></span></div>
		      </div>
		      <div class="row mt2">
		      		<div class="col-sm-2"><b>Account Currency</b></div>
		      		<div class="col-sm-10"><span id="curency"></span></div>
		      </div>

		       <div class="row mt2">
		      		<div class="col-sm-2"><b>Api Token Scope</b></div>
		      		<div class="col-sm-10"><span id="scope"></span></div>
		      </div>

		      </fieldset><br><br>


		     

		    </div>
		    <div id="general-settings" class="tab-pane fade">
		      <h3>General Settings</h3><hr>
		       <div class="row mt2" style="margin-bottom: 15px">
		      		<div class="col-md-2" style="text-align: left"><strong>Contract</strong></div>
		      		<div class="col-md-10">
			      		<select id="contract" class="form-control">
			      				<option value="RF">Rise/Fall</option>
			      				<option value="HLL">Higher/Lower Low Payout</option>
			      				<option value="HLH">Higher/Lower High Payout</option>
			      				<option value="TCH">Touch</option>
			      				<option value="DNT">Does Not Touch</option>
			      				<option value="EBW">Ends Between</option>
			      				<option value="EOS">Ends Outside</option>
			      				<option value="SBW">Stays Between</option>
			      				<option value="GO">Goes Outside</option>
			      				<option value="AS">Asian</option>
			      				

			      		</select>
		      		</div>
		      </div>
		      <div class="row mt2" style="margin-bottom: 15px">
		      		<div class="col-md-2" style="text-align: left"><strong>Market</strong></div>
		      		<div class="col-md-2">
			      		<select id="symbol" class="form-control">
			      				<option value="R_100">Volatile 100 Index</option>
			      				<option value="R_75">Volatile 75 Index</option>
			      		</select>
		      		</div>
		      		<div class="col-md-2" style="text-align: left"><strong>Indicators</strong></div>
		      		<div class="col-md-2">
			      		<select id="indicator" class="form-control">
			      				<option value="powercandle">Fast Candle</option>
			      				<option value="trendbar">FastTrend Bar</option>
			      				<option value="tickpattern">Tick Pattern</option>
			      		</select>
			      		
			      		<div class="row" id="parTickPattern" style="display: none">
			      			<div class="col-md-12">
			      				<div class="row" id="tickpattern1">
					      			<div class="col-md-12">Pattern UP<br>
					      				<input type="text" value="DDDDDDDU" id="tickpatternup" class="form-control">
					      			</div>
					      		</div>
					      		<div class="row" id="tickpattern2">
					      			
					      			<div class="col-md-12">Patterrn DOWN<br>
					      				<input type="text" value="UUUUUUUD" id="tickpatterndown" class="form-control">
					      			</div>
					      		</div>
			      			</div>
			      		</div>
			      		
		      		</div>
		      		<div class="col-md-2" style="text-align: left"><strong>Time Frame</strong></div>
		      		<div class="col-md-2">
			      		<select class="form-control " id="timeframe">
									  <option value="60" selected>1 Minutes</option>
									  <option value="120">2 Minutes</option>
									  <option value="180">3 Minutes</option>
									  <option value="300">5 Minutes</option>
									  <option value="900">15 Minutes</option>
									  <option value="1800">30 Minutes</option>
									  <option value="3600">1 Hours</option>
									  <option value="7200">2 Hours</option>
									  <option value="14400">4 Hours</option>
									  <option value="28800">8 Hours</option>
									  <option value="86400">1 Days</option>
									  
									</select>
		      		</div>
		      		
		      </div>
		     
		      <div class="row mt2" style="margin-bottom: 15px; display: none" id="barrier-set" >
		      		<div class="col-md-2" style="text-align: left"><strong>Barrier (+)</strong></div>
		      		<div class="col-md-4">
			      		<input type="text" value="1" id="barrier1" class="form-control">
		      		</div>
		      		<div class="col-md-2" style="text-align: left"><strong>Barrier (-)</strong></div>
		      		<div class="col-md-4">
			      		<input type="text" value="1" id="barrier2" class="form-control">
		      		</div>
		      </div>

		      <div class="row mt2" style="margin-bottom: 15px">
		      		<div class="col-md-2" style="text-align: left"><strong>Stake ($)</strong></div>
		      		<div class="col-md-2">
			      		<input type="text" id="stake" value="0.5" class="form-control">
		      		</div>
		      		<div class="col-md-2" style="text-align: left"><strong>Duration</strong></div>
		      		<div class="col-md-2">
			      		<input type="text" id="duration" value="1" class="form-control">
		      		</div>
		      		<div class="col-md-2" style="text-align: left"><strong>Duration Unit</strong></div>
		      		<div class="col-md-2">
			      		<select id="duration-unit" class="form-control">
			      				<option value="t">Ticks</option>
			      				<option value="s">Seconds</option>
			      				<option value="m" selected>Minutes</option>
			      				<option value="h">Hour</option>
			      				<option value="d">TDays</option>
			      		</select>
		      		</div>
		      </div>
		      <div class="row mt2" style="margin-bottom: 15px">
		      		<div class="col-md-2" style="text-align: left"><strong>Multiplier (%)</strong></div>
		      		<div class="col-md-2">
			      		<input type="text" id="multiplier" class="form-control" value='2.3'>
		      		</div>
		      		<div class="col-md-2" style="text-align: left"><strong>If False Signal</strong></div>
		      		<div class="col-md-2">
			      		<select id="falsesignal" class="form-control">
			      				<option value="stoptrade">Stop Trade</option>
			      				<option value="continue">Continue</option>
			      				<option value="newanalyze" selected>New Analyze</option>
			      		</select>
		      		</div>
		      		<div class="col-md-2" style="text-align: left"><strong>Signal Direction</strong></div>
		      		<div class="col-md-2">
			      		<select id="signaldirection" class="form-control">
			      				<option value="follow">Follow</option>
			      				<option value="reverse">Reverse</option>
			      				
			      		</select>
		      		</div>
		      </div>
		      <div class="row mt2" style="margin-bottom: 15px">
		      		
		      		<div class="col-md-2" style="text-align: left"><strong>Signal To Trade</strong></div>
		      		<div class="col-md-2">
			      		<select id="signaltotrade" class="form-control">
			      				<option value="all">All Signal</option>
			      				<option value="up">UP Only</option>
			      				<option value="down">DOWN Only</option>
			      				
			      		</select>
		      		</div>
		      		<div class="col-md-2" style="text-align: left"><strong>Auto Sell Profit (%)</strong></div>
		      		<div class="col-md-2">
			      		<input type="text" id="samprofit" value="100" class="form-control">
		      		</div>
		      		<div class="col-md-2" style="text-align: left"><strong>Auto Sell Loss (%)</strong></div>
		      		<div class="col-md-2">
			      		<input type="text" id="samloss" value="50" class="form-control">
		      		</div>
		      		
		      </div>

		      <div class="row mt2" style="margin-bottom: 15px">
		      		<div class="col-md-2" style="text-align: left"><strong>Max. Stake ($)</strong></div>
		      		<div class="col-md-2">
			      		<input type="text" id="maxstake" value="500" class="form-control">
		      		</div>
		      		<div class="col-md-2" style="text-align: left"><strong>Take Profit ($)</strong></div>
		      		<div class="col-md-2">
			      		<input type="text" id="takeprofit" value="100" class="form-control">
		      		</div>
		      		<div class="col-md-2" style="text-align: left"><strong>Stop Loss ($)</strong></div>
		      		<div class="col-md-2">
			      		<input type="text" id="stoploss" value="50" class="form-control">
		      		</div>
		      		
		      </div>

		      <div class="row mt2" style="margin-bottom: 15px">
		      		<div class="col-md-2" style="text-align: left"><strong>Auto Trade</strong></div>
		      		<div class="col-md-2">
			      		<label class="switch">
						  <input type="checkbox" id="autotrade">
						  <span class="slider"></span>
						</label>

		      		</div>	
		      		
		      		<div class="col-md-2" style="text-align: left"><strong>Play Sound</strong></div>
		      		<div class="col-md-2">
			      		<label class="switch">
						  <input type="checkbox" id="soundplay" checked>
						  <span class="slider"></span>
						</label>

		      		</div>			

		      </div>

		     

		      <br><br>
		    </div>
		    
		    <div id="tradepanel" class="tab-pane fade">
		    		<h3>Trade Panel</h3><hr>
		    		<div class="row" style="padding: 15px">
		    			<div class="col-md-9" style="padding: 25px">
		    				<div class="row" id="contractinfo" style="display: none; height:330px">
		    					<div class="col-md-12" style="padding: 10px; text-align: center">
		    						<div class="row">
		    							<div class="col-md-12" style="text-align: center">
		    									<b><span id="longcode">-</span></b><br><br>
		    									Your contract reference number is : <span id="refnumber">0</span><br><br><button class="btn btn-primary btn-lg" style="width:250px;padding: 2px" id="btnsam">SELL AT MARKET</button><br><br>

		    							</div>
		    						</div>
		    						<div class="row">
		    							<div class="col-md-2" style="text-align: center">
		    								<strong>Purchase Time</strong><br>
		    								<span id="purchasetime">0.0</span>
		    							</div>
		    							<div class="col-md-2" style="text-align: center">
		    								<strong>Entry Spot</strong><br>
		    								<span id="entryspot">0.0</span>
		    							</div>
		    							<div class="col-md-2" style="text-align: center">
		    								<strong>Buy Price</strong><br>
		    								<span id="buyprice">0.0</span>
		    							</div>
		    							<div class="col-md-2" style="text-align: center">
		    								<strong>Potential Payout</strong><br>
		    								<span id="payout">0.0</span>
		    							</div>
		    							<div class="col-md-2" style="text-align: center">
		    								<strong>Indicative Value</strong><br>
		    								<span id="indicative">0.0</span>
		    							</div>
		    							<div class="col-md-2" style="text-align: center">
		    								<strong>Profit/Loss</strong><br>
		    								<span id="profitloss">0.0</span>
		    							</div>
		    						</div>
		    						<br><br>
		    						<div class="row">
		    							<div class="col-md-12"><span id="traderesult"><h2>-</h2></span></div>
		    						</div>
		    					</div>
		    				</div>
		    			</div>
		    			<div class="col-md-3" style="text-align: right ; padding: 5px; ">
		    				<div class="row" style="border:0px solid #C0C0C0; margin-bottom: 30px">
		    					<div class="col-md-12">
		    						<div class="row" style="margin-bottom: 15px">
			    					<div class="col-md-12" style="text-align: center"><h2><span id="spot">0.0000</span></h2></div>
				    				</div>
				    				<div class="row" style="margin-bottom: 5px">
				    					<div class="col-md-12" style="text-align:center"><span id="chartline" class="dynamicsparkline"></span></div>
				    				</div>
				    				<div class="row" style="margin-bottom: 20px">
				    					<div class="col-md-12" style="text-align: center"><strong> Your Selected Market : <span id="symbolname">Volatile 100 Index </span></strong></div>
				    				</div>
				    				<div class="row" style="margin-bottom: 15px">
				    					<div class="col-md-6"><button class="btn btn-success btn-lg" style="width:100%;padding: 2px" id="btncall"><i class="glyphicon glyphicon-chevron-up"></i>  CALL</button></div>
				    					<div class="col-md-6"><button class="btn btn-danger btn-lg" style="width:100%;padding: 2px" id="btnput"><i class="glyphicon glyphicon-chevron-down"></i> PUT</button></div>
				    					
				    				</div>
		    					</div>
		    					
		    				</div>

		    				
		    				
		    				
		    				
		    				
		    				
		    			</div>
		    			<br>
		    			<br><br>
		    			
		    		</div>

		    </div>

		    <div id="profittable" class="tab-pane fade">
		      <div class="row" style="padding: 25px"><h3>Profit Table</h3><hr>
		      		<div class="row">
			  			<div class="col-md-12">
			  					<strong>Profit/Loss : <span id="lblPL">0.00</span> | <strong>Turn Over : <span id="lblTO">0.00</span></strong></strong>
			  				</div>
			  			</div>
		  			</div>
		  			<div class="row">
		  				<div class="col-md-12">
		  					<style type="text/css">

							    table {
							        table-layout: fixed;
							        word-wrap: break-word;
							    }

							        table th, table td {
							            overflow: hidden;
							        }

							        .hitam{

							        }

							</style>
		  					<table class="table table-bordered" id="tblresult">
						    <thead >
						      <tr class="warrning">
						        <th>Order Time</th>
						        <th>Ref. Id</th>
						        <th>Payout</th>
						        <th>Contract</th>
						        <th>Buy Price</th>
						        <th>Sell Time</th>
						        <th>Sell Price</th>
						        <th>Profit/Loss</th>
						      </tr>
						    </thead>
						    <tbody>
						    </tbody>
							</table>
		  					
		  				</div>
		  			</div>
		    </div>
		    
		  </div>
	</div>
</div>


	<div class="row" style=" display:nones; position: fixed;top: 50%;left: 50%; transform: translate(-50%, -50%);" id="splash">
		<center>
	    <img src="./img/logodot.png" width=200px><br>
	    <strong>API TOKEN</strong>
	    <br><input type="password" id="token" class="form-control form-control-lg" style="border: 1px solid #293052;border-radius: 4px; width:200px" value=''><br>
	    <button class="btn btn-primary btn-lg" style="width:200px;" id="btnconnect">Connect</button><br><a href="http://record.binary.com/_Ju_StYADzHdvxSquNI6PwaorP20xfnGq/1//?creative_id=2123" target="blank">Create&nbsp;Account</a> 
		<center>
	</div>




<!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header btn-primary">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title"><span id="confirmtitle"></span></h4>
        </div>
        <div class="modal-body">
          <p><span id="confirmbody"></span></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>

	<div class="row" style="background-color: #222c61; color:white; position: fixed; width:100%; bottom: 0; border-top-color: orange; border-top-width: 5px" >
		  <div class="col-md-12" style="padding: 5px; text-align: center">Copyright 2018 by Freebot. All Rights Reserved.
		  </div>
	</div>


</div>

<script type="text/javascript" src="./core.js">
 	</script> 
</Body>
</html>
