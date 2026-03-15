import { db } from '../firebase';
import { doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';

export const getSiteSettings = async () => {
  try {
    const docRef = doc(db, 'siteSettings', 'main');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
};

export const getPortfolio = async () => {
  try {
    const q = query(collection(db, 'portfolio'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return [];
  }
};

export const getPricing = async () => {
  try {
    const docRef = doc(db, 'pricing', 'main');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error('Error fetching pricing:', error);
    return null;
  }
};
