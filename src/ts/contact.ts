

function initContact(): void {
   
    const form = document.getElementById("contactForm") as HTMLFormElement | null;
    const nameInput = document.getElementById("name") as HTMLInputElement | null;
    const emailInput = document.getElementById("email") as HTMLInputElement | null;
    const topicInput = document.getElementById("topic") as HTMLInputElement | null;
    const messageInput = document.getElementById("message") as HTMLTextAreaElement | null;
    const msg = document.getElementById("formMsg");

  
    if (!form || !emailInput || !nameInput || !topicInput || !messageInput || !msg) {
        return;
    }

    console.log("Contact stranica inicijalizovana!");

    
    const validateEmail = (email: string): boolean => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    
    emailInput.addEventListener("input", () => {
        if (emailInput.value === "") {
            emailInput.style.borderColor = "#B92770";
            return;
        }
        if (!validateEmail(emailInput.value)) {
            emailInput.style.borderColor = "red";
        } else {
            emailInput.style.borderColor = "green";
        }
    });

    
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!nameInput.value.trim() || !emailInput.value.trim() || !topicInput.value.trim() || !messageInput.value.trim()) {
            msg.textContent = "All fields are required!";
            msg.style.color = "red";
            return;
        }

        if (!validateEmail(emailInput.value)) {
            msg.textContent = "Please enter a valid email address!";
            msg.style.color = "red";
            return;
        }

        msg.textContent = "Message sent successfully!";
        msg.style.color = "green";
        form.reset();
        emailInput.style.borderColor = "#B92770";
    });
}

(window as any).initContact = initContact;

document.addEventListener("DOMContentLoaded", initContact);
