const appName = "FundiLink";

function welcomeUser() {
    console.log("Welcome to " + appName + "!");
    console.log("Find reliable home service professionals near you.");
}

welcomeUser();

const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const contactData = {
        name: name,
        email: email,
        message: message
    };
    fetch("http://localhost:3004/api/providers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contactData)
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(function(data) {
        console.log("Contact form submitted successfully:", data);
        alert("Thank you for contacting FundiLink! We will get back to you shortly.");
    })
    .catch(function(error) {
        console.error("Error submitting contact form:", error);
        alert("Failed to submit contact form. Please try again later.");
    });
});

const serviceButtons = document.querySelectorAll(".find-service");
const serviceMessage = document.getElementById("serviceMessage");

serviceButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const selectedService = button.getAttribute("data-service");
        
        if(serviceMessage) {
            serviceMessage.textContent = "You selected: " + selectedService + ". Please contact us for more information.";
        }
    });
});
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    function filterProviders() {
        const searchText = searchInput.value.toLowerCase();
        const providerCards = document.querySelectorAll("#providerList .col-md-4");

        providerCards.forEach(function(card) {
            const providerName = card.textContent.toLowerCase();

            if (providerName.includes(searchText)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    }

    searchButton.addEventListener("click", filterProviders);
    searchInput.addEventListener("input", filterProviders);

const providerList = document.getElementById("providerList");

console.log("Fetching service providers from the server...");

fetch("/api/providers")
    .then(function(response) {
        if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
    })

    .then(providers => {
        console.log("Service providers fetched successfully:", providers);
        providerList.innerHTML = "";
        providers.forEach(provider => {
            const providerCard = document.createElement("div");
            providerCard.className = "col-md-4 mb-4";

            providerCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${provider.name}</h5>
                        <p class="card-text">Service: ${provider.service}</p>
                        <p class="card-text">Location: ${provider.location}</p>
                    </div>
                </div>
            `;
            providerList.appendChild(providerCard);
        });
    })
    .catch(function(error) {
        console.error("Error fetching providers:", error);
        providerList.textContent = "Failed to load service providers. Please try again later.";
    });
