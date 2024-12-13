const axios = require('axios');
const { expect } = require('chai');
const {faker} = require("@faker-js/faker");
describe("API testing_1", async()=>{

    // it("Get Req", async()=>{
    //     const  req = await axios.get('https://reqres.in/api/users?page=2')
    //     console.log(req.data);
        
    //     expect(req.data.page).equal(2);
    //     expect(req.data.per_page).equal(6);
    // })

    it("Post Req", async()=>{
        const randomName = faker.person.firstName();
        const randomJobTitle = faker.person.jobTitle();
        const  req = await axios.post('https://reqres.in/api/users',
            {
                "name": randomName,
                "job": randomJobTitle
            });
        console.log(req.data);
        expect(req.data.name).equal(randomName);
        expect(req.data.job).equal(randomJobTitle);

    })
    it("Put Req", async()=>{
        const randomName = faker.person.firstName();
        const randomJobTitle = faker.person.jobTitle();
        const  req = await axios.put('https://reqres.in/api/users/2',
            {
                "name": randomName,
                "job": randomJobTitle
            });
        console.log(req.data);
        expect(req.data.name).equal(randomName);
        expect(req.data.job).equal(randomJobTitle);

    })

    it("Patch Req", async()=>{
        const randomName = faker.person.firstName();
        const  req = await axios.patch('https://reqres.in/api/users/2',
            {
                "name": randomName
            });
        console.log(req.data);
        expect(req.data.name).equal(randomName);

    })
    
    it("Delete Req", async()=>{
        const  req = await axios.delete('https://reqres.in/api/users/2')
        console.log(req.data);
        expect(req.status).equal(204);

    })
})