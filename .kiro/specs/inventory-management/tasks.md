# Implementation Plan

- [ ] 1. Update Prisma schema
  - Add inventory fields to Product model
  - Add quantity, lowStockThreshold, status fields
  - Run migration
  - _Requirements: 1.1, 1.2_

- [ ] 2. Create inventory utilities
  - Create stock status calculation function
  - Add stock validation functions
  - _Requirements: 1.3, 1.4, 2.2_

- [ ] 3. Create admin inventory page
  - Create /admin/inventory page
  - Display all products with stock levels
  - Show product name, SKU, quantity, status
  - Highlight low stock items
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 4. Create stock update form
  - Add inline editing for stock quantity
  - Implement validation
  - Save updates to database
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ] 5. Create low stock alerts
  - Add alerts section to admin dashboard
  - Display products below threshold
  - Add badge count for alerts
  - _Requirements: 3.1, 3.2, 3.3_

- [ ] 6. Add stock status to product display
  - Show stock status on product cards
  - Disable add to cart when out of stock
  - Show "Only X left" for low stock
  - _Requirements: 4.1, 4.2, 4.3_

- [ ] 7. Update product seed data
  - Add inventory data to seed script
  - Set initial stock levels
  - _Requirements: 1.1_

- [ ] 8. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
