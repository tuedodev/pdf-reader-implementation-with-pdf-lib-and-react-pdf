export const MAXIMAL_NUMBER_OF_PUBLIC_PAGES = 9999;
/* For each PDF document, you can specify how many pages are freely accessible to the public (as an appetizer), 
the rest can then be made accessible via a payment barrier. This value is best stored as a value together with 
the document at a content provider or in a database. */

export const MOVEMENT_VELOCITY = 0.5;
/* Specifies the horizontal acceleration factor of the mouse or pointer when sliding the pages. Value between 0 and 
1. A lower value slows down the acceleration, a higher value speeds it up.*/

export const MOVEMENT_THRESHOLD = 1;
/* Specifies the threshold in pixels that the mouse or pointer must move in order to trigger a slide.*/
