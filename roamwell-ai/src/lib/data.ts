import { Region, HealthRisk } from './types';

const healthRisks: Record<string, HealthRisk> = {
  malaria: {
    id: 'malaria', name: 'Malaria', level: 'high',
    description: 'Parasitic disease transmitted by mosquitoes, especially in lowland and seasonal areas.',
    symptoms: ['High fever', 'Chills', 'Headache', 'Muscle aches', 'Fatigue'],
    prevention: ['Use insecticide-treated bed nets', 'Apply insect repellent (DEET)', 'Wear long sleeves', 'Consider antimalarial medication'],
    seasonality: 'Peak during rainy season (Kiremt: June-September)',
    affectedGroups: ['Children under 5', 'Pregnant women', 'Non-immune travelers']
  },
  respiratory: {
    id: 'respiratory', name: 'Respiratory Infections', level: 'moderate',
    description: 'Including pneumonia, bronchitis, and seasonal flu in highland areas.',
    symptoms: ['Cough', 'Shortness of breath', 'Chest pain', 'Fever'],
    prevention: ['Maintain good ventilation', 'Avoid smoke and dust', 'Stay warm and dry', 'Get flu vaccination'],
    seasonality: 'More common in cold, dry season (Bega)'
  },
  dehydration: {
    id: 'dehydration', name: 'Dehydration & Heat Illness', level: 'high',
    description: 'Particularly in hot, lowland regions with limited water access.',
    symptoms: ['Thirst', 'Dry mouth', 'Dark urine', 'Dizziness', 'Rapid heartbeat'],
    prevention: ['Drink 2-3 liters of water daily', 'Rest during peak heat (10am-4pm)', 'Consume electrolytes']
  },
  altitude: {
    id: 'altitude', name: 'Altitude Sickness', level: 'moderate',
    description: 'Acute Mountain Sickness (AMS) in high-altitude areas above 2500m.',
    symptoms: ['Headache', 'Nausea', 'Fatigue', 'Shortness of breath'],
    prevention: ['Ascend gradually', 'Stay hydrated', 'Rest adequately', 'Avoid alcohol']
  },
  waterborne: {
    id: 'waterborne', name: 'Waterborne Diseases', level: 'high',
    description: 'Cholera, dysentery, and other water-related infections.',
    symptoms: ['Diarrhea', 'Vomiting', 'Cramps', 'Dehydration'],
    prevention: ['Only drink safe water (boiled, bottled, purified)', 'Wash hands frequently', 'Cook food thoroughly']
  }
};

export const regions: Region[] = [
  {
    id: 'addis-ababa', name: 'Addis Ababa', amharicName: 'አዲስ አበባ',
    altitude: 2355, climate: 'subtropical', latitude: 9.0320, longitude: 38.7469, population: 5000000,
    risks: [healthRisks.respiratory, healthRisks.dehydration, healthRisks.altitude]
  },
  {
    id: 'oromia', name: 'Oromia', amharicName: 'ኦሮሚያ',
    altitude: 1500, climate: 'tropical', latitude: 8.5, longitude: 38.5,
    risks: [healthRisks.malaria, healthRisks.dehydration, healthRisks.waterborne]
  },
  {
    id: 'amhara', name: 'Amhara', amharicName: 'አማራ',
    altitude: 2000, climate: 'temperate', latitude: 11.5, longitude: 37.5,
    risks: [healthRisks.respiratory, healthRisks.altitude, healthRisks.waterborne]
  },
  {
    id: 'afar', name: 'Afar', amharicName: 'አፋር',
    altitude: 500, climate: 'tropical', latitude: 11.8, longitude: 40.5,
    risks: [healthRisks.dehydration, healthRisks.malaria, healthRisks.waterborne]
  },
  {
    id: 'tigray', name: 'Tigray', amharicName: 'ትግራይ',
    altitude: 2000, climate: 'temperate', latitude: 14.5, longitude: 39.5,
    risks: [healthRisks.respiratory, healthRisks.altitude, healthRisks.waterborne]
  },
  {
    id: 'somali', name: 'Somali', amharicName: 'ሶማሌ',
    altitude: 300, climate: 'tropical', latitude: 6.0, longitude: 42.0,
    risks: [healthRisks.dehydration, healthRisks.malaria, healthRisks.waterborne]
  },
  {
    id: 'gambella', name: 'Gambella', amharicName: 'ጋምቤላ',
    altitude: 400, climate: 'tropical', latitude: 8.2, longitude: 34.6,
    risks: [healthRisks.malaria, healthRisks.dehydration, healthRisks.waterborne]
  },
  {
    id: 'sidama', name: 'Sidama', amharicName: 'ሲዳማ',
    altitude: 1500, climate: 'subtropical', latitude: 6.5, longitude: 38.5,
    risks: [healthRisks.malaria, healthRisks.waterborne, healthRisks.respiratory]
  },
  {
    id: 'snnpr', name: 'SNNPR', amharicName: 'ደቡብ',
    altitude: 1200, climate: 'subtropical', latitude: 6.5, longitude: 36.5,
    risks: [healthRisks.malaria, healthRisks.waterborne, healthRisks.respiratory]
  }
];

