export default {
    MUTATE: (state, { prop, value }) => {
        state[prop] = value;
    },

    SET_NAV: (state, payload) => {
        const menuName = payload.location + 'Nav';
        state[menuName] = payload.menuItems;
    },
};
