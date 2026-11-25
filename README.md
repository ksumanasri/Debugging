# CampusCafe

CampusCafe is an original, responsive campus café website built with HTML, CSS, and vanilla JavaScript. Its homepage introduces the café with a highlight carousel, circular category shortcuts, recommended products, and a café story before leading into the searchable 12-item menu, cart, and sample checkout.

## Features

- Explore an original CampusCafe landing page with highlight slides, category shortcuts, and a café story section.
- Add featured recommendations to the cart without leaving the landing page.
- Use the header search shortcut or category circles to jump directly to the full menu.
- Browse 12 café drinks, snacks, meals, and treats with original product icons.
- Filter by category and search menu names, descriptions, or category terms.
- Add products to the cart, adjust quantities, and see the item count and subtotal update.
- Keep cart contents between the menu and checkout pages using browser local storage.
- Apply `STUDENT15` for 15% off the subtotal when it is at least ₹150.
- Review 5% GST, discount, and grand total before confirming an order.
- Validate student details and display a generated Order ID on confirmation.
- Read the café story, sample location, opening hours, and pickup notes on separate pages.
- Open pickup information directly from the order sidebar.
- Responsive layout, skip navigation, keyboard focus styles, and screen-reader labels/status messages.
- Show a clear warning and prevent checkout if browser storage cannot save or read the cart.

## Run locally

No package installation or build step is required.

1. Download or clone this repository.
2. Open `index.html` in a modern web browser.
3. Use the homepage highlights, category circles, or **Menu** navigation to explore the menu.
4. Add items from a recommendation or menu card, then choose **Continue to checkout**.

The app uses browser `localStorage` to keep the cart. If testing in a browser that restricts storage on local files, serve the project with a local static web server instead.

## Project structure

```text
CampusCafe/
├── assets/
│   ├── bg-pattern.svg
│   └── icons/
│       ├── bowl.svg
│       ├── chai.svg
│       ├── cookie.svg
│       ├── coffee.svg
│       ├── juice.svg
│       ├── lassi.svg
│       ├── muffin.svg
│       ├── sandwich.svg
│       └── wrap.svg
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
├── styles/
│   ├── main.css
│   └── theme.css
├── CampusCafe_Debugging_Report_Completed.docx
└── index.html
```

## Screenshots

The “before” image reproduces the original broken resource paths and script-loading order; it is not a historical screenshot. The refreshed “after” image shows the current responsive homepage viewport, including the updated navigation, welcome bar, and start of the hero; it is not a full-page capture.

| Before debugging | After debugging |
| --- | --- |
| ![Before debugging: menu assets and scripts fail to load](screenshots/before.png) | ![Current CampusCafe homepage after redesign](screenshots/after.png) |

## Report

The current Markdown report includes diagnosed bugs, file-by-file corrections, before-and-after code examples, validation, and project limitations: [DEBUGGING_REPORT.md](DEBUGGING_REPORT.md). The Word report, `CampusCafe_Debugging_Report_Completed.docx`, includes matching current code examples and the refreshed “after” screenshot.

## Testing

The menu and checkout flows were tested in a browser, including:

- Category filters, live search, and product image loading.
- Hero previous/next and dot controls, category shortcuts, header search focus, and recommended-item quick add.
- All four menu categories and the new About and Visit navigation pages.
- Adding items, changing quantities, removing cart rows, and calculating the subtotal.
- Cart persistence between pages and blocking checkout for an empty cart.
- Valid and invalid promo codes, including the ₹150 minimum.
- GST and grand-total calculations, student form validation, order confirmation, and cart clearing.
- Keyboard skip navigation and responsive desktop, tablet, and mobile layouts, checked for horizontal overflow from 320px to 1440px.

JavaScript syntax can be checked with:

```powershell
node --check scripts\app.js
node --check scripts\checkout.js
node --check scripts\menuData.js
```

## Limitations

This is a front-end demonstration, not a production ordering system. Orders are not sent to a server, and the generated Order ID is not stored in a database. There is no payment processing or real inventory management.
