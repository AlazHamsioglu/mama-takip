import type { Pet } from '../types';

interface PetsPageProps {
    pets: Pet[];
    selectedPetId: string;
    onSelectPet: (petId: string) => void;
    onAddPet: () => void;
    onEditPet: (pet: Pet) => void;
}

export function PetsPage({
    pets,
    selectedPetId,
    onSelectPet,
    onAddPet,
    onEditPet,
}: PetsPageProps) {
    function getPetIcon(pet: Pet) {
        if (pet.type === 'cat') {
            return '🐱';
        }

        if (pet.type === 'dog') {
            return '🐶';
        }

        return '🐾';
    }

    function getPetTypeLabel(pet: Pet) {
        if (pet.type === 'cat') {
            return 'Kedi';
        }

        if (pet.type === 'dog') {
            return 'Köpek';
        }

        return 'Diğer';
    }

    return (
        <section className="management-page">
            <header className="page-header management-page__header">
                <div>
                    <span className="eyebrow">
                        Yönetim
                    </span>

                    <h1>Evcil Hayvanlar</h1>

                    <p>
                        Takip etmek istediğin evcil
                        hayvanları ve günlük hedeflerini
                        yönet.
                    </p>
                </div>

                <button
                    type="button"
                    className="management-add-button"
                    onClick={onAddPet}
                >
                    + Ekle
                </button>
            </header>

            {pets.length === 0 ? (
                <section className="content-card">
                    <div className="empty-state">
                        <h2>
                            Henüz evcil hayvan eklenmedi
                        </h2>

                        <p>
                            Beslenme takibine başlamak için
                            ilk evcil hayvanını ekle.
                        </p>

                        <button
                            type="button"
                            className="save-button inline-action"
                            onClick={onAddPet}
                        >
                            + Evcil Hayvan Ekle
                        </button>
                    </div>
                </section>
            ) : (
                <div className="management-list">
                    {pets.map((pet) => {
                        const isSelected =
                            pet.id === selectedPetId;

                        return (
                            <article
                                key={pet.id}
                                className={
                                    isSelected
                                        ? 'management-card management-card--selected'
                                        : 'management-card'
                                }
                            >
                                <button
                                    type="button"
                                    className="management-card__main"
                                    onClick={() =>
                                        onSelectPet(pet.id)
                                    }
                                >
                                    <div className="management-card__icon">
                                        {getPetIcon(pet)}
                                    </div>

                                    <div className="management-card__content">
                                        <div className="management-card__title">
                                            <h2>{pet.name}</h2>

                                            {isSelected && (
                                                <span className="selected-badge">
                                                    Aktif
                                                </span>
                                            )}
                                        </div>

                                        <p>
                                            {getPetTypeLabel(pet)}
                                        </p>

                                        <strong>
                                            Günlük hedef:{' '}
                                            {pet.dailyTarget}{' '}
                                            {pet.targetUnit}
                                        </strong>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    className="management-card__edit"
                                    onClick={() =>
                                        onEditPet(pet)
                                    }
                                    aria-label={`${pet.name} bilgilerini düzenle`}
                                >
                                    Düzenle
                                </button>
                            </article>
                        );
                    })}
                </div>
            )}
        </section>
    );
}