'use client';

import { regions, regionDetails, defaultRegionDetails, zoneHealthData } from '@/lib/data';
import { useWellnessStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  AlertTriangle, Leaf, Mountain, CloudSun, MapPin,
  ShieldAlert, ShieldCheck, Phone, MapPin as MapPinIcon,
  Pill, Heart, Stethoscope,
} from 'lucide-react';

const riskColors = {
  critical: 'border-destructive bg-destructive/5 text-destructive',
  high: 'border-accent bg-accent/5 text-accent',
  moderate: 'border-primary bg-primary/5 text-primary',
  low: 'border-green-500 bg-green-50 text-green-700 dark:border-green-600 dark:bg-green-950/30 dark:text-green-400',
};

export default function RegionDetails() {
  const { selectedRegion, selectedZone } = useWellnessStore();
  
  const zoneData = selectedZone ? zoneHealthData[selectedZone] : null;
  const region = selectedRegion ? regions.find((r) => r.id === selectedRegion) : null;
  
  const displayName = zoneData ? zoneData.displayName : region?.name || null;
  const displayAmharicName = region?.amharicName || '';
  const displayRisks = zoneData ? zoneData.risks : region?.risks || [];
  const displayAltitude = region?.altitude;
  const displayClimate = region?.climate;
  
  const details = selectedRegion
    ? regionDetails[selectedRegion] || defaultRegionDetails
    : null;

  if (!displayName) {
    return (
      <Card className="h-full flex items-center justify-center border-border bg-card/50 backdrop-blur">
        <CardContent className="text-center space-y-3">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Select a Zone</p>
            <p className="text-sm text-muted-foreground mt-1">
              Tap any zone on the map to view health risks, local remedies, and emergency contacts.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-5 animate-in fade-in slide-in-from-left-4 duration-300">
      <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5 shadow-sm shrink-0">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl text-foreground">{displayName}</CardTitle>
              {zoneData && (
                <p className="text-sm text-muted-foreground mt-1">{zoneData.parentRegion} Region</p>
              )}
              {!zoneData && displayAmharicName && (
                <p className="text-lg text-primary font-medium mt-1">{displayAmharicName}</p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {displayAltitude && (
              <Badge variant="outline" className="gap-1.5 px-3 py-1 bg-background">
                <Mountain className="h-3 w-3" /> {displayAltitude}m
              </Badge>
            )}
            {displayClimate && (
              <Badge variant="outline" className="gap-1.5 px-3 py-1 bg-background">
                <CloudSun className="h-3 w-3" /> <span className="capitalize">{displayClimate}</span>
              </Badge>
            )}
            {zoneData && zoneData.description && (
              <Badge variant="secondary" className="gap-1.5 px-3 py-1">
                <ShieldCheck className="h-3 w-3" /> Zone-specific data
              </Badge>
            )}
          </div>
          {zoneData?.description && (
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{zoneData.description}</p>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="risks" className="flex-1 flex flex-col min-h-0">
        <TabsList className="w-full justify-start gap-1 mb-4 bg-muted/50 p-1 rounded-lg">
          <TabsTrigger value="risks" className="gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent/10 hover:scale-[1.02] active:scale-95 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-md">
            <ShieldAlert className="h-4 w-4" /> Risks
          </TabsTrigger>
          <TabsTrigger value="remedies" className="gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent/10 hover:scale-[1.02] active:scale-95 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-md">
            <Heart className="h-4 w-4" /> Remedies
          </TabsTrigger>
          <TabsTrigger value="emergency" className="gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent/10 hover:scale-[1.02] active:scale-95 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-md">
            <Phone className="h-4 w-4" /> Emergency
          </TabsTrigger>
        </TabsList>

        {/* Risks Tab */}
        <TabsContent value="risks" className="flex-1 overflow-y-auto space-y-3 pr-1">
          {displayRisks.map((risk, index) => (
            <Card key={`${risk.id}-${index}`} className={`border-l-4 ${riskColors[risk.level]} overflow-hidden transition-all hover:shadow-sm`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-base">{risk.name}</h4>
                  <Badge variant="outline" className="text-[10px] uppercase font-bold capitalize">{risk.level}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{risk.description}</p>
                {risk.prevention && risk.prevention.length > 0 && (
                  <div className="bg-background/50 p-2 rounded text-xs">
                    <span className="font-semibold">Prevention:</span> {risk.prevention[0]}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          {displayRisks.length === 0 && (
            <p className="text-sm text-muted-foreground text-center">No specific risks data for this zone yet.</p>
          )}
        </TabsContent>

        {/* Remedies Tab */}
        <TabsContent value="remedies" className="flex-1 overflow-y-auto pr-1">
          <div className="space-y-6">
            {details && (
              <>
                <Card className="border-accent/30 bg-accent/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2 text-accent"><Leaf className="h-4 w-4" /> Traditional Remedies</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {details.traditionalRemedies.map((remedy, idx) => (
                      <div key={idx} className="flex gap-3 items-start p-3 bg-background/60 rounded-lg border border-border hover:bg-background transition-colors">
                        <Leaf className="h-4 w-4 text-accent mt-1 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{remedy.name}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{remedy.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card className="border-primary/30 bg-primary/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2 text-primary"><Pill className="h-4 w-4" /> Modern Remedies</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {details.modernRemedies.map((remedy, idx) => (
                      <div key={idx} className="flex gap-3 items-start p-3 bg-background/60 rounded-lg border border-border hover:bg-background transition-colors">
                        <ShieldCheck className="h-4 w-4 text-primary mt-1 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{remedy.name}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{remedy.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            )}
            {!details && <p className="text-sm text-muted-foreground text-center">Remedies data coming soon for this region.</p>}
          </div>
        </TabsContent>

        {/* Emergency Tab */}
        <TabsContent value="emergency" className="flex-1 overflow-y-auto pr-1">
          <div className="space-y-4">
            <Card className="border-destructive/30 bg-destructive/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-destructive"><AlertTriangle className="h-4 w-4" /> When to Seek Medical Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• High fever lasting more than 3 days</p>
                <p>• Severe headache with a stiff neck</p>
                <p>• Persistent diarrhoea or severe dehydration</p>
                <p>• Difficulty breathing or chest pain</p>
                <p className="text-xs mt-3 text-foreground/60">Always contact a healthcare professional if you&apos;re unsure.</p>
              </CardContent>
            </Card>
            {details && (
              <Card className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2 text-foreground"><Stethoscope className="h-4 w-4 text-primary" /> Nearby Healthcare Facilities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {details.emergencyContacts.map((contact, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <MapPinIcon className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{contact.name}</p>
                        <p className="text-xs text-muted-foreground">{contact.city} • {contact.type}</p>
                        <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} className="text-sm font-semibold text-accent hover:underline inline-flex items-center gap-1 mt-1">
                          <Phone className="h-3 w-3" /> {contact.phone}
                        </a>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
            {!details && <p className="text-sm text-muted-foreground text-center">Emergency contacts not yet available for this region.</p>}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}