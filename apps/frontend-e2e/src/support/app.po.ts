export const getGreeting = () => cy.get('[data-cy="heading"]');
export const get = (selector: string) => cy.get(`[data-cy=${selector}]`);