context('Pagination table view', () => {
  beforeEach(() => {
    cy.task('db:reset');
    cy.visit('/');
  });

  it('should display TablePagination component', () => {
    cy.get('.MuiTablePagination-root').should('exist');
  });

  it('should show select options and buttons', () => {
    cy.get('.MuiTablePagination-root')
      .find('.MuiTablePagination-select')
      .should('exist');

    cy.get('.MuiTablePagination-root')
      .find('.MuiTablePagination-select')
      .children()
      .should('have.length', 3);

    cy.get('.MuiTablePagination-root')
      .find('button')
      .should('have.length', 4);
  });
});
