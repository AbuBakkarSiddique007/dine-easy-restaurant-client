import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../../firebase/firebase.config";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const googleProvider = new GoogleAuthProvider();

    // Create or Register User:
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Login User:
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // LogOut User:
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    // Update User Profile:
    const updateUserProfile = (name, photo) => {
        setLoading(true)
        updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        }).then(() => {
            console.log("Profile updated!");

        }).catch((error) => {
            console.log("An error occurred", error);

        });
    }

    // Google Login:
    const LoginWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }


    useEffect(() => {
        console.log("User state changed:", user);
    }, [user])



    // Manage Users
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
                setLoading(false)

            }
            else {
                setUser(null)
                setLoading(false)

            }
        })
        return () => {
            return unsubscribe()
        }

    }, [])


    const userInfo = {
        user,
        loading,
        createUser,
        loginUser,
        logOut,
        updateUserProfile,
        LoginWithGoogle


    }
    return (
        <div>
            <AuthContext.Provider value={userInfo}>
                {
                    children
                }
            </AuthContext.Provider>

        </div>
    );
};

export default AuthProvider;
