import type { FeedingRecord, Food, Pet } from '../types';

function createTodayDateTime(
    hours: number,
    minutes: number,
): string {
    const date = new Date();

    date.setHours(hours, minutes, 0, 0);

    return date.toISOString();
}

export const mockPets: Pet[] = [
    {
        id: 'pet-1',
        name: 'Mia',
        type: 'cat',
        dailyTarget: 120,
        targetUnit: 'g',
        createdAt: '2026-08-11T08:00:00.000Z',
    },
    {
        id: 'pet-2',
        name: 'Leo',
        type: 'dog',
        dailyTarget: 350,
        targetUnit: 'g',
        createdAt: '2026-08-11T08:05:00.000Z',
    },
];

export const mockFoods: Food[] = [
    {
        id: 'food-1',
        name: 'Sterilised 37',
        brand: 'Royal Canin',
        type: 'dry',
        unit: 'g',
        createdAt: '2026-08-11T08:10:00.000Z',
    },
    {
        id: 'food-2',
        name: 'Wet Food',
        brand: 'Felix',
        type: 'wet',
        unit: 'g',
        createdAt: '2026-08-11T08:12:00.000Z',
    },
];

export const mockFeedingRecords: FeedingRecord[] = [
    {
        id: 'feeding-1',
        petId: 'pet-1',
        foodId: 'food-1',
        amount: 40,
        dateTime: createTodayDateTime(8, 15),
        note: 'Sabah öğünü',
        createdAt: createTodayDateTime(8, 16),
    },
    {
        id: 'feeding-2',
        petId: 'pet-1',
        foodId: 'food-1',
        amount: 30,
        dateTime: createTodayDateTime(13, 30),
        createdAt: createTodayDateTime(13, 31),
    },
    {
        id: 'feeding-3',
        petId: 'pet-2',
        foodId: 'food-1',
        amount: 100,
        dateTime: createTodayDateTime(9, 0),
        createdAt: createTodayDateTime(9, 1),
    },
];