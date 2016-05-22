/*      Definition of Picture class
*  function getPictureAlt - returns the alt_text of the picture
*  function getPicture - returns the picture
*  function getPictureLink - returns the link of the picture
*/
function Picture(pic, picture_link, picture_alt) {
  this.Pic = new Image();
  this.Pic.src = pic;
  this.PictureLink = picture_link;
  this.PictureAlt = picture_alt;
  
  this.getPictureAlt = function getPictureAlt() {
    return this.PictureAlt;
  }
   
  this.getPicture = function getPicture() {
    return this.Pic;
  }
  
  this.getPictureLink = function getPictureLink() {
    return this.PictureLink;
  }
}

/*    Definition of Rotating Picture Class
*  function show - displays the initial picture, sets the size of the Div and starts the rotation process
*  function rotate - changes the picture according to parameteres
*/
function RotatingPicture(){

this.init = function init(id, width, height, interval, randomize, scale){
  this.Width = width;
  this.Height = height;
  this.Interval = interval;
  this.Randomize = randomize;
  this.Scale = scale;
  this.currentPic = 0;
  this.ID = id;
  this.Pics = new Array();
 }

this.show = function show(){
    //checks if there are any picture files
   if (this.Pics.length == 0){
     //window.alert(this.ID + " No pictures");
     var rpImg = document.getElementById( "RotatingPictureImg" + this.ID );
     rpImg.width = 0;
     rpImg.height = 0;
     this.Interval = 1;
   }else
   {
  var rpDiv = document.getElementById( "RotatingPictureDiv" + this.ID );
  rpDiv.style.width = this.Width;
  rpDiv.style.height = this.Height;
  this.currentPic = -1;
  this.rotate();      
  }
 }

this.rotate = function rotate(){
   var rpImg = document.getElementById( "RotatingPictureImg" + this.ID );
   var rpDiv = document.getElementById( "RotatingPictureDiv" + this.ID );
   //checks if there are any picture files
   if (this.Pics.length != 0){
   
   //if (this.Pics.length == 1 && rpImg.src == ""){
   //  return;
   //}
   if (this.Randomize == false){
     //checks if the last image is shown
     if(this.currentPic<this.Pics.length-1)
        this.currentPic++;
        else
        this.currentPic = 0;
   }
   else{
     var s = this.currentPic;
     
     //generates random values until they are different from currentPic - so that a different picture is shown
     do
       s = Math.floor(Math.random() * this.Pics.length);
     while(s == this.currentPic || s >= this.Pics.length)
     this.currentPic = s;
   }
   
   
   // if picture has link then set pointer to hand, else set pointer to default
   if ( this.Pics[ this.currentPic ].getPictureLink() != "" )
       rpDiv.style.cursor = "pointer";
    else
       rpDiv.style.cursor = "default";
       
   // if picture has alt then set picture alt
   if ( this.Pics[ this.currentPic ].getPictureAlt() != "" ){
       rpImg.alt = this.Pics[ this.currentPic ].getPictureAlt();
       rpImg.title = this.Pics[ this.currentPic ].getPictureAlt();
   } else {
       rpImg.alt = "";
       rpImg.title = "";
   }   
       
   //if scale then resize picture
   if (this.Scale){
	var image_width = this.Pics[ this.currentPic ].getPicture().width;
	var image_height = this.Pics[ this.currentPic ].getPicture().height;

	if(image_width > this.Width || image_height > this.Height){

		var proc_width = 100 - (this.Width * 100 / image_width);
		var proc_height = 100 - (this.Height * 100 / image_height);
		var proc = proc_width;
		if(proc < proc_height){
			proc = proc_height;
		}
		//window.alert(this.Pics[ this.currentPic ].getPicture().src + ":" + proc);
		 rpImg.src = "";
		rpImg.width = image_width - (image_width * proc / 100);
		rpImg.height = image_height - (image_height * proc / 100);
	}
	else{
		rpImg.src = "";
		rpImg.width = image_width;
		rpImg.height = image_height;
	}
  }
  //set picture to currentPic
   rpImg.src = this.Pics[ this.currentPic ].getPicture().src;
   rpImg.align = "center";
 }
//function to handle the link on the picture
this.goClick = function goClick(){
  if ( this.Pics[ this.currentPic ].getPictureLink() != "" )
    window.location = this.Pics[ this.currentPic ].getPictureLink();
 } 
 }
}
