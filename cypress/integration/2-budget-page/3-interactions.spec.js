context('Table data interactions', () => {
    beforeEach(() => {
      cy.task('db:reset');
      cy.visit('/budget');
    });
  
    it('should allow to delete one category record', () => {
      cy.get('tbody').find('input[type="checkbox"]').first().click();
      cy.get('[data-testid="DeleteIcon"]').click();
      cy.get('tbody').children('.MuiTableRow-root').should('have.length', 6);
    });
  
    it('should allow deletion of all category records', () => {
      const row = cy.get('thead').children('.MuiTableRow-root').first();
      const checkAll = row.find('input[type="checkbox"]');
  
      checkAll.click();
      const deleteBtn = cy.get('[data-testid="DeleteIcon"]');
      deleteBtn.click();
      cy.get('#budżet').contains('Brak danych').should('exist');
    });
  
    it('should allow to delete many category records', () => {
      cy.get('tbody').find('input[type="checkbox"]').first().click();
      cy.get('tbody').find('input[type="checkbox"]').last().click();
      cy.get('[data-testid="DeleteIcon"]').click();
      cy.get('tbody').children('.MuiTableRow-root').should('have.length', 5);
    });
  });