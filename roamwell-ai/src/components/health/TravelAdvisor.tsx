'use client';

import { useEffect, useCallback, useRef } from 'react';
import { regions } from '@/lib/data';
import { useWellnessStore } from '@/lib/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Plane,
  MapPin,
  CheckCircle2,
  Circle,
  CircleDot,
  RotateCcw,
} from 'lucide-react';
import type { TravelChecklistItem } from '@/lib/types';

const statusIcons = {
  todo: Circle,
  'in-progress': CircleDot,
  done: CheckCircle2,
} as const;

const statusColors = {
  todo: 'text-muted-foreground',
  'in-progress': 'text-amber-500 dark:text-amber-400',
  done: 'text-green-500',
};

// ---------- Merge helper ----------
function mergeChecklist(
  newItems: TravelChecklistItem[],
  existing: TravelChecklistItem[]
): TravelChecklistItem[] {
  const existingMap = new Map(existing.map((i) => [i.text, i.status]));
  return newItems.map((item) => ({
    ...item,
    status: existingMap.get(item.text) || item.status,
  }));
}

function generateChecklistForRegion(
  regionId: string,
  existing: TravelChecklistItem[]
): TravelChecklistItem[] {
  const baseItems = [
    'Visit a doctor 4-6 weeks before travel',
    'Check required and recommended vaccinations',
    'Get travel insurance covering medical evacuation',
    'Pack a comprehensive first-aid kit',
    'Bring prescription medications with copies of prescriptions',
  ];

  const regionSpecific: Record<string, string[]> = {
    'addis-ababa': ['Bring sunscreen (high altitude)', 'Moisturizer for dry climate'],
    'oromia': ['Malaria prophylaxis recommended', 'Water purification tablets'],
    'afar': ['Extreme heat protection', 'Electrolyte replacement drinks', 'High SPF sunscreen'],
    'gambella': ['Strong insect repellent (DEET 30%+)', 'Anti-malarial medication'],
    'somali': ['Comprehensive water/food safety precautions', 'Rehydration salts'],
    'amhara': ['Respiratory protection (altitude)', 'Cold-weather clothing for highlands'],
    'tigray': ['Malaria prevention medications', 'Water sanitation supplies'],
    'sidama': ['Malaria prevention', 'Water purification supplies'],
    'snnpr': ['Malaria prevention', 'Lightweight clothing for warm climate'],
  };

  const allItems = [...baseItems, ...(regionSpecific[regionId] || [])];
  const newItems: TravelChecklistItem[] = allItems.map((text, i) => ({
    id: `${regionId}-${i}`,
    text,
    status: 'todo' as const,
  }));

  return mergeChecklist(newItems, existing);
}

export default function TravelAdvisor() {
  const {
    selectedRegion,
    travelDestination,
    setTravelDestination,
    travelChecklist,
    setTravelChecklist,
  } = useWellnessStore();

  const manuallySelected = useRef(false);

  // Auto‑sync with map
  useEffect(() => {
    if (!selectedRegion) return;
    if (!manuallySelected.current) {
      setTravelDestination(selectedRegion);
    }
  }, [selectedRegion, setTravelDestination]);

  // Generate / merge checklist on destination change
  useEffect(() => {
    if (!travelDestination) return;
    setTravelChecklist((prev) =>
      generateChecklistForRegion(travelDestination, prev || [])
    );
  }, [travelDestination, setTravelChecklist]);

  const toggleStatus = useCallback(
    (itemId: string) => {
      setTravelChecklist((prev) =>
        (prev || []).map((item) => {
          if (item.id !== itemId) return item;
          const next: TravelChecklistItem['status'] =
            item.status === 'todo'
              ? 'in-progress'
              : item.status === 'in-progress'
              ? 'done'
              : 'todo';
          return { ...item, status: next };
        })
      );
    },
    [setTravelChecklist]
  );

  const resetChecklist = useCallback(() => {
    if (!travelDestination) return;
    setTravelChecklist([]); // reset to empty, the effect will regenerate
  }, [travelDestination, setTravelChecklist]);

  const handleDestinationChange = (val: string) => {
    manuallySelected.current = true;
    setTravelDestination(val);
  };

  // Ensure checklist is always an array
  const checklist: TravelChecklistItem[] = Array.isArray(travelChecklist) ? travelChecklist : [];
  const completedCount = checklist.filter((i) => i.status === 'done').length;
  const totalCount = checklist.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const destination = travelDestination
    ? regions.find((r) => r.id === travelDestination)
    : null;

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="shrink-0 mb-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Plane className="h-6 w-6 text-accent" /> Travel Health Advisor
        </h2>
        <p className="text-muted-foreground mt-1">
          Prepare for your journey with a personalised wellness checklist.
        </p>
      </div>

      {/* Destination Selector */}
      <div className="space-y-2 mb-6">
        <label className="text-sm font-medium flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
          Destination Region
        </label>
        <Select value={travelDestination || ''} onValueChange={handleDestinationChange}>
          <SelectTrigger className="w-full max-w-md">
            <SelectValue placeholder="Choose a region or tap the map" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region.id} value={region.id}>
                {region.name} {region.amharicName ? `(${region.amharicName})` : ''}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedRegion && travelDestination === selectedRegion && (
          <p className="text-xs text-muted-foreground">Synced with map selection.</p>
        )}
      </div>

      {/* Checklist */}
      {travelDestination && checklist.length > 0 ? (
        <div className="flex-1 flex flex-col min-h-0">
          {/* Progress */}
          <div className="space-y-2 mb-6 shrink-0">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">
                {completedCount} of {totalCount} done
              </span>
              <span className="text-muted-foreground">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} />
          </div>

          {/* Scrollable items */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-2">
            {checklist.map((item) => {
              const StatusIcon = statusIcons[item.status];
              return (
                <div
                  key={item.id}
                  className={`group flex items-center gap-4 p-3 rounded-xl border transition-all duration-200 hover:shadow-sm cursor-pointer ${
                    item.status === 'done'
                      ? 'border-green-200 dark:border-green-900 bg-green-50/50 dark:bg-green-950/20'
                      : item.status === 'in-progress'
                      ? 'border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20'
                      : 'border-border bg-card hover:bg-muted/20'
                  }`}
                  onClick={() => toggleStatus(item.id)}
                >
                  <StatusIcon className={`h-5 w-5 shrink-0 ${statusColors[item.status]}`} />
                  <span
                    className={`text-sm flex-1 ${
                      item.status === 'done'
                        ? 'line-through text-muted-foreground'
                        : 'text-foreground'
                    }`}
                  >
                    {item.text}
                  </span>
                  <Badge
                    variant="outline"
                    className={`text-[10px] px-2 py-0.5 capitalize ${
                      item.status === 'todo'
                        ? 'border-muted-foreground/30 text-muted-foreground'
                        : item.status === 'in-progress'
                        ? 'border-amber-300 text-amber-600 dark:border-amber-500 dark:text-amber-400'
                        : 'border-green-300 text-green-600 dark:border-green-500 dark:text-green-400'
                    }`}
                  >
                    {item.status === 'in-progress' ? 'In Progress' : item.status}
                  </Badge>
                </div>
              );
            })}
          </div>

          {/* Reset button */}
          <div className="flex gap-3 pt-4 shrink-0">
            <button
              onClick={resetChecklist}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Reset All
            </button>
          </div>
        </div>
      ) : travelDestination ? (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          Loading checklist...
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <Card className="border-border bg-card/50 backdrop-blur p-8 text-center">
            <Plane className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">
              Tap a region on the map or choose one above to see your personalised checklist.
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}