import { useRouter } from "next/router";
import { useContext } from "react";
import { FirebaseContext } from "../firebase";
import Layout from "../components/layouts/Layout";
import RentSection from "../components/sections/rentSection";

export default function Home() {
  const { user } = useContext(FirebaseContext);
  const router = useRouter();

  if (!user && typeof window !== "undefined") {
    router.push("/login");
  }

  return (
    <>
      <Layout>
        <RentSection></RentSection>
      </Layout>
    </>
  );
}