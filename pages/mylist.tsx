/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Navbar from '@/components/Navbar'
import React, { useEffect, useState } from 'react'
import { useProfile } from '@/contexts/ProfileContext';
import { useRouter } from 'next/router';
import InfoModal from '@/components/InfoModal';
import useInfoModal from '@/hooks/useInfoModal';
import PlainData from '@/components/PlainData';
import { Modal } from '@/components/Modal';
import Search from '@/components/Search';


const MyList = () => {
  const router = useRouter();
  const search = router.query.search as string;
  const {isOpen, closeModal} = useInfoModal();
  const profileContext = useProfile();
  if (!profileContext) router.push("/profiles");
  const updateProfile = profileContext?.updateProfile;
  const favourites = profileContext?.profile?.favourites;
  const myList = favourites?.map(fav => fav.movie);
  const titles = myList?.map(movie => movie.title);

  useEffect(() => {
    updateProfile!();
}, []);

  return (
    <div>
      {search && (
      <Modal onClose={()=> router.push("/")}>
      <Search text={search} placeholders={titles!} router={router} endpoint='/mylist'/>
    </Modal>
    )}
    <InfoModal visible={isOpen} onClose={closeModal}/>
        <Navbar router={router} endpoint="/mylist" favorite/>
        <div className="px-5 py-24">
        <PlainData data={myList!} emptyText='You have not added any movie to your list'/>
        </div>
    </div>
  )
}

export default MyList