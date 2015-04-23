var listphpURL = "http://m.edumedia.ca/cook0246/mad9022/Final/list.php?dev=d38294b1402b17f2";
var getphpURL = "http://m.edumedia.ca/cook0246/mad9022/Final/get.php?dev=d38294b1402b17f2&img_id=";

var app= {
	loadRequirements:0,
	init: function(){
		document.addEventListener("deviceready", app.onDeviceReady);
		document.addEventListener("DOMContentLoaded", app.onDomReady);
	},
	onDeviceReady: function(){
		app.loadRequirements++;
		if(app.loadRequirements === 2){
			app.start();
		}
	},
	onDomReady: function(){
		app.loadRequirements++;
        //app.loadRequirements = 2;
		if(app.loadRequirements === 2){
			app.start();
		}
	},
	start: function(){
        loadImages(listphpURL); 
           
        
        Hammertime(); 
        
	},
    edit: function(ev){
        
    },
    cancel: function(){
        var selected = document.querySelectorAll("[data-role=modal]");
            for (var i = 0; i <	selected.length; i++) {
                selected[i].style.display="none";
            }
            document.querySelector("[data-role=overlay]").style.display="none";     
    },
    save: function(){
           
    },
    delete: function(ev){
        
    }
}

app.init();




//APP WAS INSTALLED ON iPad 2 - 02  app title is AppDevFinal


function Hammertime(){
    console.log('Hammertime fired');
    
   
    var btnCancel = document.getElementById("btnCancel");
    var mc3 = new Hammer(btnCancel);
    mc3.on("tap", function(ev){
        ev.preventDefault();
        app.cancel();
    });
    
       

    //TABS:
    var listPhoto = document.getElementById('listPhoto');
        var mc = new Hammer(listPhoto);
        mc.on("tap", function(ev){ 
            console.log('tapped listPhoto');
            if(ev.target.className == "activeTab"){
                ev.target.className = "";
                
                loadPage('Main');
            }else{
                ev.target.className = "activeTab";
                loadPage('Gallery');
            }
        }); 
    
    var capturePhoto = document.getElementById('capturePhoto');
        var mc2 = new Hammer(capturePhoto);
        mc2.on("tap", function(){
            alert('taking photo...');
            console.log('tapped capturePhoto');
        });
  
}
          
          
function loadPage(page){
    switch(page){
        case 'Main': 
            document.getElementById('Main').style.display="block";
            document.getElementById('Gallery').style.display="none";
            break;
        case 'Gallery': 
            document.getElementById('Main').style.display="none";
            document.getElementById('Gallery').style.display="block";
            break; 
    }
}
function loadModal(path){ 
    var blah = document.getElementById("blahblah");
    blah.innerHTML = JSON.stringify(path); //imageData[""][i]["data"];
    
    
   // document.getElementById("FullHolder").src = ;
    
    document.getElementById("ModalWindow").style.display="block";
    document.querySelector("[data-role=overlay]").style.display="block";
}

//connect to list.php and download pics from edumedia server
function loadImages(path){
    sendRequest(path, insertThumb, "POST");
}

function insertThumb(rawData){
    var imageData = JSON.parse(rawData.responseText);
    
    //document.getElementById("message").innerHTML = JSON.stringify(imageData);
    
    //this should create the thumbnail containers, generate and configure the thumbnails, then add them to the screen 
    for(var i=0; i<7; i++){
        var row1 = document.getElementById('row1');
        var newNail = document.createElement('div');
        var newThumb = document.createElement('img');
        var btnDel = document.createElement('p');
        
        newThumb.src = imageData["thumnbails"][i]["data"];
        newThumb.className = "thumb";
        newThumb.setAttribute("id", "pic"+i);
        newThumb.setAttribute("data-ref", imageData["thumnbails"][i]["id"]);
        //newThumb.setAttribute("data-stuff", JSON.stringify(imageData));
        newThumb.width= 150;
        newThumb.height = 120;
        
        newNail.className =  "nail";
        newNail.width = newThumb.width;
        //newNail.height = newThumb.height;
        
        btnDel.innerHTML = "Delete";
        btnDel.className = "deleteBtns";
        btnDel.setAttribute("data-ref", i);
        
    
        newNail.appendChild(newThumb);
        newNail.appendChild(btnDel);
        row1.appendChild(newNail);
    
        ///////////////////////////////////////////////
        
    
    }
    var thumbs = document.querySelectorAll(".thumb");   
        for (var i = 0; i <	thumbs.length; i++) {

            var mc = new Hammer(thumbs[i]);
                mc.on("tap", function(ev){
                    var thisPath = getphpURL + ev.target.getAttribute('data-ref');
                   
                    sendRequest(thisPath, loadModal, null);
                    
                    
                });       
        }
    var deleteBtns = document.querySelectorAll(".deleteBtns");   
        for (var i = 0; i <	deleteBtns.length; i++) {
            
            var dl = new Hammer(deleteBtns[i]);
                dl.on("tap", function(ev){
                    //ev.target.getAttribute('data-ref');    
                });       
        }
    
    
    
}    



function TakePic(){
    var opts = {encodingType: Camera.encodingType.JPEG,
               destinationType: Camera.destinationType.DATA_URL};

    // Called when a photo is successfully retrieved
    function onPhotoDataSuccess(imageData) {
      // console.log(imageData);
        
      var smallImage = document.getElementById('smallImage');
      smallImage.style.display = 'block';

      // Show the captured photo
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }

    // Called when a photo is successfully retrieved
    function onPhotoURISuccess(imageURI) {
      // console.log(imageURI);

      var largeImage = document.getElementById('largeImage');
      largeImage.style.display = 'block';
      largeImage.src = imageURI;
    }
    
    function onFail(message) {
        alert('Failed because: ' + message);
    }

    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
    }

    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }
  
   
}