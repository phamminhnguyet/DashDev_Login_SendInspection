describe('Login Test', () => {
    beforeEach(() => {
        cy.visit('https://dashboard-dev.paveapi.com/login');
    })

    describe('Invalid Login', () => {
        describe('Empty Username and PW', () => {
            it('A Blank in Username', () => {
                cy.get('#password').type('DEMO@PAVE@20211111');
                cy.get('body > div > div > div > div.card.card-rounded.card-border-none > div > form > button')
                .click();
                cy.get('body > div > div > div > div.card.card-rounded.card-border-none > div > form > div:nth-child(2) > div')
                    .should('contain', 'The username field is required.');
            })
            it('A Blank in Password', () => {
            cy.get('#username').type('DemoAdmin');
            cy.get('body > div > div > div > div.card.card-rounded.card-border-none > div > form > button')
                .click();
            cy.get('body > div > div > div > div.card.card-rounded.card-border-none > div > form > div:nth-child(3) > div')
                .should('contain', 'The password field is required.');
            })
            it('A Blank in both', () => {
                cy.get('body > div > div > div > div.card.card-rounded.card-border-none > div > form > button')
                    .click();
                cy.get('body > div > div > div > div.card.card-rounded.card-border-none > div > form > div:nth-child(2) > div')
                    .should('contain', 'The username field is required.');
                cy.get('body > div > div > div > div.card.card-rounded.card-border-none > div > form > div:nth-child(3) > div')
                    .should('contain', 'The password field is required.');
            })
        })
    
        describe('Invalid Username and PW', () => {
            it('Invalid Username', () => {
                cy.get('#username').type('DemoAdmin000');
                cy.get('#password').type('DEMO@PAVE@2021');
                cy.get('body > div > div > div > div.card.card-rounded.card-border-none > div > form > button')
                    .click();
                cy.get('body > div > div > div > div.card.card-rounded.card-border-none > div > form > div:nth-child(2) > div')
                    .should('contain', 'Invalid credentials.'); 
                })
            it('Invalid Password', () => {
                cy.get('#username').type('DemoAdmin');
                cy.get('#password').type('DEMO@PAVE@2021XXX');
                cy.get('body > div > div > div > div.card.card-rounded.card-border-none > div > form > button')
                    .click();
                    cy.get('body > div > div > div > div.card.card-rounded.card-border-none > div > form > div:nth-child(3) > div')
                    .should('contain', 'Invalid credentials.'); 
                    })
            it('Invalid both Fields', () => {
                cy.get('#username').type('DemoAdmin000');
                cy.get('#password').type('DEMO@PAVE@2021XXX');
                cy.get('body > div > div > div > div.card.card-rounded.card-border-none > div > form > button')
                    .click();
                cy.get('body > div > div > div > div.card.card-rounded.card-border-none > div > form > div:nth-child(2) > div')
                    .should('contain', 'Invalid credentials.');
                cy.get('body > div > div > div > div.card.card-rounded.card-border-none > div > form > div:nth-child(3) > div')
                    .should('contain', 'Invalid credentials.')
                    })
        })
    }) 

    describe('Reset Password', () => {
        beforeEach(() => {
            cy.get('body > div > div > div > div.card.card-rounded.card-border-none > div > form > div.d-flex.justify-content-end.mt-2 > a')
                .click();
            cy.url({ decode: true }).should('contain', 'forgot-password');
        })

        it('Empty Username', () => {
            cy.get('body > div > div > div > div.card.card-rounded.card-border-none > div > form > button')
                .click();
            cy.get('body > div > div > div > div.card.card-rounded.card-border-none > div > form > div.pave-form.input-form.has-icon > div')
                .should('contain', 'The username field is required.');
        })

        it('Invalid Username', () => {
            cy.get('#username').type('DemoAdmin000');
            cy.get('body > div > div > div > div.card.card-rounded.card-border-none > div > form > button')
                .click();
            cy.get('body > div > div > div > div.card.card-rounded.card-border-none > div')
                .should('contain', 'Error occurred!');
            cy.get('body > div > div > div > div.card.card-rounded.card-border-none > div > form > div.pave-form.input-form.has-icon > div')
                .should('contain', 'The selected username is invalid.');

        })

        it('Successfully Reset Password', () => {
            cy.get('#username').type('DemoAdmin');
            cy.get('body > div > div > div > div.card.card-rounded.card-border-none > div > form > button')
                .click();
            cy.get('body > div > div > div > div.card.card-rounded.card-border-none > div')
                .should('contain', 'A reset link has been sent to your account email address at');    
        })

        it('Cancel Button', () => {
            cy.get('body > div > div > div > div.card.card-rounded.card-border-none > div > form > div.d-flex.justify-content-end > a > span')
                .click();
            cy.url({ decode: true }).should('contain', 'login');
        })
    })
})

