# 🎨 CSS Animation Gallery

Icon UI Playground is a practical reference application for building
icon-based UI components with theme and accessibility support.

It is designed to be useful in real-world frontend workflows
and is open for community contributions.
---

## Why This Project Exists

Modern user interfaces rely heavily on icons and subtle interactions.
This project exists to provide a clean environment where these patterns
can be tested, reviewed, and improved without the overhead of a full application.
---

## Key Capabilities

- Icon-based UI components and interactions
- Light and dark theme support using CSS variables
- Accessibility-aware animations (`prefers-reduced-motion`)
- Clean and reusable component structure

## 🧩 Project Structure
```
icon-ui-playground/
│
├── index.html                    # Homepage gallery
├── README.md                     # Project documentation
├── CONTRIBUTING.md               # Contribution guidelines
│
├── css/                          # Stylesheets
│   ├── base.css                 # Layout and base styles
│   ├── theme.css                # Light/Dark theme variables
│   ├── accessibility.css        # Reduced motion support
│   ├── animations.css           # Animation utilities
│   ├── animation-theme.css      # Animation theme styles
│   └── styles.css               # Additional styles
│
├── js/                           # JavaScript files
│   └── theme.js                 # Theme toggle logic
│
├── components/                   # Reusable component examples
│   ├── button.html              # Button component
│   ├── card.html                # Card component
│   └── loader.html              # Loader component
│
├── animations/                   # Animation demos
│   ├── button/
│   │   └── button-hover.html    # Button hover animation
│   ├── text/
│   │   └── text-fade-in.html    # Text fade-in animation
│   └── loader/
│       └── loader-spin.html     # Loader spin animation
│
└── docs/                         # Documentation (future use)
```

---

## 🚀 How to Run the Project

1. Clone the repository
   ```bash
   git clone https://github.com/Pratham-0410/icon-ui-playground.git

   	2.	Open the project in VS Code / Cursor
	3.	Right-click index.html
	4.	Select Open with Live Server

⚠️ Important: Use Live Server so theme preference works correctly across pages.

⸻

♿ Accessibility

This project respects system accessibility preferences:
	•	Animations automatically reduce or disable when prefers-reduced-motion is enabled.
	•	Color contrast is maintained in both light and dark themes.

⸻

🤝 Contributing

This project is beginner-friendly and welcomes contributions.
	•	Look for issues labeled good first issue or beginner
	•	Each animation is isolated and easy to understand
	•	Keep changes small and focused

For detailed steps, see CONTRIBUTING.md￼.

⸻

🚧 Repository temporarily frozen 🚧

This repository is currently being prepared for an upcoming open-source event.
Please avoid opening new issues or PRs for now.

We’ll reopen contributions very soon — stay tuned!
