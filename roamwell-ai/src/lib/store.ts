import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, FamilyMember, TravelChecklistItem } from './types';

interface WellnessStore {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;

  activeProfileId: string | 'main';
  setActiveProfileId: (id: string | 'main') => void;
  addFamilyMember: (member: FamilyMember) => void;
  removeFamilyMember: (id: string) => void;

  selectedRegion: string | null;
  setSelectedRegion: (regionId: string | null) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;

  // Travel Advisor persisted state
  travelDestination: string | null;
  setTravelDestination: (regionId: string | null) => void;
  travelChecklist: TravelChecklistItem[];
  setTravelChecklist: (
    items: TravelChecklistItem[] | ((prev: TravelChecklistItem[]) => TravelChecklistItem[])
  ) => void;
}

export const useWellnessStore = create<WellnessStore>()(
  persist(
    (set) => ({
      userProfile: null,
      setUserProfile: (profile) => set({ userProfile: profile }),

      activeProfileId: 'main',
      setActiveProfileId: (id) => set({ activeProfileId: id }),

      addFamilyMember: (member) =>
        set((state) => {
          if (!state.userProfile) return state;
          const updatedProfile = {
            ...state.userProfile,
            familyMembers: [...(state.userProfile.familyMembers || []), member],
            updatedAt: new Date().toISOString(),
          };
          return { userProfile: updatedProfile };
        }),

      removeFamilyMember: (id) =>
        set((state) => {
          if (!state.userProfile) return state;
          const updatedProfile = {
            ...state.userProfile,
            familyMembers: (state.userProfile.familyMembers || []).filter(
              (m) => m.id !== id
            ),
            updatedAt: new Date().toISOString(),
          };
          const newActiveId =
            state.activeProfileId === id ? 'main' : state.activeProfileId;
          return { userProfile: updatedProfile, activeProfileId: newActiveId };
        }),

      selectedRegion: null,
      setSelectedRegion: (regionId) => set({ selectedRegion: regionId }),
      isChatOpen: false,
      setIsChatOpen: (open) => set({ isChatOpen: open }),

      // Travel state
      travelDestination: null,
      setTravelDestination: (regionId) => set({ travelDestination: regionId }),
      travelChecklist: [],
      setTravelChecklist: (updater) =>
        set((state) => ({
          travelChecklist:
            typeof updater === 'function' ? updater(state.travelChecklist) : updater,
        })),
    }),
    {
      name: 'roamwell-store',
      // Optional: if you ever need to migrate, you can do it here.
      // version: 0,
    }
  )
);