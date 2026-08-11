import type { FeedingRecord, Food, Pet } from '../types';
import {
    mockFeedingRecords,
    mockFoods,
    mockPets,
} from '../data/mockData';

const STORAGE_KEYS = {
    pets: 'mama-tracker:pets',
    foods: 'mama-tracker:foods',
    feedingRecords: 'mama-tracker:feeding-records',
    selectedPetId: 'mama-tracker:selected-pet-id',
} as const;

function readStorage<T>(key: string, fallback: T): T {
    const storedValue = localStorage.getItem(key);

    if (!storedValue) {
        return fallback;
    }

    try {
        return JSON.parse(storedValue) as T;
    } catch {
        return fallback;
    }
}

function writeStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
}

export function initializeStorage(): void {
    if (!localStorage.getItem(STORAGE_KEYS.pets)) {
        savePets(mockPets);
    }

    if (!localStorage.getItem(STORAGE_KEYS.foods)) {
        saveFoods(mockFoods);
    }

    if (!localStorage.getItem(STORAGE_KEYS.feedingRecords)) {
        saveFeedingRecords(mockFeedingRecords);
    }

    if (!localStorage.getItem(STORAGE_KEYS.selectedPetId)) {
        saveSelectedPetId(mockPets[0].id);
    }
}

export function clearAppStorage(): void {
    Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
    });
}

export function getPets(): Pet[] {
    return readStorage<Pet[]>(STORAGE_KEYS.pets, mockPets);
}

export function savePets(pets: Pet[]): void {
    writeStorage(STORAGE_KEYS.pets, pets);
}

export function getFoods(): Food[] {
    return readStorage<Food[]>(STORAGE_KEYS.foods, mockFoods);
}

export function saveFoods(foods: Food[]): void {
    writeStorage(STORAGE_KEYS.foods, foods);
}

export function getFeedingRecords(): FeedingRecord[] {
    return readStorage<FeedingRecord[]>(
        STORAGE_KEYS.feedingRecords,
        mockFeedingRecords,
    );
}

export function saveFeedingRecords(
    records: FeedingRecord[],
): void {
    writeStorage(STORAGE_KEYS.feedingRecords, records);
}

export function getSelectedPetId(): string | null {
    return localStorage.getItem(STORAGE_KEYS.selectedPetId);
}

export function saveSelectedPetId(petId: string): void {
    localStorage.setItem(STORAGE_KEYS.selectedPetId, petId);
}

export function clearSelectedPetId(): void {
    localStorage.removeItem(STORAGE_KEYS.selectedPetId);
}