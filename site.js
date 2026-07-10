const siteConfig = {
  newsletterEndpoint: "",
  productInterestEndpoint: ""
};

const contacts = {
  brandon: {
    name: "Brandon",
    email: "brandon@highfunctioningchaos.living",
    note: "Systems, site, shop, logistics, and blunt-force clarity."
  },
  monica: {
    name: "Monica",
    email: "monica@highfunctioningchaos.living",
    note: "Story, community, emotional honesty, and the stuff everyone keeps dancing around."
  },
  nevaeh: {
    name: "Brandon",
    email: "brandon@highfunctioningchaos.living",
    note: "Nice try. She's a minor. Her dad says no."
  },
  shop: {
    name: "Shop Help",
    email: "leadbraincell@highfunctioningchaos.living",
    note: "Orders, downloads, merch, bundles, and anything commerce-related."
  }
};

const navToggle = document.querySelector(".nav-toggle");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
    }
  });
});

document.querySelectorAll(".contact-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".contact-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const contact = contacts[button.dataset.contact];
    document.getElementById("contact-name").textContent = contact.name;
    document.getElementById("contact-note").textContent = contact.note;
    document.getElementById("contact-email").textContent = contact.email;
    document.getElementById("contact-email").href = `mailto:${contact.email}`;
  });
});

document.querySelectorAll(".buy-button").forEach((button) => {
  button.addEventListener("click", () => {
    window.alert("Not live yet. You are on the imaginary waitlist, which is still somehow more organized than most of our lives.");
  });
});

document.querySelectorAll(".signup-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = new FormData(form).get("email");
    const endpoint = form.dataset.endpoint || siteConfig.newsletterEndpoint;

    if (endpoint) {
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "hfc-site", submittedAt: new Date().toISOString() })
      }).catch(() => {});
    }

    form.reset();
    window.alert("You're on the list. No confetti cannon. Just noted.");
  });
});
