'use client';

import { useState } from 'react';
import { useWellnessStore } from '@/lib/store';
import { UserProfile, FamilyMember } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, Users, UserCircle } from 'lucide-react';

export default function ProfileSetup() {
  const { userProfile, setUserProfile, activeProfileId, setActiveProfileId, addFamilyMember, removeFamilyMember } = useWellnessStore();
  const [open, setOpen] = useState(!userProfile);
  const [showFamilyForm, setShowFamilyForm] = useState(false);

  const [formData, setFormData] = useState<Partial<UserProfile>>(
    userProfile || { name: '', age: 25, gender: 'male', conditions: [], medications: [], isPregnant: false, familyMembers: [] }
  );

  const [familyForm, setFamilyForm] = useState<Partial<FamilyMember>>({
    name: '', age: 10, relationship: 'child', gender: 'male', conditions: [], isPregnant: false
  });

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
    }
  };

  const handleAddFamilyMember = () => {
    if (familyForm.name && familyForm.age && familyForm.relationship) {
      const member: FamilyMember = {
        id: Math.random().toString(36).substr(2, 9),
        name: familyForm.name,
        age: familyForm.age,
        relationship: familyForm.relationship as 'child' | 'spouse' | 'parent' | 'other',
        gender: familyForm.gender as 'male' | 'female' | 'other',
        conditions: familyForm.conditions || [],
        isPregnant: familyForm.isPregnant || false,
      };
      addFamilyMember(member);
      setFamilyForm({ name: '', age: 10, relationship: 'child', gender: 'male', conditions: [], isPregnant: false });
      setShowFamilyForm(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 w-full justify-start">
          <Users className="h-4 w-4" />
          {userProfile ? 'Manage Profiles' : 'Create Profile'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Your Health Profiles</DialogTitle>
          <DialogDescription>Manage your profile and add family members for personalized advice.</DialogDescription>
        </DialogHeader>

        {userProfile && (
          <div className="space-y-2 mb-4">
            <Label className="text-xs text-muted-foreground">Currently advising:</Label>
            <Select value={activeProfileId} onValueChange={setActiveProfileId}>
              <SelectTrigger>
                <SelectValue placeholder="Select profile" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">
                  <span className="flex items-center gap-2"><UserCircle className="h-4 w-4" /> {userProfile.name} (Main)</span>
                </SelectItem>
                {(userProfile.familyMembers || []).map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    <span className="flex items-center gap-2"><UserCircle className="h-4 w-4" /> {member.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {!showFamilyForm ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Main Profile Name *</Label>
              <Input id="name" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input id="age" type="number" value={formData.age || 25} onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 25 })} />
              </div>
              <div className="space-y-2">
                <Label>Gender *</Label>
                <Select value={formData.gender} onValueChange={(val) => setFormData({ ...formData, gender: val as 'male' | 'female' | 'other' })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
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
                <Checkbox id="pregnant" checked={formData.isPregnant || false} onCheckedChange={(checked) => setFormData({ ...formData, isPregnant: checked as boolean })} />
                <Label htmlFor="pregnant" className="font-normal cursor-pointer">I am pregnant</Label>
              </div>
            )}

            {userProfile?.familyMembers && userProfile.familyMembers.length > 0 && (
              <div className="space-y-2 mt-4">
                <Label>Family Members</Label>
                <div className="space-y-2">
                  {userProfile.familyMembers.map((member) => (
                    <Card key={member.id} className="p-3 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{member.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{member.relationship} • Age {member.age}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeFamilyMember(member.id)} className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <Button variant="outline" className="w-full gap-2" onClick={() => setShowFamilyForm(true)}>
              <Plus className="h-4 w-4" /> Add Family Member
            </Button>

            <div className="flex gap-2 pt-4 border-t">
              <Button onClick={handleSaveMainProfile} className="flex-1">Save Main Profile</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="font-semibold">Add Family Member</h3>
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={familyForm.name || ''} onChange={(e) => setFamilyForm({ ...familyForm, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Age</Label>
                <Input type="number" value={familyForm.age || 10} onChange={(e) => setFamilyForm({ ...familyForm, age: parseInt(e.target.value) || 10 })} />
              </div>
              <div className="space-y-2">
                <Label>Relationship</Label>
                <Select value={familyForm.relationship || ''} onValueChange={(val) => setFamilyForm({ ...familyForm, relationship: val as 'child' | 'spouse' | 'parent' | 'other' })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
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
              <Select value={familyForm.gender} onValueChange={(val) => setFamilyForm({ ...familyForm, gender: val as 'male' | 'female' | 'other' })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {familyForm.gender === 'female' && (
              <div className="flex items-center space-x-2">
                <Checkbox id="fam-pregnant" checked={familyForm.isPregnant || false} onCheckedChange={(checked) => setFamilyForm({ ...familyForm, isPregnant: checked as boolean })} />
                <Label htmlFor="fam-pregnant" className="font-normal cursor-pointer text-sm">Is pregnant</Label>
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <Button onClick={handleAddFamilyMember} className="flex-1">Add Member</Button>
              <Button variant="outline" onClick={() => setShowFamilyForm(false)}>Cancel</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}