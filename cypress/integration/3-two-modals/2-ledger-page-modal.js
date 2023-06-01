context('Interactions - button "Wpłać', () => {
    beforeEach(() => {
      cy.task('db:reset');
      cy.visit('/');
      cy.contains('Wpłać').click();
    });
  
    it('should show modal when clicking on "Wpłać"', () => {
      cy.get('.MuiModal-root').contains('Dodaj wpływ').should('be.visible');
      cy.get('.MuiModal-root').contains('Anuluj').should('be.visible');
      cy.get('.MuiModal-root').contains('Zapisz').should('be.visible');
    });
  
    it('should close modal when clicking on "Anuluj"', () => {
      cy.get('.MuiModal-root').find('button').contains('Anuluj').click();
      cy.get('.MuiModal-root').should('not.be.visible');
    });
  
    it('should close when clicking outside of modal', () => {
      cy.get('body').click(0, 0);
      cy.get('.MuiModal-root').should('not.be.visible');
    });
  });
  
  context('Interactions - button "Wypłać', () => {
    beforeEach(() => {
      cy.task('db:reset');
      cy.visit('/');
      cy.contains('Wypłać').click();
    });
  
    it('should show modal when clicking on "Wypłać"', () => {
      cy.get('.MuiModal-root').contains('Dodaj wydatek').should('be.visible');
      cy.get('.MuiModal-root').contains('Anuluj').should('be.visible');
      cy.get('.MuiModal-root').contains('Zapisz').should('be.visible');
    });
    it('should close modal when clicking on "Anuluj"', () => {
      cy.get('.MuiModal-root').contains('Anuluj').click();
      cy.get('.MuiModal-root').should('not.be.visible');
    });
  
    it('should close when clicking outside of modal', () => {
      cy.get('body').click(0, 0);
      cy.get('.MuiModal-root').should('not.be.visible');
    });
  });
  