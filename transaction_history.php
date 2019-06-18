<?php
include "header.php";
?>
<div class="row">
  <div class="col-sm-12">
    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
      <div class="panel panel-default card-view pa-0">
        <div class="panel-wrapper collapse in">
          <div class="panel-body pa-0">
            <div class="sm-data-box">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-xs-6 text-center pl-0 pr-0 data-wrap-left">
                    <span class="txt-dark block counter"><?php echo number_format(sumProfitLoss("won"),2);?></span>
                    <span class="capitalize-font block">Total Profit </span>
                  </div>
                  <div class="col-xs-6 text-center  pl-0 pr-0 data-wrap-right">
                    <i class="icon-like data-right-rep-icon txt-danger"></i>
                  </div>
                </div>
                <div class="progress-anim">
                  <div class="progress">
                    <div class="progress-bar progress-bar-success
                    wow animated progress-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
      <div class="panel panel-default card-view pa-0">
        <div class="panel-wrapper collapse in">
          <div class="panel-body pa-0">
            <div class="sm-data-box">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-xs-6 text-center pl-0 pr-0 data-wrap-left">
                    <span class="txt-dark block counter"><?php
                    $profit_lossx = sumProfitLoss("lost");
                    $profit_lossy = sumProfitLoss("sold");
                    $ttl = $profit_lossx + $profit_lossy;
                    echo number_format($ttl,2);?></span>
                    <span class="capitalize-font block">Total Lost </span></span>
                  </div>
                  <div class="col-xs-6 text-center  pl-0 pr-0 data-wrap-right">
                    <i class="icon-fire data-right-rep-icon txt-danger"></i>
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
    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
      <div class="panel panel-default card-view pa-0">
        <div class="panel-wrapper collapse in">
          <div class="panel-body pa-0">
            <div class="sm-data-box">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-xs-6 text-center pl-0 pr-0 data-wrap-left">
                    <span class="txt-dark block counter"><?php echo tradeCount();?></span>
                    <span class="capitalize-font block">Total Trade </span></span>
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
</div>
<!-- Row -->
				<div class="row">
					<div class="col-sm-12">
						<div class="panel panel-default card-view">
							<div class="panel-heading">
								<div class="pull-left">
									<h6 class="panel-title txt-dark">All Trade History</h6>
								</div>
								<div class="clearfix"></div>
							</div>
							<div class="panel-wrapper collapse in">
								<div class="panel-body">
									<div class="table-wrap">
										<div class="table-responsive">
											<table id="example" class="table table-hover display  pb-30" >
												<thead>
                          <tr><th>No</th>
														<th>Date</th>

														<th>Ref</th>
														<th>Detail</th>
														<th>Buy Price</th>
														<th>Sell Price</th>
                            <th>Profit/Loss</th>
                            <th>Indicator</th>
                            <th>Trade Status</th>

													</tr>
												</thead>

                        <tbody>
                          <?php

                                                                       $sql = "SELECT * FROM `transactions` WHERE `status` != 'hidden' ORDER BY `id` DESC";
                                                                       $result = mysqli_query($con,$sql);
                                                                       $no=1;
                                                                       while($row = mysqli_fetch_assoc($result)){
                                                                           if($row[status] == "won"){$status = "<span class=\"label label-sm label-success\"> Won </span>";}
                                                                           if($row[status] == "lost"){$status = "<span class=\"label label-sm label-danger\"> Lost </span>";}
                                                                           if($row[status] == "sold"){$status = "<span class=\"label label-sm label-primary\"> Sold </span>";}
                                                                           if($row[indicator] == "opencandle"){$indine = "FastTrade";}
                                                                           if($row[indicator] == "candlefollower"){$indine = "Candle Follower";}
                                                                           if($row[indicator] == "powercandle"){$indine = "Power Candle";}
                                                                           if($row[indicator] == "trendbar"){$indine = "Fast TrendLine";}
                                                                           if($row[indicator] == "tickpattern"){$indine = "Ticks Pattern";}
                                                                           if($no % 2==0) ;
                                                                           $epoch = date("Y-m-d H:i:s", $row[order_time]);

                                                                           echo "<tr>
                                                                           <td>$no</td>
                                                                                <td>$epoch</td>
                                                                                <td>$row[reference_id]</td>
                                                                                <td>$row[long_code]</td>
                                                                                <td>$row[buy_price]</td>
                                                                                <td>$row[sell_price]</td>
                                                                                <td>$row[profit_loss]</td>
                                                                                <td>$indine</td>
                                                                                <td>$status</td>

                                                                           </tr>";
                                                                       $no++;

                                                                       }
                                                                    ?>

                        </tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

<?php
include "footer.php";
?>
