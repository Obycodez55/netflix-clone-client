import axios from "axios";
import { NextPageContext } from "next";
import { useCallback } from "react";

// export async function getServerSideProps(context: NextPageContext) {
//   // try {
//   //  const {data} = await axios.get("api/current");
//   //  console.log(data)
//   // //  if(!data) return {
//   // //     redirect: {
//   // //       destination: "/auth",
//   // //       permanent: true
//   // //     }
//   // //   }
//   //   return{
//   //     props: {}
//   //   }
//   // } catch (error) {
//   //   return {
//   //     redirect: {
//   //       destination: "/auth",
//   //       permanent: true
//   //     }
//   //   }
//   // }
// }

export default function Home() {
  const logout = useCallback(async()=>{
    try {
    await axios.delete(`api/logout`);
  } catch (error:unknown) {
      console.log(error);
}}, [])

const getToken = useCallback(async()=>{
  try {
  const {data} = await axios.get(`api/current`);
  console.log(data? data: "NO data");
} catch (error:unknown) {
    console.log(error);
}}, [])
  return (
    <>
    <h1 className="text-4xl text-green-500">Netflix clone</h1>
    <button className="h-10 w-full bg-white hover:bg-neutral-400" onClick={logout}>
      Logout!
    </button>
    <button className="h-10 w-full bg-white hover:bg-neutral-400 mt-2" onClick={getToken}>
      Token!
    </button>
    </>
  );
}
