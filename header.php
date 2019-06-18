<?php
session_start();
include "core/data.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<title><?php echo getConfig('site_name');?></title>
	<meta name="description" content="<?php echo getConfig('site_description');?>" />
	<meta name="keywords" content="<?php echo getConfig('site_keywords');?>" />
	<meta name="author" content="Walker"/>

	<!-- Favicon -->
	<link rel="shortcut icon" href="favicon.ico">
	<link rel="icon" href="/assets/img/<?php echo getConfig('logo_image');?>" type="image/x-icon">

	<!-- Data table CSS -->
	<link href="/assets/vendors/bower_components/datatables/media/css/jquery.dataTables.min.css" rel="stylesheet" type="text/css"/>

	<!-- Toast CSS -->
	<link href="/assets/vendors/bower_components/jquery-toast-plugin/dist/jquery.toast.min.css" rel="stylesheet" type="text/css">

	<!-- Morris Charts CSS -->
    <link href="/assets/vendors/bower_components/morris.js/morris.css" rel="stylesheet" type="text/css"/>

	<!-- vector map CSS -->
	<link href="/assets/vendors/vectormap/jquery-jvectormap-2.0.2.css" rel="stylesheet" type="text/css"/>

	<!-- Custom CSS -->
	<link href="/assets/modern/dist/css/style.css" rel="stylesheet" type="text/css">
  <style>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #FF0000;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #01DF3A;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
</head>

<body>

  <!-- Preloader -->
  <div class="preloader-it">
    <div class="la-anim-1"></div>
  </div>
  <!-- /Preloader -->
     <div class="wrapper box-layout theme-2-active navbar-top-navyblue horizontal-nav">
      <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="mobile-only-brand pull-left">
  				<div class="nav-header pull-left">
  					<div class="logo-wrap">
  						<a href="/">
  							<img class="brand-img" src="assets/img/<?php echo getConfig('logo_image');?>" alt="brand"/>
  							<span class="brand-text"><?php echo getConfig('site_name');?></span>
  						</a>
  					</div>
  				</div>

					<a id="toggle_mobile_nav" class="mobile-only-view" href="javascript:void(0);"><i class="ti-more"></i></a>
  			</div>
        <div id="mobile_only_nav" class="mobile-only-nav pull-right">
          <ul class="nav navbar-right top-nav pull-right">


          <li class="dropdown auth-drp">
						<a href="#" target="_blank" class="dropdown-toggle pr-0" data-toggle="dropdown"><img src="assets/img/binary.png" alt="user_auth" class="user-auth-img img-circle"/><span class="user-online-status"></span></a>
						<ul class="dropdown-menu user-auth-dropdown" data-dropdown-in="flipInX" data-dropdown-out="flipOutX">
							<li>
								<a href="logout"><i class="zmdi zmdi-refresh"></i><span>Refresh Page</span></a>
							</li>
              <li>
								<a href="https://binarytrade.io" target="_blank"><i class="zmdi zmdi-link"></i><span>Binary Web</span></a>
							</li>
              <li>
								<a href="https://binaryticktrade.com" target="_blank"><i class="zmdi zmdi-link"></i><span>Tick Trade</span></a>
							</li>
						</ul>
					</li>
        </ul>
        </div>
      </nav>
      <!-- Main Content -->
  <div class="page-wrapper">
    <div class="container-fluid pt-30">
