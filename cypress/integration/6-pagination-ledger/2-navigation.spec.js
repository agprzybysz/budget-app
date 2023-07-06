context('Pagination - navigation', () => {
  beforeEach(() => {
    cy.task('db:reset');
    cy.visit('/');
  });

  it('should change page query params when clicking on button ">"', () => {
    cy.intercept('GET', '/ledger*').as('getPaginationData');
    cy.wait('@getPaginationData');
    cy.get('.MuiTablePagination-root')
      .find('button[aria-label="next page"]')
      .click();
    cy.wait('@getPaginationData');
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?perPage=10&page=1');
    });
  });

  it('should change page query params when clicking on button ">>"', () => {
    cy.intercept('GET', '/ledger*').as('getPaginationData');
    cy.wait('@getPaginationData');
    cy.get('.MuiTablePagination-root')
      .find('button[aria-label="last page"]')
      .click();
    cy.wait('@getPaginationData');
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?perPage=10&page=1');
    });
  });

  it('should change page query params when clicking on button "<"', () => {
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
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?perPage=10&page=0');
    });
  });

  it('should change page query params when clicking on button "<<"', () => {
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
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?perPage=10&page=0');
    });
  });

  it('should change page query params when changing rows per page', () => {
    cy.intercept('GET', '/ledger*').as('getPaginationData');
    cy.get('.MuiTablePagination-root')
      .find('.MuiTablePagination-select')
      .select('20');
    cy.wait('@getPaginationData');
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?perPage=20&page=0');
    });
  });


})
 
