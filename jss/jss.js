var picture;
var on;
var off;
var state;
doorClosed = "../Images/DoorClosed2.png";
doorOpen = "../Images/OpenDoor2.png";

setInterval(function()
{
    const now = new Date();
    document.getElementById("clock").textContent =
        now.toLocaleTimeString();
}, 1000);


$(document).ready(function()       
{
    door = document.getElementById("Door");
    picture = document.getElementById("myImage");
    buttonFlick = document.getElementById("flick");
    thing = document.getElementById("words");
    on = "../Images/pic_bulbon.gif";
    off = "../Images/pic_bulboff.gif";

    /*
    var garb = state;
    
    thing.innerHTML="JSS WORKS!";
    */
    $("#on").click(function()
        {
        document.getElementById("myImage").src= on;
        buttonFlick.innerHTML = "Flick off";
		
		document.getElementById("Door").style.display = "block";
		document.getElementById("Door").src = doorClosed;
         
        });
    $("#off").click(function()
        {
        document.getElementById("myImage").src= off;
        buttonFlick.innerHTML = "Flick on";
		
		document.getElementById("Door").style.display = "none";
        });
    $("#flick").click(function(c)
        {

        if(buttonFlick.innerHTML == "Flick off")
        {      
            document.getElementById("myImage").src = "../Images/pic_bulboff.gif";
            buttonFlick.innerHTML = "Flick on";
			document.getElementById("Door").style.display = "none";
        }
        else
        {
            document.getElementById("myImage").src = "../Images/pic_bulbon.gif";
            buttonFlick.innerHTML = "Flick off";
			document.getElementById("Door").style.display = "block";
        }
        });
	$("#Door").click(function()
	{
		document.getElementById("Door").src = doorOpen;
	});
    
    
    
});
