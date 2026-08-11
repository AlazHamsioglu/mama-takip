export type PetType = 'cat' | 'dog' | 'other';

export type MeasurementUnit = 'g' | 'ml';

export interface Pet {
    id: string;
    name: string;
    type: PetType;
    dailyTarget: number;
    targetUnit: MeasurementUnit;
    createdAt: string;
}