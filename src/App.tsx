import { useState } from 'react';

import './App.css';

import { FeedingForm } from './components/FeedingForm';
import { BottomNavigation } from './components/layout/BottomNavigation';

import { HistoryPage } from './pages/HistoryPage';
import { TodayPage } from './pages/TodayPage';

import { FoodsPage } from './pages/FoodsPage';
import { PetsPage } from './pages/PetsPage';

import type {
  AppPage,
  FeedingRecord,
  Food,
  Pet,
} from './types';

import {
  getFeedingRecords,
  getFoods,
  getPets,
  getSelectedPetId,
  initializeStorage,
  saveFeedingRecords,
  saveSelectedPetId,
} from './utils/storage';

initializeStorage();

function App() {
  const [pets] = useState<Pet[]>(() =>
    getPets(),
  );

  const [foods] = useState<Food[]>(() =>
    getFoods(),
  );

  const [
    feedingRecords,
    setFeedingRecords,
  ] = useState<FeedingRecord[]>(() =>
    getFeedingRecords(),
  );

  const [
    selectedPetId,
    setSelectedPetId,
  ] = useState(() => {
    const storedPets = getPets();
    const storedSelectedPetId =
      getSelectedPetId();

    return (
      storedPets.find(
        (pet) =>
          pet.id === storedSelectedPetId,
      )?.id ??
      storedPets[0]?.id ??
      ''
    );
  });

  const [activePage, setActivePage] =
    useState<AppPage>('today');

  const [
    isFeedingFormOpen,
    setIsFeedingFormOpen,
  ] = useState(false);

  const [
    editingRecord,
    setEditingRecord,
  ] = useState<FeedingRecord | null>(null);

  function handleSelectPet(petId: string) {
    setSelectedPetId(petId);
    saveSelectedPetId(petId);
  }

  function handleSaveFeeding(
    record: FeedingRecord,
  ) {
    const recordExists = feedingRecords.some(
      (item) => item.id === record.id,
    );

    const updatedRecords = recordExists
      ? feedingRecords.map((item) =>
        item.id === record.id
          ? record
          : item,
      )
      : [...feedingRecords, record];

    setFeedingRecords(updatedRecords);
    saveFeedingRecords(updatedRecords);

    setSelectedPetId(record.petId);
    saveSelectedPetId(record.petId);

    setEditingRecord(null);
    setIsFeedingFormOpen(false);
  }

  function handleEditFeeding(
    record: FeedingRecord,
  ) {
    setEditingRecord(record);
    setIsFeedingFormOpen(true);
  }

  function handleDeleteFeeding(
    recordId: string,
  ) {
    const updatedRecords =
      feedingRecords.filter(
        (record) => record.id !== recordId,
      );

    setFeedingRecords(updatedRecords);
    saveFeedingRecords(updatedRecords);

    setEditingRecord(null);
    setIsFeedingFormOpen(false);
  }

  function handleOpenFeedingForm() {
    setEditingRecord(null);
    setIsFeedingFormOpen(true);
  }

  function handleCloseFeedingForm() {
    setEditingRecord(null);
    setIsFeedingFormOpen(false);
  }

  function renderPage() {
    switch (activePage) {
      case 'history':
        return (
          <HistoryPage
            pets={pets}
            foods={foods}
            feedingRecords={feedingRecords}
            selectedPetId={selectedPetId}
            onSelectPet={handleSelectPet}
            onEditFeeding={handleEditFeeding}
          />
        );

      case 'pets':
        return <PetsPage />;

      case 'foods':
        return <FoodsPage />;

      case 'today':
      default:
        return (
          <TodayPage
            pets={pets}
            foods={foods}
            feedingRecords={feedingRecords}
            selectedPetId={selectedPetId}
            onSelectPet={handleSelectPet}
            onAddFeeding={handleOpenFeedingForm}
            onEditFeeding={handleEditFeeding}
          />
        );
    }
  }

  return (
    <>
      <main className="app">
        {selectedPetId && renderPage()}
      </main>

      <BottomNavigation
        activePage={activePage}
        onNavigate={setActivePage}
      />

      {isFeedingFormOpen && (
        <FeedingForm
          pets={pets}
          foods={foods}
          selectedPetId={selectedPetId}
          editingRecord={
            editingRecord ?? undefined
          }
          onSave={handleSaveFeeding}
          onDelete={handleDeleteFeeding}
          onCancel={handleCloseFeedingForm}
        />
      )}
    </>
  );
}

export default App;