context('Form content - on "Wpłać" button click', () => {
    beforeEach(() => {
      cy.task('db:reset');
      cy.visit('/');
      cy.contains('Wpłać').click();
    });
  
    it('modal save button should be disabled', () => {
      cy.contains('Zapisz').should('be.disabled');
    });
  
    it('should show error when input value is empty or contains only whitespace', () => {
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .first()
        .contains('Nazwa');
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .first()
        .find('input')
        .type(' ')
        .should('have.value', ' ');
  
      cy.get('.MuiModal-root')
        .contains('Nazwa nie może być pusta')
        .should('exist');
    });
    it('should hide error when input value is fixed', () => {
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .first()
        .contains('Nazwa');
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .first()
        .find('input')
        .type(' ')
        .should('have.value', ' ');
  
      cy.get('.MuiModal-root')
        .contains('Nazwa nie może być pusta')
        .should('exist');
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .first()
        .find('input')
        .clear()
        .type('Test')
        .should('have.value', 'Test');
  
      cy.get('.MuiModal-root')
        .contains('Nazwa nie może być pusta')
        .should('not.exist');
    });
  
    it('should show error when passed negative value', () => {
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .contains('Kwota');
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .find('input')
        .type('-4.32')
        .should('have.value', '-4.32');
  
      cy.get('.MuiModal-root')
        .contains('Kwota musi być większa niż 0')
        .should('exist');
    });
  
    it('should show error when passed value higher then 1000000', () => {
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .contains('Kwota');
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .find('input')
        .type('1000001')
        .should('have.value', '1000001');
  
      cy.get('.MuiModal-root')
        .contains('Kwota nie może być większa niż 1000000')
        .should('exist');
    });
  
    it('should hide error when number input value is fixed', () => {
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .contains('Kwota');
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .find('input')
        .type('1000001')
        .should('have.value', '1000001');
  
      cy.get('.MuiModal-root')
        .contains('Kwota nie może być większa niż 1000000')
        .should('exist');
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .find('input')
        .clear()
        .type('1000000')
        .should('have.value', '1000000');
      cy.get('.MuiModal-root')
        .contains('Kwota nie może być większa niż 1000000')
        .should('not.exist');
    });
  
    it('should mark button as active when all fields are valid', () => {
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
  
      cy.contains('Zapisz').should('not.be.disabled');
    });
  
    it('should clear form data after it has been closed', () => {
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .first()
        .find('input')
        .type(' ')
        .should('have.value', ' ');
  
      cy.get('.MuiModal-root')
        .contains('Nazwa nie może być pusta')
        .should('exist');
  
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .find('input')
        .type('1000000')
        .should('have.value', '1000000');
  
      cy.contains('Zapisz').should('be.disabled');
      cy.get('.MuiModal-root').contains('Anuluj').click();
  
      cy.contains('Wpłać').click();
  
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(0)
        .find('input')
        .should('not.have.value');
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .find('input')
        .should('not.have.value');
    });
  });
  
  context('Form content - on "Wypłać" button click', () => {
    beforeEach(() => {
      cy.task('db:reset');
      cy.visit('/');
      cy.contains('Wypłać').click();
    });
  
    it('modal save button should be disabled', () => {
      cy.contains('Zapisz').should('be.disabled');
    });
  
    it('should show error when input value is empty or contains only whitespace', () => {
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .first()
        .contains('Nazwa');
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .first()
        .find('input')
        .type(' ')
        .should('have.value', ' ');
  
      cy.get('.MuiModal-root')
        .contains('Nazwa nie może być pusta')
        .should('exist');
    });
    it('should hide error when input value is fixed', () => {
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .first()
        .contains('Nazwa');
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .first()
        .find('input')
        .type(' ')
        .should('have.value', ' ');
  
      cy.get('.MuiModal-root')
        .contains('Nazwa nie może być pusta')
        .should('exist');
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .first()
        .find('input')
        .clear()
        .type('Test')
        .should('have.value', 'Test');
  
      cy.get('.MuiModal-root')
        .contains('Nazwa nie może być pusta')
        .should('not.exist');
    });
  
    it('should show error when passed negative value', () => {
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .contains('Kwota');
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .find('input')
        .type('-4.32')
        .should('have.value', '-4.32');
  
      cy.get('.MuiModal-root')
        .contains('Kwota musi być większa niż 0')
        .should('exist');
    });
  
    it('should show error when passed value higher then 1000000', () => {
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .contains('Kwota');
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .find('input')
        .type('1000001')
        .should('have.value', '1000001');
  
      cy.get('.MuiModal-root')
        .contains('Kwota nie może być większa niż 1000000')
        .should('exist');
    });
  
    it('should hide error when number input value is fixed', () => {
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .contains('Kwota');
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .find('input')
        .type('1000001')
        .should('have.value', '1000001');
  
      cy.get('.MuiModal-root')
        .contains('Kwota nie może być większa niż 1000000')
        .should('exist');
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .find('input')
        .clear()
        .type('1000000')
        .should('have.value', '1000000');
      cy.get('.MuiModal-root')
        .contains('Kwota nie może być większa niż 1000000')
        .should('not.exist');
    });
  
    it('should mark button as active when all fields are valid', () => {
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
  
      cy.contains('Zapisz').should('not.be.disabled');
    });
  
    it('should clear form data after it has been closed', () => {
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .first()
        .find('input')
        .type(' ')
        .should('have.value', ' ');
  
      cy.get('.MuiModal-root')
        .contains('Nazwa nie może być pusta')
        .should('exist');
  
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
  
      cy.contains('Zapisz').should('be.disabled');
      cy.get('.MuiModal-root').contains('Anuluj').click();
  
      cy.contains('Wypłać').click();
  
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(0)
        .find('input')
        .should('not.have.value');
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(1)
        .find('input')
        .should('not.have.value');
      cy.get('.MuiModal-root')
        .find('.MuiFormControl-root')
        .eq(2)
        .find('input')
        .should('not.have.value');
    });
  });