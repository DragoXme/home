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
    let audioLock = document.getElementById("audioLock");

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
    function playAudioLock() {
        audioLock.play();
    }








//mute unmute toggle
document.addEventListener("DOMContentLoaded", function() {
    let audioImage = document.getElementById("audioImage");
    let audioUnmute = document.getElementById("audioUnmute");
    let audioOffline = document.getElementById("audioOffline");
    let audioNotification = document.getElementById("audioNotification");
    let audioLock = document.getElementById("audioLock");
    let audioElements = [audioUnmute, audioOffline, audioNotification, audioLock];

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
            audioLock.muted = true;

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
let lockIcon = document.getElementById("lockIcon");

menuImage.addEventListener( "click", function() {
    if (audioImage.style.transform === "translateX(80px)") {
    menuImage.style.transform = "rotate(90deg)";
    audioImage.style.transform = "translateX(0px)";
    setTimeout(() => {
        lockIcon.style.transform = "translate(0, 80px)";
    }, 50);
    }
    else {
        menuImage.style.transform = "rotate(0deg)";
        lockIcon.style.transform = "translate(80px, 80px)";
        setTimeout(() => {
            audioImage.style.transform = "translateX(80px)";
        }, 50);
    }
});

let lockImage = document.getElementById("lockImage");
let lockComponentOne = document.getElementById("lockComponentOne");
let lockComponentTwo = document.getElementById("lockComponentTwo");
let greetingAndTime = document.getElementById("greetingAndTime");

function lockScreenOn() {
    document.documentElement.requestFullscreen();
    lockImage.style.top = "0";
    lockComponentOne.style.bottom = "0";
    lockComponentTwo.style.top = "0";
    greetingAndTime.style.transform = "translate(-50%, 50%)";
    lockComponentTwo.style.animation = "componentTwo 3s infinite ease-in-out";
    lockComponentOne.style.animation = "componentOne 3s infinite ease-in-out";
    lockImage.addEventListener("click", lockScreenOff);
    lockComponentOne.addEventListener("click", lockScreenOff);
    lockComponentTwo.addEventListener("click", lockScreenOff);
    playAudioLock();
}
function lockScreenOff() {
    document.exitFullscreen();
    lockImage.style.top = "-100%";
    lockComponentOne.style.bottom = "calc(100% + 14vw)";
    greetingAndTime.style.transform = "translate(-50%, 0)";
    lockComponentTwo.style.top = "-100%";
    lockComponentOne.style.animation = "none";
    lockComponentTwo.style.animation = "none";
    audioLock.pause();
    audioLock.currentTime = 0;
}




//call lock screen function
document.addEventListener("DOMContentLoaded", function() {
    let lockIcon = document.getElementById("lockIcon");

    // Function to handle click on the lock icon
    function handleLockIconClick() {
        lockScreenOn();
    }

    // Add click event listener to the lock icon
    lockIcon.addEventListener("click", handleLockIconClick);
});
