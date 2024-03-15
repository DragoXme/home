// Data URL links

/*
document.addEventListener("DOMContentLoaded", function () {
  var buttons = document.querySelectorAll(".link");

  buttons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      var url = button.getAttribute("data-url");

      if (url) {
        window.location.href = url;
      } else {
        event.preventDefault(); // Prevent the default behavior of the button click
      }
    });
  });
});
*/


// Favicon changing code
document.addEventListener('DOMContentLoaded', () => {
  const searchBox = document.getElementById('searchbox');
  const favicon = document.getElementById('favicon');

  searchBox.addEventListener('input', () => {
    const inputValue = searchBox.value.trim();

    if (inputValue !== '') {
      favicon.href = 'img/search-bing.png';
    } else {
      favicon.href = 'img/newtab.png';
    }
  });
});


// Search engine switch
document.addEventListener("DOMContentLoaded", function () {
(function () {
  const switchButton = document.getElementById("switch-engine");
  const searchForm = document.getElementById("search-form");
  const searchEngineImage = document.getElementById("search-engine-image");
  const textinside = document.getElementById("searchbox");
  const inputSearchButton = document.getElementById("input-search-button");
  const downArrow = document.getElementById("down-arrow-circle");
  const csschange = document.getElementById("searchEngineCss");

  const savedEngine = localStorage.getItem("searchEngine");
  if (savedEngine) {
    if (savedEngine === "google") {
      switchToGoogle();
    } else if (savedEngine === "bing") {
      switchToBing();
    }
  }

  function switchToGoogle() {
    searchForm.action = "https://www.google.com/search";
    searchEngineImage.src = "img/google-search.png";
    textinside.placeholder = "Explore the Web with Google...";
    inputSearchButton.src = "img/search-google.png";
    downArrow.src = "img/down-arrow2.png";
    csschange.href = "css/google.css";

    localStorage.setItem("searchEngine", "google");
  }

  function switchToBing() {
    searchForm.action = "https://www.bing.com/search";
    searchEngineImage.src = "img/bing-search.png";
    textinside.placeholder = "Discover a World of Knowledge with Bing...";
    inputSearchButton.src = "img/search-bing.png";
    downArrow.src = "img/down-arrow.png";
    csschange.href = "css/bing.css";

    localStorage.setItem("searchEngine", "bing");
  }

  switchButton.addEventListener("click", function () {
    if (isBing()) {
      switchToGoogle();
    } else {
      switchToBing();
    }

    downArrow.style.animation = "downrotate 0.7s";
  });

  function isBing() {
    return searchForm.action === "https://www.bing.com/search";
  }
})();
});

// Animation remover after complete
document.addEventListener("DOMContentLoaded", function () {
  var searchEngineImage = document.getElementById("search-engine-image");
  var downArrowImage = document.getElementById("down-arrow-circle");

  searchEngineImage.addEventListener("animationend", function () {
    searchEngineImage.style.removeProperty("animation");
  });

  downArrowImage.addEventListener("animationend", function () {
    downArrowImage.style.removeProperty("animation");
  });
});


// Image draggable
window.addEventListener('load', () => {
  const images = document.querySelectorAll('img');

  images.forEach(img => {
    img.setAttribute('draggable', 'false');
  });
});


//ai-button working
document.addEventListener("DOMContentLoaded", function() {
  var button1 = document.getElementById("ai-button1");
  var button2 = document.getElementById("ai-button2");
  var button3 = document.getElementById("ai-button3");
  
  button1.addEventListener("click", function() {
    openLinkInSameTab("https://www.bing.com/chat");
  });
  
  button2.addEventListener("click", function() {
    openLinkInSameTab("https://bard.google.com/");
  });
  
  button3.addEventListener("click", function() {
    openLinkInSameTab("https://chat.openai.com/");
  });
});

function openLinkInSameTab(url) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs[0]) {
      chrome.tabs.update(tabs[0].id, { url: url });
    }
  });
}



















//add links


