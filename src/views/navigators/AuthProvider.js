import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    return (
        <AuthContext.Provider 
        value={{
            user,
            setUser,
            login : async(email, password) => {
                try {
                    await auth().signInWithEmailAndPassword(email, password)
                } catch (error) {
                    console.log("User Sign In Error : " + error)
                }
            },
            register : async (email, password, userName, phone) => {
                try {
                    await auth().createUserWithEmailAndPassword(email, password)
                    .then((userCredentials)=>{
                        if(userCredentials.user){
                          userCredentials.user.updateProfile({
                            displayName: userName,
                            phoneNumber: phone,
                            photoURL: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
                          })
                        }
                    })
                } catch(error) {
                    console.log("User Creation Error : " +error);
                }
            },
            logout : async () => {
                try {
                    await auth().signOut();
                }catch(error) {
                    console.log("Login Out Error : " + error);
                }
            }
        }}>
            {children}
        </AuthContext.Provider>
    );
}