import { useState } from 'react';

import type {
    FeedingRecord,
    Food,
    Pet,
} from '../types';

interface FeedingFormProps {
    pets: Pet[];
    foods: Food[];
    selectedPetId: string;
    editingRecord?: FeedingRecord;
    onSave: (record: FeedingRecord) => void;
    onDelete?: (recordId: string) => void;
    onCancel: () => void;
}

function getDateInputValue(date: Date): string {
    const year = date.getFullYear();
    const month = String(
        date.getMonth() + 1,
    ).padStart(2, '0');
    const day = String(
        date.getDate(),
    ).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function getTimeInputValue(date: Date): string {
    const hours = String(
        date.getHours(),
    ).padStart(2, '0');

    const minutes = String(
        date.getMinutes(),
    ).padStart(2, '0');

    return `${hours}:${minutes}`;
}

function getCurrentDate(): string {
    return getDateInputValue(new Date());
}

function getCurrentTime(): string {
    return getTimeInputValue(new Date());
}

export function FeedingForm({
    pets,
    foods,
    selectedPetId,
    editingRecord,
    onSave,
    onDelete,
    onCancel,
}: FeedingFormProps) {
    const selectedPet = pets.find(
        (pet) => pet.id === selectedPetId,
    );

    const compatibleFoods = foods.filter(
        (food) => food.unit === selectedPet?.targetUnit,
    );

    const editingDate = editingRecord
        ? new Date(editingRecord.dateTime)
        : null;

    const [petId, setPetId] = useState(
        editingRecord?.petId ?? selectedPetId,
    );

    const [foodId, setFoodId] = useState(
        editingRecord?.foodId ??
        compatibleFoods[0]?.id ??
        '',
    );

    const [amount, setAmount] = useState(
        editingRecord
            ? String(editingRecord.amount)
            : '',
    );

    const [date, setDate] = useState(
        editingDate
            ? getDateInputValue(editingDate)
            : getCurrentDate(),
    );

    const [time, setTime] = useState(
        editingDate
            ? getTimeInputValue(editingDate)
            : getCurrentTime(),
    );

    const [note, setNote] = useState(
        editingRecord?.note ?? '',
    );

    const [error, setError] = useState('');

    const currentPet = pets.find(
        (pet) => pet.id === petId,
    );

    const availableFoods = foods.filter(
        (food) => food.unit === currentPet?.targetUnit,
    );

    function handlePetChange(newPetId: string) {
        setPetId(newPetId);

        const newPet = pets.find(
            (pet) => pet.id === newPetId,
        );

        const firstCompatibleFood = foods.find(
            (food) => food.unit === newPet?.targetUnit,
        );

        setFoodId(firstCompatibleFood?.id ?? '');
    }

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        const numericAmount = Number(amount);

        if (!petId) {
            setError('Evcil hayvan seçmelisin.');
            return;
        }

        if (!foodId) {
            setError('Uyumlu bir mama seçmelisin.');
            return;
        }

        if (
            !Number.isFinite(numericAmount) ||
            numericAmount <= 0
        ) {
            setError(
                'Mama miktarı sıfırdan büyük olmalıdır.',
            );
            return;
        }

        if (!date || !time) {
            setError('Tarih ve saat alanları zorunludur.');
            return;
        }

        const selectedDateTime = new Date(
            `${date}T${time}`,
        );

        if (Number.isNaN(selectedDateTime.getTime())) {
            setError('Geçerli bir tarih ve saat gir.');
            return;
        }

        const now = new Date().toISOString();

        const record: FeedingRecord = {
            id: editingRecord?.id ?? crypto.randomUUID(),
            petId,
            foodId,
            amount: numericAmount,
            dateTime: selectedDateTime.toISOString(),
            note: note.trim() || undefined,
            createdAt: editingRecord?.createdAt ?? now,
        };

        onSave(record);
    }

    return (
        <div className="modal-backdrop">
            <section
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="feeding-form-title"
            >
                <div className="modal__header">
                    <div>
                        <span className="eyebrow">
                            {editingRecord
                                ? 'Öğünü Düzenle'
                                : 'Yeni Öğün'}
                        </span>

                        <h2 id="feeding-form-title">
                            {editingRecord
                                ? 'Öğün Bilgileri'
                                : 'Mama Verildi'}
                        </h2>
                    </div>

                    <button
                        type="button"
                        className="modal__close"
                        onClick={onCancel}
                        aria-label="Formu kapat"
                    >
                        ×
                    </button>
                </div>

                <form
                    className="feeding-form"
                    onSubmit={handleSubmit}
                >
                    <label className="form-field">
                        <span>Evcil Hayvan</span>

                        <select
                            value={petId}
                            onChange={(event) =>
                                handlePetChange(event.target.value)
                            }
                        >
                            {pets.map((pet) => (
                                <option
                                    key={pet.id}
                                    value={pet.id}
                                >
                                    {pet.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="form-field">
                        <span>Mama</span>

                        <select
                            value={foodId}
                            onChange={(event) =>
                                setFoodId(event.target.value)
                            }
                            disabled={availableFoods.length === 0}
                        >
                            {availableFoods.length === 0 ? (
                                <option value="">
                                    Uyumlu mama bulunamadı
                                </option>
                            ) : (
                                availableFoods.map((food) => (
                                    <option
                                        key={food.id}
                                        value={food.id}
                                    >
                                        {food.brand
                                            ? `${food.brand} — ${food.name}`
                                            : food.name}
                                    </option>
                                ))
                            )}
                        </select>
                    </label>

                    <label className="form-field">
                        <span>
                            Miktar
                            {currentPet
                                ? ` (${currentPet.targetUnit})`
                                : ''}
                        </span>

                        <input
                            type="number"
                            min="0"
                            step="0.1"
                            value={amount}
                            onChange={(event) =>
                                setAmount(event.target.value)
                            }
                            placeholder="Örn. 40"
                        />
                    </label>

                    <div className="form-row">
                        <label className="form-field">
                            <span>Tarih</span>

                            <input
                                type="date"
                                value={date}
                                onChange={(event) =>
                                    setDate(event.target.value)
                                }
                            />
                        </label>

                        <label className="form-field">
                            <span>Saat</span>

                            <input
                                type="time"
                                value={time}
                                onChange={(event) =>
                                    setTime(event.target.value)
                                }
                            />
                        </label>
                    </div>

                    <label className="form-field">
                        <span>Not</span>

                        <textarea
                            value={note}
                            onChange={(event) =>
                                setNote(event.target.value)
                            }
                            rows={3}
                            placeholder="İsteğe bağlı"
                        />
                    </label>

                    {error && (
                        <p className="form-error">
                            {error}
                        </p>
                    )}

                    {editingRecord && onDelete && (
                        <button
                            type="button"
                            className="delete-button"
                            onClick={() => {
                                const shouldDelete = window.confirm(
                                    'Bu öğün kaydını silmek istediğinden emin misin?',
                                );

                                if (shouldDelete) {
                                    onDelete(editingRecord.id);
                                }
                            }}
                        >
                            Öğünü Sil
                        </button>
                    )}

                    <div className="modal__actions">
                        <button
                            type="button"
                            className="secondary-button"
                            onClick={onCancel}
                        >
                            Vazgeç
                        </button>

                        <button
                            type="submit"
                            className="save-button"
                        >
                            {editingRecord
                                ? 'Değişiklikleri Kaydet'
                                : 'Öğünü Kaydet'}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}