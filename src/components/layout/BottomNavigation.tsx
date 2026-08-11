import type { AppPage } from '../../types';

interface BottomNavigationProps {
    activePage: AppPage;
    onNavigate: (page: AppPage) => void;
}

const navigationItems: Array<{
    page: AppPage;
    label: string;
    icon: string;
}> = [
        {
            page: 'today',
            label: 'Bugün',
            icon: '🏠',
        },
        {
            page: 'history',
            label: 'Geçmiş',
            icon: '📅',
        },
        {
            page: 'pets',
            label: 'Evcil Hayvanlar',
            icon: '🐾',
        },
        {
            page: 'foods',
            label: 'Mamalar',
            icon: '🥣',
        },
    ];

export function BottomNavigation({
    activePage,
    onNavigate,
}: BottomNavigationProps) {
    return (
        <nav
            className="bottom-navigation"
            aria-label="Ana navigasyon"
        >
            {navigationItems.map((item) => {
                const isActive = activePage === item.page;

                return (
                    <button
                        key={item.page}
                        type="button"
                        className={
                            isActive
                                ? 'bottom-navigation__item bottom-navigation__item--active'
                                : 'bottom-navigation__item'
                        }
                        onClick={() => onNavigate(item.page)}
                    >
                        <span className="bottom-navigation__icon">
                            {item.icon}
                        </span>

                        <span>{item.label}</span>
                    </button>
                );
            })}
        </nav>
    );
}