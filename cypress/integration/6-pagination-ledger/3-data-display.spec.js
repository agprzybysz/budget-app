context('Pagination - data display - changing dataset', () => {
  const postTestRecords = (numRecords) => {
    const testRequestBody = {
      title: 'Zakupy',
      amountInCents: 12000,
      mode: 'EXPENSE',
      categoryId: '6',
    };

    for (let i = 0; i < numRecords; i++) {
      cy.request({
        method: 'POST',
        url: 'http://localhost:4320/ledger/',
        body: testRequestBody,
        json: true,
      });
    }
  };

  beforeEach(() => {
    cy.task('db:reset');
    cy.visit('/');
  });

  it('should disable all pagination buttons when less then 10 records are in ledger table', () => {
    cy.request({
      method: 'DELETE',
      url: 'http://localhost:4320/ledger/',
      body: { ids: ['1', '2', '3', '4', '5', '6', '7', '8'] },
    });
    cy.visit('/ledger');

    cy.get('.MuiTableBody-root').children().should('have.length', 9);
    cy.get('.MuiTablePagination-root')
      .find('button')
      .each(($button) => {
        cy.wrap($button).should('be.disabled');
      });
  });

  it('should enable navigation via buttons and change dataset when cliking on navigation buttons', () => {
    postTestRecords(5);
    cy.visit('/ledger');
    cy.wait(1000);
    // test first page (1/3)
    cy.get('.MuiTablePagination-root')
      .find('button[aria-label="previous page"]')
      .should('be.disabled');
    cy.get('.MuiTablePagination-root')
      .find('button[aria-label="first page"]')
      .should('be.disabled');
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?perPage=10&page=0');
    });
    cy.get('.MuiTableBody-root').children().should('have.length', 10);

    // test second page (2/3)
    cy.get('.MuiTablePagination-root')
      .find('button[aria-label="next page"]')
      .click();
    cy.get('.MuiTablePagination-root')
      .find('button')
      .each(($button) => {
        cy.wrap($button).should('be.enabled');
      });
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?perPage=10&page=1');
    });
    cy.get('.MuiTableBody-root').children().should('have.length', 10);

    // test last page (3/3)
    cy.get('.MuiTablePagination-root')
      .find('button[aria-label="next page"]')
      .click();
    cy.get('.MuiTablePagination-root')
      .find('button[aria-label="next page"]')
      .should('be.disabled');
    cy.get('.MuiTablePagination-root')
      .find('button[aria-label="last page"]')
      .should('be.disabled');
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?perPage=10&page=2');
    });
    cy.get('.MuiTableBody-root').children().should('have.length', 2);

    // test go to previous page (2/3)
    cy.get('.MuiTablePagination-root')
      .find('button[aria-label="previous page"]')
      .click();
    cy.get('.MuiTablePagination-root').find('button');
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?perPage=10&page=1');
    });
    cy.get('.MuiTableBody-root').children().should('have.length', 10);
  });

  it('should disable all pagination buttons and show all data when changing select records per Page from 10 to 20 (15 records are in ledger table)', () => {
    cy.request({
      method: 'DELETE',
      url: 'http://localhost:4320/ledger/',
      body: { ids: ['16', '17'] },
    });
    cy.visit('/ledger');
    cy.get('.MuiTablePagination-root')
      .find('.MuiTablePagination-select')
      .select('20');

    cy.get('.MuiTableBody-root').children().should('have.length', 15);

    cy.get('.MuiTablePagination-root')
      .find('button')
      .each(($button) => {
        cy.wrap($button).should('be.disabled');
      });
  });
});
