import { useState } from 'react';

import type {
    Food,
    FoodType,
    MeasurementUnit,
} from '../types';

interface FoodFormProps {
    editingFood?: Food;
    isUsed?: boolean;
    onSave: (food: Food) => void;
    onDelete?: (foodId: string) => void;
    onCancel: () => void;
}

export function FoodForm({
    editingFood,
    isUsed = false,
    onSave,
    onDelete,
    onCancel,
}: FoodFormProps) {
    const [name, setName] = useState(
        editingFood?.name ?? '',
    );

    const [brand, setBrand] = useState(
        editingFood?.brand ?? '',
    );

    const [type, setType] = useState<FoodType>(
        editingFood?.type ?? 'dry',
    );

    const [unit, setUnit] =
        useState<MeasurementUnit>(
            editingFood?.unit ?? 'g',
        );

    const [error, setError] = useState('');

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        const trimmedName = name.trim();
        const trimmedBrand = brand.trim();

        if (!trimmedName) {
            setError('Mama adı zorunludur.');
            return;
        }

        const food: Food = {
            id: editingFood?.id ?? crypto.randomUUID(),
            name: trimmedName,
            brand: trimmedBrand || undefined,
            type,
            unit,
            createdAt:
                editingFood?.createdAt ??
                new Date().toISOString(),
        };

        onSave(food);
    }

    function handleDelete() {
        if (!editingFood || !onDelete) {
            return;
        }

        if (isUsed) {
            setError(
                'Bu mama öğün kayıtlarında kullanıldığı için silinemez.',
            );
            return;
        }

        const shouldDelete = window.confirm(
            `${editingFood.name} isimli mamayı silmek istediğinden emin misin?`,
        );

        if (shouldDelete) {
            onDelete(editingFood.id);
        }
    }

    return (
        <div className="modal-backdrop">
            <section
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="food-form-title"
            >
                <div className="modal__header">
                    <div>
                        <span className="eyebrow">
                            {editingFood
                                ? 'Mamayı Düzenle'
                                : 'Yeni Mama'}
                        </span>

                        <h2 id="food-form-title">
                            {editingFood
                                ? 'Mama Bilgileri'
                                : 'Mama Ekle'}
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
                        <span>Mama Adı</span>

                        <input
                            type="text"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            placeholder="Örn. Sterilised 37"
                        />
                    </label>

                    <label className="form-field">
                        <span>Marka</span>

                        <input
                            type="text"
                            value={brand}
                            onChange={(event) =>
                                setBrand(event.target.value)
                            }
                            placeholder="Örn. Royal Canin"
                        />
                    </label>

                    <label className="form-field">
                        <span>Mama Tipi</span>

                        <select
                            value={type}
                            onChange={(event) =>
                                setType(
                                    event.target.value as FoodType,
                                )
                            }
                        >
                            <option value="dry">
                                Kuru Mama
                            </option>

                            <option value="wet">
                                Yaş Mama
                            </option>

                            <option value="other">
                                Diğer
                            </option>
                        </select>
                    </label>

                    <label className="form-field">
                        <span>Ölçü Birimi</span>

                        <select
                            value={unit}
                            disabled={
                                Boolean(editingFood) && isUsed
                            }
                            onChange={(event) =>
                                setUnit(
                                    event.target
                                        .value as MeasurementUnit,
                                )
                            }
                        >
                            <option value="g">
                                g
                            </option>

                            <option value="ml">
                                ml
                            </option>
                        </select>

                        {editingFood && isUsed && (
                            <small className="field-help">
                                Bu mama öğün kayıtlarında
                                kullanıldığı için ölçü birimi
                                değiştirilemez.
                            </small>
                        )}
                    </label>

                    {error && (
                        <p className="form-error">
                            {error}
                        </p>
                    )}

                    {editingFood && onDelete && (
                        <>
                            <button
                                type="button"
                                className="delete-button"
                                onClick={handleDelete}
                                disabled={isUsed}
                            >
                                Mamayı Sil
                            </button>

                            {isUsed && (
                                <small className="field-help">
                                    Geçmiş veya mevcut bir öğünde
                                    kullanılan mama silinemez.
                                </small>
                            )}
                        </>
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
                            {editingFood
                                ? 'Değişiklikleri Kaydet'
                                : 'Mamayı Kaydet'}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}