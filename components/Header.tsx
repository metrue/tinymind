"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getUserLogin } from "@/lib/githubApi";

interface HeaderProps {
  username?: string;
  iconUrl?: string;
}

/**
 * Header component that displays a user's avatar and handles navigation
 * @param {HeaderProps} props - Component props
 * @param {string} [props.username] - GitHub username
 * @param {string} [props.iconUrl] - Custom icon URL
 */
export default function Header({ username, iconUrl }: HeaderProps) {
  const { data: session } = useSession();
  const [userLogin, setUserLogin] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("/icon.jpg");

  // Handle GitHub avatar URL
  useEffect(() => {
    if (username) {
      setAvatarUrl(`https://github.com/${username}.png`);
    } else if (session?.accessToken) {
      getUserLogin(session.accessToken).then((login) => {
        setUserLogin(login);
        setAvatarUrl(`https://github.com/${login}.png`);
      });
    }
  }, [session, username]);

  // Handle custom icon URL
  useEffect(() => {
    if (iconUrl && iconUrl !== "/icon.jpg") {
      setAvatarUrl(iconUrl);
    }
  }, [iconUrl]);

  const isOwnProfile = userLogin === username;
  const navigationPath = isOwnProfile ? "/" : username ? `/${username}` : "/";

  return (
    <header className="fixed top-0 left-0 right-0 py-4 bg-card z-10">
      <div className="flex justify-center items-center">
        <Link href={navigationPath}>
          <Image
            src={avatarUrl}
            alt="Home"
            width={32}
            height={32}
            className="rounded-full"
          />
        </Link>
      </div>
    </header>
  );
}
