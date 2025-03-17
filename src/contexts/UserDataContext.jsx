import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const UserDataContext = createContext();

export const useUserData = () => {
  return useContext(UserDataContext);
};

export const UserDataProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState({
    quizCompletions: [],
    codePlaygroundUsage: [],
    learningProgress: {},
    lastActive: null
  });
  const [loading, setLoading] = useState(true);

  // Fetch user data when user changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) {
        setUserData({
          quizCompletions: [],
          codePlaygroundUsage: [],
          learningProgress: {},
          lastActive: null
        });
        setLoading(false);
        return;
      }

      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          // Initialize user data if it doesn't exist
          const initialData = {
            quizCompletions: [],
            codePlaygroundUsage: [],
            learningProgress: {},
            lastActive: Timestamp.now(),
            createdAt: Timestamp.now()
          };
          await setDoc(userDocRef, initialData);
          setUserData(initialData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    // Update last active timestamp
    if (currentUser) {
      updateLastActive();
    }
  }, [currentUser]);

  // Update last active timestamp
  const updateLastActive = async () => {
    if (!currentUser) return;

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
        lastActive: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating last active timestamp:', error);
    }
  };

  // Record quiz completion
  const recordQuizCompletion = async (quizData) => {
    if (!currentUser) return;

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      
      const quizCompletion = {
        ...quizData,
        timestamp: Timestamp.now()
      };
      
      await updateDoc(userDocRef, {
        quizCompletions: arrayUnion(quizCompletion),
        lastActive: Timestamp.now()
      });
      
      // Update local state
      setUserData(prevData => ({
        ...prevData,
        quizCompletions: [...prevData.quizCompletions, quizCompletion],
        lastActive: Timestamp.now()
      }));
      
      return true;
    } catch (error) {
      console.error('Error recording quiz completion:', error);
      return false;
    }
  };

  // Record code playground usage
  const recordCodePlaygroundUsage = async (code) => {
    if (!currentUser) return;

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      
      const usage = {
        code: code.substring(0, 500), // Store only first 500 chars to avoid large documents
        timestamp: Timestamp.now(),
        language: 'javascript' // Default to JavaScript for now
      };
      
      await updateDoc(userDocRef, {
        codePlaygroundUsage: arrayUnion(usage),
        lastActive: Timestamp.now()
      });
      
      // Update local state
      setUserData(prevData => ({
        ...prevData,
        codePlaygroundUsage: [...prevData.codePlaygroundUsage, usage],
        lastActive: Timestamp.now()
      }));
      
      return true;
    } catch (error) {
      console.error('Error recording code playground usage:', error);
      return false;
    }
  };

  // Update learning progress
  const updateLearningProgress = async (topic, progress) => {
    if (!currentUser) return;

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      
      // Create updated learning progress object
      const updatedProgress = {
        ...userData.learningProgress,
        [topic]: progress
      };
      
      await updateDoc(userDocRef, {
        learningProgress: updatedProgress,
        lastActive: Timestamp.now()
      });
      
      // Update local state
      setUserData(prevData => ({
        ...prevData,
        learningProgress: updatedProgress,
        lastActive: Timestamp.now()
      }));
      
      return true;
    } catch (error) {
      console.error('Error updating learning progress:', error);
      return false;
    }
  };

  // Reset user data
  const resetUserData = async () => {
    if (!currentUser) return;

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      
      const initialData = {
        quizCompletions: [],
        codePlaygroundUsage: [],
        learningProgress: {},
        lastActive: Timestamp.now(),
        updatedAt: Timestamp.now()
      };
      
      await updateDoc(userDocRef, initialData);
      
      // Update local state
      setUserData(prevData => ({
        ...prevData,
        ...initialData
      }));
      
      return true;
    } catch (error) {
      console.error('Error resetting user data:', error);
      return false;
    }
  };

  const value = {
    userData,
    loading,
    recordQuizCompletion,
    recordCodePlaygroundUsage,
    updateLearningProgress,
    resetUserData
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext; 