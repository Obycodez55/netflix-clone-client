import useCurrentProfile from "@/hooks/useCurrentProfile";
import axios from "axios";
import React, { createContext, use, useContext, useState } from "react";

const ProfileContext = createContext(null);

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const { profile: currentProfile } = useCurrentProfile();
  const [profile, setProfile] = useState(currentProfile);

  const updateProfile = async () => {
    // You might want to update the profile using an API call
    const {profile: newProfile} = useCurrentProfile();
    // For now, just setting the profile ID
    setProfile(newProfile);
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
