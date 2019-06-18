<?php
include "header.php";
?>

<!-- Row -->
				<div class="row" id="utama" style="display: none">

					<div class="col-lg-12 col-sm-12">
						<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
							<div class="panel panel-default card-view pa-0">
								<div class="panel-wrapper collapse in">
									<div class="panel-body pa-0">
										<div class="sm-data-box">
											<div class="container-fluid">
												<div class="row">
													<div class="col-xs-6 text-center pl-0 pr-0 data-wrap-left">
														<span class="txt-dark block counter"><span class="counter-anim" id="balance">0.00</span></span>
														<span class="capitalize-font block">Balance <span id="curency"></span></span>
													</div>
													<div class="col-xs-6 text-center  pl-0 pr-0 data-wrap-right">
														<i class="icon-globe data-right-rep-icon txt-danger"></i>
													</div>
												</div>
												<div class="progress-anim">
													<div class="progress">
														<div class="progress-bar progress-bar-info
														wow animated progress-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
							<div class="panel panel-default card-view pa-0">
								<div class="panel-wrapper collapse in">
									<div class="panel-body pa-0">
										<div class="sm-data-box">
											<div class="container-fluid">
												<div class="row">
													<div class="col-xs-6 text-center pl-0 pr-0 data-wrap-left">
														<span class="txt-dark block counter"><span class="counter-anim" id="lblPL">0.00</span></span>
														<span class="capitalize-font block">Profit / Loss</span>
													</div>
													<div class="col-xs-6 text-center  pl-0 pr-0 data-wrap-right">
														<i class="icon-target  data-right-rep-icon txt-danger"></i>
													</div>
												</div>
												<div class="progress-anim">
													<div class="progress">
														<div class="progress-bar progress-bar-warning
														wow animated progress-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
							<div class="panel panel-default card-view pa-0">
								<div class="panel-wrapper collapse in">
									<div class="panel-body pa-0">
										<div class="sm-data-box">
											<div class="container-fluid">
												<div class="row">
													<div class="col-xs-6 text-center pl-0 pr-0 data-wrap-left">
														<span class="txt-dark block counter"><span class="counter-anim" id="lblTO">0.00</span></span>
														<span class="capitalize-font block">Turn Over</span>
													</div>
													<div class="col-xs-6 text-center  pl-0 pr-0 data-wrap-right">
														<i class="icon-shuffle data-right-rep-icon txt-danger"></i>
													</div>
												</div>
												<div class="progress-anim">
													<div class="progress">
														<div class="progress-bar progress-bar-danger
														wow animated progress-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
							<div class="panel panel-default card-view pa-0">
								<div class="panel-wrapper collapse in">
									<div class="panel-body pa-0">
										<div class="sm-data-box">
											<div class="container-fluid">
												<div class="row">
													<div class="col-xs-6 text-center pl-0 pr-0 data-wrap-left">
														<span class="txt-dark block counter"><span class="counter-anim" id="indicative">0.00</span></span>
														<span class="capitalize-font block">Indicative</span>
													</div>
													<div class="col-xs-6 text-center  pl-0 pr-0 data-wrap-right">
														<i class="icon-chart data-right-rep-icon txt-danger"></i>
													</div>
												</div>
												<div class="progress-anim">
													<div class="progress">
														<div class="progress-bar progress-bar-primary
														wow animated progress-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
					<div class="alert alert-danger alert-dismissable" style="display: none" id="showNotifupdate">
											<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
											<i class="zmdi zmdi-check pr-15 pull-left"></i><p class="pull-left"><span id="updatealert">no text</span></p>
											<div class="clearfix"></div>
					</div>
					<div class="alert alert-info alert-dismissable" style="display: none" id="showNotiftext">
											<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
											<i class="zmdi zmdi-check pr-15 pull-left"></i><p class="pull-left"><span id="notificationtext"></span></p>
											<div class="clearfix"></div>
					</div>
						<div class="panel panel-default card-view">
							<div class="pull-right" id="servertime">0.00</div>
							<div class="panel-wrapper collapse in">
								<div class="panel-body">
									<div  class="pills-struct mt-40">
										<ul role="tablist" class="nav nav-pills" id="myTabs_6">
											<li class="active" role="presentation"><a aria-expanded="true"  data-toggle="tab" role="tab" id="home_tab_6" href="#home">Home</a></li>
											<li role="presentation" class=""><a  data-toggle="tab" id="profile_tab_6" role="tab" href="#general-settings" aria-expanded="false">Trade Setting</a></li>
											<li role="presentation" class=""><a  data-toggle="tab" id="profile_tab_6" role="tab" href="#tradepanel" aria-expanded="false">Trade Panel</a></li>
											<li role="presentation" class=""><a  data-toggle="tab" id="profile_tab_6" role="tab" href="#profittable" aria-expanded="false">Profit Table</a></li>
											<li role="presentation" class=""><a  data-toggle="tab" id="logout" role="tab" href="" aria-expanded="false">Reset</a></li>
											<li role="presentation" class=""><a  href="logout" aria-expanded="false">Logout</a></li>
										</ul>
										<div class="tab-content" id="myTabContent_6">
											<div  id="home" class="tab-pane fade active in" role="tabpanel">
												<div class="col-lg-12 col-xs-12">
						<div class="panel panel-default card-view  pa-0">
							<div class="panel-wrapper collapse in">
								<div class="panel-body  pa-0">
									<div class="profile-box">
										<div class="profile-info text-center mb-15">
											<h5 class="block mt-10 mb-5 weight-500 capitalize-font txt-dark"><span id="fullname"></h5>
											<h6 class="block capitalize-font pb-20"><span id="loginid"></h6>
										</div>
										<div class="social-info">
											<div class="row">
												<div class="col-md-6 col-xs-12 text-center">
													<span class="counts block head-font"><span id="email"></span></span>
													<span class="counts-text block">Email</span>
												</div>

												<div class="col-md-6 col-xs-12 text-center">
													<span class="counts block head-font"><span id="scope"></span></span>
													<span class="counts-text block">API Scope</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div id="general-settings" class="tab-pane fade" role="tabpanel"><hr>
					<div class="alert alert-success alert-dismissable" style="display: none" id="showNotif">
											<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
											<i class="zmdi zmdi-check pr-15 pull-left"></i><p class="pull-left"><span id="shownotiftext">no text</span></p>
											<div class="clearfix"></div>
					</div>
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
											<option value="HLHEDGING" disabled>HiLo Hedging</option>
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
                <div class="col-md-2" style="text-align: left"><strong>Market</strong></div>
                <div class="col-md-2">
                  <select id="symbol" class="form-control">
                      <option value="R_100">Volatile 100 Index</option>
                      <option value="R_75">Volatile 75 Index</option>
                  </select>
                </div>
                <div class="col-md-2" style="text-align: left"><strong><font color="red">Indicators</font></strong></div>
                <div class="col-md-2">
                  <select id="indicator" class="form-control">
											<option value="none" selected><font color="red">Select Indicator</font></option>
											<option value="opencandle">Fast Trade</option>
											<option value="fastcandlepatern" >Candle Combination</option>
											<option value="candlefollower">Candle Follower</option>
                      <option value="powercandle">Power Candle</option>
                      <option value="trendbar">Fast TrendLine</option>
                      <option value="tickpattern">Ticks Pattern</option>
											<option value="highlow" disabled>HighLow SNR</option>
											<option value="reversalbb" disabled>Reversal BB</option>
											<option value="hilohedging" disabled>Hedging HiLo</option>
											<option value="test" disabled>Test</option>
                  </select>

									<div class="row" id="timeFilter" style="display: none">
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-12"><font color="blue">Open Time in second</font><br>
                          <input type="text" value="26" id="timefilterperiod" class="form-control">
                        </div>
                      </div>

                    </div>
                  </div>

									<div class="row" id="indiFilter" style="display: none">
                    <div class="col-md-12">Filter<br>
											<select id="indicatorfilter" class="form-control">
													<option value="nofilter" selected>No Filter</option>
													<option value="sma" >SMA</option>
													<option value="antisideway" >Anti Sideway</option>
		                  </select>
                    </div>
                  </div>
									<div class="row" id="parFilter" style="display: none">
                    <div class="col-md-12">
                      <div class="row" id="period">
                        <div class="col-md-12">Period<br>
                          <input type="text" value="22" id="filterperiod" class="form-control">
                        </div>
                      </div>

                    </div>
                  </div>
									<div class="row" id="filterAntiDoji" style="display: none">
										<div class="col-md-12"><font color="orange">Doji Protection</font><br>
											<select id="antiDoji" class="form-control">
													<option value="on" selected>ON</option>
													<option value="off" >OFF</option>
											</select>
										</div>
									</div>
									<div class="row" id="filterAntiSideway" style="display: none">
										<div class="col-md-12"><font color="orange">Sideway Protection</font><br>
											<select id="antiSideway" class="form-control">
													<option value="on" selected>ON</option>
													<option value="off" >OFF</option>
											</select>
										</div>
									</div>
                  <div class="row" id="parTickPattern" style="display: none">
                    <div class="col-md-12">
                      <div class="row" id="tickpattern1">
                        <div class="col-md-12">Pattern UP<br>
                          <input type="text" value="UUUDU" id="tickpatternup" class="form-control">
                        </div>
                      </div>
                      <div class="row" id="tickpattern2">

                        <div class="col-md-12">Patterrn DOWN<br>
                          <input type="text" value="DDDUD" id="tickpatterndown" class="form-control">
                        </div>
                      </div>
                    </div>
                  </div>

									<div class="row" id="parBolinger" style="display: none">
                    <div class="col-md-12">
                      <div class="row" id="period">
                        <div class="col-md-12">Period<br>
                          <input type="text" value="20" id="bbperiod" class="form-control">
                        </div>
                      </div>
                      <div class="row" id="deviasi">
                        <div class="col-md-12">Deviation<br>
                          <input type="text" value="2" id="bbdev" class="form-control">
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



            <div class="row mt2" style="margin-bottom: 15px">
                <div class="col-md-2" style="text-align: left"><strong>Stake ($)</strong></div>
                <div class="col-md-2">
                  <input type="text" id="stake" value="0.5" class="form-control">
                </div>
                <div class="col-md-2" style="text-align: left"><strong>Duration</strong></div>
                <div class="col-md-2">
                  <input type="text" id="duration" value="58" class="form-control">
                </div>
                <div class="col-md-2" style="text-align: left"><strong>Duration Unit</strong></div>
                <div class="col-md-2">
                  <select id="duration-unit" class="form-control">
                      <option value="t">Ticks</option>
                      <option value="s" selected>Seconds</option>
                      <option value="m">Minutes</option>
                      <option value="h">Hour</option>
                      <option value="d">Days</option>
                  </select>
                </div>
            </div>
            <div class="row mt2" style="margin-bottom: 15px">
                <div class="col-md-2" style="text-align: left"><strong>Multiplier (X)</strong></div>
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
                      <option value="follow" selected>Follow</option>
                      <option value="reverse">Reverse</option>

                  </select>
                </div>
            </div>
            <div class="row mt2" style="margin-bottom: 15px">

                <div class="col-md-2" style="text-align: left"><strong>Signal To Trade</strong></div>
                <div class="col-md-2">
                  <select id="signaltotrade" class="form-control">
                      <option value="all" selected>All Signal</option>
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
                  <input type="text" id="samloss" value="100" class="form-control">
                </div>

            </div>

            <div class="row mt2" style="margin-bottom: 15px">
                <div class="col-md-2" style="text-align: left"><strong>Max. Stake ($)</strong></div>
                <div class="col-md-2">
                  <input type="text" id="maxstake" value="100" class="form-control">
                </div>
                <div class="col-md-2" style="text-align: left"><strong>Take Profit ($)</strong></div>
                <div class="col-md-2">
                  <input type="text" id="takeprofit" value="100" class="form-control">
                </div>
                <div class="col-md-2" style="text-align: left"><strong>Stop Loss ($)</strong></div>
                <div class="col-md-2">
                  <input type="text" id="stoploss" value="100" class="form-control">
                </div>

            </div>
						 <div class="row mt2" style="margin-bottom: 15px">
						<div class="col-md-2" style="text-align: left"><strong>If Max Stake Reached</strong></div>
						<div class="col-md-4">
							<select id="aftermarti" class="form-control">
									<option value="stopstake" selected>Stop Trade</option>
									<option value="resetstake" >Reset Stake</option>
							</select>
						</div>
