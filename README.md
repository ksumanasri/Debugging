# CampusCafe

**CampusCafe** is a responsive, front-end campus café website built with HTML, CSS, and vanilla JavaScript. It is designed as a student-friendly ordering demo with a polished menu, persistent cart, and sample checkout flow.

![CampusCafe homepage](screenshots/after.png)

> The project does not submit real orders or process payments. It demonstrates the complete browsing and checkout experience using browser storage only.

## Highlights

- Four-page experience: home/menu, checkout, About, and Visit
- 12-item menu across drinks, snacks, meals, and treats
- Live category filters and menu search
- Featured products and category shortcuts
- Accessible highlight carousel
- Persistent cart using `localStorage`
- Quantity controls, item counts, and live totals
- `STUDENT15` promo for 15% off orders of ₹150 or more
- 5% GST, discount, and grand-total calculations
- Required student-details and order-confirmation validation
- Responsive layouts and keyboard-friendly navigation
- Storage-error and empty-cart feedback

## Preview

| Screen | Preview |
| --- | --- |
| Homepage | [screenshots/after.png](screenshots/after.png) |
| Before debugging | [screenshots/before.png](screenshots/before.png) |
| Report screenshots | [screenshots/report-after.png](screenshots/report-after.png) |

The “before” image is a visual reproduction of the original broken resource and script-loading state. The “after” image shows the refreshed homepage; it is not a full-page capture.

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- Browser `localStorage`
- Original SVG icons and illustrations

No framework, package manager, build tool, or API key is required.

## Getting started

### Option 1: Open directly

1. Clone or download this repository.
2. Open `index.html` in a modern browser.
3. Browse the menu and add items to the cart.

### Option 2: Use a local server

Using a server is recommended because some browsers restrict `localStorage` behavior for local files.

**Python**

```bash
python -m http.server 8000
```

**Node.js**

```bash
npx serve .
```

Then open `http://localhost:8000`.

## Using the demo

1. Use the homepage carousel, category circles, or **Menu** link to browse.
2. Search or filter the 12 available menu items.
3. Add products to the cart and adjust quantities.
4. Choose **Continue to checkout**.
5. Enter `STUDENT15` to receive 15% off when the subtotal is at least ₹150.
6. Enter a full name and roll number, then confirm the order.

The checkout display includes subtotal, 5% GST, discount, and final total. Confirming an order clears the saved cart and generates a one-time Order ID.

## Project structure

```text
.
├── index.html
├── DEBUGGING_REPORT.md
├── CampusCafe_Debugging_Report_Completed.docx
├── assets/
│   ├── bg-pattern.svg
│   └── icons/
├── pages/
│   ├── about.html
│   ├── checkout.html
│   └── visit.html
├── scripts/
│   ├── app.js
│   ├── checkout.js
│   └── menuData.js
├── screenshots/
│   ├── after.png
│   ├── before.png
│   ├── report-after.png
│   └── report-before.png
└── styles/
    ├── main.css
    └── theme.css
```

## Accessibility

- Skip-to-main-content link
- Semantic page and navigation structure
- Descriptive labels and status messages
- Keyboard-visible focus styles
- Carousel controls with ARIA state
- Reduced-motion support
- Responsive viewport from mobile through desktop

## Validation

The menu and checkout flows were checked for:

- Category filtering and live search
- Product image loading
- Carousel, shortcuts, quick-add, and search controls
- Cart quantity and removal behavior
- Persistence across pages
- Empty-cart and unavailable-storage safeguards
- Valid and invalid promo codes
- GST and grand-total calculations
- Student form validation and order confirmation
- Desktop, tablet, and mobile layouts
- Horizontal overflow from 320px to 1440px

Check JavaScript syntax with Node.js:

```bash
node --check scripts/app.js
node --check scripts/checkout.js
node --check scripts/menuData.js
```

## Documentation

- [DEBUGGING_REPORT.md](DEBUGGING_REPORT.md) — diagnosed issues, corrections, code examples, and validation notes
- [CampusCafe_Debugging_Report_Completed.docx](CampusCafe_Debugging_Report_Completed.docx) — matching Word report

## Demo limitations

This is a front-end demonstration, not a production ordering system:

- Orders are not sent to a server.
- Order IDs are not stored in a database.
- There is no payment or inventory integration.
- Visit details and opening hours are sample data.
