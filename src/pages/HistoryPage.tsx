import type {
    FeedingRecord,
    Food,
    Pet,
} from '../types';

import {
    getPetFeedingRecords,
    getTotalConsumed,
    groupFeedingRecordsByDate,
    sortFeedingRecordsByNewest,
    sortFeedingRecordsByOldest,
} from '../utils/feeding';

import {
    formatDate,
    formatTime,
} from '../utils/date';

interface HistoryPageProps {
    pets: Pet[];
    foods: Food[];
    feedingRecords: FeedingRecord[];
    selectedPetId: string;
    onSelectPet: (petId: string) => void;
    onEditFeeding: (record: FeedingRecord) => void;
}

export function HistoryPage({
    pets,
    foods,
    feedingRecords,
    selectedPetId,
    onSelectPet,
    onEditFeeding,
}: HistoryPageProps) {
    const selectedPet = pets.find(
        (pet) => pet.id === selectedPetId,
    );

    if (!selectedPet) {
        return (
            <section className="empty-state">
                <h2>Henüz evcil hayvan yok</h2>

                <p>
                    Geçmiş öğünleri görüntülemek için önce
                    bir evcil hayvan ekle.
                </p>
            </section>
        );
    }

    const petRecords = getPetFeedingRecords(
        feedingRecords,
        selectedPet.id,
    );

    const sortedRecords =
        sortFeedingRecordsByNewest(petRecords);

    const groupedRecords =
        groupFeedingRecordsByDate(sortedRecords);

    const dateGroups = Object.entries(groupedRecords);

    function getFood(foodId: string) {
        return foods.find(
            (food) => food.id === foodId,
        );
    }

    return (
        <section className="history-page">
            <header className="page-header">
                <span className="eyebrow">
                    Beslenme Geçmişi
                </span>

                <h1>Geçmiş</h1>

                <p>
                    Önceki öğün kayıtlarını tarih bazında
                    görüntüleyebilirsin.
                </p>
            </header>

            <div className="history-pet-selector">
                {pets.map((pet) => (
                    <button
                        key={pet.id}
                        type="button"
                        className={
                            pet.id === selectedPet.id
                                ? 'pet-chip pet-chip--active'
                                : 'pet-chip'
                        }
                        onClick={() => onSelectPet(pet.id)}
                    >
                        <span>
                            {pet.type === 'cat'
                                ? '🐱'
                                : pet.type === 'dog'
                                    ? '🐶'
                                    : '🐾'}
                        </span>

                        {pet.name}
                    </button>
                ))}
            </div>

            {dateGroups.length === 0 ? (
                <section className="content-card">
                    <div className="empty-state">
                        <h2>Henüz geçmiş kaydı yok</h2>

                        <p>
                            {selectedPet.name} için oluşturulan
                            öğünler burada görüntülenecek.
                        </p>
                    </div>
                </section>
            ) : (
                <div className="history-list">
                    {dateGroups.map(
                        ([dateKey, records]) => {
                            const sortedDayRecords =
                                sortFeedingRecordsByOldest(records);

                            const total =
                                getTotalConsumed(records);

                            return (
                                <section
                                    key={dateKey}
                                    className="content-card history-day"
                                >
                                    <div className="history-day__header">
                                        <div>
                                            <span className="eyebrow">
                                                Günlük Kayıt
                                            </span>

                                            <h2>
                                                {formatDate(
                                                    records[0].dateTime,
                                                )}
                                            </h2>
                                        </div>

                                        <div className="history-day__total">
                                            <span>Toplam</span>

                                            <strong>
                                                {total}{' '}
                                                {selectedPet.targetUnit}
                                            </strong>
                                        </div>
                                    </div>

                                    <div className="feeding-list">
                                        {sortedDayRecords.map(
                                            (record) => {
                                                const food = getFood(
                                                    record.foodId,
                                                );

                                                return (
                                                    <article
                                                        key={record.id}
                                                        className="feeding-item"
                                                    >
                                                        <div className="feeding-item__time">
                                                            {formatTime(
                                                                record.dateTime,
                                                            )}
                                                        </div>

                                                        <div className="feeding-item__content">
                                                            <strong>
                                                                {record.amount}{' '}
                                                                {
                                                                    selectedPet.targetUnit
                                                                }
                                                            </strong>

                                                            <span>
                                                                {food?.name ??
                                                                    'Bilinmeyen mama'}
                                                            </span>

                                                            {record.note && (
                                                                <small>
                                                                    {record.note}
                                                                </small>
                                                            )}
                                                        </div>

                                                        <button
                                                            type="button"
                                                            className="icon-button"
                                                            aria-label="Öğünü düzenle"
                                                            onClick={() =>
                                                                onEditFeeding(
                                                                    record,
                                                                )
                                                            }
                                                        >
                                                            ⋯
                                                        </button>
                                                    </article>
                                                );
                                            },
                                        )}
                                    </div>
                                </section>
                            );
                        },
                    )}
                </div>
            )}
        </section>
    );
}