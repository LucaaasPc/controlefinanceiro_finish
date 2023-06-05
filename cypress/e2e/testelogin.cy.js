///<reference types="cypress" />

 //import {faker} from '@faker-js/faker'

describe('Teste', () => {

  beforeEach(() => {
    cy.visit('http://192.168.0.107:3000')
  })
  it('Realiza Login', () => {
    cy.get('#login').click();
    cy.get('#login').type('admin');
    cy.get('#senha').type('admin');
    cy.get('.sc-fUnMCh:nth-child(4)').click();
    
    
    
})

})
