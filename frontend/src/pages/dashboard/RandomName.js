import { uniqueNamesGenerator, Config, starWars } from 'unique-names-generator';



export function RandomName({seed}) {
  const config = {
    dictionaries: [starWars],
    seed: seed
  }
  const characterName = uniqueNamesGenerator(config);
  return <p className="dark:text-white">{characterName}</p>;
}
