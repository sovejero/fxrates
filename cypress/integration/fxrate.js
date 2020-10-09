/// <reference types="Cypress" />

describe('Open webpage', () => {
  const URL = 'http://localhost:8080';
  const todayDate = new Date();
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(todayDate);
  const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(todayDate);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(todayDate);
  const today = `${year}-${month}-${day}`

  before(() => {
    cy.visit(URL);
  });

  it('Default base is "EUR"', () => {
    cy.get('#base').should('have.value', 'EUR');
  });
  it('Default date is today', () => {
    cy.get('#date').should('have.value', today);
  });
  it('Date max is today', () => {
    cy.get('#date').should('have.attr', 'max', today);
  });
  it('Title has default base EUR', () => {
    cy.get('#ratesTitle').contains('EUR');
  });
  it('Title has date today', () => {
    cy.get('#ratesTitle').contains(today);
  });
  it('Number of options equals number of rates', () => {
    cy.get('#ratesBody').children().then( ($ratesBody) => {
      const nrates = $ratesBody.length + 1 //EUR base added
      cy.get('#base').children().should(($base) => {
        expect($base.length).to.eq(nrates)
      })
    })
  })
});