export const regionDetails: Record<string, {
  traditionalRemedies: { name: string; description: string }[];
  modernRemedies: { name: string; description: string }[];
  emergencyContacts: { name: string; city: string; phone: string; type: string }[];
}> = {
  'tigray': {
    traditionalRemedies: [
      {
        name: 'Honey (Mar) & Ginger Tea',
        description: 'Soothes respiratory infections common in highland areas. Boosts immunity naturally.'
      },
      {
        name: 'Black Seed (Tikur Azmud) Oil',
        description: 'Traditional remedy for general wellness, respiratory support, and digestive health.'
      },
      {
        name: 'Feto (Lepidium sativum) Paste',
        description: 'Applied to wounds and skin infections. Has antibacterial properties.'
      },
    ],
    modernRemedies: [
      {
        name: 'ORS (Oral Rehydration Salts)',
        description: 'Essential for diarrhoeal diseases. Restores electrolyte balance quickly.'
      },
      {
        name: 'Zinc Supplements',
        description: 'Reduces duration and severity of diarrhoea in children.'
      },
      {
        name: 'Antimalarial (Coartem)',
        description: 'Effective against uncomplicated malaria. Use only after testing.'
      },
      {
        name: 'Sunscreen SPF 50+',
        description: 'High altitude UV protection. Apply every 2 hours when outdoors.'
      },
    ],
    emergencyContacts: [
      { name: 'Ayder Comprehensive Specialized Hospital', city: 'Mekelle', phone: '+251-344-41-5050', type: 'Referral Hospital' },
      { name: 'Mekelle General Hospital', city: 'Mekelle', phone: '+251-344-40-1200', type: 'General Hospital' },
      { name: 'Adwa Health Center', city: 'Adwa', phone: '+251-347-71-0011', type: 'Health Center' },
      { name: 'Axum St. Mary Hospital', city: 'Axum', phone: '+251-347-72-1122', type: 'Hospital' },
      { name: 'Shire Suhul General Hospital', city: 'Shire', phone: '+251-345-81-0005', type: 'Hospital' },
      { name: 'Alamata Hospital', city: 'Alamata', phone: '+251-343-64-0200', type: 'Hospital' },
    ],
  },
};

export const defaultRegionDetails = {
  traditionalRemedies: [
    { name: 'Honey & Lemon', description: 'Classic immunity booster.' },
    { name: 'Ginger (Zinjibil)', description: 'Helps digestion and respiratory health.' },
  ],
  modernRemedies: [
    { name: 'ORS', description: 'Prevents dehydration.' },
    { name: 'Sunscreen', description: 'Protects against UV rays.' },
  ],
  emergencyContacts: [
    { name: 'Regional Referral Hospital', city: 'Capital', phone: 'Call local emergency', type: 'Hospital' },
  ],
};

export interface BeautyData {
  uvIndex: number;             // 0-11+
  humidity: number;            // percentage
  skinRiskLevel: 'low' | 'moderate' | 'high' | 'extreme';
  uvAdvice: string;
  hydrationAdvice: string;
  warnings: string[];
  traditionalRemedies: string[];
  modernSkincare: string[];
}

export const beautyRegionData: Record<string, BeautyData> = {
  'addis-ababa': {
    uvIndex: 9,
    humidity: 45,
    skinRiskLevel: 'high',
    uvAdvice: 'High altitude UV (2,355m). Sun damage happens faster here.',
    hydrationAdvice: 'Dry, cool climate. Skin loses moisture quickly.',
    warnings: ['Use SPF 50+ daily, even when cloudy.', 'Reapply every 2 hours if outdoors.'],
    traditionalRemedies: [
      'Honey & olive oil face mask for deep hydration',
      'Shea butter (Qibe) for dry elbows/knees',
      'Aloe vera for altitude sunburns',
    ],
    modernSkincare: [
      'Hyaluronic acid serum under moisturiser',
      'Broad‑spectrum SPF 50+',
      'Gentle foaming cleanser (no alcohol)',
    ],
  },
  'afar': {
    uvIndex: 11,
    humidity: 20,
    skinRiskLevel: 'extreme',
    uvAdvice: 'Extreme desert UV. Highest risk of severe sunburn.',
    hydrationAdvice: 'Extreme heat causes rapid skin dehydration and cracking.',
    warnings: ['Cover skin completely.', 'Avoid sun exposure between 10 AM – 4 PM.'],
    traditionalRemedies: [
      'Coconut oil for hair and skin protection',
      'Raw honey & milk for sunburn relief',
      'Teff flour paste for cooling skin irritations',
    ],
    modernSkincare: [
      'Water‑resistant SPF 100+',
      'After‑sun gel with aloe & vitamin E',
      'Electrolyte‑infused facial mist',
    ],
  },
};

export const defaultBeautyData: BeautyData = {
  uvIndex: 7,
  humidity: 50,
  skinRiskLevel: 'moderate',
  uvAdvice: 'Standard UV protection advised.',
  hydrationAdvice: 'Keep skin moisturised.',
  warnings: ['Use SPF 30+.'],
  traditionalRemedies: ['Honey mask', 'Shea butter'],
  modernSkincare: ['Moisturiser', 'Sunscreen'],
};