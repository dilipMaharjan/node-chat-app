var { generateMessage, generateLocationMessage } = require('./../util/message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Jen';
        var text = "something";
        var message = generateMessage(from, text);
        expect(message.from).toEqual('Jen');
        expect(message.text).toEqual('something');
    });
});
describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Bev';
        var latitude = 15;
        var longitude = 19;
        var url = `https://google.com/maps?q=${latitude},${longitude}`;
        var message = generateLocationMessage(from, latitude, longitude);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url });
    });
});