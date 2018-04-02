// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

/*GET FUNCTION HERE */
function getQueryParams(qs) {
	 qs = qs.split("+").join(" ");
	 var params = {},
	 tokens,
	 re = /[?&]?([^=]+)=([^&]*)/g;
	 while (tokens = re.exec(qs)) {
	 	params[decodeURIComponent(tokens[1])]
	 	= decodeURIComponent(tokens[2]);
	 }
	 return params;
} 

var $_GET = getQueryParams(document.location.search);
//console.log($_GET["json"]);

function swapPhoto() {
	if(mCurrentIndex >= mImages.length - 1){
		mCurrentIndex = -1;
	}

	mCurrentIndex ++; 
	var currentImg = mImages[mCurrentIndex];

	// console.log('swap photo:');

	$('#photo').attr('src', currentImg.img);
	$(".location").html("Location: " + currentImg.location);
	$(".description").html("Description: " + currentImg.description);
	$(".date").html("Date: " + currentImg.date);

	
}

function swapPhotoBack() {
	if(mCurrentIndex <=  0){
		mCurrentIndex = mImages.length;
	}

	mCurrentIndex --; 
	var currentImg = mImages[mCurrentIndex];

	// console.log('swap photo:');

	$('#photo').attr('src', currentImg.img);
	$(".location").html("Location: " + currentImg.location);
	$(".description").html("Description: " + currentImg.description);
	$(".date").html("Date: " + currentImg.date);

	
}

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson = {};

var mCurrentIndex = 0;
// URL for the JSON to load by default


var mRequest = new XMLHttpRequest();
mRequest.onreadystatechange = function() {
	if (mRequest.readyState == 4 && mRequest.status == 200) {
		try {
			mJson = JSON.parse(mRequest.responseText);
			console.log(mJson);
			for (var i=0; i<mJson.images.length; i++){
				var checkLine = mJson.images[i];
				mImages.push(new GalleryImage(checkLine.imgLocation, checkLine.description, checkLine.date, checkLine.imgPath));
			}
		} catch(err) {
			console.log(err.message);
		}

	}
};


if ($_GET["json"] === undefined){
	$_GET["json"] = 'images.json';
	var mUrl = $_GET["json"];
	mRequest.open("GET", "images.json", true);
	mRequest.send();
	// console.log($_GET["json"]);
	// console.log(mUrl);
}
else{
	var mURL = $_GET["json"];
	mRequest.open("GET", mURL, true);
	mRequest.send();
}


// mRequest.open("GET", mURL, true);
// mRequest.send();



//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

 $('.moreIndicator').click(function(){
 		console.log('clicked');
 });


$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
	$('.moreIndicator').on('click', function() {
		if ($(this).hasClass("rot90")) {
			$('.moreIndicator').addClass('rot270');
			$('.moreIndicator').removeClass('rot90');
			$('.details').eq(0).slideDown();
		}
		else{
			$('.moreIndicator').addClass('rot90');
			$('.moreIndicator').removeClass('rot270');
			$('.details').eq(0).slideUp();
		}



		console.log("Button Clicked!");
	});

	$('#prevPhoto').click(function() {
		console.log(mCurrentIndex);
		swapPhotoBack();		
	});

	$('#nextPhoto').on('click', function() {
		swapPhoto();	
		console.log(mCurrentIndex);
	});

	
		
	});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

var GalleryImage = function (location, description, date, img) {
    this.location = location;
    this.description = description;
    this.date = date;
    this.img = img;    
    };








