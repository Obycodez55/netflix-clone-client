import useCurrentProfile from "@/hooks/useCurrentProfile";
import axios from "axios";
import React, { createContext, use, useContext, useState } from "react";
import { ProfileA } from "..";

const ProfileContext = createContext<{ profile: ProfileA; updateProfile: () => Promise<void>; } | null>(null);

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }: {
    children: React.ReactNode;
}) => {
  const { profile: currentProfile } = useCurrentProfile();
  const [profile, setProfile] = useState(currentProfile);

  const updateProfile = async () => {
    // You might want to update the profile using an API call
    const { data } = await axios.get("/api/currentProfile");
    // For now, just setting the profile ID
    setProfile(data);
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
