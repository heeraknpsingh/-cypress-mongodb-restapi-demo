describe('/user/login',() =>{
    const endpoint = 'http://localhost:3000/api/user/login'

    it('can login vith valid user', ()=>{
        var staticTestUser = {
            email: 'TestUser1@gmail.com',
            password: 'TestUser1123',
        }
        cy.request({method: 'POST', url: endpoint, body: staticTestUser}).then((response)=> {
            expect(response.status).to.eq(200)
        })
    })
})
