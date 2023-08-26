"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Logo from "@public/assets/assets/images/logo.png";
import starDark from "@public/assets/assets/images/starDark.svg";
import starLight from "@public/assets/assets/images/starLight.svg";
import signInLight from "@public/assets/assets/images/signInLight.svg";
import signInDark from "@public/assets/assets/images/signInDark.svg";
import signOutLight from "@public/assets/assets/images/signOutLight.svg";
import signOutDark from "@public/assets/assets/images/signOutDark.svg";
import { useRouter } from "next/navigation";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [leader, setLeader] = useState(starLight);
  const [signInIcon, setSignInIcon] = useState(signInDark);
  const [signOutIcon, setSignOutIcon] = useState(signOutLight);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };
    setUpProviders();
  }, []);
  const router = useRouter();
  const goToRoot = () => {
    router.push("/");
  };

  useEffect(() => {
    if (!session?.user) {
      goToRoot();
    }
  }, [session]);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          src={Logo}
          alt="Jokes logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text acme">Jokes Aside</p>
      </Link>
      {/* desktop nav*/}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link
              href={"/ranking"}
              className="outline_btn "
              onMouseOver={() => {
                setLeader(starDark);
              }}
              onMouseOut={() => {
                setLeader(starLight);
              }}
            >
              <Image src={leader} width={20} height={20} alt="leaderboard" />
            </Link>

            <Link href={"/create-prompt"} className="black_btn ">
              Create Post
            </Link>

            <button
              type="button"
              onClick={() => {
                signOut();
                setSignInIcon(signInDark);
              }}
              className="outline_btn"
              onMouseOver={() => {
                setSignOutIcon(signOutDark);
              }}
              onMouseOut={() => {
                setSignOutIcon(signOutLight);
              }}
            >
              <Image src={signOutIcon} width={20} height={20} alt="SignOut" />
            </button>

            <Link href={"/profile"}>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                  onMouseOver={() => {
                    setSignInIcon(signInLight);
                  }}
                  onMouseOut={() => {
                    setSignInIcon(signInDark);
                  }}
                >
                  <Image src={signInIcon} width={20} height={20} alt="SignIn" />
                </button>
              ))}
          </>
        )}
      </div>

      {/*mobile nav*/}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={"/ranking"}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Ranking
                </Link>
                <Link
                  href={"/create-prompt"}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Post
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-3 w-full black_btn"
                >
                  <Image
                    src={signOutDark}
                    width={20}
                    height={20}
                    alt="SignOut"
                  />
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  <Image src={signInDark} width={20} height={20} alt="SignIn" />
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
