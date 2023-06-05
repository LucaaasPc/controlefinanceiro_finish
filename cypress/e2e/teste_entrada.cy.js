///<reference types="cypress" />

 //import {faker} from '@faker-js/faker'

 describe('Teste', () => {

  beforeEach(() => {
    cy.visit('http://192.168.0.107:3000/home')
  })
  it('Acessa página de produto e adiciona', () => {
    cy.get('.sc-cPiKLX:nth-child(1) > .sc-eDPEul').click();
    cy.get('.sc-cPiKLX:nth-child(1) > .sc-eDPEul').type('Teste1');
    cy.get('.sc-cPiKLX:nth-child(2) > .sc-eDPEul').click();
    cy.get('.sc-cPiKLX:nth-child(2) > .sc-eDPEul').type('100');
    cy.get('.sc-fPXMVe').click();
    cy.visit('http://192.168.0.107:3000/home')
    
    
    
    
})

})