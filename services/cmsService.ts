import { db } from '../firebase';
import { doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from './errorService';

export const getSiteSettings = async () => {
  const path = 'siteSettings/main';
  try {
    const docRef = doc(db, 'siteSettings', 'main');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return null;
  }
};

export const getPortfolio = async () => {
  const path = 'portfolio';
  try {
    const q = query(collection(db, 'portfolio'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
};

export const getPricing = async () => {
  const path = 'pricing/main';
  try {
    const docRef = doc(db, 'pricing', 'main');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return null;
  }
};
