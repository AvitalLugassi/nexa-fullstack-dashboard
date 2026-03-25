import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(true);
  const idForProfileImg = currentUser ? (Number(currentUser.id) % 20) + 1 : 1;

  const profileInitial = currentUser?.name?.trim()?.charAt(0)?.toUpperCase() || 'U';
  const profileImageUrl =
    currentUser?.avatarUrl || `https://i.pravatar.cc/150?img=${idForProfileImg}` || profileInitial;

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
    setIsLoading(false);
  }, [currentUser]);

  const login = (userData) => setCurrentUser(userData);

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('rememberedUsername');
  };

  const getUserName = () => currentUser?.name || 'Guest';

  const setRememberedUsername = (username) => {
    localStorage.setItem('rememberedUsername', username);
  };

  const getRememberedUsername = () => {
    return localStorage.getItem('rememberedUsername') || '';
  };

  const clearRememberedUsername = () => {
    localStorage.removeItem('rememberedUsername');
  };

  const value = {
    currentUser,
    isLoading,
    idForProfileImg,
    profileInitial,
    profileImageUrl,
    login,
    logout,
    getUserName,
    updateUser: (data) => setCurrentUser(prev => ({ ...prev, ...data })),
    isAuthenticated: () => !!currentUser,
    setRememberedUsername,
    getRememberedUsername,
    clearRememberedUsername
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);