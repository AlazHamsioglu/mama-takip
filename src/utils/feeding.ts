import type { FeedingRecord } from '../types';

export function getTodayFeedingRecords(
    records: FeedingRecord[],
    petId: string,
): FeedingRecord[] {
    const today = new Date();

    return records.filter((record) => {
        if (record.petId !== petId) {
            return false;
        }

        const recordDate = new Date(record.dateTime);

        return (
            recordDate.getFullYear() === today.getFullYear() &&
            recordDate.getMonth() === today.getMonth() &&
            recordDate.getDate() === today.getDate()
        );
    });
}

export function getTotalConsumed(
    records: FeedingRecord[],
): number {
    return records.reduce(
        (total, record) => total + record.amount,
        0,
    );
}

export function getRemainingAmount(
    dailyTarget: number,
    consumedAmount: number,
): number {
    return Math.max(dailyTarget - consumedAmount, 0);
}

export function getExceededAmount(
    dailyTarget: number,
    consumedAmount: number,
): number {
    return Math.max(consumedAmount - dailyTarget, 0);
}

export function getProgressPercentage(
    dailyTarget: number,
    consumedAmount: number,
): number {
    if (dailyTarget <= 0) {
        return 0;
    }

    return Math.round(
        (consumedAmount / dailyTarget) * 100,
    );
}

export function getLastFeedingRecord(
    records: FeedingRecord[],
    petId: string,
): FeedingRecord | undefined {
    return records
        .filter((record) => record.petId === petId)
        .sort(
            (a, b) =>
                new Date(b.dateTime).getTime() -
                new Date(a.dateTime).getTime(),
        )[0];
}