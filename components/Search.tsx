import React, { useEffect } from "react";
import { PlaceholdersAndVanishInput } from "./SearchInput";
import { NextRouter } from "next/router";
import axios from "axios";
import { Movie } from "..";
import PlainData from "./PlainData";
import { FaArrowLeft } from "react-icons/fa6";

type Props = {
  text: string;
  placeholders: string[];
  router: NextRouter;
  setSearchOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  endpoint?: string
};

const Search = ({ text, placeholders, router, setSearchOpen, endpoint="/" }: Props) => {
  const [value, setValue] = React.useState("");
  const [data, setData] = React.useState<Movie[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    if (value == "") {
      router.push(`${endpoint}?search=%%`, `${endpoint}?search`);
    } else {
      router.push(`${endpoint}?search=${value}`);
    }
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`${endpoint}?search=` + value);
  };


useEffect(()=>{
  setSearchOpen && setSearchOpen(true);

  return () => {
    setSearchOpen && setSearchOpen(false);
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
      <FaArrowLeft onClick={() => router.push(endpoint)} className="text-white w-10 h-8"/>
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
        <PlainData data={data} />
    </div>
    </div>
  );
};

export default Search;
