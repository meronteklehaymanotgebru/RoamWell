export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';

export interface HealthRisk {
  id: string;
  name: string;
  level: RiskLevel;
  description: string;
  symptoms: string[];
  prevention: string[];
  seasonality?: string;
  affectedGroups?: string[];
}

export interface Region {
  id: string;
  name: string;
  amharicName?: string;
  altitude?: number;
  climate: 'tropical' | 'subtropical' | 'temperate' | 'highland';
  latitude: number;
  longitude: number;
  population?: number;
  risks: HealthRisk[];
}

export interface FamilyMember {
  id: string;
  name: string;
  age: number;
  relationship: 'child' | 'spouse' | 'parent' | 'other';
  gender: 'male' | 'female' | 'other';
  conditions: string[];
  isPregnant?: boolean;
}
export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  conditions: string[];
  medications: string[];
  isPregnant?: boolean;
  familyMembers: FamilyMember[];
  createdAt: string;
  updatedAt: string;
}

export interface WellnessAdvice {
  risks: string[];
  recommendations: string[];
  preventiveMeasures: string[];
  ethiopianRemedies: string[];
  whenToSeekHelp: string[];
}
export interface TravelChecklistItem {
  id: string;
  text: string;
  status: 'todo' | 'in-progress' | 'done';
}
export type ActiveProfile = UserProfile | FamilyMember;