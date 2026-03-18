import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    currentUser: null,
    otp: null,
    otpUser: null,
    authStatus: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signup: (state, action) => {
            const { name, email, password, mobile } = action.payload;

            const userExists = state.users.find((u) => u.email === email || u.mobile === mobile);

            if (userExists) {
                state.authStatus = "EXISTS";
            } else {
                const newUser = { name, email, password, mobile };
                state.users.push(newUser);
                state.authStatus = "CREATED";

                if (typeof window !== "undefined") {
                    localStorage.setItem("users", JSON.stringify(state.users));
                }
            }
        },

        signin: (state, action) => {
            const { identifier, password, loginMethod } = action.payload;

            const user = state.users.find((u) =>
                loginMethod === "email" ? u.email === identifier : u.mobile === identifier
            );

            if (!user) {
                state.authStatus = "NO_USER";
            } else if (user.password !== password) {
                state.authStatus = "WRONG_PASSWORD";
            } else {
                state.currentUser = user;
                state.authStatus = "SUCCESS";
            }
        },

        //  LOAD USERS
        loadUsers: (state) => {
            if (typeof window !== "undefined") {
                const data = localStorage.getItem("users");
                if (data) {
                    state.users = JSON.parse(data);
                }
            }
        },
        resetAuthStatus: (state) => {
            state.authStatus = null;
        },

        // OTP GENERATE
        generateOTP: (state, action) => {
            const { identifier, loginMethod } = action.payload;
            const user = state.users.find((u) =>
                loginMethod === "email" ? u.email === identifier : u.mobile === identifier
            );
            if (!user) {
                state.authStatus = "NO_USER";
            } else {
                const otp = Math.floor(100000 + Math.random() * 900000);
                state.otp = otp;
                state.otpUser = identifier;
                state.authStatus = "OTP_SENT";

                console.log("OTP:", otp);
            }
        },

        // VERIFY OTP
        verifyOTP: (state, action) => {
            const enteredOTP = action.payload;

            if (parseInt(enteredOTP) === state.otp) {
                const user = state.users.find(
                    (u) => u.email === state.otpUser || u.mobile === state.otpUser
                );
                state.currentUser = user;
                state.authStatus = "OTP_SUCCESS";
            } else {
                state.authStatus = "OTP_FAILED";
            }
        },

        logout: (state) => {
            state.currentUser = null;
        },
    },
});

export const {
    signup,
    signin,
    loadUsers,
    logout,
    resetAuthStatus,
    generateOTP,
    verifyOTP,
} = authSlice.actions;

export default authSlice.reducer;