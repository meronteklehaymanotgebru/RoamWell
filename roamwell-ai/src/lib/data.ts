import { Region, HealthRisk } from './types';

// ===== HEALTH RISKS =====
const healthRisks: Record<string, HealthRisk> = {
  malaria: {
    id: 'malaria',
    name: 'Malaria',
    level: 'high',
    description:
      'Parasitic disease transmitted by mosquitoes, especially in lowland and seasonal areas.',
    symptoms: ['High fever', 'Chills', 'Headache', 'Muscle aches', 'Fatigue'],
    prevention: [
      'Use insecticide-treated bed nets',
      'Apply insect repellent (DEET)',
      'Wear long sleeves',
      'Consider antimalarial medication',
    ],
    seasonality: 'Peak during rainy season (Kiremt: June-September)',
    affectedGroups: ['Children under 5', 'Pregnant women', 'Non-immune travelers'],
  },
  respiratory: {
    id: 'respiratory',
    name: 'Respiratory Infections',
    level: 'moderate',
    description:
      'Including pneumonia, bronchitis, and seasonal flu in highland areas.',
    symptoms: ['Cough', 'Shortness of breath', 'Chest pain', 'Fever'],
    prevention: [
      'Maintain good ventilation',
      'Avoid smoke and dust',
      'Stay warm and dry',
      'Get flu vaccination',
    ],
    seasonality: 'More common in cold, dry season (Bega)',
  },
  dehydration: {
    id: 'dehydration',
    name: 'Dehydration & Heat Illness',
    level: 'high',
    description:
      'Particularly in hot, lowland regions with limited water access.',
    symptoms: ['Thirst', 'Dry mouth', 'Dark urine', 'Dizziness', 'Rapid heartbeat'],
    prevention: [
      'Drink 2-3 liters of water daily',
      'Rest during peak heat (10am-4pm)',
      'Consume electrolytes',
    ],
  },
  altitude: {
    id: 'altitude',
    name: 'Altitude Sickness',
    level: 'moderate',
    description:
      'Acute Mountain Sickness (AMS) in high-altitude areas above 2500m.',
    symptoms: ['Headache', 'Nausea', 'Fatigue', 'Shortness of breath'],
    prevention: [
      'Ascend gradually',
      'Stay hydrated',
      'Rest adequately',
      'Avoid alcohol',
    ],
  },
  waterborne: {
    id: 'waterborne',
    name: 'Waterborne Diseases',
    level: 'high',
    description: 'Cholera, dysentery, and other water-related infections.',
    symptoms: ['Diarrhea', 'Vomiting', 'Cramps', 'Dehydration'],
    prevention: [
      'Only drink safe water (boiled, bottled, purified)',
      'Wash hands frequently',
      'Cook food thoroughly',
    ],
  },
};

