import type { MeasurementUnit } from './pet';

export type FoodType = 'dry' | 'wet' | 'other';

export interface Food {
    id: string;
    name: string;
    brand?: string;
    type: FoodType;
    unit: MeasurementUnit;
    createdAt: string;
}