///<reference types ="cypress"/>
describe('Simple books api', () => {
    const randomemail =Math.random().toString(2).substring(5);
    const baseurl = "https://simple-books-api.glitch.me" ;
    let token 
    let id

    it('API authentication', () => {
        // Reading the data from CSV file 
        cy.fixture('dd - Sheet1.csv').then((rows) => {
            rows.forEach((row) => {
                // Making a POST request to enter the data
                cy.request({
                    method: 'POST',
                    url: baseurl + "/api-clients/",
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
    
    //using get method to fetch status information
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

   //using get method to fetch list of books information
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
    it('Orders ', () => {
        // Reading the data from CSV file 
        cy.fixture('orders - Sheet1.csv').then((rows) => {
            rows.forEach((row) => {
        cy.request({
            method : 'POST',
            url : baseurl +"/books/3",
            headers: {
                "content-type":"application/json"
            },
            body: {
                        "bookId": row.bookId,
                        "customerName": row.customerName
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