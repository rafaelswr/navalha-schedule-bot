
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CompanyInfo {
  name: string;
  description: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  workHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
    monday: string;
  };
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  location: {
    lat: number;
    lng: number;
  };
}

interface CompanyState {
  info: CompanyInfo;
  updateInfo: (info: Partial<CompanyInfo>) => void;
  updateSocialMedia: (socialMedia: Partial<CompanyInfo['socialMedia']>) => void;
  updateWorkHours: (workHours: Partial<CompanyInfo['workHours']>) => void;
  updateLocation: (location: CompanyInfo['location']) => void;
}

export const useCompanyStore = create<CompanyState>()(
  persist(
    (set) => ({
      info: {
        name: "Clube da Navalha",
        description: "Barbearia moderna com serviços de qualidade premium para homens exigentes.",
        address: "Rua da Barbearia, 123",
        city: "Lisboa",
        postalCode: "1000-001",
        country: "Portugal",
        phone: "+351 912 345 678",
        email: "info@clubedanavalha.pt",
        workHours: {
          weekdays: "10h - 19h",
          saturday: "10h - 19h",
          sunday: "Fechado",
          monday: "Fechado"
        },
        socialMedia: {
          facebook: "https://facebook.com",
          instagram: "https://instagram.com",
          twitter: "https://twitter.com"
        },
        location: {
          lat: 38.7223,
          lng: -9.1393
        }
      },
      updateInfo: (newInfo) => set((state) => ({ 
        info: { ...state.info, ...newInfo } 
      })),
      updateSocialMedia: (newSocialMedia) => set((state) => ({ 
        info: { 
          ...state.info, 
          socialMedia: { ...state.info.socialMedia, ...newSocialMedia } 
        } 
      })),
      updateWorkHours: (newWorkHours) => set((state) => ({ 
        info: { 
          ...state.info, 
          workHours: { ...state.info.workHours, ...newWorkHours } 
        } 
      })),
      updateLocation: (newLocation) => set((state) => ({ 
        info: { 
          ...state.info, 
          location: newLocation
        } 
      })),
    }),
    {
      name: 'company-storage',
    }
  )
);
