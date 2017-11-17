var expect = require('expect');
var { generateMessage } = require('./../util/message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Jen';
        var text = "something";
        var message = generateMessage(from, text);
        expect(message.from).toEqual('Jen');
        expect(message.text).toEqual('something');
    });
});