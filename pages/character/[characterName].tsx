import { useRouter } from "next/router";
import CharacterInfo from "../../app/components/CharacterInfo";

function Character() {
  const router = useRouter();
  const characterName = router.query.characterName as string;
  if (characterName) {
    return <CharacterInfo characterName={characterName} />;
  } else {
    return <h1>Loading...</h1>;
  }
}
export default Character;
