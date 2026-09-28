/**
 * Inventory list for the volume calculator.
 *
 * SOURCE: the survey inventory supplied for removalstochina.com (the same
 * client), reproduced unchanged in volume and pack type. Its provenance for
 * the NZ operator must be confirmed — see docs/CONTENT-VERIFICATION.md, V-07.
 *
 * The source list was written in Australian and New Zealand trade terms ("Glory
 * Box", "Rumpus", "Kitchen Tidy"). It was anglicised for the UK site and is
 * used here in that neutral form, with beds mapped by dimension rather than by
 * name so the volumes carry across markets unchanged:
 *
 *   single 0.75  .  double 1.20  .  king 1.75  .  super king 2.00
 *
 * (AU/NZ Queen sits where UK King does; AU/NZ King where UK Super King does.)
 *
 * No per-item insurance values are published: the source states no currency,
 * and this site publishes no currency figures (rule B1).
 *
 * INFORMATION-GAIN NOTE (playbook 6.2): every figure below is published on
 * /tools/moving-volume-calculator/ in m³ and cubic feet, so a customer in any
 * market can check the arithmetic and compare quotes on the same basis. These
 * are planning volumes for packed items; a surveyor confirms the real volume
 * before any rate is issued.
 */

export const ITEM_GROUPS = [
  {
    name: "Utility room",
    items: [
      { id: 'utility-room-laundry-basket', label: 'Laundry basket', cbm: 0.15, pack: 'Export Wrapping' },
      { id: 'utility-room-tumble-dryer', label: 'Tumble dryer', cbm: 0.5, pack: 'Export Wrapping' },
      { id: 'utility-room-clothes-airer', label: 'Clothes airer', cbm: 0.05, pack: 'Export Wrapping' },
      { id: 'utility-room-mops-and-brooms', label: 'Mops and brooms', cbm: 0.3, pack: 'Export Wrapping' },
      { id: 'utility-room-washing-machine', label: 'Washing machine', cbm: 0.4, pack: 'Export Wrapping' },
      { id: 'utility-room-small-carton', label: 'Small carton', cbm: 0.05, pack: 'Book Carton' },
      { id: 'utility-room-large-carton', label: 'Large carton', cbm: 0.14, pack: 'Dishpack Carton' }
    ]
  },
  {
    name: "Kitchen",
    items: [
      { id: 'kitchen-kitchen-chair', label: 'Kitchen chair', cbm: 0.15, pack: 'Export Wrapping' },
      { id: 'kitchen-kitchen-bin', label: 'Kitchen bin', cbm: 0.1, pack: 'Dishpack Carton' },
      { id: 'kitchen-microwave', label: 'Microwave', cbm: 0.15, pack: 'Export Wrapping' },
      { id: 'kitchen-fridge-freezer', label: 'Fridge freezer', cbm: 1.0, pack: 'Export Wrapping' },
      { id: 'kitchen-stool', label: 'Stool', cbm: 0.1, pack: 'Export Wrapping' },
      { id: 'kitchen-kitchen-table', label: 'Kitchen table', cbm: 0.7, pack: 'Export Wrapping' },
      { id: 'kitchen-dishwasher', label: 'Dishwasher', cbm: 0.4, pack: 'Export Wrapping' },
      { id: 'kitchen-small-carton', label: 'Small carton', cbm: 0.05, pack: 'Book Carton' },
      { id: 'kitchen-large-carton', label: 'Large carton', cbm: 0.14, pack: 'Dishpack Carton' }
    ]
  },
  {
    name: "Dining room",
    items: [
      { id: 'dining-room-bookcase', label: 'Bookcase', cbm: 0.8, pack: 'Export Wrapping' },
      { id: 'dining-room-dining-chair', label: 'Dining chair', cbm: 0.14, pack: 'Export Wrapping' },
      { id: 'dining-room-china-cabinet', label: 'China cabinet', cbm: 0.75, pack: 'Export Wrapping' },
      { id: 'dining-room-picture-or-framed-print', label: 'Picture or framed print', cbm: 0.09, pack: 'Picture Carton, Export Wrapping' },
      { id: 'dining-room-rug', label: 'Rug', cbm: 0.25, pack: 'Couch Bag' },
      { id: 'dining-room-sideboard', label: 'Sideboard', cbm: 0.85, pack: 'Export Wrapping' },
      { id: 'dining-room-dining-table', label: 'Dining table', cbm: 0.7, pack: 'Export Wrapping' },
      { id: 'dining-room-tea-trolley', label: 'Tea trolley', cbm: 0.25, pack: 'Export Wrapping' },
      { id: 'dining-room-small-carton', label: 'Small carton', cbm: 0.05, pack: 'Book Carton' },
      { id: 'dining-room-large-carton', label: 'Large carton', cbm: 0.14, pack: 'Dishpack Carton' }
    ]
  },
  {
    name: "Living room",
    items: [
      { id: 'living-room-sofa-2-seat', label: 'Sofa, 2-seat', cbm: 1.2, pack: 'Couch Bag' },
      { id: 'living-room-sofa-3-seat', label: 'Sofa, 3-seat', cbm: 1.4, pack: 'Couch Bag' },
      { id: 'living-room-bookcase', label: 'Bookcase', cbm: 0.8, pack: 'Export Wrapping' },
      { id: 'living-room-blanket-box-or-chest', label: 'Blanket box or chest', cbm: 0.28, pack: 'Export Wrapping' },
      { id: 'living-room-china-cabinet', label: 'China cabinet', cbm: 0.75, pack: 'Export Wrapping' },
      { id: 'living-room-coffee-table', label: 'Coffee table', cbm: 0.28, pack: 'Export Wrapping' },
      { id: 'living-room-desk', label: 'Desk', cbm: 0.65, pack: 'Export Wrapping' },
      { id: 'living-room-armchair', label: 'Armchair', cbm: 0.5, pack: 'Couch Bag' },
      { id: 'living-room-footstool', label: 'Footstool', cbm: 0.12, pack: 'Export Wrapping' },
      { id: 'living-room-portable-heater', label: 'Portable heater', cbm: 0.1, pack: 'Export Wrapping' },
      { id: 'living-room-mirror', label: 'Mirror', cbm: 0.05, pack: 'Picture Carton, Export Wrapping' },
      { id: 'living-room-nest-of-tables', label: 'Nest of tables', cbm: 0.15, pack: 'Export Wrapping' },
      { id: 'living-room-piano', label: 'Piano', cbm: 1.5, pack: 'Export Wrapping' },
      { id: 'living-room-picture-or-framed-print', label: 'Picture or framed print', cbm: 0.2, pack: 'Picture Carton, Export Wrapping' },
      { id: 'living-room-potted-plants', label: 'Potted plants', cbm: 0.2, pack: 'Export Wrapping' },
      { id: 'living-room-rug', label: 'Rug', cbm: 0.25, pack: 'Couch Bag' },
      { id: 'living-room-floor-lamp', label: 'Floor lamp', cbm: 0.2, pack: 'Export Wrapping' },
      { id: 'living-room-hi-fi-or-stereo', label: 'Hi-fi or stereo', cbm: 0.25, pack: 'DP Carton/Fragile' },
      { id: 'living-room-hi-fi-cabinet', label: 'Hi-fi cabinet', cbm: 0.25, pack: 'Export Wrapping' },
      { id: 'living-room-television', label: 'Television', cbm: 0.4, pack: 'FS Television Ctn >55' },
      { id: 'living-room-television-cabinet', label: 'Television cabinet', cbm: 0.35, pack: 'Export Wrapping' },
      { id: 'living-room-dvd-or-media-player', label: 'DVD or media player', cbm: 0.1, pack: 'Book Carton' },
      { id: 'living-room-wall-unit', label: 'Wall unit', cbm: 1.3, pack: 'Export Wrapping' },
      { id: 'living-room-small-carton', label: 'Small carton', cbm: 0.05, pack: 'Book Carton' },
      { id: 'living-room-large-carton', label: 'Large carton', cbm: 0.14, pack: 'Dishpack Carton' }
    ]
  },
  {
    name: "Family room",
    items: [
      { id: 'family-room-sofa-2-seat', label: 'Sofa, 2-seat', cbm: 1.2, pack: 'Couch Bag' },
      { id: 'family-room-sofa-3-seat', label: 'Sofa, 3-seat', cbm: 1.4, pack: 'Couch Bag' },
      { id: 'family-room-bookcase', label: 'Bookcase', cbm: 0.7, pack: 'Export Wrapping' },
      { id: 'family-room-cd-rack', label: 'CD rack', cbm: 0.08, pack: 'Export Wrapping' },
      { id: 'family-room-desktop-computer', label: 'Desktop computer', cbm: 0.1, pack: 'DP Carton/Fragile' },
      { id: 'family-room-computer-desk', label: 'Computer desk', cbm: 0.45, pack: 'Export Wrapping' },
      { id: 'family-room-dvd-rack', label: 'DVD rack', cbm: 0.08, pack: 'Export Wrapping' },
      { id: 'family-room-desk', label: 'Desk', cbm: 0.65, pack: 'Export Wrapping' },
      { id: 'family-room-armchair', label: 'Armchair', cbm: 0.5, pack: 'Couch Bag' },
      { id: 'family-room-mirror', label: 'Mirror', cbm: 0.05, pack: 'Picture Carton, Export Wrapping' },
      { id: 'family-room-piano', label: 'Piano', cbm: 1.5, pack: 'Export Wrapping' },
      { id: 'family-room-picture-or-framed-print', label: 'Picture or framed print', cbm: 0.09, pack: 'Picture Carton, Export Wrapping' },
      { id: 'family-room-printer', label: 'Printer', cbm: 0.14, pack: 'DP Carton/Fragile' },
      { id: 'family-room-rug', label: 'Rug', cbm: 0.2, pack: 'Couch Bag' },
      { id: 'family-room-scanner', label: 'Scanner', cbm: 0.2, pack: 'Export Wrapping' },
      { id: 'family-room-standard-lamp', label: 'Standard lamp', cbm: 0.2, pack: 'Export Wrapping' },
      { id: 'family-room-hi-fi-or-stereo', label: 'Hi-fi or stereo', cbm: 0.25, pack: 'DP Carton/Fragile' },
      { id: 'family-room-hi-fi-cabinet', label: 'Hi-fi cabinet', cbm: 0.25, pack: 'Export Wrapping' },
      { id: 'family-room-television', label: 'Television', cbm: 0.4, pack: 'FS Television Ctn >55' },
      { id: 'family-room-television-cabinet', label: 'Television cabinet', cbm: 0.35, pack: 'Export Wrapping' },
      { id: 'family-room-dvd-or-media-player', label: 'DVD or media player', cbm: 0.05, pack: 'Book Carton' },
      { id: 'family-room-small-carton', label: 'Small carton', cbm: 0.05, pack: 'Book Carton' },
      { id: 'family-room-large-carton', label: 'Large carton', cbm: 0.14, pack: 'Dishpack Carton' }
    ]
  },
  {
    name: "Study or playroom",
    items: [
      { id: 'study-or-playroom-small-chest-of-drawers', label: 'Small chest of drawers', cbm: 0.25, pack: 'Export Wrapping' },
      { id: 'study-or-playroom-bookcase', label: 'Bookcase', cbm: 0.7, pack: 'Export Wrapping' },
      { id: 'study-or-playroom-desk-chair', label: 'Desk chair', cbm: 0.25, pack: 'Export Wrapping' },
      { id: 'study-or-playroom-desktop-computer', label: 'Desktop computer', cbm: 0.14, pack: 'DP Carton/Fragile' },
      { id: 'study-or-playroom-computer-desk', label: 'Computer desk', cbm: 0.45, pack: 'Export Wrapping' },
      { id: 'study-or-playroom-desk', label: 'Desk', cbm: 0.65, pack: 'Export Wrapping' },
      { id: 'study-or-playroom-filing-cabinet-2-drawer', label: 'Filing cabinet, 2 drawer', cbm: 0.15, pack: 'Export Wrapping' },
      { id: 'study-or-playroom-filing-cabinet-3-drawer', label: 'Filing cabinet, 3 drawer', cbm: 0.2, pack: 'Export Wrapping' },
      { id: 'study-or-playroom-filing-cabinet-4-drawer', label: 'Filing cabinet, 4 drawer', cbm: 0.35, pack: 'Export Wrapping' },
      { id: 'study-or-playroom-picture-or-framed-print', label: 'Picture or framed print', cbm: 0.09, pack: 'Picture Carton, Export Wrapping' },
      { id: 'study-or-playroom-small-carton', label: 'Small carton', cbm: 0.05, pack: 'Book Carton' },
      { id: 'study-or-playroom-large-carton', label: 'Large carton', cbm: 0.14, pack: 'Dishpack Carton' }
    ]
  },
  {
    name: "Main bedroom",
    items: [
      { id: 'main-bedroom-bed-single', label: 'Bed, single', cbm: 0.75, pack: 'Single Mattress bag' },
      { id: 'main-bedroom-bed-double', label: 'Bed, double', cbm: 1.2, pack: 'Queen Mattress bag' },
      { id: 'main-bedroom-bed-king', label: 'Bed, king', cbm: 1.75, pack: 'Queen Mattress bag' },
      { id: 'main-bedroom-bed-super-king', label: 'Bed, super king', cbm: 2.0, pack: 'S King Mattress bag, Single Mattress bag' },
      { id: 'main-bedroom-bedside-cabinet', label: 'Bedside cabinet', cbm: 0.15, pack: 'Blanket Wrapping' },
      { id: 'main-bedroom-bookcase', label: 'Bookcase', cbm: 0.7, pack: 'Blanket Wrapping' },
      { id: 'main-bedroom-bedroom-chair', label: 'Bedroom chair', cbm: 0.25, pack: 'Couch Bag' },
      { id: 'main-bedroom-chest-of-drawers', label: 'Chest of drawers', cbm: 0.4, pack: 'Blanket Wrapping' },
      { id: 'main-bedroom-desk', label: 'Desk', cbm: 0.65, pack: 'Blanket Wrapping' },
      { id: 'main-bedroom-doll-s-house', label: "Doll's house", cbm: 0.25, pack: 'Blanket Wrapping' },
      { id: 'main-bedroom-dressing-table', label: 'Dressing table', cbm: 0.75, pack: 'Blanket Wrapping' },
      { id: 'main-bedroom-blanket-box', label: 'Blanket box', cbm: 0.28, pack: 'Blanket Wrapping' },
      { id: 'main-bedroom-mirror', label: 'Mirror', cbm: 0.05, pack: 'Picture Carton, Export Wrapping' },
      { id: 'main-bedroom-picture-or-framed-print', label: 'Picture or framed print', cbm: 0.09, pack: 'Picture Carton, Export Wrapping' },
      { id: 'main-bedroom-small-carton', label: 'Small carton', cbm: 0.05, pack: 'Book Carton' },
      { id: 'main-bedroom-large-carton', label: 'Large carton', cbm: 0.14, pack: 'Dishpack Carton' }
    ]
  },
  {
    name: "Bedroom 2",
    items: [
      { id: 'bedroom-2-bed-single', label: 'Bed, single', cbm: 0.75, pack: 'Single Mattress bag' },
      { id: 'bedroom-2-bed-double', label: 'Bed, double', cbm: 1.2, pack: 'Queen Mattress bag' },
      { id: 'bedroom-2-bed-king', label: 'Bed, king', cbm: 1.75, pack: 'Queen Mattress bag' },
      { id: 'bedroom-2-bed-super-king', label: 'Bed, super king', cbm: 2.0, pack: 'S King Mattress bag, Single Mattress bag' },
      { id: 'bedroom-2-bedside-cabinet', label: 'Bedside cabinet', cbm: 0.15, pack: 'Blanket Wrapping' },
      { id: 'bedroom-2-bookcase', label: 'Bookcase', cbm: 0.7, pack: 'Blanket Wrapping' },
      { id: 'bedroom-2-bedroom-chair', label: 'Bedroom chair', cbm: 0.25, pack: 'Couch Bag' },
      { id: 'bedroom-2-chest-of-drawers', label: 'Chest of drawers', cbm: 0.4, pack: 'Blanket Wrapping' },
      { id: 'bedroom-2-desk', label: 'Desk', cbm: 0.65, pack: 'Blanket Wrapping' },
      { id: 'bedroom-2-doll-s-house', label: "Doll's house", cbm: 0.25, pack: 'Blanket Wrapping' },
      { id: 'bedroom-2-dressing-table', label: 'Dressing table', cbm: 0.75, pack: 'Export Wrapping' },
      { id: 'bedroom-2-blanket-box', label: 'Blanket box', cbm: 0.28, pack: 'Export Wrapping' },
      { id: 'bedroom-2-mirror', label: 'Mirror', cbm: 0.05, pack: 'Picture Carton, Export Wrapping' },
      { id: 'bedroom-2-picture-or-framed-print', label: 'Picture or framed print', cbm: 0.09, pack: 'Picture Carton, Export Wrapping' },
      { id: 'bedroom-2-small-carton', label: 'Small carton', cbm: 0.05, pack: 'Book Carton' },
      { id: 'bedroom-2-large-carton', label: 'Large carton', cbm: 0.14, pack: 'Dishpack Carton' }
    ]
  },
  {
    name: "Bedroom 3",
    items: [
      { id: 'bedroom-3-bed-single', label: 'Bed, single', cbm: 0.75, pack: 'Single Mattress bag' },
      { id: 'bedroom-3-bed-double', label: 'Bed, double', cbm: 1.2, pack: 'Queen Mattress bag' },
      { id: 'bedroom-3-bed-king', label: 'Bed, king', cbm: 1.75, pack: 'Queen Mattress bag' },
      { id: 'bedroom-3-bed-super-king', label: 'Bed, super king', cbm: 2.0, pack: 'S King Mattress bag, Single Mattress bag' },
      { id: 'bedroom-3-bedside-cabinet', label: 'Bedside cabinet', cbm: 0.15, pack: 'Blanket Wrapping' },
      { id: 'bedroom-3-bookcase', label: 'Bookcase', cbm: 0.7, pack: 'Blanket Wrapping' },
      { id: 'bedroom-3-bedroom-chair', label: 'Bedroom chair', cbm: 0.25, pack: 'Couch Bag' },
      { id: 'bedroom-3-chest-of-drawers', label: 'Chest of drawers', cbm: 0.4, pack: 'Blanket Wrapping' },
      { id: 'bedroom-3-desk', label: 'Desk', cbm: 0.65, pack: 'Blanket Wrapping' },
      { id: 'bedroom-3-doll-s-house', label: "Doll's house", cbm: 0.25, pack: 'Blanket Wrapping' },
      { id: 'bedroom-3-dressing-table', label: 'Dressing table', cbm: 0.75, pack: 'Blanket Wrapping' },
      { id: 'bedroom-3-blanket-box', label: 'Blanket box', cbm: 0.28, pack: 'Blanket Wrapping' },
      { id: 'bedroom-3-mirror', label: 'Mirror', cbm: 0.05, pack: 'Picture Carton, Export Wrapping' },
      { id: 'bedroom-3-picture-or-framed-print', label: 'Picture or framed print', cbm: 0.09, pack: 'Picture Carton, Export Wrapping' },
      { id: 'bedroom-3-small-carton', label: 'Small carton', cbm: 0.05, pack: 'Book Carton' },
      { id: 'bedroom-3-large-carton', label: 'Large carton', cbm: 0.14, pack: 'Dishpack Carton' }
    ]
  },
  {
    name: "Bedroom 4",
    items: [
      { id: 'bedroom-4-bed-single', label: 'Bed, single', cbm: 0.75, pack: 'Single Mattress bag' },
      { id: 'bedroom-4-bed-double', label: 'Bed, double', cbm: 1.2, pack: 'Queen Mattress bag' },
      { id: 'bedroom-4-bed-king', label: 'Bed, king', cbm: 1.75, pack: 'Queen Mattress bag' },
      { id: 'bedroom-4-bed-super-king', label: 'Bed, super king', cbm: 2.0, pack: 'S King Mattress bag, Single Mattress bag' },
      { id: 'bedroom-4-bedside-cabinet', label: 'Bedside cabinet', cbm: 0.15, pack: 'Blanket Wrapping' },
      { id: 'bedroom-4-bookcase', label: 'Bookcase', cbm: 0.7, pack: 'Blanket Wrapping' },
      { id: 'bedroom-4-bedroom-chair', label: 'Bedroom chair', cbm: 0.25, pack: 'Couch Bag' },
      { id: 'bedroom-4-chest-of-drawers', label: 'Chest of drawers', cbm: 0.4, pack: 'Blanket Wrapping' },
      { id: 'bedroom-4-desk', label: 'Desk', cbm: 0.65, pack: 'Blanket Wrapping' },
      { id: 'bedroom-4-doll-s-house', label: "Doll's house", cbm: 0.25, pack: 'Blanket Wrapping' },
      { id: 'bedroom-4-dressing-table', label: 'Dressing table', cbm: 0.75, pack: 'Blanket Wrapping' },
      { id: 'bedroom-4-blanket-box', label: 'Blanket box', cbm: 0.28, pack: 'Blanket Wrapping' },
      { id: 'bedroom-4-mirror', label: 'Mirror', cbm: 0.05, pack: 'Picture Carton, Export Wrapping' },
      { id: 'bedroom-4-picture-or-framed-print', label: 'Picture or framed print', cbm: 0.09, pack: 'Picture Carton, Export Wrapping' },
      { id: 'bedroom-4-small-carton', label: 'Small carton', cbm: 0.05, pack: 'Book Carton' },
      { id: 'bedroom-4-large-carton', label: 'Large carton', cbm: 0.14, pack: 'Dishpack Carton' }
    ]
  },
  {
    name: "Hall and landing",
    items: [
      { id: 'hall-and-landing-bookcase', label: 'Bookcase', cbm: 0.7, pack: 'Export Wrapping' },
      { id: 'hall-and-landing-hall-chair', label: 'Hall chair', cbm: 0.25, pack: 'Export Wrapping' },
      { id: 'hall-and-landing-laundry-basket', label: 'Laundry basket', cbm: 0.15, pack: 'Export Wrapping' },
      { id: 'hall-and-landing-display-cabinet', label: 'Display cabinet', cbm: 1.0, pack: 'Export Wrapping' },
      { id: 'hall-and-landing-coat-or-hat-stand', label: 'Coat or hat stand', cbm: 0.25, pack: 'Export Wrapping' },
      { id: 'hall-and-landing-hall-table', label: 'Hall table', cbm: 0.3, pack: 'Export Wrapping' },
      { id: 'hall-and-landing-mirror', label: 'Mirror', cbm: 0.05, pack: 'Picture Carton, Export Wrapping' },
      { id: 'hall-and-landing-picture-or-framed-print', label: 'Picture or framed print', cbm: 0.09, pack: 'Picture Carton, Export Wrapping' },
      { id: 'hall-and-landing-rug', label: 'Rug', cbm: 0.25, pack: 'Couch Bag' },
      { id: 'hall-and-landing-console-table', label: 'Console table', cbm: 0.4, pack: 'Export Wrapping' },
      { id: 'hall-and-landing-small-carton', label: 'Small carton', cbm: 0.05, pack: 'Book Carton' },
      { id: 'hall-and-landing-large-carton', label: 'Large carton', cbm: 0.14, pack: 'Dishpack Carton' }
    ]
  },
  {
    name: "Garage and workshop",
    items: [
      { id: 'garage-and-workshop-bench', label: 'Bench', cbm: 0.5, pack: 'Export Wrapping' },
      { id: 'garage-and-workshop-bicycle', label: 'Bicycle', cbm: 0.7, pack: 'Export Wrapping' },
      { id: 'garage-and-workshop-air-compressor', label: 'Air compressor', cbm: 0.5, pack: 'Export Wrapping' },
      { id: 'garage-and-workshop-cupboard', label: 'Cupboard', cbm: 1.0, pack: 'Export Wrapping' },
      { id: 'garage-and-workshop-garden-tools', label: 'Garden tools', cbm: 0.25, pack: 'Export Wrapping' },
      { id: 'garage-and-workshop-car-jack', label: 'Car jack', cbm: 0.2, pack: 'Export Wrapping' },
      { id: 'garage-and-workshop-ladder', label: 'Ladder', cbm: 0.35, pack: 'Export Wrapping' },
      { id: 'garage-and-workshop-lawn-mower', label: 'Lawn mower', cbm: 0.8, pack: 'Export Wrapping' },
      { id: 'garage-and-workshop-shelving-unit', label: 'Shelving unit', cbm: 1.0, pack: 'Export Wrapping' },
      { id: 'garage-and-workshop-toolbox', label: 'Toolbox', cbm: 0.25, pack: 'Export Wrapping' },
      { id: 'garage-and-workshop-trunk', label: 'Trunk', cbm: 0.35, pack: 'Export Wrapping' },
      { id: 'garage-and-workshop-wheelbarrow', label: 'Wheelbarrow', cbm: 0.8, pack: 'Export Wrapping' },
      { id: 'garage-and-workshop-workbench', label: 'Workbench', cbm: 0.5, pack: 'Export Wrapping' },
      { id: 'garage-and-workshop-small-carton', label: 'Small carton', cbm: 0.05, pack: 'Book Carton' },
      { id: 'garage-and-workshop-large-carton', label: 'Large carton', cbm: 0.14, pack: 'Dishpack Carton' }
    ]
  },
  {
    name: "Garden and outdoor",
    items: [
      { id: 'garden-and-outdoor-barbecue', label: 'Barbecue', cbm: 0.7, pack: 'Export Wrapping' },
      { id: 'garden-and-outdoor-bird-bath', label: 'Bird bath', cbm: 0.3, pack: 'Export Wrapping' },
      { id: 'garden-and-outdoor-dog-kennel', label: 'Dog kennel', cbm: 1.0, pack: 'Export Wrapping' },
      { id: 'garden-and-outdoor-garden-ornament', label: 'Garden ornament', cbm: 0.1, pack: 'Export Wrapping' },
      { id: 'garden-and-outdoor-golf-bag', label: 'Golf bag', cbm: 0.25, pack: 'Export Wrapping' },
      { id: 'garden-and-outdoor-garden-chair', label: 'Garden chair', cbm: 0.2, pack: 'Export Wrapping' },
      { id: 'garden-and-outdoor-garden-table', label: 'Garden table', cbm: 1.0, pack: 'Export Wrapping' },
      { id: 'garden-and-outdoor-swing-set', label: 'Swing set', cbm: 1.5, pack: 'Export Wrapping' },
      { id: 'garden-and-outdoor-trampoline', label: 'Trampoline', cbm: 2.0, pack: 'Export Wrapping' },
      { id: 'garden-and-outdoor-parasol', label: 'Parasol', cbm: 0.2, pack: 'Export Wrapping' },
      { id: 'garden-and-outdoor-wheelbarrow', label: 'Wheelbarrow', cbm: 0.8, pack: 'Export Wrapping' },
      { id: 'garden-and-outdoor-small-carton', label: 'Small carton', cbm: 0.05, pack: 'Book Carton' },
      { id: 'garden-and-outdoor-large-carton', label: 'Large carton', cbm: 0.14, pack: 'Dishpack Carton' }
    ]
  }
];

/**
 * How a given volume is normally consolidated on the long-haul lanes to New Zealand.
 * `max` is in cubic metres. These describe routing, not price.
 */
export const LOAD_BANDS = [
  { max: 2, label: 'Excess baggage or a small part load — usually shipped as groupage' },
  { max: 6, label: 'Part load (LCL groupage) — typical of a studio or one-bedroom move' },
  { max: 15, label: 'Part load (LCL groupage) — typical of a two-bedroom move' },
  { max: 33, label: 'A 20ft container may become the better option at this volume' },
  { max: 67, label: 'A 40ft container is the usual choice at this volume' },
  { max: Infinity, label: 'More than one container — we will plan the split with you' }
];

/** Standard usable loading volumes for dry containers, used for comparison only. */
export const CONTAINER_CAPACITY = [
  { name: '20ft standard container', cbm: 33, note: 'Roughly a three-bedroom house' },
  { name: '40ft standard container', cbm: 67, note: 'Roughly a four to five-bedroom house' },
  { name: '40ft high-cube container', cbm: 76, note: 'Extra height for bulky but light loads' }
];
