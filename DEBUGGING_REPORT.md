# CampusCafe Debugging and Enhancement Report

## Project Overview

CampusCafe is a two-page student café ordering website built with HTML, CSS, and JavaScript. The project includes a searchable menu, a shopping cart, and a checkout page with a student promo code.

## Before-and-After Screenshots

The before image reproduces the original broken resource paths and script-loading order. The menu data fails to load, leaving the page unstyled and the menu empty.

![Before debugging: styles and menu items fail to load](screenshots/before.png)

The after image shows the corrected interface with working menu items and a cart containing two products.

![After debugging: corrected menu and working cart](screenshots/after.png)

## Problems Identified

- Several stylesheet, script, image, and page links pointed to incorrect locations.
- The menu data loaded after the application script, preventing the menu from initializing correctly.
- Only one “Add to Cart” button was connected, and adding an item created duplicate cart rows.
- Cart values could be treated as strings, causing incorrect totals.
- The menu and checkout used different browser-storage keys, so checkout could not read the cart.
- The checkout page selected the wrong element for the grand total.
- Category filtering, menu search, quantity controls, promo validation, and order confirmation were unfinished.
- The original background and layout needed more visual polish and responsive behavior.

## Corrections and Improvements

### Resource and Menu Fixes

- Corrected CSS, JavaScript, SVG icon, background image, and page-navigation paths.
- Loaded menu data before the application script.
- Changed item prices to numbers and connected each menu item to its matching SVG icon.

### Menu and Cart

- Implemented category filtering and real-time name search, which work together.
- Connected every “Add to Cart” button and made repeated additions increase quantity.
- Added working plus/minus controls; removing the last unit removes that item.
- Updated the item-count badge and subtotal from cart quantities.
- Prevented checkout navigation when the cart is empty and displayed a helpful message.
- Saved and restored cart contents using the same `campus_cart` key on both pages.

### Checkout

- Corrected the grand-total display and calculated subtotal, 5% GST, discount, and total numerically.
- Implemented `STUDENT15`: 15% off the subtotal for orders of ₹150 or more. Invalid codes and orders below the minimum show an error and apply no discount.
- Required a full name and roll number, blocked confirmation with an empty cart, generated an Order ID, and cleared the saved cart after a valid confirmation.

### Visual Design and Accessibility

- Refined the café color palette, cards, buttons, spacing, and responsive layouts.
- Added a warm cream/caramel/sage background with an original, subtle coffee-bean pattern.
- Added visible keyboard-focus styles, screen-reader labels/status announcements, and reduced-motion support.

## Testing and Validation

The following checks were performed in a browser:

- Confirmed all menu items, SVG icons, and stylesheets load.
- Tested category filters, combined search, cart quantity controls, subtotal calculation, and checkout navigation.
- Tested cart persistence, valid/invalid promo codes, the ₹150 threshold, GST, and grand-total calculations.
- Tested required student details, empty-cart blocking, successful order confirmation, Order ID display, and cart clearing.
- Checked desktop, tablet, and mobile layouts for horizontal overflow and appropriate stacking.
- Ran JavaScript syntax checks on the menu, cart, and checkout scripts.

## Scope and Limitations

This is a front-end demonstration. Cart data is stored in the browser’s local storage; orders are not sent to a server, and the generated Order ID is not backed by a database or payment system.

## Reflection

A single pasted file does not show how the rest of a project is organized, where its assets live, or how pages share data. A workspace-aware tool can inspect related HTML, CSS, JavaScript, and assets together, trace cross-file issues, and verify changes in the running application.