// ===== REGIONS =====
export const regions: Region[] = [
  {
    id: 'addis-ababa',
    name: 'Addis Ababa',
    amharicName: 'አዲስ አበባ',
    altitude: 2355,
    climate: 'subtropical',
    latitude: 9.032,
    longitude: 38.7469,
    population: 5000000,
    risks: [healthRisks.respiratory, healthRisks.dehydration, healthRisks.altitude],
  },
  {
    id: 'oromia',
    name: 'Oromia',
    amharicName: 'ኦሮምያ',
    altitude: 1500,
    climate: 'tropical',
    latitude: 8.5,
    longitude: 38.5,
    risks: [healthRisks.malaria, healthRisks.dehydration, healthRisks.waterborne],
  },
  {
    id: 'amhara',
    name: 'Amhara',
    amharicName: 'አማራ',
    altitude: 2000,
    climate: 'temperate',
    latitude: 11.5,
    longitude: 37.5,
    risks: [healthRisks.respiratory, healthRisks.altitude, healthRisks.waterborne],
  },
  {
    id: 'afar',
    name: 'Afar',
    amharicName: 'አፋር',
    altitude: 500,
    climate: 'tropical',
    latitude: 11.8,
    longitude: 40.5,
    risks: [healthRisks.dehydration, healthRisks.malaria, healthRisks.waterborne],
  },
  {
    id: 'tigray',
    name: 'Tigray',
    amharicName: 'ትግራይ',
    altitude: 2000,
    climate: 'temperate',
    latitude: 14.5,
    longitude: 39.5,
    risks: [healthRisks.respiratory, healthRisks.altitude, healthRisks.waterborne],
  },
  {
    id: 'somali',
    name: 'Somali',
    amharicName: 'ሶማሌ',
    altitude: 300,
    climate: 'tropical',
    latitude: 6.0,
    longitude: 42.0,
    risks: [healthRisks.dehydration, healthRisks.malaria, healthRisks.waterborne],
  },
  {
    id: 'gambella',
    name: 'Gambella',
    amharicName: 'ጋምቤላ',
    altitude: 400,
    climate: 'tropical',
    latitude: 8.2,
    longitude: 34.6,
    risks: [healthRisks.malaria, healthRisks.dehydration, healthRisks.waterborne],
  },
  {
    id: 'sidama',
    name: 'Sidama',
    amharicName: 'ሲዳማ',
    altitude: 1500,
    climate: 'subtropical',
    latitude: 6.5,
    longitude: 38.5,
    risks: [healthRisks.malaria, healthRisks.waterborne, healthRisks.respiratory],
  },
  {
    id: 'snnpr',
    name: 'SNNPR',
    amharicName: 'ደቡብ',
    altitude: 1200,
    climate: 'subtropical',
    latitude: 6.5,
    longitude: 36.5,
    risks: [healthRisks.malaria, healthRisks.waterborne, healthRisks.respiratory],
  },
  // Added missing parent regions for zones
  {
    id: 'benishangul',
    name: 'Benishangul',
    altitude: 1200,
    climate: 'tropical',
    latitude: 10.5,
    longitude: 35.5,
    risks: [],
  },
  {
    id: 'dire-dawa',
    name: 'Dire Dawa',
    altitude: 1000,
    climate: 'tropical',
    latitude: 9.6,
    longitude: 41.8,
    risks: [healthRisks.dehydration, healthRisks.waterborne],
  },
  {
    id: 'harari',
    name: 'Harari',
    altitude: 1800,
    climate: 'subtropical',
    latitude: 9.3,
    longitude: 42.1,
    risks: [healthRisks.respiratory],
  },
];

// ===== REGION DETAILS (REMEDIES & EMERGENCY) =====
export const regionDetails: Record<
  string,
  {
    traditionalRemedies: { name: string; description: string }[];
    modernRemedies: { name: string; description: string }[];
    emergencyContacts: { name: string; city: string; phone: string; type: string }[];
  }
> = {
  tigray: {
    traditionalRemedies: [
      {
        name: 'Honey (Mar) & Ginger Tea',
        description:
          'Soothes respiratory infections common in highland areas. Boosts immunity naturally.',
      },
      {
        name: 'Black Seed (Tikur Azmud) Oil',
        description:
          'Traditional remedy for general wellness, respiratory support, and digestive health.',
      },
      {
        name: 'Feto (Lepidium sativum) Paste',
        description:
          'Applied to wounds and skin infections. Has antibacterial properties.',
      },
    ],
    modernRemedies: [
      {
        name: 'ORS (Oral Rehydration Salts)',
        description:
          'Essential for diarrhoeal diseases. Restores electrolyte balance quickly.',
      },
      {
        name: 'Zinc Supplements',
        description:
          'Reduces duration and severity of diarrhoea in children.',
      },
      {
        name: 'Antimalarial (Coartem)',
        description:
          'Effective against uncomplicated malaria. Use only after testing.',
      },
      {
        name: 'Sunscreen SPF 50+',
        description:
          'High altitude UV protection. Apply every 2 hours when outdoors.',
      },
    ],
    emergencyContacts: [
      {
        name: 'Ayder Comprehensive Specialized Hospital',
        city: 'Mekelle',
        phone: '+251-344-41-5050',
        type: 'Referral Hospital',
      },
      {
        name: 'Mekelle General Hospital',
        city: 'Mekelle',
        phone: '+251-344-40-1200',
        type: 'General Hospital',
      },
      {
        name: 'Adwa Health Center',
        city: 'Adwa',
        phone: '+251-347-71-0011',
        type: 'Health Center',
      },
      {
        name: 'Axum St. Mary Hospital',
        city: 'Axum',
        phone: '+251-347-72-1122',
        type: 'Hospital',
      },
      {
        name: 'Shire Suhul General Hospital',
        city: 'Shire',
        phone: '+251-345-81-0005',
        type: 'Hospital',
      },
      {
        name: 'Alamata Hospital',
        city: 'Alamata',
        phone: '+251-343-64-0200',
        type: 'Hospital',
      },
    ],
  },
};

