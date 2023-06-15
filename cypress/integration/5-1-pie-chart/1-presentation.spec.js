context('Pie chart - presentation', () => {
    beforeEach(() => {
      cy.task('db:reset');
      cy.visit('/');
    });
  
    it('should have header visible', () => {
      cy.get("[data-test-id='wallet-top-sidebar']")
        .find('h4')
        .should('have.text', 'Saldo');
      cy.get("[data-test-id='wallet-top-sidebar']")
        .find('h3')
        .should('have.text', '8937.01 PLN');
    });
  
    it('should have subheader visible', () => {
      cy.get("[data-test-id='wallet-top-sidebar']")
        .find('.MuiTypography-subtitle1')
        .should('have.text', 'Pozostała kwota');
    });
  
    it('should have legend', () => {
      cy.get("[data-test-id='wallet-top-sidebar']")
        .contains('Inwestycje i oszczędności')
        .should('exist');
      cy.get("[data-test-id='wallet-top-sidebar']")
        .contains('Mieszkanie')
        .should('exist');
      cy.get("[data-test-id='wallet-top-sidebar']")
        .contains('Opłaty')
        .should('exist');
      cy.get("[data-test-id='wallet-top-sidebar']")
        .contains('inne')
        .should('exist');
    });
  
    it('should show epty state', () => {
      // delete all ledger entires
      const row = cy.get('thead').children('.MuiTableRow-root').first();
      const checkAll = row.find('input[type="checkbox"]');
  
      checkAll.click();
      const deleteBtn = cy.get('[data-testid="DeleteIcon"]');
      deleteBtn.click();
  
      // empty state should be visible
      cy.get("[data-test-id='wallet-top-sidebar']")
        .contains('Brak wyników')
        .should('exist');
  
      // headers should be visible
      cy.get("[data-test-id='wallet-top-sidebar']")
        .find('h4')
        .should('have.text', 'Saldo');
      cy.get("[data-test-id='wallet-top-sidebar']")
        .find('h3')
        .should('have.text', '0 PLN');
      cy.get("[data-test-id='wallet-top-sidebar']")
        .find('.MuiTypography-subtitle1')
        .should('have.text', 'Pozostała kwota');
  
      // legend should disappear
      cy.get("[data-test-id='wallet-top-sidebar']")
        .contains('Inwestycje i oszczędności')
        .should('not.exist');
      cy.get("[data-test-id='wallet-top-sidebar']")
        .contains('Mieszkanie')
        .should('not.exist');
      cy.get("[data-test-id='wallet-top-sidebar']")
        .contains('Opłaty')
        .should('not.exist');
      cy.get("[data-test-id='wallet-top-sidebar']")
        .contains('inne')
        .should('not.exist');
    });
  });