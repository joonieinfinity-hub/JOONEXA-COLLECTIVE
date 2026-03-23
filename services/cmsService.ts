import { db } from '../firebase';
import { doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from './errorService';
import projectsData from '../data/projects.json';
import pricingData from '../data/pricing.json';

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
    console.log('Fetching portfolio data from Firestore...');
    const q = query(collection(db, 'portfolio'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('Portfolio collection is empty, using fallback data.');
      return projectsData.projects;
    }

    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('Fetched portfolio data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    handleFirestoreError(error, OperationType.LIST, path);
    return projectsData.projects;
  }
};

export const getPricing = async () => {
  const path = 'pricing/main';
  try {
    console.log('Fetching pricing data from Firestore...');
    const docRef = doc(db, 'pricing', 'main');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log('Fetched pricing data:', data);
      
      // If the data has a 'tiers' property (matching current UI expectation)
      if (data.tiers) return data;
      
      // If the data follows the blueprint structure, transform it
      if (data.starterPrice) {
        return {
          tiers: [
            {
              id: '1',
              name: 'Starter Campaign',
              price: data.starterPrice,
              description: 'Best for small brands testing influencer marketing',
              features: data.starterFeatures || [],
              cta: 'Discuss Your Campaign'
            },
            {
              id: '2',
              name: 'Growth Campaign',
              price: data.growthPrice,
              description: 'Best for scaling brand visibility',
              features: data.growthFeatures || [],
              cta: 'Book a Strategy Call'
            },
            {
              id: '3',
              name: 'Brand Partnership Program',
              price: data.premiumPrice,
              description: 'Best for long-term influencer partnerships',
              features: data.premiumFeatures || [],
              cta: 'Request a Custom Plan'
            }
          ]
        };
      }
      
      return data;
    }
    
    console.log('Pricing document not found, using fallback data.');
    return { tiers: pricingData.pricing };
  } catch (error) {
    console.error('Error fetching pricing:', error);
    handleFirestoreError(error, OperationType.GET, path);
    return { tiers: pricingData.pricing };
  }
};
