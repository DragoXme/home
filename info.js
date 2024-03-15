let infoBox = document.getElementById("indicatorBox");
let divBox = document.getElementById("indicatorDiv");


document.addEventListener("DOMContentLoaded", function() {
    if (navigator.onLine) {
        console.log("Online");
        infoBox.textContent = "Welcome Back!";
        infoBox.style.animation = "popup 2s ease-in-out";
        setTimeout(() => {
            infoBox.style.animation = "none";
        }, 2000);
    } else {
        console.log("Offline");
        infoBox.textContent = "You're Offline!";
        infoBox.style.animation = "popup 2s ease-in-out";
        playOfflineAudio();
        setTimeout(() => {
            infoBox.style.animation = "none";
        }, 2000);
    }
});
window.addEventListener('online', () => {
    console.log("online");
    infoBox.textContent = "Back Online!";
    infoBox.style.animation = "popup 2s ease-in-out";
    playNotificationAudio();
    setTimeout(() => {
        infoBox.style.animation = "none";
    }, 2000);
});

window.addEventListener('offline', () => {
    console.log("offline");
    infoBox.textContent = "You're Offline!";
    infoBox.style.animation = "popup 2s ease-in-out";
    playOfflineAudio();
    setTimeout(() => {
        infoBox.style.animation = "none";
    }, 2000);
});






//functions to play audio
    // Get the audio elements
    let audioUnmute = document.getElementById("audioUnmute");
    let audioOffline = document.getElementById("audioOffline");
    let audioNotification = document.getElementById("audioNotification");

    // Function to play the unmute audio
    function playUnmuteAudio() {
        audioUnmute.play();
    }

    // Function to play the offline notification audio
    function playOfflineAudio() {
        audioOffline.play();
    }

    // Function to play the notification audio
    function playNotificationAudio() {
        audioNotification.play();
    }








//mute unmute toggle
document.addEventListener("DOMContentLoaded", function() {
    let audioImage = document.getElementById("audioImage");
    let audioUnmute = document.getElementById("audioUnmute");
    let audioOffline = document.getElementById("audioOffline");
    let audioNotification = document.getElementById("audioNotification");
    let audioElements = [audioUnmute, audioOffline, audioNotification];

    // Function to toggle the master audio mute state
    function toggleMasterAudio() {
        if (audioImage.src.includes("audio-on.png")) {
            // Muting the audio
            audioImage.src = "img/audio-off.png";
            audioElements.forEach(audio => {
                if (!audio.paused) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            });

            // Save state in memory
            localStorage.setItem("audioState", "muted");
        } else {
            // Unmuting the audio
            audioImage.src = "img/audio-on.png";
            audioElements.forEach(audio => {
                audio.muted = false;
            });

            // Play the unmute audio
            playUnmuteAudio();

            // Save state in memory
            localStorage.setItem("audioState", "unmuted");
        }
    }

    // Add click event listener to the audio image
    audioImage.addEventListener("click", toggleMasterAudio);

    // Check and restore audio state from memory
    let audioState = localStorage.getItem("audioState");
    if (audioState === "muted") {
        audioImage.src = "img/audio-off.png";
        audioElements.forEach(audio => {
            audio.muted = true;
        });
    } else {
        audioImage.src = "img/audio-on.png";
        audioElements.forEach(audio => {
            audio.muted = false;
        });
    }
});




//menu script
let menuDiv = document.getElementById("menuDiv");
let menuImage = document.getElementById("menuImage");

menuImage.addEventListener( "click", function() {
    if (audioImage.style.transform === "translateX(80px)") {
    audioImage.style.transform = "translateX(0px)";
    menuImage.style.transform = "rotate(90deg)";
    console.log("if");
    }
    else {
        audioImage.style.transform = "translateX(80px)";
        console.log("else");
        menuImage.style.transform = "rotate(0deg)";
    }
});