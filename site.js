const contacts = {
	brandon: {
		name: "Brandon",
		email: "brandon@highfunctioningchaos.living",
		note: "App, website, planning tools, and general questions.",
	},
	monica: {
		name: "Monica",
		email: "monica@highfunctioningchaos.living",
		note: "Blog, podcast, and community messages.",
	},
	nevaeh: {
		name: "Brandon",
		email: "brandon@highfunctioningchaos.living",
		note: "Nice try. She's a minor. Her dad says no.",
	},
	shop: {
		name: "Shop Help",
		email: "leadbraincell@highfunctioningchaos.living",
		note: "Orders, downloads, merch, bundles, and anything commerce-related.",
	},
};

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const mobileNavigation = window.matchMedia("(max-width: 1100px)");

function setNavigationOpen(isOpen, restoreFocus = false) {
	document.body.classList.toggle("menu-open", isOpen);
	navToggle?.setAttribute("aria-expanded", String(isOpen));
	navToggle?.setAttribute(
		"aria-label",
		isOpen ? "Close navigation" : "Open navigation",
	);
	if (restoreFocus) navToggle?.focus();
}

navToggle?.addEventListener("click", () => {
	setNavigationOpen(!document.body.classList.contains("menu-open"));
});

navLinks?.querySelectorAll("a").forEach((link) => {
	link.addEventListener("click", () => setNavigationOpen(false));
});

document.addEventListener("keydown", (event) => {
	if (!document.body.classList.contains("menu-open")) return;
	if (event.key === "Escape") {
		setNavigationOpen(false, true);
		return;
	}
	// The expanded mobile menu covers the page; keep keyboard focus inside it.
	if (event.key === "Tab" && mobileNavigation.matches) {
		const lastLink = navLinks?.querySelector("li:last-child a");
		if (event.shiftKey && document.activeElement === navToggle) {
			event.preventDefault();
			lastLink?.focus();
		} else if (!event.shiftKey && document.activeElement === lastLink) {
			event.preventDefault();
			navToggle?.focus();
		}
	}
});
mobileNavigation.addEventListener("change", () => setNavigationOpen(false));

const contactButtons = document.querySelectorAll(".contact-btn");
contactButtons.forEach((button) => {
	button.setAttribute(
		"aria-pressed",
		String(button.classList.contains("active")),
	);
	button.addEventListener("click", () => {
		const contact = contacts[button.dataset.contact];
		if (!contact) return;
		contactButtons.forEach((item) => {
			item.classList.toggle("active", item === button);
			item.setAttribute("aria-pressed", String(item === button));
		});
		document.getElementById("contact-name").textContent = contact.name;
		document.getElementById("contact-note").textContent = contact.note;
		const email = document.getElementById("contact-email");
		email.textContent = contact.email;
		email.href = `mailto:${contact.email}`;
	});
});