document.addEventListener("DOMContentLoaded", function() {
  const addButton = document.getElementById("add-link-button");
  addButton.addEventListener("click", function() {
    addLink(); // Call addLink without passing any argument
  });

  // Load links from storage and create link buttons
  loadLinks();

  function addLink(url) {
    if (!url) {
        url = prompt("Enter the URL for the new link:");
        if (!url) return;
    }

    // Check if URL starts with "http://" or "https://"
    const hasProtocol = url.startsWith("http://") || url.startsWith("https://");

    // If URL doesn't start with a protocol, prepend "http://"
    if (!hasProtocol) {
        url = "http://" + url;
    }

    // Create a new link button
    const newLinkButton = document.createElement("button");
    newLinkButton.className = "link";
    newLinkButton.dataset.url = url;

    fetchIcon(url)
        .then(iconUrl => {
            const newLinkImage = document.createElement("img");
            newLinkImage.src = iconUrl;
            newLinkImage.className = "link";
            newLinkButton.appendChild(newLinkImage);
        })
        .catch(() => {
            // Use default icon if fetching fails
            const defaultIconUrl = "img/default-icon.png"; // Replace with actual default icon URL
            const defaultLinkImage = document.createElement("img");
            defaultLinkImage.src = defaultIconUrl;
            defaultLinkImage.className = "link";
            newLinkButton.appendChild(defaultLinkImage);
        });



    // Insert the new link button above the "Add" button
    const addLinkButton = document.getElementById("add-link-button");
    addLinkButton.parentNode.insertBefore(newLinkButton, addLinkButton);

    // Save links to storage
    saveLinks();
}


  async function fetchIcon(url) {
    try {
      const response = await fetch(`https://www.google.com/s2/favicons?sz=256&domain=${encodeURIComponent(url)}`);
      if (response.ok) {
        return response.url;
      } else {
        throw new Error("Failed to fetch icon");
      }
    } catch (error) {
      return "img/default-icon.png"; // Return default icon on error
    }
  }

  function saveLinks() {
    const linkButtons = document.querySelectorAll(".link[data-url]");
    const links = Array.from(linkButtons).map(button => button.dataset.url);
    localStorage.setItem("links", JSON.stringify(links));
  }

  function loadLinks() {
    const storedLinks = localStorage.getItem("links");
    if (storedLinks) {
      const links = JSON.parse(storedLinks);
      links.forEach(url => {
        addLink(url);
      });
    }
  }
});

































document.addEventListener("DOMContentLoaded", function() {
  const toggleButton = document.getElementById("down-arrow");
  const addButton = document.getElementById("add-link-button");
  const originalButtonImage = toggleButton.querySelector("img").src;
  const toggleButtonImage = document.getElementById("down-arrow-circle");
  let removeLinksMode = false;

  toggleButton.addEventListener("click", function() {
    removeLinksMode = !removeLinksMode;

    if (removeLinksMode) {
      toggleButton.querySelector("img").src = "img/remove-link.png";
      addButton.style.pointerEvents = "none"; // Disable the "Add Link" button
      disableLinkOpening(); // Call function to disable link opening
      toggleButtonImage.classList.remove("remove-animation");
      infoBox.textContent = "Click on a link to remove.";
      infoBox.style.transform = "translate(-50%, 0%)";
      infoBox.style.opacity = "1";
      infoBox.style.animation = "none";

    } else {
      toggleButton.querySelector("img").src = originalButtonImage;
      addButton.style.pointerEvents = "auto"; // Enable the "Add Link" button
      enableLinkOpening(); // Call function to enable link opening
      toggleButtonImage.classList.add("remove-animation");
      infoBox.style.transform = "translate(-50%, 110%)";
      infoBox.style.opacity = "0";
    }

    const linkButtons = document.querySelectorAll(".link");
    linkButtons.forEach(linkButton => {
      linkButton.classList.toggle("remove-mode", removeLinksMode);
    });
  });

  document.addEventListener("click", function(event) {
    if (removeLinksMode && event.target.classList.contains("link")) {
      const linkButton = event.target;
      const url = linkButton.dataset.url;

      // Remove link from storage
      removeLinkFromStorage(url);

      // Remove link button
      linkButton.remove();
    }
  });

  function removeLinkFromStorage(url) {
    const storedLinks = localStorage.getItem("links");
    if (storedLinks) {
      const links = JSON.parse(storedLinks);
      const updatedLinks = links.filter(link => link !== url);
      localStorage.setItem("links", JSON.stringify(updatedLinks));
    }
  }

  function disableLinkOpening() {
    const linkButtons = document.querySelectorAll(".link");
    linkButtons.forEach(linkButton => {
      linkButton.removeEventListener("click", openLink);
    });
  }

  function enableLinkOpening() {
    const linkButtons = document.querySelectorAll(".link");
    linkButtons.forEach(linkButton => {
      linkButton.addEventListener("click", openLink);
    });
  }

  function openLink(event) {
    const url = event.currentTarget.dataset.url;
    if (url) {
      window.location.href = url;
    }
  }

  // Enable link opening by default
  enableLinkOpening();
});













// quick search button function begin

  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('searchbox');
  const quickSearchButtons = document.querySelectorAll('.quick-search');

  quickSearchButtons.forEach(button => {
    button.addEventListener('click', () => {
      const predeterminedValue = button.getAttribute('data-value');
      searchInput.value = predeterminedValue;
      searchForm.submit();
    });
  });
  
// quick search button function end














//disable right click on images
var images = document.querySelectorAll("img");

    // Add event listener to each image to disable right-click
    images.forEach(function(image) {
        image.addEventListener("contextmenu", function(e) {
            e.preventDefault();
        });
    });
    //disable right click on images
    