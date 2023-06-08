context('Form content - on "Wpłać" button click', () => {
    beforeEach(() => {
      cy.intercept('GET', 'http://localhost:4320/category').as('category');
      cy.task('db:reset');
      cy.visit('/');
      cy.contains('Wpłać').click();
    });
  
    it('should do a network request for full categories', () => {
      cy.visit('/');
      cy.wait('@category')
        .its('request.url')
        .should('not.include', '/category?unlinkedToBudget=true');
    });
  
    it('should have input fields', () => {
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .contains('Nazwa')
        .should('exist');
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .contains('Kwota')
        .should('exist');
      cy.get('.MuiModal-root').find('input').should('have.length', 2);
    });
  
    it('should be possible to write into text input field', () => {
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .first()
        .contains('Nazwa');
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .first()
        .find('input')
        .type('Testowa wpłata')
        .should('have.value', 'Testowa wpłata');
    });
    it('should be possible to write into number input field', () => {
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .contains('Kwota');
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .find('input')
        .type('4.32')
        .should('have.value', '4.32');
    });
  });
  
  context('Form content - on "Wypłać" button click', () => {
    beforeEach(() => {
      cy.task('db:reset');
      cy.visit('/');
      cy.contains('Wypłać').click();
    });
  
    it('should have input fields', () => {
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .contains('Nazwa')
        .should('exist');
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .contains('Kwota')
        .should('exist');
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .contains('Kategoria')
        .should('exist');
      cy.get('.MuiModal-root').find('input').should('have.length', 3);
    });
  
    it('should be possible to write into text input field', () => {
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .first()
        .contains('Nazwa');
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .first()
        .find('input')
        .type('Testowy wydatek')
        .should('have.value', 'Testowy wydatek');
    });
    it('should be possible to write into number input field', () => {
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .contains('Kwota');
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .find('input')
        .type('4.32')
        .should('have.value', '4.32');
    });
  
    it('should not be possible to write text into number input field', () => {
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .contains('Kwota');
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .find('input')
        .type('Hello')
        .should('not.have.value', 'Hello');
    });
  
    it('select should have 8 options', () => {
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(2)
        .contains('Kategoria');
      cy.get('.MuiModal-root').find('.MuiFormControl-root').eq(2).click();
      cy.get('li[data-value]').should('have.length', 8);
    });
  
    it('should be possible to select data from select', () => {
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(2)
        .contains('Kategoria');
      cy.get('.MuiModal-root').find('.MuiFormControl-root').eq(2).click();
      cy.get('li[data-value="8"]').click();
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(2)
        .find('input')
        .should('have.value', '8');
    });
  });