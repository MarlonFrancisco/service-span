import type { User } from '../../../users/user.entity';
import type { Gallery } from '../gallery/gallery.entity';

export class StoreDto {
  owner: Partial<User>;
  name: string;
  description: string;
  amenities: string[];
  address: string;
  city: string;
  state: string;
  zipCode: string;
  telephone: string;
  email: string;
  website: string;
  instagram: string;
  facebook: string;
  isActive: boolean;
  storeMembers?: User[];
  gallery?: Gallery[];

  weeklyGoal: number;
  monthlyGoal: number;
  quarterlyGoal: number;

  openTime: string;
  closeTime: string;
  lunchStartTime: string;
  lunchEndTime: string;
  businessDays: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };

  constructor(data: Partial<StoreDto>) {
    this.name = data.name;
    this.description = data.description;
    this.amenities = data.amenities;
    this.address = data.address;
    this.city = data.city;
    this.state = data.state;
    this.zipCode = data.zipCode;
    this.telephone = data.telephone;
    this.email = data.email;
    this.website = data.website;
    this.instagram = data.instagram;
    this.facebook = data.facebook;
    this.isActive = data.isActive;
    this.storeMembers = data.storeMembers;
    this.gallery = data.gallery;
    this.owner = data.owner;
    this.openTime = data.openTime;
    this.closeTime = data.closeTime;
    this.lunchStartTime = data.lunchStartTime;
    this.lunchEndTime = data.lunchEndTime;
    this.businessDays = data.businessDays;
    this.weeklyGoal = data.weeklyGoal;
    this.monthlyGoal = data.monthlyGoal;
    this.quarterlyGoal = data.quarterlyGoal;
  }
}
