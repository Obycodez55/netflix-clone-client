import React from 'react'
import { create } from 'zustand';
import { Movie } from '..';

export interface ModalStoreInterface{
    movie?: Movie;
    isOpen: boolean;
    openModal: (movie: Movie) => void;
    closeModal: () => void;
}

const useInfoModal = create<ModalStoreInterface>((set) => ({
    movie: undefined,
    isOpen: false,
    openModal: (movie: Movie) => set({movie, isOpen: true}),
    closeModal: () => set({isOpen: false, movie: undefined}),
}));

export default useInfoModal