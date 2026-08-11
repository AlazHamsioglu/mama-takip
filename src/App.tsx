import { useState } from 'react';

import './App.css';

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
  saveSelectedPetId,
} from './utils/storage';

initializeStorage();

function App() {
  const [pets] = useState<Pet[]>(() => getPets());

  const [foods] = useState<Food[]>(() => getFoods());

  const [feedingRecords] = useState<FeedingRecord[]>(() =>
    getFeedingRecords(),
  );

  const [selectedPetId, setSelectedPetId] = useState(() => {
    const storedPets = getPets();
    const storedSelectedPetId = getSelectedPetId();

    return (
      storedPets.find(
        (pet) => pet.id === storedSelectedPetId,
      )?.id ??
      storedPets[0]?.id ??
      ''
    );
  });

  function handleSelectPet(petId: string) {
    setSelectedPetId(petId);
    saveSelectedPetId(petId);
  }

  return (
    <main className="app">
      {selectedPetId && (
        <TodayPage
          pets={pets}
          foods={foods}
          feedingRecords={feedingRecords}
          selectedPetId={selectedPetId}
          onSelectPet={handleSelectPet}
        />
      )}
    </main>
  );
}

export default App;