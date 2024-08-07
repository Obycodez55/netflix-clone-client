import React, { useEffect } from "react";
import { PlaceholdersAndVanishInput } from "./SearchInput";
import { NextRouter } from "next/router";
import axios from "axios";
import { Movie } from "..";
import SearchData from "./SearchData";
import { FaArrowLeft } from "react-icons/fa6";

type Props = {
  text: string;
  placeholders: string[];
  router: NextRouter;
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Search = ({ text, placeholders, router, setSearchOpen }: Props) => {
  const [value, setValue] = React.useState("");
  const [data, setData] = React.useState<Movie[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    if (value == "") {
      router.push("/?search=%%", "/?search");
    } else {
      router.push("/?search=" + value);
    }
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/?search=" + value);
  };


useEffect(()=>{
  setSearchOpen(true);

  return () => {
    setSearchOpen(false);
  };
})

  useEffect(
    () => {
      async function fetchData() {
        const { data } = await axios.get(`/api/search?text=${text}`);
        setData(data);
      }
      fetchData();
    },
    [text]
  );

  return (
    <div className="p-5">
      <div className="max-md:flex gap-5 items-center">
      <div className="md:absolute cursor-pointer md:z-30">
      <FaArrowLeft onClick={() => router.push("/")} className="text-white w-10 h-8"/>
      </div>
      <div className="relative">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>
      </div>
      <div>
        <SearchData data={data} />
    </div>
    </div>
  );
};

export default Search;
