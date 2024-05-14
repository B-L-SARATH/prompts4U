"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signOut, signIn, useSession, getProviders } from "next-auth/react";
const Nav = () => {
  const { data: session } = useSession();
  const [providers, setproviders] = useState(null);
  const [toggledropdown, settoggledropdown] = useState(false);
  useEffect(() => {
    const fetchProviders = async () => {
      const res_providers = await getProviders();
      setproviders(res_providers);
    };
    fetchProviders();
  }, []);
  //   console.log(providers);
  return (
    <nav className="w-full flex-between mb-10 p-2">
      <Link href="/" className=" gap-2 flex-between">
        <Image
          src="/assets/icons/logo.png"
          alt="logo"
          width={30}
          height={30}
          className=" cursor-pointer"
        />
        <p className="font-extrabold sm:flex hidden ">Prompts For You </p>
      </Link>

      {/* desktop navigation */}
      <div className="sm:flex hidden gap-3 md:gap-5">
        {session?.user ? (
          <>
            <Link href="/create-prompt" className="black_btn">
              Create Prompt
            </Link>
            <button className="outline_btn" onClick={signOut}>
              Signout
            </button>
            <Link href="/profile" className="flex-between">
              {" "}
              <Image
                src={session?.user.image}
                alt="user"
                width={30}
                height={30}
                className=" cursor-pointer rounded-full"
              />
            </Link>{" "}
          </>
        ) : (
          <>
            {providers ? (
              Object.values(providers).map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  {provider.name}
                </button>
              ))
            ) : (
              <p className="font-bold"> Loading...</p>
            )}
          </>
        )}
      </div>

      {/* mobile navigation */}
      <div className="sm:hidden">
        {session?.user ? (
          <>
            <Image
              src={session?.user.image}
              alt="user"
              width={30}
              height={30}
              className="cursor-pointer rounded-full"
              onClick={() => {
                console.log("hello");
                settoggledropdown((prev) => !prev);
              }}
            />
            {toggledropdown && (
              <div className="flex flex-col bg-white p-2 flex-end items-end mt-5 absolute right-0">
                <Link
                  href="/profile"
                  className="m-2"
                  onClick={() => settoggledropdown(false)}
                >
                  Profile{" "}
                </Link>
                <Link
                  href="/create-prompt"
                  className=" m-2 black_btn"
                  onClick={() => settoggledropdown(false)}
                >
                  Create Prompt{" "}
                </Link>
                <button
                  className="outline_btn m-2"
                  onClick={() => {
                    settoggledropdown(false);
                    signOut();
                  }}
                >
                  Signout
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                >
                  {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
