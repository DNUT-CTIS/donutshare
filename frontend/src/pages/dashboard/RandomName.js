import { uniqueNamesGenerator, Config, starWars } from 'unique-names-generator';

export function RandomName({seed, user, username}) {
  const config = {
    dictionaries: [starWars],
    seed: seed
  }
  const characterName = uniqueNamesGenerator(config);
  const id = localStorage.getItem("id");
  const userStr = `"${user}"`
  if (userStr == id) {
    return <p className="dark:text-white">{username}</p>;
  } else
  return <p className="dark:text-white">{characterName}</p>;
}
