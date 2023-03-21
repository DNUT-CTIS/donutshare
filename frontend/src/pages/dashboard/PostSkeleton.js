import {motion} from "framer-motion";
import Avatar from "avataaars";
import {generateRandomAvatarOptions} from "./randomAvatar";
import {RandomName} from "./RandomName";
import {Rate} from "./Rate";
import Skeleton from "react-loading-skeleton";
import React from "react";

export function PostSkeleton() {


  return (
      <div className="mx-auto sm:w-2/5">
        <div>
          {Array(9).fill().map((item) => <div key={item} className="">
            <div className="flex flex-row border rounded-md shadow shadow-xl dark:bg-zinc-800 dark:border-zinc-700">
              <div className="w-12 sm:w-fit flex flex-col gap-4 mx-8 my-4 items-center">
                <div className="rounded-full dark:bg-zinc-700 w-16 h-16 sm:w-32 sm:h-32"></div>
                <div className="h-4 w-8 sm:h-4 sm:w-48 rounded-full dark:bg-zinc-700"></div>
                <div className="h-4 w-8 sm:h-4 sm:w-48 rounded-full dark:bg-zinc-700"></div>
              </div>
              <div className="gap-4 mx-4 my-5">
                <div className="h-4 w-16 sm:h-4 sm:w-48 rounded-full dark:bg-zinc-700"></div>
                <div className="h-4 w-64 sm:h-4 sm:w-48 my-4 rounded-full dark:bg-zinc-700"></div>
                <div className="h-4 w-64 sm:h-4 sm:w-48 rounded-full dark:bg-zinc-700"></div>
              </div>
              <br/>
            </div>
          </div>)}
        </div>
      </div>

  );
}
