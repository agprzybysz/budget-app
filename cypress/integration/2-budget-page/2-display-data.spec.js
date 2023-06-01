context('Display budget', () => {
  beforeEach(() => {
    cy.task('db:reset');

    cy.visit('/budget');
  });

  it('Should display table', () => {
    cy.get('table').should('exist');
  });

  it('should show budget data', () => {
    const rows = cy.get('tbody').children('.MuiTableRow-root');

    const tableText = [
      'Różne',
      'Wydatki prywatne',
      'Inwestycje i oszczędności',
      'Opłaty',
      'Jedzenie',
      'Transport',
      'Mieszkanie',
    ];
    rows.each(($el, idx) => {
      cy.wrap($el).children().should('have.length', 6);

      cy.wrap($el)
        .children()
        .eq(0)
        .children()
        .first()
        .should('have.class', 'MuiCheckbox-root');
      cy.wrap($el).children().eq(1).should('have.text', tableText[idx]);
      cy.wrap($el).children().eq(5).should('include.text', '2022');
    });
  });
});
