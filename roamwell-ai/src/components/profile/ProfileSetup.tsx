'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useWellnessStore } from '@/lib/store';
import { UserProfile, FamilyMember } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, Users, UserCircle } from 'lucide-react';
import ThemeToggle from '@/components/theme/ThemeToggle';

const commonConditions = [
  'Diabetes',
  'Hypertension',
  'Asthma',
  'Malaria History',
  'Other',
];


export default function ProfileSetup() {
  const {
    userProfile,
    setUserProfile,
    activeProfileId,
    setActiveProfileId,
    addFamilyMember,
    removeFamilyMember,
  } = useWellnessStore();

  const [open, setOpen] = useState(!userProfile);
  const [showFamilyForm, setShowFamilyForm] = useState(false);

  // Main profile form state
  const [formData, setFormData] = useState<Partial<UserProfile>>(
    userProfile || {
      name: '',
      age: 25,
      gender: 'male',
      conditions: [],
      medications: [],
      isPregnant: false,
      familyMembers: [],
    }
  );

  // Family member form state
  const [familyForm, setFamilyForm] = useState<Partial<FamilyMember>>({
    name: '',
    age: 10,
    relationship: 'child',
    gender: 'male',
    conditions: [],
    isPregnant: false,
  });

  // Custom condition inputs
  const [customCondition, setCustomCondition] = useState('');
  const [familyCustomCondition, setFamilyCustomCondition] = useState('');

  // ---------- Helpers ----------
  const toggleCondition = (condition: string) => {
    setFormData((prev) => {
      const current = prev.conditions || [];
      if (current.includes(condition)) {
        return { ...prev, conditions: current.filter((c) => c !== condition) };
      } else {
        return { ...prev, conditions: [...current, condition] };
      }
    });
  };

  const addCustomCondition = () => {
    if (!customCondition.trim()) return;
    setFormData((prev) => ({
      ...prev,
      conditions: [...(prev.conditions || []), customCondition.trim()],
    }));
    setCustomCondition('');
  };

  const addFamilyCustomCondition = () => {
    if (!familyCustomCondition.trim()) return;
    setFamilyForm((prev) => ({
      ...prev,
      conditions: [...(prev.conditions || []), familyCustomCondition.trim()],
    }));
    setFamilyCustomCondition('');
  };

  const handleSaveMainProfile = () => {
    if (formData.name && formData.age && formData.gender) {
      const profile: UserProfile = {
        id: userProfile?.id || Math.random().toString(36).substr(2, 9),
        name: formData.name,
        age: formData.age,
        gender: formData.gender as 'male' | 'female' | 'other',
        conditions: formData.conditions || [],
        medications: formData.medications || [],
        isPregnant: formData.isPregnant || false,
        familyMembers: formData.familyMembers || [],
        createdAt: userProfile?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setUserProfile(profile);
      setOpen(false);
      toast.success('Profile updated successfully!');
    }
  };

  const handleAddFamilyMember = () => {
    if (familyForm.name && familyForm.age && familyForm.relationship) {
      const member: FamilyMember = {
        id: Math.random().toString(36).substr(2, 9),
        name: familyForm.name,
        age: familyForm.age,
        relationship: familyForm.relationship as
          | 'child'
          | 'spouse'
          | 'parent'
          | 'other',
        gender: familyForm.gender as 'male' | 'female' | 'other',
        conditions: familyForm.conditions || [],
        isPregnant: familyForm.isPregnant || false,
      };
      addFamilyMember(member);
      setFamilyForm({
        name: '',
        age: 10,
        relationship: 'child',
        gender: 'male',
        conditions: [],
        isPregnant: false,
      });
      setShowFamilyForm(false);
      toast.success(`Added ${member.name} as a family member.`);
    }
  };

  // ---------- Determine button label ----------
  const activeProfile =
    activeProfileId === 'main'
      ? userProfile
      : userProfile?.familyMembers.find((m) => m.id === activeProfileId);

  let buttonLabel = 'Create Profile';
  if (userProfile) {
    if (activeProfileId === 'main') {
      buttonLabel = userProfile.name;
    } else if (activeProfile) {
      buttonLabel = `${activeProfile.name}`;
    } else {
      buttonLabel = 'Family Mode';
    }
  }

  // ---------- Render ----------
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 w-full justify-start overflow-hidden"
        >
          <UserCircle className="h-4 w-4 shrink-0" />
          <span className="truncate">{buttonLabel}</span>
          {userProfile && activeProfileId !== 'main' && (
            <span className="text-[10px] text-accent ml-auto">Family</span>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Your Health Profiles</DialogTitle>
          <DialogDescription>
            Manage your profile and add family members for personalised advice.
          </DialogDescription>
        </DialogHeader>

        {/* Active Profile Switcher */}
        {userProfile && (
          <div className="space-y-2 mb-4">
            <Label className="text-xs text-muted-foreground">
              Currently advising:
            </Label>
            <Select value={activeProfileId} onValueChange={setActiveProfileId}>
              <SelectTrigger>
                <SelectValue placeholder="Select profile" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">
                  <span className="flex items-center gap-2">
                    <UserCircle className="h-4 w-4" /> {userProfile.name} (Main)
                  </span>
                </SelectItem>
                {(userProfile.familyMembers || []).map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    <span className="flex items-center gap-2">
                      <UserCircle className="h-4 w-4" /> {member.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {!showFamilyForm ? (
          <div className="space-y-4">
            {/* Main Profile Form */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Your name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      age: parseInt(e.target.value) || 25,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Gender *</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(val) =>
                    setFormData({
                      ...formData,
                      gender: val as 'male' | 'female' | 'other',
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.gender === 'female' && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pregnant"
                  checked={formData.isPregnant || false}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      isPregnant: checked as boolean,
                    })
                  }
                />
                <Label htmlFor="pregnant" className="font-normal cursor-pointer">
                  I am pregnant
                </Label>
              </div>
            )}

            {/* Conditions / Diseases */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Pre‑existing Conditions
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {commonConditions.map((cond) => (
                  <div key={cond} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cond-${cond}`}
                      checked={(formData.conditions || []).includes(cond)}
                      onCheckedChange={() => toggleCondition(cond)}
                    />
                    <Label
                      htmlFor={`cond-${cond}`}
                      className="text-sm cursor-pointer"
                    >
                      {cond}
                    </Label>
                  </div>
                ))}
              </div>
              {/* Custom condition input */}
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Add other condition..."
                  value={customCondition}
                  onChange={(e) => setCustomCondition(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addCustomCondition()}
                  className="h-9 text-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addCustomCondition}
                >
                  Add
                </Button>
              </div>
              {/* Display added custom conditions */}
              {formData.conditions && formData.conditions.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.conditions
                    .filter((c) => !commonConditions.includes(c))
                    .map((cond) => (
                      <span
                        key={cond}
                        className="inline-flex items-center gap-1 bg-muted px-2 py-0.5 rounded-full text-xs"
                      >
                        {cond}
                        <button
                          onClick={() => toggleCondition(cond)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                </div>
              )}
            </div>

            {/* Family Members List */}
            {userProfile?.familyMembers &&
              userProfile.familyMembers.length > 0 && (
                <div className="space-y-2 mt-4">
                  <Label>Family Members</Label>
                  <div className="space-y-2">
                    {userProfile.familyMembers.map((member) => (
                      <Card
                        key={member.id}
                        className="p-3 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {member.relationship} • Age {member.age}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFamilyMember(member.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => setShowFamilyForm(true)}
            >
              <Plus className="h-4 w-4" /> Add Family Member
            </Button>

            <div className="flex gap-2 pt-4 border-t">
              <Button onClick={handleSaveMainProfile} className="flex-1">
                {userProfile ? 'Save Changes' : 'Create Profile'}
              </Button>
            </div>
          </div>
        ) : (
          // Add Family Member Form
          <div className="space-y-4">
            <h3 className="font-semibold">Add Family Member</h3>
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={familyForm.name || ''}
                onChange={(e) =>
                  setFamilyForm({ ...familyForm, name: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Age</Label>
                <Input
                  type="number"
                  value={familyForm.age || ''}
                  onChange={(e) =>
                    setFamilyForm({
                      ...familyForm,
                      age: parseInt(e.target.value) || 10,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Relationship</Label>
                <Select
                  value={familyForm.relationship || 'child'}
                  onValueChange={(val) =>
                    setFamilyForm({
                      ...familyForm,
                      relationship: val as
                        | 'child'
                        | 'spouse'
                        | 'parent'
                        | 'other',
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select
                value={familyForm.gender}
                onValueChange={(val) =>
                  setFamilyForm({
                    ...familyForm,
                    gender: val as 'male' | 'female' | 'other',
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {familyForm.gender === 'female' && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="fam-pregnant"
                  checked={familyForm.isPregnant || false}
                  onCheckedChange={(checked) =>
                    setFamilyForm({
                      ...familyForm,
                      isPregnant: checked as boolean,
                    })
                  }
                />
                <Label
                  htmlFor="fam-pregnant"
                  className="font-normal cursor-pointer text-sm"
                >
                  Is pregnant
                </Label>
              </div>
            )}

            {/* Family Member Conditions */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Pre‑existing Conditions
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {commonConditions.map((cond) => (
                  <div key={cond} className="flex items-center space-x-2">
                    <Checkbox
                      id={`fam-cond-${cond}`}
                      checked={(familyForm.conditions || []).includes(cond)}
                      onCheckedChange={() => {
                        setFamilyForm((prev) => ({
                          ...prev,
                          conditions: prev.conditions?.includes(cond)
                            ? prev.conditions.filter((c) => c !== cond)
                            : [...(prev.conditions || []), cond],
                        }));
                      }}
                    />
                    <Label
                      htmlFor={`fam-cond-${cond}`}
                      className="text-sm cursor-pointer"
                    >
                      {cond}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Add other condition..."
                  value={familyCustomCondition}
                  onChange={(e) => setFamilyCustomCondition(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addFamilyCustomCondition()}
                  className="h-9 text-sm"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addFamilyCustomCondition}
                >
                  Add
                </Button>
              </div>
              {familyForm.conditions && familyForm.conditions.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {familyForm.conditions
                    .filter((c) => !commonConditions.includes(c))
                    .map((cond) => (
                      <span
                        key={cond}
                        className="inline-flex items-center gap-1 bg-muted px-2 py-0.5 rounded-full text-xs"
                      >
                        {cond}
                        <button
                          onClick={() =>
                            setFamilyForm((prev) => ({
                              ...prev,
                              conditions: prev.conditions?.filter((c) => c !== cond),
                            }))
                          }
                          className="text-muted-foreground hover:text-destructive"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleAddFamilyMember} className="flex-1">
                Add Member
              </Button>
              <Button variant="outline" onClick={() => setShowFamilyForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}