import { useState } from 'react';

import './App.css';

import { FeedingForm } from './components/FeedingForm';
import { TodayPage } from './pages/TodayPage';

import type {
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

  const [
    isFeedingFormOpen,
    setIsFeedingFormOpen,
  ] = useState(false);

  function handleSelectPet(petId: string) {
    setSelectedPetId(petId);
    saveSelectedPetId(petId);
  }

  function handleAddFeeding(
    record: FeedingRecord,
  ) {
    const updatedRecords = [
      ...feedingRecords,
      record,
    ];

    setFeedingRecords(updatedRecords);
    saveFeedingRecords(updatedRecords);

    setSelectedPetId(record.petId);
    saveSelectedPetId(record.petId);

    setIsFeedingFormOpen(false);
  }

  return (
    <>
      <main className="app">
        {selectedPetId && (
          <TodayPage
            pets={pets}
            foods={foods}
            feedingRecords={feedingRecords}
            selectedPetId={selectedPetId}
            onSelectPet={handleSelectPet}
            onAddFeeding={() =>
              setIsFeedingFormOpen(true)
            }
          />
        )}
      </main>

      {isFeedingFormOpen && (
        <FeedingForm
          pets={pets}
          foods={foods}
          selectedPetId={selectedPetId}
          onSave={handleAddFeeding}
          onCancel={() =>
            setIsFeedingFormOpen(false)
          }
        />
      )}
    </>
  );
}

export default App;