context('Data storage- on "Wpłać" button click', () => {
    beforeEach(() => {
      cy.task('db:reset');
      cy.visit('/');
      cy.contains('Wpłać').click();
    });
  
    it('should save data and add new row to the table', () => {
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
  
      cy.get('.MuiModal-root').contains('Zapisz').click();
      cy.get('.MuiModal-root').should('not.be.visible');
      cy.wait(200);
      cy.get('tbody').children('.MuiTableRow-root').eq(0).contains('Test');
      cy.get('tbody').children('.MuiTableRow-root').eq(0).contains('1000000');
      cy.get('tbody')
        .children('.MuiTableRow-root')
        .eq(0)
        .contains('Nieskategoryzowane');
    });
  });
  
  context('Data storage- on "Wypłać" button click', () => {
    beforeEach(() => {
      cy.task('db:reset');
      cy.visit('/');
      cy.contains('Wypłać').click();
    });
  
    it('should save data and add new row to the table', () => {
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
      cy.get('li[data-value="8"]').click();
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(2)
        .find('input')
        .should('have.value', '8');
  
      cy.get('.MuiModal-root').contains('Zapisz').click();
      cy.get('.MuiModal-root').should('not.be.visible');
      cy.wait(200);
      cy.get('tbody').children('.MuiTableRow-root').eq(0).contains('Test');
      cy.get('tbody').children('.MuiTableRow-root').eq(0).contains('-1000000');
      cy.get('tbody').children('.MuiTableRow-root').eq(0).contains('Różne');
    });
  });