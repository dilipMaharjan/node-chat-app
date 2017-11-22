var { isRealString } = require('./../util/validation');

describe('Validation', () => {
    it('should reject non string values', () => {
        var res = isRealString(89);
        expect(res).toBeFalsy();
    });

    it('should rejet spaces', () => {
        var res = isRealString('   ');
        expect(res).toBeFalsy();
    });

    it('should allow the non-space characters', () => {
        var res = isRealString('  dilip  ');
        expect(res).toBeTruthy();
    });


});
