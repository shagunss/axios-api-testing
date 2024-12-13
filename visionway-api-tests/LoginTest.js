const axios = require('axios');
const { expect } = require('chai');
const { faker } = require("@faker-js/faker");
const addLeadPayload = require('../payloadJSON/addLead.json');

describe('API Testing for Lead Management', () => {
    const baseURL = 'https://dev.visionway-dev.com/api';
    let deviceId = 'e8f8277f-174b-4fd8-b6d0-6df8cf0f0b81';
    let deviceToken = 'ew8S7OXaQ_TNa0k24IVYlX:APA91bEfIzRS3pBAwkYMXnMrQkviYP43VkyKRs475PpilacHYurV-VtRFGyRvg7dcfNRVFTQocy6VM4-uMQR8PFgx-8lEGzZto1sQ-uQNHGl-lV-adwpe2o';
    let domain = 'visionway.visionway-qa.com';
    let companyId = 'visionway-prodapsouth1-b2bandb2c';
    let token;

    before(async () => {

        // Store globally if needed for other tests
        global.deviceId = deviceId;

        // Define the login payload
        const loginPayload = {
            email: 'shagunadmin@gmail.com',
            password: 'Admin@123',
            deviceId,
            deviceToken,
            domain
        };
    
        // Login and fetch token and other data
        const response = await axios.post(`${baseURL}/v1/employee/login`, loginPayload);
        expect(response.status).to.equal(200);
        
        // Extract token
        token = response.data.data.token;
        expect(token).to.be.a('string');
    });
    
    it('should create a new lead', async () => {
        const randomFirstName = faker.person.firstName();
        const randomEmail = Math.random().toString(36).substring(2,7)+'@gmail.com';
        const randomPhone = '+91'+(Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000).toString();
        const randomAltPhone = '+91'+(Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000).toString();

        console.log('email - '+randomEmail);
        console.log('phone - '+randomPhone);
        console.log('name - '+randomFirstName);

        addLeadPayload.firstName = randomFirstName;
        addLeadPayload.email = randomEmail;
        addLeadPayload.phone = randomPhone;
        addLeadPayload.anotherPhone = randomAltPhone;

        const createLeadResponse = await axios.post(`${baseURL}/v1/lead/add`, addLeadPayload, {
            headers: {
                'x-access-token': token,
                'x-device-id': deviceId,
                'x-company-id': companyId
            }
        });

        expect(createLeadResponse.data.statusCode).to.equal(201);
        expect(createLeadResponse.data.statusCode).to.be.a('number'); // response status code schema validation
        expect(createLeadResponse.data.status).to.equal('OK');
        expect(createLeadResponse.data.status).to.be.a('string');   // response status schema validation
        expect(createLeadResponse.data.data.leadId).to.be.a('string');  // lead id schema validation
        console.log(`Lead created with ID: ${createLeadResponse.data.data.leadId}`);
    });
});
