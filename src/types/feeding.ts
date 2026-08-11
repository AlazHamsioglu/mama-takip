export interface FeedingRecord {
    id: string;
    petId: string;
    foodId: string;
    amount: number;
    dateTime: string;
    note?: string;
    createdAt: string;
}