export const defaultRegionDetails = {
  traditionalRemedies: [
    { name: 'Honey & Lemon', description: 'Classic immunity booster.' },
    {
      name: 'Ginger (Zinjibil)',
      description: 'Helps digestion and respiratory health.',
    },
  ],
  modernRemedies: [
    { name: 'ORS', description: 'Prevents dehydration.' },
    { name: 'Sunscreen', description: 'Protects against UV rays.' },
  ],
  emergencyContacts: [
    {
      name: 'Regional Referral Hospital',
      city: 'Capital',
      phone: 'Call local emergency',
      type: 'Hospital',
    },
  ],
};

// ===== BEAUTY DATA (all regions) =====
export interface BeautyData {
  uvIndex: number;
  humidity: number;
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
    traditionalRemedies: ['Honey & olive oil face mask for deep hydration', 'Shea butter (Qibe) for dry elbows/knees', 'Aloe vera for altitude sunburns'],
    modernSkincare: ['Hyaluronic acid serum', 'Broad‑spectrum SPF 50+', 'Gentle foaming cleanser'],
  },
  'afar': {
    uvIndex: 11,
    humidity: 20,
    skinRiskLevel: 'extreme',
    uvAdvice: 'Extreme desert UV. Highest risk of severe sunburn.',
    hydrationAdvice: 'Extreme heat causes rapid skin dehydration and cracking.',
    warnings: ['Cover skin completely.', 'Avoid sun exposure between 10 AM – 4 PM.'],
    traditionalRemedies: ['Coconut oil for hair and skin protection', 'Raw honey & milk for sunburn relief', 'Teff flour paste for cooling skin irritations'],
    modernSkincare: ['Water‑resistant SPF 100+', 'After‑sun gel with aloe & vitamin E', 'Electrolyte‑infused facial mist'],
  },
  'oromia': {
    uvIndex: 8,
    humidity: 55,
    skinRiskLevel: 'high',
    uvAdvice: 'Varied altitude – higher UV in highlands. Use SPF 50+ outdoors.',
    hydrationAdvice: 'Humid in lowlands, dry in highlands. Moisturise accordingly.',
    warnings: ['Apply waterproof sunscreen in humid zones.', 'Watch for fungal infections in lowland heat.'],
    traditionalRemedies: ['Moringa (Shiferaw) oil for hair growth', 'Lemon & honey scrub for brightening', 'Green tea rinses for oily skin'],
    modernSkincare: ['Oil‑free moisturiser for humid areas', 'Broad‑spectrum SPF 50+', 'Niacinamide serum for even tone'],
  },
  'amhara': {
    uvIndex: 8,
    humidity: 40,
    skinRiskLevel: 'moderate',
    uvAdvice: 'Highland UV is deceptive – use SPF 50+ even in cool weather.',
    hydrationAdvice: 'Cold, dry winds cause chapping. Use rich creams.',
    warnings: ['Protect lips and hands from windburn.', 'Moisturise after washing.'],
    traditionalRemedies: ['Butter (Qibe) for chapped lips', 'Ginger & honey tea for skin immunity', 'Oatmeal baths for dry itchiness'],
    modernSkincare: ['Ceramide‑based moisturiser', 'SPF 50+ lip balm', 'Gentle hydrating cleanser'],
  },
  'tigray': {
    uvIndex: 8,
    humidity: 35,
    skinRiskLevel: 'moderate',
    uvAdvice: 'High altitude UV – sunburn risk even on cloudy days.',
    hydrationAdvice: 'Dry, cool air. Use occlusive moisturisers.',
    warnings: ['Reapply sunscreen every 2 hours.', 'Cover exposed skin during peak sun.'],
    traditionalRemedies: ['Shea butter & honey mask', 'Aloe vera for sunburns', 'Teff flour & yoghurt for exfoliation'],
    modernSkincare: ['Hyaluronic acid serum', 'Mineral SPF 50+', 'Facial oil for extra hydration'],
  },
  'somali': {
    uvIndex: 11,
    humidity: 25,
    skinRiskLevel: 'extreme',
    uvAdvice: 'Extreme desert UV. Highest burn risk.',
    hydrationAdvice: 'Very low humidity – skin and hair dry out fast.',
    warnings: ['Avoid sun exposure 10 AM – 4 PM.', 'Use SPF 100+ and reapply often.'],
    traditionalRemedies: ['Coconut oil for moisture', 'Raw honey for sunburn healing', 'Milk compresses for irritated skin'],
    modernSkincare: ['Water‑resistant SPF 100+', 'After‑sun aloe gel', 'Occlusive moisturiser (petrolatum)'],
  },
  'gambella': {
    uvIndex: 9,
    humidity: 80,
    skinRiskLevel: 'high',
    uvAdvice: 'High UV with heavy humidity – use lightweight, water‑resistant sunscreen.',
    hydrationAdvice: 'Sweat and oil buildup common. Cleanse twice daily.',
    warnings: ['Prevent fungal infections – keep skin dry.', 'Use antifungal powder in skin folds.'],
    traditionalRemedies: ['Neem oil for acne & fungal issues', 'Aloe vera to soothe insect bites', 'Clay masks to absorb excess oil'],
    modernSkincare: ['Oil‑free gel moisturiser', 'Water‑resistant SPF 50+', 'Salicylic acid cleanser'],
  },
  'sidama': {
    uvIndex: 8,
    humidity: 60,
    skinRiskLevel: 'moderate',
    uvAdvice: 'Highland coffee area – UV moderate to high.',
    hydrationAdvice: 'Humid but cool. Light moisturiser enough.',
    warnings: ['Apply sunscreen before heading to coffee farms.'],
    traditionalRemedies: ['Coffee grounds scrub for exfoliation', 'Honey mask for hydration', 'Avocado & yoghurt mask'],
    modernSkincare: ['Vitamin C serum for brightness', 'Lightweight SPF 50+', 'Gentle AHA exfoliant'],
  },
  'snnpr': {
    uvIndex: 7,
    humidity: 65,
    skinRiskLevel: 'moderate',
    uvAdvice: 'Varied altitude – moderate UV overall.',
    hydrationAdvice: 'Humid in many areas; use lightweight products.',
    warnings: ['In lower, hotter zones, protect against heat rash.'],
    traditionalRemedies: ['Enset (false banana) paste for soothing skin', 'Honey & lemon mask', 'Moringa oil for hair'],
    modernSkincare: ['Gel‑based moisturiser', 'SPF 30–50', 'Niacinamide for pores'],
  },
  'benishangul': {
    uvIndex: 8,
    humidity: 70,
    skinRiskLevel: 'high',
    uvAdvice: 'Lowland area – high UV and humidity.',
    hydrationAdvice: 'Sweaty conditions; use oil‑free moisturisers.',
    warnings: ['Fungal infections common in rainy season.'],
    traditionalRemedies: ['Neem leaves for skin infections', 'Shea butter for moisture', 'Lemon juice for brightening'],
    modernSkincare: ['Oil‑free SPF 50+', 'Antifungal powder', 'Lightweight lotion'],
  },
  'dire-dawa': {
    uvIndex: 10,
    humidity: 30,
    skinRiskLevel: 'extreme',
    uvAdvice: 'Hot semi‑arid city – very high UV.',
    hydrationAdvice: 'Low humidity; skin loses moisture quickly.',
    warnings: ['Avoid sun exposure midday.', 'Wear wide‑brimmed hats.'],
    traditionalRemedies: ['Coconut oil for skin and hair', 'Aloe vera for heat rash', 'Milk & honey face pack'],
    modernSkincare: ['SPF 100+ for face', 'Hyaluronic acid serum', 'Occlusive night cream'],
  },
  'harari': {
    uvIndex: 7,
    humidity: 45,
    skinRiskLevel: 'moderate',
    uvAdvice: 'Highland city – moderate UV.',
    hydrationAdvice: 'Pleasant climate; normal moisturising routine.',
    warnings: ['Use SPF 30+ daily.'],
    traditionalRemedies: ['Honey & yoghurt mask', 'Coffee & sugar scrub', 'Shea butter for dry patches'],
    modernSkincare: ['Light moisturiser with SPF', 'Gentle cleanser', 'Vitamin E oil'],
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

// ===== ZONE-LEVEL HEALTH DATA =====
export interface ZoneHealthData {
  risks: HealthRisk[];
  parentRegion: string;
  displayName: string;
  description?: string;
}

export const zoneHealthData: Record<string, ZoneHealthData> = {
  // ===== TIGRAY ZONES =====
  Central: {
    parentRegion: 'Tigray',
    displayName: 'Central Tigray',
    risks: [healthRisks.altitude],
    description: 'Highland area with minimal health risks. Main consideration is altitude adjustment.',
  },
  Western: {
    parentRegion: 'Tigray',
    displayName: 'Western Tigray',
    risks: [healthRisks.respiratory],
    description: 'Highland area. Generally safe with good air quality.',
  },
  Southern: {
    parentRegion: 'Tigray',
    displayName: 'Southern Tigray',
    risks: [healthRisks.altitude],
    description: 'Highland area. Safe for travel with standard precautions.',
  },
  'Zone 2': {
    parentRegion: 'Tigray',
    displayName: 'Northwestern Tigray',
    risks: [healthRisks.respiratory, healthRisks.altitude],
    description: 'Highland area with occasional respiratory concerns during cold season.',
  },

  // ===== AMHARA ZONES =====
  'North Western': {
    parentRegion: 'Amhara',
    displayName: 'North Gondar',
    risks: [healthRisks.respiratory, healthRisks.altitude],
    description: 'Beautiful highland area. Safe with cool climate and good air quality.',
  },
  'South Gonder': {
    parentRegion: 'Amhara',
    displayName: 'South Gondar',
    risks: [healthRisks.malaria, healthRisks.respiratory],
    description: 'Highland area with occasional respiratory concerns during cold season.',
  },
  'North Wollo': {
    parentRegion: 'Amhara',
    displayName: 'North Wollo',
    risks: [healthRisks.altitude, healthRisks.respiratory],
    description: 'Highland area. Some respiratory concerns in rural areas.',
  },
  'South Wollo': {
    parentRegion: 'Amhara',
    displayName: 'South Wollo',
    risks: [healthRisks.altitude, healthRisks.respiratory],
    description: 'Highland area. Moderate respiratory concerns.',
  },
  'East Gojam': {
    parentRegion: 'Amhara',
    displayName: 'East Gojam',
    risks: [healthRisks.respiratory],
    description: 'Safe highland area with fertile land and good climate.',
  },
  'West Gojam': {
    parentRegion: 'Amhara',
    displayName: 'West Gojam',
    risks: [healthRisks.respiratory],
    description: 'Safe highland area. No major health concerns.',
  },
  'Awi/Agew': {
    parentRegion: 'Amhara',
    displayName: 'Awi/Agew',
    risks: [healthRisks.respiratory],
    description: 'Safe highland area with mild climate.',
  },

  // ===== OROMIA ZONES =====
  Jimma: {
    parentRegion: 'Oromia',
    displayName: 'Jimma',
    risks: [healthRisks.malaria, healthRisks.waterborne],
    description: 'Humid coffee region. Moderate waterborne disease risk.',
  },
  Borena: {
    parentRegion: 'Oromia',
    displayName: 'Borena',
    risks: [healthRisks.dehydration, healthRisks.malaria, healthRisks.waterborne],
    description: 'Hot pastoralist area. High risk of dehydration and malaria.',
  },
  Arsi: {
    parentRegion: 'Oromia',
    displayName: 'Arsi',
    risks: [healthRisks.altitude, healthRisks.respiratory],
    description: 'Highland area. Generally safe with altitude considerations.',
  },
  'West Arsi': {
    parentRegion: 'Oromia',
    displayName: 'West Arsi',
    risks: [healthRisks.malaria, healthRisks.respiratory],
    description: 'Mixed altitude. Malaria risk in lower areas.',
  },
  Guji: {
    parentRegion: 'Oromia',
    displayName: 'Guji',
    risks: [healthRisks.malaria, healthRisks.waterborne],
    description: 'Mixed altitude. Malaria risk in lower areas.',
  },
  'East Harerge': {
    parentRegion: 'Oromia',
    displayName: 'East Harerge',
    risks: [healthRisks.dehydration, healthRisks.malaria],
    description: 'Semi-arid area. Dehydration and malaria concerns.',
  },
  'West Harerge': {
    parentRegion: 'Oromia',
    displayName: 'West Harerge',
    risks: [healthRisks.dehydration, healthRisks.malaria],
    description: 'Semi-arid area. Moderate health risks.',
  },
  'East Wellega': {
    parentRegion: 'Oromia',
    displayName: 'East Wellega',
    risks: [healthRisks.malaria, healthRisks.waterborne],
    description: 'Humid area. Malaria and waterborne disease risk.',
  },
  'Kelem Wellega': {
    parentRegion: 'Oromia',
    displayName: 'Kelem Wellega',
    risks: [healthRisks.malaria, healthRisks.waterborne],
    description: 'Humid western area. Moderate malaria risk.',
  },
  'West Shewa': {
    parentRegion: 'Oromia',
    displayName: 'West Shewa',
    risks: [healthRisks.respiratory, healthRisks.altitude],
    description: 'Safe highland area near Addis. Good climate and healthcare access.',
  },
  'East Shewa': {
    parentRegion: 'Oromia',
    displayName: 'East Shewa',
    risks: [healthRisks.respiratory, healthRisks.altitude],
    description: 'Highland area. Generally safe with altitude considerations.',
  },
  'North Shewa(R3)': {
    parentRegion: 'Oromia',
    displayName: 'North Shewa',
    risks: [healthRisks.respiratory, healthRisks.altitude],
    description: 'Highland area. Generally safe with altitude considerations.',
  },
  'North Shewa(R4)': {
    parentRegion: 'Oromia',
    displayName: 'North Shewa',
    risks: [healthRisks.respiratory, healthRisks.altitude],
    description: 'Highland area. Generally safe with altitude considerations.',
  },
  'South West Shewa': {
    parentRegion: 'Oromia',
    displayName: 'South West Shewa',
    risks: [healthRisks.malaria, healthRisks.waterborne],
    description: 'Humid area. Malaria and waterborne disease risk.',
  },
  'Horo Guduru': {
    parentRegion: 'Oromia',
    displayName: 'Horo Guduru',
    risks: [healthRisks.malaria, healthRisks.waterborne],
    description: 'Humid area. Malaria and waterborne disease risk.',
  },
  Bale: {
    parentRegion: 'Oromia',
    displayName: 'Bale',
    risks: [healthRisks.malaria, healthRisks.altitude],
    description: 'High altitude area. Altitude sickness possible above 3000m.',
  },
  Oromia: {
    parentRegion: 'Oromia',
    displayName: 'Oromia Special',
    risks: [healthRisks.malaria, healthRisks.waterborne],
    description: 'Mixed altitude area. Moderate malaria risk.',
  },

  // ===== SOMALI ZONES =====
  Fafan: {
    parentRegion: 'Somali',
    displayName: 'Fafan',
    risks: [healthRisks.dehydration, healthRisks.malaria, healthRisks.waterborne],
    description: 'Hot pastoralist area. High dehydration and malaria risk.',
  },
  Nogob: {
    parentRegion: 'Somali',
    displayName: 'Nogob',
    risks: [healthRisks.dehydration, healthRisks.malaria, healthRisks.waterborne],
    description: 'Remote pastoralist area. Very high health risks.',
  },
  Korahe: {
    parentRegion: 'Somali',
    displayName: 'Korahe',
    risks: [healthRisks.dehydration, healthRisks.malaria],
    description: 'Hot arid area. High dehydration and malaria risk.',
  },
  Afder: {
    parentRegion: 'Somali',
    displayName: 'Afder',
    risks: [healthRisks.dehydration, healthRisks.malaria],
    description: 'Hot lowland. Dehydration is main concern.',
  },
  Jarar: {
    parentRegion: 'Somali',
    displayName: 'Jarar',
    risks: [healthRisks.dehydration, healthRisks.malaria],
    description: 'Hot pastoralist area. High dehydration risk.',
  },
  Doolo: {
    parentRegion: 'Somali',
    displayName: 'Doolo',
    risks: [healthRisks.dehydration, healthRisks.malaria],
    description: 'Hot border area. Dehydration and malaria concerns.',
  },
  Liben: {
    parentRegion: 'Somali',
    displayName: 'Liben',
    risks: [healthRisks.dehydration, healthRisks.malaria],
    description: 'Hot pastoralist area. High health risks.',
  },
  Siti: {
    parentRegion: 'Somali',
    displayName: 'Siti',
    risks: [healthRisks.dehydration, healthRisks.waterborne],
    description: 'Hot area along river. Dehydration and waterborne risks.',
  },
  'Zone 3': {
    parentRegion: 'Somali',
    displayName: 'Somali Zone 3',
    risks: [healthRisks.dehydration, healthRisks.malaria],
    description: 'Hot pastoralist area. High dehydration risk.',
  },

  // ===== GAMBELLA ZONES =====
  Nuer: {
    parentRegion: 'Gambella',
    displayName: 'Nuer',
    risks: [healthRisks.malaria, healthRisks.waterborne, healthRisks.dehydration],
    description: 'Tropical lowland. Very high malaria and waterborne disease risk.',
  },
  Majang: {
    parentRegion: 'Gambella',
    displayName: 'Majang',
    risks: [healthRisks.malaria, healthRisks.waterborne],
    description: 'Tropical area. High malaria risk.',
  },

  // ===== BENISHANGUL-GUMUZ ZONES =====
  Metekel: {
    parentRegion: 'Benishangul',
    displayName: 'Metekel',
    risks: [healthRisks.malaria, healthRisks.waterborne],
    description: 'Lowland area. Moderate malaria and waterborne risk.',
  },
  Asosa: {
    parentRegion: 'Benishangul',
    displayName: 'Asosa',
    risks: [healthRisks.malaria, healthRisks.waterborne],
    description: 'Lowland area. Moderate malaria risk.',
  },
  Kemashi: {
    parentRegion: 'Benishangul',
    displayName: 'Kemashi',
    risks: [healthRisks.malaria, healthRisks.waterborne],
    description: 'Lowland area. Moderate health risks.',
  },

  // ===== SIDAMA ZONES =====
  Sidama: {
    parentRegion: 'Sidama',
    displayName: 'Sidama',
    risks: [healthRisks.malaria, healthRisks.waterborne],
    description: 'Highland coffee area. Generally safe with mild respiratory concerns.',
  },
  Gedio: {
    parentRegion: 'Sidama',
    displayName: 'Gedeo',
    risks: [healthRisks.malaria, healthRisks.waterborne],
    description: 'Highland coffee area. Generally safe with mild respiratory concerns.',
  },

  // ===== SNNPR ZONES =====
  Wolayita: {
    parentRegion: 'SNNPR',
    displayName: 'Wolayita',
    risks: [healthRisks.respiratory, healthRisks.altitude],
    description: 'Safe highland area. Good climate and agriculture.',
  },
  Hadiya: {
    parentRegion: 'SNNPR',
    displayName: 'Hadiya',
    risks: [healthRisks.respiratory, healthRisks.altitude],
    description: 'Safe highland area. No major health concerns.',
  },
  Konta: {
    parentRegion: 'SNNPR',
    displayName: 'Konta',
    risks: [healthRisks.waterborne],
    description: 'Mixed altitude. Minor waterborne disease risk.',
  },
  KT: {
    parentRegion: 'SNNPR',
    displayName: 'Konta Special',
    risks: [healthRisks.waterborne],
    description: 'Mixed altitude. Minor waterborne disease risk.',
  },
  Keffa: {
    parentRegion: 'SNNPR',
    displayName: 'Keffa',
    risks: [healthRisks.malaria, healthRisks.waterborne],
    description: 'Safe highland coffee area. Good climate.',
  },
  Sheka: {
    parentRegion: 'SNNPR',
    displayName: 'Sheka',
    risks: [healthRisks.malaria, healthRisks.waterborne],
    description: 'Safe forested highland area.',
  },
  'Bench Maji': {
    parentRegion: 'SNNPR',
    displayName: 'Bench Maji',
    risks: [healthRisks.malaria, healthRisks.waterborne],
    description: 'Safe highland area. Good climate.',
  },
  Basketo: {
    parentRegion: 'SNNPR',
    displayName: 'Basketo',
    risks: [healthRisks.waterborne],
    description: 'Safe highland area.',
  },
  'South Omo': {
    parentRegion: 'SNNPR',
    displayName: 'South Omo',
    risks: [healthRisks.dehydration, healthRisks.malaria],
    description: 'Hot lowland area. Dehydration and malaria risk.',
  },
  Dawro: {
    parentRegion: 'SNNPR',
    displayName: 'Dawro',
    risks: [healthRisks.respiratory],
    description: 'Safe highland area. Good climate.',
  },
  'Gamo Gofa': {
    parentRegion: 'SNNPR',
    displayName: 'Gamo Gofa',
    risks: [healthRisks.respiratory, healthRisks.altitude],
    description: 'Safe highland area. Good climate.',
  },
  "Segen Peoples'": {
    parentRegion: 'SNNPR',
    displayName: 'Segen Peoples',
    risks: [healthRisks.dehydration],
    description: 'Safe highland area.',
  },
  Selti: {
    parentRegion: 'SNNPR',
    displayName: "Silt'e",
    risks: [healthRisks.respiratory, healthRisks.altitude],
    description: 'Safe highland area. Good climate.',
  },
  Gurage: {
    parentRegion: 'SNNPR',
    displayName: 'Gurage',
    risks: [healthRisks.respiratory, healthRisks.altitude],
    description: 'Safe highland area. Good climate.',
  },
  Yem: {
    parentRegion: 'SNNPR',
    displayName: 'Yem',
    risks: [healthRisks.respiratory, healthRisks.altitude],
    description: 'Safe highland area. Good climate.',
  },
  Alaba: {
    parentRegion: 'SNNPR',
    displayName: 'Alaba',
    risks: [healthRisks.dehydration, healthRisks.malaria],
    description: 'Mixed altitude. Dehydration and malaria concerns.',
  },

  // ===== CITY ADMINISTRATIONS =====
  'Addis Ababa': {
    parentRegion: 'Addis Ababa',
    displayName: 'Addis Ababa',
    risks: [healthRisks.respiratory, healthRisks.altitude],
    description: 'Capital city. Good healthcare access. Minor air quality concerns.',
  },
  'Region 14': {
    parentRegion: 'Addis Ababa',
    displayName: 'Addis Ababa',
    risks: [healthRisks.respiratory, healthRisks.altitude],
    description: 'Capital city. Good healthcare access. Minor air quality concerns.',
  },
  'Dire Dawa': {
    parentRegion: 'Dire Dawa',
    displayName: 'Dire Dawa',
    risks: [healthRisks.dehydration, healthRisks.waterborne],
    description: 'Hot industrial city. Dehydration and waterborne disease risk.',
  },
  Hareri: {
    parentRegion: 'Harari',
    displayName: 'Harar',
    risks: [healthRisks.respiratory],
    description: 'Safe highland historic city. Good climate.',
  },
};