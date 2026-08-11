import type {
    FeedingRecord,
    Food,
    Pet,
} from '../types';

import {
    getExceededAmount,
    getLastFeedingRecord,
    getProgressPercentage,
    getRemainingAmount,
    getTodayFeedingRecords,
    getTotalConsumed,
    sortFeedingRecordsByOldest,
} from '../utils/feeding';

import { formatTime } from '../utils/date';

interface TodayPageProps {
    pets: Pet[];
    foods: Food[];
    feedingRecords: FeedingRecord[];
    selectedPetId: string;
    onSelectPet: (petId: string) => void;
    onAddFeeding: () => void;
    onEditFeeding: (
        record: FeedingRecord,
    ) => void;
    onAddPet: () => void;
}

export function TodayPage({
    pets,
    foods,
    feedingRecords,
    selectedPetId,
    onSelectPet,
    onAddFeeding,
    onEditFeeding,
    onAddPet,
}: TodayPageProps) {
    const selectedPet = pets.find(
        (pet) => pet.id === selectedPetId,
    );

    if (!selectedPet) {
        return (
            <section className="empty-state">
                <h2>Henüz evcil hayvan yok</h2>

                <p>
                    Beslenme takibine başlamak için bir
                    evcil hayvan ekle.
                </p>

                <button
                    type="button"
                    className="save-button inline-action"
                    onClick={onAddPet}
                >
                    + Evcil Hayvan Ekle
                </button>
            </section>
        );
    }

    const todayRecords =
        getTodayFeedingRecords(
            feedingRecords,
            selectedPet.id,
        );

    const consumedAmount =
        getTotalConsumed(todayRecords);

    const remainingAmount =
        getRemainingAmount(
            selectedPet.dailyTarget,
            consumedAmount,
        );

    const exceededAmount =
        getExceededAmount(
            selectedPet.dailyTarget,
            consumedAmount,
        );

    const progressPercentage =
        getProgressPercentage(
            selectedPet.dailyTarget,
            consumedAmount,
        );

    const progressBarValue = Math.min(
        progressPercentage,
        100,
    );

    const lastFeeding =
        getLastFeedingRecord(
            feedingRecords,
            selectedPet.id,
        );

    const getFood = (foodId: string) =>
        foods.find(
            (food) => food.id === foodId,
        );

    const sortedTodayRecords =
        sortFeedingRecordsByOldest(
            todayRecords,
        );

    function getPetIcon(pet: Pet) {
        if (pet.type === 'cat') {
            return '🐱';
        }

        if (pet.type === 'dog') {
            return '🐶';
        }

        return '🐾';
    }

    return (
        <section className="today-page">
            <div className="pet-selector">
                <div>
                    <span className="eyebrow">
                        Evcil Hayvanlar
                    </span>

                    <div className="pet-selector__list">
                        {pets.map((pet) => (
                            <button
                                key={pet.id}
                                type="button"
                                className={
                                    pet.id === selectedPet.id
                                        ? 'pet-chip pet-chip--active'
                                        : 'pet-chip'
                                }
                                onClick={() =>
                                    onSelectPet(pet.id)
                                }
                            >
                                <span>
                                    {getPetIcon(pet)}
                                </span>

                                {pet.name}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    type="button"
                    className="add-pet-button"
                    aria-label="Evcil hayvan ekle"
                    onClick={onAddPet}
                >
                    +
                </button>
            </div>

            <header className="today-page__header">
                <span className="eyebrow">
                    Bugünkü Beslenme
                </span>

                <h1>
                    {getPetIcon(selectedPet)}{' '}
                    {selectedPet.name}
                </h1>
            </header>

            <article className="summary-card">
                <div className="summary-card__amount">
                    <strong>
                        {consumedAmount}
                    </strong>

                    <span>
                        / {selectedPet.dailyTarget}{' '}
                        {selectedPet.targetUnit}
                    </span>
                </div>

                <div
                    className="progress"
                    aria-label={`Günlük hedefin yüzde ${progressPercentage} kadarı tamamlandı`}
                >
                    <div
                        className="progress__bar"
                        style={{
                            width: `${progressBarValue}%`,
                        }}
                    />
                </div>

                <div className="summary-card__footer">
                    <span>
                        %{progressPercentage} tamamlandı
                    </span>

                    {exceededAmount > 0 ? (
                        <strong>
                            Hedef {exceededAmount}{' '}
                            {selectedPet.targetUnit} aşıldı
                        </strong>
                    ) : (
                        <strong>
                            {remainingAmount}{' '}
                            {selectedPet.targetUnit} kaldı
                        </strong>
                    )}
                </div>
            </article>

            <section className="content-card">
                <div className="section-heading">
                    <div>
                        <span className="eyebrow">
                            Son Öğün
                        </span>

                        <h2>En son beslenme</h2>
                    </div>
                </div>

                {lastFeeding ? (
                    <div className="last-feeding">
                        <div className="last-feeding__time">
                            {formatTime(
                                lastFeeding.dateTime,
                            )}
                        </div>

                        <div>
                            <strong>
                                {lastFeeding.amount}{' '}
                                {selectedPet.targetUnit}
                            </strong>

                            <p>
                                {getFood(
                                    lastFeeding.foodId,
                                )?.name ??
                                    'Bilinmeyen mama'}
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="muted">
                        Henüz öğün kaydedilmedi.
                    </p>
                )}
            </section>

            <section className="content-card">
                <div className="section-heading">
                    <div>
                        <span className="eyebrow">
                            Bugün
                        </span>

                        <h2>
                            Bugünkü Öğünler
                        </h2>
                    </div>
                </div>

                {sortedTodayRecords.length >
                    0 ? (
                    <div className="feeding-list">
                        {sortedTodayRecords.map(
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
                ) : (
                    <div className="empty-state empty-state--small">
                        <p>
                            {selectedPet.name} bugün
                            henüz beslenmedi.
                        </p>
                    </div>
                )}
            </section>

            <button
                type="button"
                className="primary-action"
                onClick={onAddFeeding}
            >
                + Mama Verildi
            </button>
        </section>
    );
}