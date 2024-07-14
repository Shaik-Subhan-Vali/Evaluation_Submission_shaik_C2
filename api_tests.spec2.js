///<reference types ="cypress"/>
describe('Simple books api', () => {
    const randomemail =Math.random().toString(2).substring(5);
    const baseurl = "https://simple-books-api.glitch.me" ;
    let token 
    let id

    it('API authentication', () => {
        // Read the CSV file and parse its contents
        cy.fixture('dd - Sheet1.csv').then((rows) => {
            rows.forEach((row) => {
                // Make a POST request for each row in the CSV
                cy.request({
                    method: 'POST',
                    url: `${baseurl}/api-clients/`,
                    body: {
                        "clientName": row.clientName,
                        "clientEmail": row.clientEmail
                    },
                    headers: {
                        "content-type": "application/json"
                    }
                }).then((response) => {                   
                    expect(response.status).to.equal(201);
                     token = response.body.accessToken;
                    
                });
            });
        });
    
    
    it('Get Status', () => {
        cy.request({
            method: 'GET',
            url : baseurl + "/status",
            headers:{
                "content-type":"application/json"
            }
        }).then((x)=>{
            expect(x.status).to.equal(200);
        })
    });

    it('Get list of books', ()=>{
        cy.request({
            method : 'GET',
            url : baseurl +"/books",
            headers: {
                "content-type":"application/json"
            }
        }).then((x)=>{
            expect(x.status).to.equal(200);
        })
    })

    it('Get a single books', ()=>{
        cy.request({
            method : 'GET',
            url : baseurl +"/books/3",
            headers: {
                "content-type":"application/json"
            }
        }).then((x)=>{
            expect(x.status).to.equal(200);
        })
    })
    
    })
    it('Submit an order',()=>{
        cy.request({
            method:'POST',
            url:baseurl+"/orders",
            headers: {
                "content-type":"application/json",
                "Authorization":"Bearer "+ token   //remember to give space after bearer
            },
            body:{
                "bookId": 1,
                "customerName": "john"
            },
           
            
        }).then((x)=>{
            expect(x.status).to.equal(201);
            cy.log(JSON.stringify(x.body))
      })
    })

    it('Get all orders', ()=>{
        cy.request({
            method : 'GET',
            url : baseurl +"/orders",
            headers: {
                "content-type":"application/json",
                "Authorization":"Bearer "+ token 
            }
        }).then((x)=>{
            expect(x.status).to.equal(200);
         //   cy.log(JSON.stringify(x.body))

            let obj = JSON.parse(JSON.stringify(x.body))
            id = obj[0].id;
            cy.log(id)
            
        })
    })
    it('Get an orders', ()=>{
        cy.request({
            method : 'GET',
            url : baseurl +"/orders/"+id,
            headers: {
                "content-type":"application/json",
                "Authorization":"Bearer "+ token 
            }
        }).then((x)=>{
            expect(x.status).to.equal(200);
        })
    })
    it('Update an orders', ()=>{
        cy.request({
            method : 'PATCH',
            url : baseurl +"/orders/"+id,
            body:{
                "customerName": "john123"
            },
            headers: {
                "content-type":"application/json",
                "Authorization":"Bearer "+ token 
            }
        }).then((x)=>{
            expect(x.status).to.equal(204);
        })
    })
    it('Update an orders', ()=>{
        cy.request({
            method : 'PATCH',
            url : baseurl +"/orders/"+id,
            body:{
                "customerName": "john123"
            },
            headers: {
                "content-type":"application/json",
                "Authorization":"Bearer "+ token 
            }
        }).then((x)=>{
            expect(x.status).to.equal(204);
        })
    })
    it('Delete an order', ()=>{
        cy.request({
            method : 'DELETE',
            url : baseurl +"/orders/"+id,
 
            headers: {
                "content-type":"application/json",
                "Authorization":"Bearer "+ token 
            }
        }).then((x)=>{
            expect(x.status).to.equal(204);
        })
    })
 
});