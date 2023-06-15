context('Pie chart - data invalidation', () => {
    beforeEach(() => {
      cy.task('db:reset');
      cy.visit('/');
    });
  
    it('should refresh chart data when adding ledger entry', () => {
      cy.contains('Wypłać').click();
  
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .first()
        .find('input')
        .type('Test')
        .should('have.value', 'Test');
  
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .find('input')
        .type('1000000')
        .should('have.value', '1000000');
  
      cy.get('.MuiModal-root').find('.MuiFormControl-root').eq(2).click();
      cy.get('li[data-value="7"]').click();
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(2)
        .find('input')
        .should('have.value', '7');
  
      cy.get('.MuiModal-root').contains('Zapisz').click();
  
      cy.wait(200);
  
      cy.get("[data-test-id='wallet-top-sidebar']")
        .find('h3')
        .should('have.text', '-991062.99 PLN');
    });
  
    it('should refresh chart data when removing ledger entry', () => {
      cy.get('tbody').find('input[type="checkbox"]').eq(6).click();
      cy.get('[data-testid="DeleteIcon"]').click();
  
      cy.wait(200);
  
      cy.get("[data-test-id='wallet-top-sidebar']")
        .find('h3')
        .should('have.text', '9937.01 PLN');
    });
  });