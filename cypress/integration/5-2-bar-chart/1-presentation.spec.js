context('Bar chart - presentation', () => {
    beforeEach(() => {
      cy.task('db:reset');
      cy.visit('/');
    });
  
    it('should have header visible', () => {
      cy.get("[data-test-id='wallet-bottom-sidebar']")
        .find('h4')
        .should('have.text', 'Budżet');
    });
  
    it('should have subheader visible', () => {
      cy.get("[data-test-id='wallet-bottom-sidebar']")
        .find('.MuiTypography-subtitle1')
        .should('have.text', 'Podsumowanie wydatków');
    });
  
    it('should show empty state when budget entries deleted', () => {
      // delete all budget entires
      cy.visit('/budget');
      const row = cy.get('thead').children('.MuiTableRow-root').first();
      const checkAll = row.find('input[type="checkbox"]');
  
      checkAll.click();
      const deleteBtn = cy.get('[data-testid="DeleteIcon"]');
      deleteBtn.click();
  
      cy.visit('/');
  
      // empty state should be visible
      cy.get("[data-test-id='wallet-bottom-sidebar']")
        .contains('Brak wyników')
        .should('exist');
  
      // headers should be visible
      cy.get("[data-test-id='wallet-bottom-sidebar']")
        .find('h4')
        .should('have.text', 'Budżet');
      cy.get("[data-test-id='wallet-bottom-sidebar']")
        .find('.MuiTypography-subtitle1')
        .should('have.text', 'Podsumowanie wydatków');
    });
  
    it('should show empty state when ledger entries deleted', () => {
      // delete all ledger entires
      const row = cy.get('thead').children('.MuiTableRow-root').first();
      const checkAll = row.find('input[type="checkbox"]');
  
      checkAll.click();
      const deleteBtn = cy.get('[data-testid="DeleteIcon"]');
      deleteBtn.click();
  
      // empty state should be visible
      cy.get("[data-test-id='wallet-bottom-sidebar']")
        .contains('Brak wyników')
        .should('exist');
  
      // headers should be visible
      cy.get("[data-test-id='wallet-bottom-sidebar']")
        .find('h4')
        .should('have.text', 'Budżet');
      cy.get("[data-test-id='wallet-bottom-sidebar']")
        .find('.MuiTypography-subtitle1')
        .should('have.text', 'Podsumowanie wydatków');
    });
  });