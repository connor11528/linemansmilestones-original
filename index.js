// Begin Navigation Bars
var ButtonsImageMapping = [];
ButtonsImageMapping["NavigationBar1"] = {
	"NavigationButton1" : { image: "./assets/images/autogen/Home_HButton_Blue_Down_4_1.jpg", rollover: "./assets/images/autogen/Home_HRButton_Blue_Down_4_1.jpg", w: 115, h: 119 },
	"NavigationButton2" : { image: "./assets/images/autogen/Order_NButton_Blue_Up_3_1.jpg", rollover: "./assets/images/autogen/Order_NRButton_Blue_Down_4_1.jpg", w: 115, h: 119 },
	"NavigationButton3" : { image: "./assets/images/autogen/Photos_NButton_Blue_Up_3_1.jpg", rollover: "./assets/images/autogen/Photos_NRButton_Blue_Down_4_1.jpg", w: 115, h: 119 },
	"NavigationButton4" : { image: "./assets/images/autogen/Contact_NButton_Blue_Up_3_1.jpg", rollover: "./assets/images/autogen/Contact_NRButton_Blue_Down_4_1.jpg", w: 115, h: 119 }
};

$(document).ready(function(){
	$.fn.nofNavBarOptions({ navBarId: "NavigationBar1", rollover: true, autoClose: false });
	$("#NavigationBar1").nofNavBar({isMain: true, orientation: "horizontal" });
	$("#NavigationBar1 ul").hide();
});


// End Navigation Bars

