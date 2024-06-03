const { faker } = require('@faker-js/faker');

describe('/user/register',() =>{
    const endpoint = 'http://localhost:3000/api/user/register'

    it('returns 200 with valid body', ()=>{
        var body = {
            name: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }
        cy.request('POST', endpoint, body).then((response)=> {
            expect(response.status).to.eq(200)
        })
    })

    it('create user with valid body', ()=>{
        var body = {
            name: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }
        cy.request('POST', endpoint, body).then((response)=> {
            expect(response.body.name).to.eq(body.name)
            expect(response.body.email).to.eq(body.email)
            expect(response.body.password).not.to.eq(body.password)
        })
    })

    it('doesnt not allow user creation with bad user body (name)', ()=>{
        const badTestUser = {
            name: 'a',
            email: faker.internet.email(),
            password: faker.internet.password(),
        }
        cy.request({method: 'POST', url: endpoint, body: badTestUser, failOnStatusCode: false}).then((response)=> {
            expect(response.status).to.eq(400)
            expect(response.body).to.eq('"name" length must be at least 2 characters long')
        })
    })

    it('doesnt not allow user creation with bad user body (email)', ()=>{
        const badTestUser = {
            name: faker.internet.userName(),
            email: 'a',
            password: faker.internet.password(),
        }
        cy.request({method: 'POST', url: endpoint, body: badTestUser, failOnStatusCode: false}).then((response)=> {
            expect(response.status).to.eq(400)
            expect(response.body).to.eq('"email" length must be at least 6 characters long')
        })
    })

    it('doesnt not allow user creation with bad user body (email address is invalid)', ()=>{
        const badTestUser = {
            name: faker.internet.userName(),
            email: 'aaaaaaaa',
            password: faker.internet.password(),
        }
        cy.request({method: 'POST', url: endpoint, body: badTestUser, failOnStatusCode: false}).then((response)=> {
            expect(response.status).to.eq(400)
            expect(response.body).to.eq('"email" must be a valid email')
        })
    })

    it('doesnt not allow user creation with bad user body (password)', ()=>{
        const badTestUser = {
            name: faker.internet.userName(),
            email: faker.internet.email(),
            password: 'a',
        }
        cy.request({method: 'POST', url: endpoint, body: badTestUser, failOnStatusCode: false}).then((response)=> {
            expect(response.status).to.eq(400)
            expect(response.body).to.eq('"password" length must be at least 8 characters long')
        })
    })

    it('returns 400 with no body', ()=>{
        cy.request({method: 'POST', url: endpoint, failOnStatusCode: false}).then((response)=> {
            expect(response.status).to.eq(400)
            expect(response.body).to.eq('"name" is required')
        })
    })

    it('returns 400 with empty body', ()=>{
        const emptybody = {
        }
        cy.request({method: 'POST', url: endpoint, body: emptybody, failOnStatusCode: false}).then((response)=> {
            expect(response.status).to.eq(400)
            expect(response.body).to.eq('"name" is required')
        })
    })

    it('returns 400 with no name in body', ()=>{
        const bodywithoutname = {
            email: faker.internet.email(),
            password: faker.internet.password(),
        }
        cy.request({method: 'POST', url: endpoint, body: bodywithoutname, failOnStatusCode: false}).then((response)=> {
            expect(response.status).to.eq(400)
            expect(response.body).to.eq('"name" is required')
        })
    })

    it('returns 400 with no email in body', ()=>{
        const bodywithoutname = {
            name: faker.internet.userName(),
            password: faker.internet.password(),
        }
        cy.request({method: 'POST', url: endpoint, body: bodywithoutname, failOnStatusCode: false}).then((response)=> {
            expect(response.status).to.eq(400)
            expect(response.body).to.eq('"email" is required')
        })
    })

    it('returns 400 with no password in body', ()=>{
        const bodywithoutname = {
            name: faker.internet.userName(),
            email: faker.internet.email(),
        }
        cy.request({method: 'POST', url: endpoint, body: bodywithoutname, failOnStatusCode: false}).then((response)=> {
            expect(response.status).to.eq(400)
            expect(response.body).to.eq('"password" is required')
        })
    })
})