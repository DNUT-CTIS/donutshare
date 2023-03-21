import { uniqueNamesGenerator, Config, starWars } from 'unique-names-generator';
import {AvatarGenerator} from "random-avatar-generator";

const config = {
  dictionaries: [starWars]
}

export function Random() {
  const generator = new AvatarGenerator();

  const im = generator.generateRandomAvatar();
  return <img src={im} className="rounded-full dark:bg-zinc-700 w-16 h-16 sm:w-32 sm:h-32"></img>;
}
