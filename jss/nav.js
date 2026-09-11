function updateClock()
{
    const clock = document.getElementById("clock2");

    if (clock == null)
    {
        return;
    }

    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
}

updateClock();
setInterval(updateClock, 1000);