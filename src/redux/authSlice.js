import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    users: [], // store all users
    currentUser: null,
    otp: null,
    otpUser: null, //email or mobile
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // signup
        signup: (state, action) => {
            const { email, password } = action.payload;

            const userExists = state.users.find(u => u.email === email);

            if (!userExists) {
                state.users.push({ email, password });
            }
        },

        // signin
        signin: (state, action) => {
            const { email, password } = action.payload;

            const user = state.users.find(
                u => u.email === email && u.password === password
            );

            if (user) {
                state.currentUser = user;
                return user;
            } else {
                return null;
            }
        },

        //  generate OTP

        generateOTP: (state, action) => {
            const otp = Math.floor(100000 + Math.random() * 900000);
            state.otp = otp;
            state.otpUser = action.payload;

            console.log("OTP", otp)
        },

        // verifyotp
        verifyOTP: (state, action) => {
            if (state.otp === action.payload) {
                state.currentUser = { email: state.otpUser };
            }
        },

        // logout
        logout: (state) => {
            state.currentUser = null;
        },
    },
});

export const { signup, signin, generateOTP, verifyOTP, logout } = authSlice.actions;
export default authSlice.reducer;