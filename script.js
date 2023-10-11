
function MouseRollover(myImage) {
    myImage.src = 'images/Pinoch.png';
}

function MouseOut(myImage) {
    myImage.src = 'images/Pinoch.jpg';
}

//Changing border causes highlighting affect 
function MouseRoll2(topCon) {
    document.getElementById("topCon").style.borderWidth = "thick";    
}

function MouseOut2(topCon) {
    document.getElementById("topCon").style.borderWidth = "thin";    
}

function MouseRoll3(topCon2) {
    document.getElementById("topCon2").style.borderWidth = "thick";    
}

function MouseOut3(topCon2) {
    document.getElementById("topCon2").style.borderWidth = "thin";    
}
function MouseRoll4(topCon3) {
    document.getElementById("topCon3").style.borderWidth = "thick";    
}

function MouseOut4(topCon3) {
    document.getElementById("topCon3").style.borderWidth = "thin";    
}

function clicker1(topCon2) {
    document.getElementById("topCons").style.backgroundColor = "black";
}


/* This is my popup to complete a required variable(popCounter) based loop  
and logical decision in a function*/ 
 
var popCounter = 0;

function showPop() {
    if(popCounter < 1){
        alert("Please read more carefully");
    }
    else {
        alert("Enjoy")
    }
}
// Event listener for scroll to make popup
window.addEventListener('scroll', function() {

var scrollPosition = window.scrollY;
  
    while (scrollPosition > 100 && (scrollPosition - 100) % 25 === 0 && popCounter < 2) {
      showPop();
  
      popCounter++;
  
      scrollPosition = window.scrollY;
    }
});

/* This is my skills stretch example 
ref: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Sequencing_animations */
  
var pinocchioImages = ["images/pinocchio1.jpg", "images/pinocchio2.jpg", "images/pinocchio3.jpg"];
var currentIndex = 0;

var animationInterval = setInterval(function() {

    document.getElementById("pinocchioAn").src = pinocchioImages[currentIndex];

    currentIndex = (currentIndex + 1) % pinocchioImages.length;

    document.getElementById("pinocchioAn").style.transform = "scale(1." + (currentIndex + 1)*0.5 + ")";

  }, 1500); 