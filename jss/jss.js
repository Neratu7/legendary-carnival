var picture;
var on;
var off;
var state;



$(document).ready(function()       
{
    
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
         
        });
    $("#off").click(function()
        {
        document.getElementById("myImage").src= off;
        buttonFlick.innerHTML = "Flick on";
        });
    $("#flick").click(function(c)
        {

        if(buttonFlick.innerHTML == "Flick off")
        {      
            document.getElementById("myImage").src = "../Images/pic_bulboff.gif";
            buttonFlick.innerHTML = "Flick on";
        }
        else
        {
            document.getElementById("myImage").src = "../Images/pic_bulbon.gif";
            buttonFlick.innerHTML = "Flick off";
        }
        });
    
    
    
});
