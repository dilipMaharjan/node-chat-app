const { Users } = require('./../util/users');

describe('User', () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: 1,
                name: 'Dilip',
                room: 'room1'
            },
            {
                id: 2,
                name: 'Mike',
                room: 'room1'
            },
            {
                id: 3,
                name: 'Booha',
                room: 'room1'
            }
        ];
    });

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: 123,
            name: 'dilip',
            room: 'teaser fan'
        };
        let res = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should list of user names', () => {
        let userNames = users.getUserNameList('room1');
        expect(userNames).toEqual(['Dilip', 'Mike', 'Booha']);
    });

    it('should find a user', () => {
        let user = users.getUser(2);
        expect(user.id).toBe(2);
    });

    it('should not find a user', () => {
        let user = users.getUser(13);
        expect(user).toBeUndefined();
    });

    it('should remove a user', () => {
        let user = users.removeUser(2);
        expect(user.id).toBe(2);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        let user = users.removeUser(12);
        expect(user).toBeUndefined();
        expect(users.users.length).toBe(3);
    });
});