export default {
    MUTATE: (state, { prop, value }) => {
        state[prop] = value;
    },
    MUTATE_KEY: (state, { prop, key, value }) => {
        state[prop] = { ...state[prop], [key]: value };
    },
    SET_NAV: (state, payload) => {
        const menuName = payload.location + 'Nav';
        state[menuName] = payload.menuItems;
    },
};
