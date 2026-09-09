var picture;
var on;
var off;
var state;





setInterval(function()
{
    const now = new Date();
    document.getElementById("clock").textContent =
        now.toLocaleTimeString();
}, 1000);


$(document).ready(function()       
{
	sphinx = document.getElementById("Sphinx");
	lightOff = document.getElementById("lightOff");
	lightOn = document.getElementById("lightOn");
	doorSound = document.getElementById("doorSound");
	talking = document.getElementById("talking");
    door = document.getElementById("Door");
    picture = document.getElementById("myImage");
    buttonFlick = document.getElementById("flick");
    thing = document.getElementById("words");
	
    on = "../Images/pic_bulbon.gif";
    off = "../Images/pic_bulboff.gif";
	doorClosed = "../Images/DoorClosed2.png";
	doorOpen = "../Images/OpenDoor2.png";
	//sphinx = "../Images/Sphinx2.png";

    /*
    var garb = state;
    
    thing.innerHTML="JSS WORKS!";
    */
    $("#on").click(function()
        {
        document.getElementById("myImage").src= on;
		if (buttonFlick.innerHTML != "Flick off")
			lightOn.play();
		
        buttonFlick.innerHTML = "Flick off";

		
		document.getElementById("Door").style.display = "block";


		
		
         
        });
    $("#off").click(function()
        {
        document.getElementById("myImage").src= off;

		if (buttonFlick.innerHTML != "Flick on")
			lightOff.play();
		
		buttonFlick.innerHTML = "Flick on";
		document.getElementById("Door").style.display = "none";
        });
    $("#flick").click(function(c)
		{
		if(buttonFlick.innerHTML == "Flick off")
		{
            document.getElementById("myImage").src = "../Images/pic_bulboff.gif";
            buttonFlick.innerHTML = "Flick on";
			lightOff.play();
			document.getElementById("Door").style.display = "none";

        }
        else
        {
            document.getElementById("myImage").src = "../Images/pic_bulbon.gif";
            buttonFlick.innerHTML = "Flick off";
			lightOn.play();
			document.getElementById("Door").style.display = "block";
        }
        });
	$("#Door").click(function()
	{
		if(document.getElementById("Door").getAttribute("src") == doorClosed)
		{
			document.getElementById("Door").src = doorOpen;
			doorSound.play();
			document.getElementById("Sphinx").style.display = "block";

		}
		else if(document.getElementById("Door").getAttribute("src") == doorOpen)
		{
			document.getElementById("Door").src = doorClosed;
			doorSound.play();
			document.getElementById("Sphinx").style.display = "none";

		}
	

		


	});
	
	$("#Sphinx").click(function()
	{
		talking.play();
		document.getElementById("riddleBox").style.display = "block";
		document.getElementById("answerArea").style.display = "block";
	});
	
	
    $("#answerButton").click(function()
	{
		let answer = document.getElementById("riddleAnswer").value.trim().toLowerCase();
		
		const acceptedAnswers=
		[
		"man",
		"a man",
		"human",
		"a human",
		"human being",
		"a human being",
		"person",
		"a person",
		"people",
		"woman",
		"a woman",
		"humanity"
		];
		
		if (acceptedAnswers.includes(answer))
		{
			alert("Correct!");
			document.getElementById("bitBurner").style.display = "block";
		}
		else
		{
			alert("Incorrect!");
		}
	});
    
    
});
