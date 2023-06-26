describe('Dashboard sending Inspection', () => {
    beforeEach(() => {
        cy.visit('https://dashboard-dev.paveapi.com/login');
        cy.get('#username').type('DemoAdmin');
        cy.get('#password').type('DEMO@PAVE@2021');
        cy.get('.btn-success').click();
        cy.url({ decode: true }).should('contain', 'dashboard');
    });

    describe('Send Inspection', () => {
        it('Create Session ID', () => {        
            cy.get('button.btn').contains('Send Inspection').click();
            cy.get('select[name="launch_api_key"]').select('zTu_TOA');
            cy.get('div.clickable').contains('+1').click();
            cy.get('div.clickable').contains('+84').click();
            cy.get('input#launch_to').type('912435890');
            cy.get('div#Session_launch')
                .find('button.btn')
                .contains('Send Inspection')
                .click();
            cy.get('div.toast-header')
                .should('contain', 'Inspection has been successfully sent.');
            cy.get('div.toast-body')
                .should('contain', 'TOA-')
                .and('contain', '912435890');
            cy.get('div#Session_launch')
                .find('button.btn')
                .contains('Close')
                .click();
            cy.get('div.card')
                .should('contain', 'TOA-')
                .and('contain', 'zTu_TOA')
                .and('contain', '+84912435890');

        });
    });


    describe('Copy Capture Link', () => {
        it('Copied Successfully', () => {
            cy.get('button.btn').contains('Capture URL').click();
            cy.get('button.btn').contains('Copy to clipboard').click();
            cy.get('div.toast-header').should('contain', 'Capture URL has been copied to clipboard.');
        });
    });

    describe('Add Note', () => {
        beforeEach(() => {
            cy.get('button.btn').contains('Notes').click();
            cy.get('button.btn').contains('Add Note').click();
        });

        it('Add Note Success', () => {
            cy.get('input#note_title').type('test1 title');
            cy.get('textarea#note_description').type('test1 note');
            cy.get('select[name="note_privacy"]').select('Public');
            cy.get('div#Session_notes')
                .find('button.btn')
                .contains('Submit')
                .click();
            cy.get('div.modal-body')
                .should('contain', 'test1 title')
                .and('contain', 'test1 note');
        });

        it('Cancelation adding Note', () => {
            cy.get('div#Session_notes')
                .find('button.btn')
                .contains('Cancel')
                .click();
            cy.get('textarea#note_description').should('not.exist');
        })
    });
})