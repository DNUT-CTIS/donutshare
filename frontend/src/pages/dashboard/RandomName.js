import { uniqueNamesGenerator, Config, starWars } from 'unique-names-generator';

const config = {
  dictionaries: [starWars]
}

export function RandomName() {
  const characterName = uniqueNamesGenerator(config);
  return <p className="dark:text-white">{characterName}</p>;
}
