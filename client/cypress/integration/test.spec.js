/// <reference types="cypress" />

context('Window', () => {
	it('go to alpha site', () => {
		// cy.visit('https://s3.amazonaws.com/alpha.boostlabs/celebrity/index.html')
		cy.visit('localhost:3000')
	})

	it('get password field', () => {
		cy.get('#horizontal_login_password').type('Celebrity2020').type('{enter}')
	})
	it('get ship viz', () => {
		cy.get('.ant-select-selection-selected-value').should('contain', 'EDGE')
		cy.get('.ant-select-selection-selected-value').should(
			'contain',
			'06-15-2020'
		)
		cy.get('#apply-ship-filter').should('contain', 'Apply').click()
	})
})
