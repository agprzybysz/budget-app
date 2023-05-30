context('Dynamic data guard', () => {
    it('should display no content component when response data is empty', () => {
      cy.intercept('GET', 'http://localhost:4320/budget', []);
      cy.visit('/budget');
  
      cy.get('#budżet').contains('Brak danych do wyświetlenia').should('exist');
      cy.get('#budżet').get('button').should('exist');
      cy.get('#budżet').find('img').should('exist');
  
      cy.get('table').should('not.exist');
    });
  
    it('should display error component when request fails', () => {
      cy.intercept('GET', 'http://localhost:4320/budget', {
        statusCode: 400,
      });
      cy.visit('/budget');
      cy.wait(12000);
      cy.get('#budżet').contains('Wystąpił nieoczekiwany błąd').should('exist');
      cy.get('#budżet').get('button').should('exist');
      cy.get('table').should('not.exist');
      cy.get('#budżet').find('img').should('exist');
    });
  
    it('should display loader if request takes long time', () => {
      cy.intercept('GET', 'http://localhost:4320/budget', {
        delay: 2000,
      });
      cy.visit('/budget');
      cy.get('#budżet').get('.MuiCircularProgress-root').should('exist');
      cy.get('#budżet').get('button').should('exist');
      cy.get('table').should('not.exist');
      cy.get('#budżet').find('img').should('not.exist');
    });
  
    it('should load table when request went fine', () => {
      cy.visit('/budget');
      cy.get('table').should('exist');
      cy.get('#budżet').find('img').should('not.exist');
    });
  });