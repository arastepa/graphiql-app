// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import {
//   Auth,
//   createUserWithEmailAndPassword,
//   UserCredential,
//   User,
// } from '@firebase/auth';

// type SignUp = {
//   auth: Auth;
//   email: string;
//   password: string;
// };

// interface AuthContextType {
//   isAuthenticated: boolean;
//   signUp: (data: SignUp) => Promise<UserCredential>;
//   user?: User;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     Boolean(localStorage.getItem('accessToken')),
//   );
//   const [user, setUser] = useState<User>();

//   const signUp = async ({ auth, email, password }: SignUp) => {
//     const userData = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password,
//     );

//     console.log({ userData, user });

//     setUser(userData.user);

//     const token = await userData.user.getIdToken();
//     localStorage.setItem('accessToken', token);

//     setIsAuthenticated(Boolean(token));

//     return userData;
//   };

//   return (
//     <AuthContext.Provider value={{ signUp, isAuthenticated, user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within a AuthProvider');
//   }
//   return context;
// };
