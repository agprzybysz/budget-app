context('Interactions - button "Zdefiniuj budżet', () => {
    beforeEach(() => {
      cy.task('db:reset');
    });
    it('should show modal when clicking on "Zdefiniuj budżet"', () => {
      cy.visit('/budget');
      cy.contains('Zdefiniuj budżet').click();
  
      cy.get('.MuiModal-root').should('be.visible');
      cy.get('.MuiModal-root').contains('Zdefiniuj budżet').should('be.visible');
      cy.get('.MuiModal-root').contains('Anuluj').should('be.visible');
      cy.get('.MuiModal-root').contains('Zapisz').should('be.visible');
    });
  
    it('should close modal when clicking on "Anuluj"', () => {
      cy.visit('/budget');
      cy.contains('Zdefiniuj budżet').click();
      cy.get('.MuiModal-root').contains('Anuluj').click();
      cy.get('.MuiModal-root').should('not.be.visible');
    });
  
    it('should close when clicking outside of modal', () => {
      cy.visit('/budget');
      cy.contains('Zdefiniuj budżet').click();
      cy.get('body').click(0, 0);
      cy.get('.MuiModal-root').should('not.be.visible');
    });
  });
  