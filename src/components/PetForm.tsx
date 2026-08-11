import { useState } from 'react';

import type {
    MeasurementUnit,
    Pet,
    PetType,
} from '../types';

interface PetFormProps {
    editingPet?: Pet;
    onSave: (pet: Pet) => void;
    onDelete?: (petId: string) => void;
    onCancel: () => void;
}

export function PetForm({
    editingPet,
    onSave,
    onDelete,
    onCancel,
}: PetFormProps) {
    const [name, setName] = useState(
        editingPet?.name ?? '',
    );

    const [type, setType] = useState<PetType>(
        editingPet?.type ?? 'cat',
    );

    const [dailyTarget, setDailyTarget] = useState(
        editingPet
            ? String(editingPet.dailyTarget)
            : '',
    );

    const [targetUnit, setTargetUnit] =
        useState<MeasurementUnit>(
            editingPet?.targetUnit ?? 'g',
        );

    const [error, setError] = useState('');

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        const trimmedName = name.trim();
        const numericTarget = Number(dailyTarget);

        if (!trimmedName) {
            setError('Evcil hayvan adı zorunludur.');
            return;
        }

        if (
            !Number.isFinite(numericTarget) ||
            numericTarget <= 0
        ) {
            setError(
                'Günlük hedef sıfırdan büyük olmalıdır.',
            );
            return;
        }

        const pet: Pet = {
            id: editingPet?.id ?? crypto.randomUUID(),
            name: trimmedName,
            type,
            dailyTarget: numericTarget,
            targetUnit,
            createdAt:
                editingPet?.createdAt ??
                new Date().toISOString(),
        };

        onSave(pet);
    }

    return (
        <div className="modal-backdrop">
            <section
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="pet-form-title"
            >
                <div className="modal__header">
                    <div>
                        <span className="eyebrow">
                            {editingPet
                                ? 'Evcil Hayvanı Düzenle'
                                : 'Yeni Evcil Hayvan'}
                        </span>

                        <h2 id="pet-form-title">
                            {editingPet
                                ? 'Bilgileri Güncelle'
                                : 'Evcil Hayvan Ekle'}
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
                        <span>Ad</span>

                        <input
                            type="text"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            placeholder="Örn. Mia"
                        />
                    </label>

                    <label className="form-field">
                        <span>Tür</span>

                        <select
                            value={type}
                            onChange={(event) =>
                                setType(
                                    event.target.value as PetType,
                                )
                            }
                        >
                            <option value="cat">
                                Kedi
                            </option>

                            <option value="dog">
                                Köpek
                            </option>

                            <option value="other">
                                Diğer
                            </option>
                        </select>
                    </label>

                    <div className="form-row">
                        <label className="form-field">
                            <span>Günlük Hedef</span>

                            <input
                                type="number"
                                min="0"
                                step="0.1"
                                value={dailyTarget}
                                onChange={(event) =>
                                    setDailyTarget(
                                        event.target.value,
                                    )
                                }
                                placeholder="Örn. 120"
                            />
                        </label>

                        <label className="form-field">
                            <span>Birim</span>

                            <select
                                value={targetUnit}
                                disabled={Boolean(editingPet)}
                                onChange={(event) =>
                                    setTargetUnit(
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
                            {editingPet && (
                                <small className="field-help">
                                    Ölçü birimi mevcut kayıtların tutarlılığı için
                                    sonradan değiştirilemez.
                                </small>
                            )}
                        </label>
                    </div>

                    {error && (
                        <p className="form-error">
                            {error}
                        </p>
                    )}

                    {editingPet && onDelete && (
                        <button
                            type="button"
                            className="delete-button"
                            onClick={() => {
                                const shouldDelete =
                                    window.confirm(
                                        `${editingPet.name} ve bu hayvana ait tüm öğün kayıtları silinecek. Devam etmek istiyor musun?`,
                                    );

                                if (shouldDelete) {
                                    onDelete(editingPet.id);
                                }
                            }}
                        >
                            Evcil Hayvanı Sil
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
                            {editingPet
                                ? 'Değişiklikleri Kaydet'
                                : 'Evcil Hayvanı Kaydet'}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}