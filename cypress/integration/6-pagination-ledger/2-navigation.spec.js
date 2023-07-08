context('Pagination - navigation', () => {
  beforeEach(() => {
    cy.task('db:reset');
    cy.visit('/');
  });

  it('should navigate to next page when clicking on button "Go to the next page"', () => {
    cy.intercept('GET', '/ledger*').as('getPaginationData');
    cy.wait('@getPaginationData');
    cy.get('.MuiTablePagination-root')
      .find('button[aria-label="next page"]')
      .click();
    cy.wait('@getPaginationData');
    cy.get('.MuiTablePagination-root')
      .find('.MuiTablePagination-displayedRows')
      .contains('11–17 of 17');
  });

  it('should navigate to last page when clicking on button "Go to the last page"', () => {
    cy.intercept('GET', '/ledger*').as('getPaginationData');
    cy.wait('@getPaginationData');
    cy.get('.MuiTablePagination-root')
      .find('button[aria-label="last page"]')
      .click();
    cy.wait('@getPaginationData');
    cy.get('.MuiTablePagination-root')
      .find('.MuiTablePagination-displayedRows')
      .contains('11–17 of 17');
  });

  it('should navigate to previous page when clicking on button "Go to the previous page"', () => {
    cy.intercept('GET', '/ledger*').as('getPaginationData');
    cy.wait('@getPaginationData');
    cy.get('.MuiTablePagination-root')
      .find('button[aria-label="last page"]')
      .click();
    cy.wait('@getPaginationData');
    cy.get('.MuiTablePagination-root')
      .find('button[aria-label="previous page"]')
      .click();
    cy.wait('@getPaginationData');
    cy.get('.MuiTablePagination-root')
      .find('.MuiTablePagination-displayedRows')
      .contains('1–10 of 17');
  });

  it('should navigate to first page when clicking on button "Go to the first page"', () => {
    cy.intercept('GET', '/ledger*').as('getPaginationData');
    cy.wait('@getPaginationData');
    cy.get('.MuiTablePagination-root')
      .find('button[aria-label="last page"]')
      .click();
    cy.wait('@getPaginationData');
    cy.get('.MuiTablePagination-root')
      .find('button[aria-label="first page"]')
      .click();
    cy.wait('@getPaginationData');
    cy.get('.MuiTablePagination-root')
      .find('.MuiTablePagination-displayedRows')
      .contains('1–10 of 17');
  });

  it('should change page query params and rows displayed when changing rows per page', () => {
    cy.intercept('GET', '/ledger*').as('getPaginationData');
    cy.get('.MuiTablePagination-root')
      .find('.MuiTablePagination-select')
      .select('20');
    cy.wait('@getPaginationData');
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?perPage=20&page=0');
    });
    cy.get('.MuiTablePagination-root')
      .find('.MuiTablePagination-displayedRows')
      .contains('1–17 of 17');
  });
});
