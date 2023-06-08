context('Form content - on "Zdefiniuj budżet" button click', () => {
    beforeEach(() => {
      cy.intercept(
        'GET',
        'http://localhost:4320/category?unlinkedToBudget=true',
      ).as('category');
      cy.task('db:reset');
      cy.visit('/budget');
      cy.contains('Zdefiniuj budżet').click();
    });
  
    it('should do a network request for partial categories', () => {
      cy.visit('/budget');
      cy.wait('@category')
        .its('request.url')
        .should('include', '/category?unlinkedToBudget=true');
    });
  
    it('should have input fields', () => {
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .contains('Kwota')
        .should('exist');
  
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .contains('Kategoria')
        .should('exist');
      cy.get('.MuiModal-root').find('input').should('have.length', 2);
    });
  
    it('should be possible to write into number input field', () => {
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(0)
        .contains('Kwota');
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(0)
        .find('input')
        .type('4.32')
        .should('have.value', '4.32');
    });
  
    it('select should have 1 option', () => {
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .contains('Kategoria');
      cy.get('.MuiModal-root').find('.MuiFormControl-root').eq(1).click();
      cy.get('li[data-value]').should('have.length', 1);
    });
  
    it('should be possible to select data from select', () => {
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .contains('Kategoria');
      cy.get('.MuiModal-root').find('.MuiFormControl-root').eq(1).click();
      cy.get('li[data-value="5"]').click();
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .find('input')
        .should('have.value', '5');
    });
  });