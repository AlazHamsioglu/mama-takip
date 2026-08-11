import { useState } from 'react';

import './App.css';

import { FeedingForm } from './components/FeedingForm';
import { FoodForm } from './components/FoodForm';
import { PetForm } from './components/PetForm';
import { BottomNavigation } from './components/layout/BottomNavigation';

import { FoodsPage } from './pages/FoodsPage';
import { HistoryPage } from './pages/HistoryPage';
import { PetsPage } from './pages/PetsPage';
import { TodayPage } from './pages/TodayPage';

import type {
  AppPage,
  FeedingRecord,
  Food,
  Pet,
} from './types';

import {
  clearSelectedPetId,
  getFeedingRecords,
  getFoods,
  getPets,
  getSelectedPetId,
  initializeStorage,
  saveFeedingRecords,
  saveFoods,
  savePets,
  saveSelectedPetId,
} from './utils/storage';

initializeStorage();

function App() {
  const [pets, setPets] = useState<Pet[]>(
    () => getPets(),
  );

  const [foods, setFoods] = useState<Food[]>(
    () => getFoods(),
  );

  const [
    feedingRecords,
    setFeedingRecords,
  ] = useState<FeedingRecord[]>(
    () => getFeedingRecords(),
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

  const [
    isPetFormOpen,
    setIsPetFormOpen,
  ] = useState(false);

  const [
    editingPet,
    setEditingPet,
  ] = useState<Pet | null>(null);

  const [
    isFoodFormOpen,
    setIsFoodFormOpen,
  ] = useState(false);

  const [
    editingFood,
    setEditingFood,
  ] = useState<Food | null>(null);

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

  function handleSavePet(pet: Pet) {
    const petExists = pets.some(
      (item) => item.id === pet.id,
    );

    const updatedPets = petExists
      ? pets.map((item) =>
        item.id === pet.id
          ? pet
          : item,
      )
      : [...pets, pet];

    setPets(updatedPets);
    savePets(updatedPets);

    if (!selectedPetId) {
      setSelectedPetId(pet.id);
      saveSelectedPetId(pet.id);
    }

    setEditingPet(null);
    setIsPetFormOpen(false);
  }

  function handleDeletePet(petId: string) {
    const updatedPets = pets.filter(
      (pet) => pet.id !== petId,
    );

    const updatedRecords =
      feedingRecords.filter(
        (record) => record.petId !== petId,
      );

    setPets(updatedPets);
    savePets(updatedPets);

    setFeedingRecords(updatedRecords);
    saveFeedingRecords(updatedRecords);

    if (selectedPetId === petId) {
      const nextPetId =
        updatedPets[0]?.id ?? '';

      setSelectedPetId(nextPetId);

      if (nextPetId) {
        saveSelectedPetId(nextPetId);
      } else {
        clearSelectedPetId();
      }
    }

    setEditingPet(null);
    setIsPetFormOpen(false);
  }

  function handleOpenPetForm() {
    setEditingPet(null);
    setIsPetFormOpen(true);
  }

  function handleEditPet(pet: Pet) {
    setEditingPet(pet);
    setIsPetFormOpen(true);
  }

  function handleClosePetForm() {
    setEditingPet(null);
    setIsPetFormOpen(false);
  }

  function handleSaveFood(food: Food) {
    const foodExists = foods.some(
      (item) => item.id === food.id,
    );

    const updatedFoods = foodExists
      ? foods.map((item) =>
        item.id === food.id
          ? food
          : item,
      )
      : [...foods, food];

    setFoods(updatedFoods);
    saveFoods(updatedFoods);

    setEditingFood(null);
    setIsFoodFormOpen(false);
  }

  function handleDeleteFood(foodId: string) {
    const isUsed = feedingRecords.some(
      (record) => record.foodId === foodId,
    );

    if (isUsed) {
      return;
    }

    const updatedFoods = foods.filter(
      (food) => food.id !== foodId,
    );

    setFoods(updatedFoods);
    saveFoods(updatedFoods);

    setEditingFood(null);
    setIsFoodFormOpen(false);
  }

  function handleOpenFoodForm() {
    setEditingFood(null);
    setIsFoodFormOpen(true);
  }

  function handleEditFood(food: Food) {
    setEditingFood(food);
    setIsFoodFormOpen(true);
  }

  function handleCloseFoodForm() {
    setEditingFood(null);
    setIsFoodFormOpen(false);
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
        return (
          <PetsPage
            pets={pets}
            selectedPetId={selectedPetId}
            onSelectPet={handleSelectPet}
            onAddPet={handleOpenPetForm}
            onEditPet={handleEditPet}
          />
        );

      case 'foods':
        return (
          <FoodsPage
            foods={foods}
            feedingRecords={feedingRecords}
            onAddFood={handleOpenFoodForm}
            onEditFood={handleEditFood}
          />
        );

      case 'today':
      default:
        return (
          <TodayPage
            pets={pets}
            foods={foods}
            feedingRecords={feedingRecords}
            selectedPetId={selectedPetId}
            onSelectPet={handleSelectPet}
            onAddFeeding={
              handleOpenFeedingForm
            }
            onEditFeeding={
              handleEditFeeding
            }
            onAddPet={handleOpenPetForm}
          />
        );
    }
  }

  const editingFoodIsUsed =
    editingFood !== null &&
    feedingRecords.some(
      (record) =>
        record.foodId === editingFood.id,
    );

  return (
    <>
      <main className="app">
        {renderPage()}
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

      {isPetFormOpen && (
        <PetForm
          editingPet={
            editingPet ?? undefined
          }
          onSave={handleSavePet}
          onDelete={handleDeletePet}
          onCancel={handleClosePetForm}
        />
      )}

      {isFoodFormOpen && (
        <FoodForm
          editingFood={
            editingFood ?? undefined
          }
          isUsed={editingFoodIsUsed}
          onSave={handleSaveFood}
          onDelete={handleDeleteFood}
          onCancel={handleCloseFoodForm}
        />
      )}
    </>
  );
}

export default App;