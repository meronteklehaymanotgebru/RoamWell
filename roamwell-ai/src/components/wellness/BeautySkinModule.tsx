'use client';

import { useWellnessStore } from '@/lib/store';
import { regions, beautyRegionData, defaultBeautyData, type BeautyData } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Sun,
  Droplet,
  Leaf,
  Shield,
  Baby,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

const riskColors: Record<BeautyData['skinRiskLevel'], string> = {
  low: 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400',
  moderate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400',
  high: 'bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400',
  extreme: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400',
};

export default function BeautySkinModule() {
  const { selectedRegion, activeProfileId, userProfile } = useWellnessStore();
  const region = selectedRegion ? regions.find((r) => r.id === selectedRegion) : null;
  const beautyData: BeautyData | null = selectedRegion
    ? beautyRegionData[selectedRegion] || defaultBeautyData
    : null;

  const activeProfile =
    activeProfileId === 'main'
      ? userProfile
      : userProfile?.familyMembers.find((m) => m.id === activeProfileId);
  const isPregnant = activeProfile && 'isPregnant' in activeProfile ? activeProfile.isPregnant : false;
  const profileName = activeProfile && 'name' in activeProfile ? activeProfile.name : null;

  // Calculate UV percentage for the progress bar (max 11+)
  const uvPercent = beautyData ? Math.min((beautyData.uvIndex / 11) * 100, 100) : 0;

  if (!region || !beautyData) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center">
        <Sparkles className="h-12 w-12 text-muted-foreground opacity-50 mb-4" />
        <p className="text-muted-foreground">
          Select a region on the map to see personalised beauty & skin wellness tips.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="shrink-0 mb-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-accent" /> Beauty & Skin Wellness
        </h2>
        <p className="text-muted-foreground mt-1 flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-primary">{region.name}</span>
          {profileName && <span>• for {profileName}</span>}
          {isPregnant && (
            <span className="inline-flex items-center gap-1 text-accent">
              <Baby className="h-4 w-4" /> Pregnancy‑safe
            </span>
          )}
        </p>
      </div>

      {/* Main content grid – fills remaining height */}
      <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* UV Index Card */}
        <Card className="border-accent/20 bg-accent/5 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-accent">
              <Sun className="h-5 w-5" /> UV Index
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">{beautyData.uvIndex}</span>
              <span className="text-sm text-muted-foreground">/ 11+</span>
            </div>
            <Progress value={uvPercent} className="h-2" />
            <p className="text-sm text-muted-foreground">{beautyData.uvAdvice}</p>
            <div className="space-y-1">
              {beautyData.warnings.map((w, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-destructive">
                  <AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" />
                  <span>{w}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Hydration & Climate Card */}
        <Card className="border-primary/20 bg-primary/5 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-primary">
              <Droplet className="h-5 w-5" /> Hydration & Climate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">{beautyData.humidity}%</span>
              <span className="text-sm text-muted-foreground">humidity</span>
            </div>
            <Progress
              value={beautyData.humidity}
              className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-blue-400 [&>div]:to-primary"
            />
            <p className="text-sm text-muted-foreground">{beautyData.hydrationAdvice}</p>
          </CardContent>
        </Card>

        {/* Traditional Remedies */}
        <Card className="border-accent/30 bg-accent/5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-accent">
              <Leaf className="h-5 w-5" /> Ethiopian Natural Remedies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {beautyData.traditionalRemedies.map((remedy, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 items-start p-3 bg-background/60 rounded-lg border border-border hover:bg-background transition-colors"
                >
                  <Leaf className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <p className="text-sm">{remedy}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Modern Skincare */}
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-primary">
              <Shield className="h-5 w-5" /> Modern Skincare
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {beautyData.modernSkincare.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 items-start p-3 bg-background/60 rounded-lg border border-border hover:bg-background transition-colors"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <p className="text-sm">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skin Risk Badge – full width on mobile */}
        <div className="md:col-span-2">
          <Card className="border-border bg-card/50 backdrop-blur">
            <CardContent className="py-4 flex items-center gap-3">
              <Shield className="h-5 w-5 text-accent" />
              <div>
                <span className="text-sm font-medium">Skin Risk Level: </span>
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold capitalize ${
                    riskColors[beautyData.skinRiskLevel]
                  }`}
                >
                  {beautyData.skinRiskLevel}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}