</div>
            <div class="row mt2" style="margin-bottom: 15px">
                <div class="col-md-2 col-xs-3" style="text-align: left"><strong>Auto Trade</strong></div>
                <div class="col-md-2 col-xs-3">
                  <label class="switch">
                <input type="checkbox" id="autotrade">
                <span class="slider"></span>
              </label>

                </div>

                <div class="col-md-2 col-xs-3" style="text-align: left"><strong>Play Sound</strong></div>
                <div class="col-md-2 col-xs-3">
                  <label class="switch">
                <input type="checkbox" id="soundplay" checked >
                <span class="slider"></span>
                </label>
                </div>
            </div>

            <br><br>
				</div>
				<div id="tradepanel" class="tab-pane fade" role="tabpanel"><hr>
						<div class="row" style="padding: 15px">
							<div class="col-md-9" style="padding: 25px">
								<div class="row" id="contractinfo" style="display: none; height:330px">
									<div class="col-md-12" style="padding: 10px; text-align: center">
										<div class="row">
											<div class="col-md-12" style="text-align: center">
													<b><span id="longcode">-</span></b><br><br>
													Reference Number: <span id="refnumber">0</span><br><br><button class="btn btn-primary btn-lg" style="width:250px;padding: 2px" id="btnsam">SELL AT MARKET</button><br><br>
											</div>
										</div>
										<div class="row">
											<div class="col-md-4" style="text-align: center">
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
												<strong>Payout</strong><br>
												<span id="payout">0.0</span>
											</div>
										</div>
										<br><br>
										<div class="row">
											<div class="col-md-12"><span id="traderesult"><h2>-</h2></span></div>
										</div>
										<br>
									</div>
								</div>
							</div>
							<br>
							<div class="col-md-3" style="text-align: right ; padding: 5px; ">
								<div class="row" style="border:0px solid #C0C0C0; margin-bottom: 30px">
									<div class="col-md-12">
										<div class="row" style="margin-bottom: 15px">
										<div class="col-md-12" style="text-align: center"><h2><span id="spot">0.0000</span></h2></div>
										</div>
										<div class="row" style="margin-bottom: 5px">
											<div class="col-md-12" style="text-align:center">
												<span class="sparkline-1" id="linecustom">Spot Point</span>
											</div>
										</div>

										<div class="row" style="margin-bottom: 20px">
											<div class="col-md-12" style="text-align: center"><strong> Market : <span id="symbolname">Volatility 100 Index </span></strong></div>
										</div>
										<div class="row" >
											<div class="col-md-12">

															<button class="btn btn-success btn-block btn-sm" id="btncall"><i class="glyphicon glyphicon-chevron-up"></i>  CALL</button>
															<button class="btn btn-danger btn-block btn-sm" id="btnput"><i class="glyphicon glyphicon-chevron-down"></i>  PUT</button>

										</div>
																</div>
									</div>

								</div>

							</div>


							<br>
							<br><br>

						</div>

				</div>
				<div id="profittable" class="tab-pane fade" role="tabpanel"><hr>
				<div class="row">
					<div class="col-xs-12">
						<div class="box">
							<div class="box-header">


							</div>
							<!-- /.box-header -->
							<div class="box-body table-responsive no-padding">
								<table class="table table-hover" id="tblresult">
									<thead >
									<tr>
										<th>Order Time</th>
										<th>Reference</th>
										<th>Contract</th>
										<th>Buy Price</th>
										<th>Sell Time</th>
										<th>Sell Price</th>
										<th>P/L</th>
									</tr>

								</thead>
								<tbody>
								</tbody>
								</table>
							</div>
							<!-- /.box-body -->
						</div>
						<!-- /.box -->
					</div>
				</div>
				</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
