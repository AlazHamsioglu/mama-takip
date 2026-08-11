import type {
    FeedingRecord,
    Food,
} from '../types';

interface FoodsPageProps {
    foods: Food[];
    feedingRecords: FeedingRecord[];
    onAddFood: () => void;
    onEditFood: (food: Food) => void;
}

export function FoodsPage({
    foods,
    feedingRecords,
    onAddFood,
    onEditFood,
}: FoodsPageProps) {
    function getFoodTypeLabel(food: Food) {
        if (food.type === 'dry') {
            return 'Kuru Mama';
        }

        if (food.type === 'wet') {
            return 'Yaş Mama';
        }

        return 'Diğer';
    }

    function isFoodUsed(foodId: string) {
        return feedingRecords.some(
            (record) => record.foodId === foodId,
        );
    }

    return (
        <section className="management-page">
            <header className="page-header management-page__header">
                <div>
                    <span className="eyebrow">
                        Yönetim
                    </span>

                    <h1>Mamalar</h1>

                    <p>
                        Öğünlerde kullandığın mamaları
                        ekleyebilir ve mevcut mama
                        bilgilerini yönetebilirsin.
                    </p>
                </div>

                <button
                    type="button"
                    className="management-add-button"
                    onClick={onAddFood}
                >
                    + Ekle
                </button>
            </header>

            {foods.length === 0 ? (
                <section className="content-card">
                    <div className="empty-state">
                        <h2>
                            Henüz mama eklenmedi
                        </h2>

                        <p>
                            Öğün kaydı oluşturabilmek için
                            kullandığın ilk mamayı ekle.
                        </p>

                        <button
                            type="button"
                            className="save-button inline-action"
                            onClick={onAddFood}
                        >
                            + Mama Ekle
                        </button>
                    </div>
                </section>
            ) : (
                <div className="management-list">
                    {foods.map((food) => {
                        const used = isFoodUsed(food.id);

                        return (
                            <article
                                key={food.id}
                                className="management-card"
                            >
                                <div className="management-card__main management-card__main--static">
                                    <div className="management-card__icon">
                                        {food.type === 'dry'
                                            ? '🥣'
                                            : food.type === 'wet'
                                                ? '🥫'
                                                : '🍽️'}
                                    </div>

                                    <div className="management-card__content">
                                        <div className="management-card__title">
                                            <h2>{food.name}</h2>

                                            {used && (
                                                <span className="used-badge">
                                                    Kullanımda
                                                </span>
                                            )}
                                        </div>

                                        <p>
                                            {food.brand ??
                                                'Marka belirtilmedi'}
                                        </p>

                                        <strong>
                                            {getFoodTypeLabel(food)}
                                            {' · '}
                                            {food.unit}
                                        </strong>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="management-card__edit"
                                    onClick={() =>
                                        onEditFood(food)
                                    }
                                    aria-label={`${food.name} bilgilerini düzenle`}
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