<div style="display:nones;" id="splash">
				<div class="table-struct full-width full-height" style="position: fixed;top: 70%;left: 50%; transform: translate(-50%, -50%);" >
						<div class="auth-form  ml-auto mr-auto no-float card-view pt-30 pb-30">
							<div class="row">
								<div class="col-md-12 col-sm-12 col-xs-12">
									<div class="form-group text-center">
												<img class="img-circle" src="assets/img/transbot.png" width="100px" alt="user">
												<h3 class="mt-10 txt-dark">API TOKEN</h3>
												<small><a href="https://www.binary.me/en/user/security/api_tokenws.html" target="_blank">get API Token here</a></small>
											</div><hr>
											<div class="form-group">
												<input type="password" id="token" class="form-control" required="" placeholder="API Token">
											</div>
											<div class="form-group text-center">
												<button class="btn btn-success btn-block btn-sm" id="btnconnect"><i class="glyphicon glyphicon glyphicon-off"></i> CONNECT</button>
											</div>
											<div class="form-group mb-0 text-center">
												<a href="https://record.binary.me/_XjWmn6MZ2z4l7JR-RNKH7WNd7ZgqdRLk/1/" target="blank" class="btn btn-danger btn-block btn-sm"><i class="glyphicon glyphicon glyphicon-check"></i> Create Account</a>
												<a href="transaction_history" target="blank" class="btn btn-primary btn-block btn-sm"><i class="glyphicon glyphicon glyphicon-list-alt"></i> Trade Record</a>
											</div>
										</div>
									</div>
								</div>
					</div>
</div>
				<div class="modal fade" id="myModal" role="dialog">
				  <div class="modal-dialog modal-dialog-centered">


				    <div class="modal-content">
				      <div class="modal-header btn-warning">
				        <button type="button" class="close" data-dismiss="modal">&times;</button>
				        <h4 class="modal-title"><span id="confirmtitle"></span></h4>
				      </div>
				      <div class="modal-body">
				        <p><span id="confirmbody"></span></p>
				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
				      </div>
				    </div>

				  </div>
				</div>
				<script type="text/javascript" src="assets/fast_system.js"></script>
<?php
include "footer.php";
?>
