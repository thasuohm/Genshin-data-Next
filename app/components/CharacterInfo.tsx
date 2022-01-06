import React, { useEffect, useState, useMemo } from "react";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

import pyro from "../../public/images/elements/pyro.png";
import hydro from "../../public/images/elements/hydro.png";
import cryo from "../../public/images/elements/cyro.png";
import electro from "../../public/images/elements/electro.png";
import anemo from "../../public/images/elements/anemo.png";
import geo from "../../public/images/elements/gyro.png";
import sword from "../../public/images/weapon-type/icon-sword.png";
import bow from "../../public/images/weapon-type/icon-bow.png";
import claymore from "../../public/images/weapon-type/icon-claymore.png";
import polearm from "../../public/images/weapon-type/icon-polearm.png";
import catalyst from "../../public/images/weapon-type/icon-catalyst.png";
import * as inf from "../interface/character-interface";
import CombatTable from "./CombatTable";
import Image from "next/image";

type CharacterInfo = {
  characterName: string;
};

const CharacterInfo = ({ characterName }: CharacterInfo) => {
  const cleanChar: inf.characterInfo = useMemo(() => {
    return {
      affiliation: "",
      association: "",
      birthday: "",
      body: "",
      costs: {
        ascend1: [{ name: "", count: 0 }],
        ascend2: [{ name: "", count: 0 }],
        ascend3: [{ name: "", count: 0 }],
        ascend4: [{ name: "", count: 0 }],
        ascend5: [{ name: "", count: 0 }],
        ascend6: [{ name: "", count: 0 }],
      },
      cv: { english: "", chinese: "", japanese: "", korean: "" },
      description: "",
      constellation: "",
      name: "",
      element: "",
      weapontype: "",
      substat: "",
      stats: () => {},
      images: {
        icon: "",
        cover1: "",
        cover2: "",
        sideicon: "",
      },
      rarity: "",
      region: "",
      title: "",
      url: { fandom: "" },
      gender: "",
    };
  }, []);

  const [characterInfo, setCharacterInfo] =
    useState<inf.characterInfo>(cleanChar);
  const [constellation, setConstellation] = useState<inf.constellations>({
    name: "",
    c1: { name: "", effect: "" },
    c2: { name: "", effect: "" },
    c3: { name: "", effect: "" },
    c4: { name: "", effect: "" },
    c5: { name: "", effect: "" },
    c6: { name: "", effect: "" },
    images: { c1: "" },
  });
  const [passive, setPassive] = useState<inf.passive>({
    passive1: { name: "", info: "" },
    passive2: { name: "", info: "" },
    passive3: { name: "", info: "" },
  });

  const [level, setLevel] = useState<string>("1");
  const [stat, setStat] = useState<inf.stat>({
    hp: 0,
    attack: 0,
    defense: 0,
    ascension: 0,
  });
  const [currentElement, setCurrentElement] = useState<inf.element>({
    url: "",
    color: "",
  });
  const maxStat = { hp: 17000, atk: 380, def: 1000 };
  const ascensionStep = [20, 40, 50, 60, 70, 80];
  const weapon: inf.weapon = {
    sword: sword,
    bow: bow,
    claymore: claymore,
    polearm: polearm,
    catalyst: catalyst,
  };
  const [combat1, setCombat1] = useState<inf.combat>({
    name: "",
    description: "",
    info: "",
    attributes: {
      labels: [],
      parameters: { param1: [], param2: [], param3: [] },
    },
  });
  const [combat2, setCombat2] = useState<inf.combat>({
    name: "",
    description: "",
    info: "",
    attributes: {
      labels: [],
      parameters: { param1: [], param2: [], param3: [] },
    },
  });
  const [combat3, setCombat3] = useState<inf.combat>({
    name: "",
    description: "",
    info: "",
    attributes: {
      labels: [],
      parameters: { param1: [], param2: [], param3: [] },
    },
  });

  useEffect(() => {
    const genshindb = require("genshin-db");
    setCharacterInfo(genshindb.characters(characterName));
    setConstellation(genshindb.constellations(characterName));
    const talents = genshindb.talents(characterName);
    setCombat1(talents.combat1);
    setCombat2(talents.combat2);
    setCombat3(talents.combat3);
    console.log(genshindb.talents("fischl"));
    setPassive({
      passive1: talents.passive1,
      passive2: talents.passive2,
      passive3: talents.passive3,
    });

    return () => {
      setCharacterInfo(cleanChar);
    };
  }, [cleanChar, characterName]);

  useEffect(() => {
    if (characterInfo.name.length > 0) {
      setStat(characterInfo.stats(level));
    }
    return () => {};
  }, [characterInfo, level]);

  useEffect(() => {
    const elements: inf.elements = {
      cryo: { url: cryo, color: "#62bdb7" },
      pyro: { url: pyro, color: "#f98148" },
      hydro: { url: hydro, color: "#0fcce1" },
      electro: { url: electro, color: "#ad50bd" },
      anemo: { url: anemo, color: "#04dabf" },
      geo: { url: geo, color: "#efb233" },
      dendro: { url: anemo, color: "#02b27e" },
      none: { url: anemo, color: "#fff" },
    };
    if (characterInfo.element) {
      const elem = characterInfo.element.toLowerCase();
      setCurrentElement(elements[elem]);
    }
    return () => {};
  }, [characterInfo]);

  return (
    <div className="character__container">
      {currentElement.color && (
        <h2
          className="character__name"
          style={{ textShadow: `0 0 5px ${currentElement.color}` }}
        >
          {characterInfo.name} - {characterInfo.affiliation}
        </h2>
      )}

      <div className="character-info">
        {characterInfo.images.cover2 && (
          <div className="center info">
            <img
              src={characterInfo.images.cover2}
              alt={characterInfo.name}
              className="character-info__img"
              style={{
                backgroundImage: `url(${currentElement.url.src})`,
              }}
            />
          </div>
        )}
        <table className="info-table info">
          <tbody>
            <tr>
              <td>title</td>
              <td>
                <h4> {characterInfo.title}</h4>
              </td>
            </tr>
            <tr>
              <td>association</td>
              <td>
                <h4>{characterInfo.association}</h4>
              </td>
            </tr>
            <tr>
              <td>rarity</td>
              <td>
                {characterInfo.rarity && (
                  <>
                    {[...Array(parseInt(characterInfo.rarity))].map((e, i) => {
                      return <StarOutlineIcon key={`starNo${i}`} />;
                    })}
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td>weapon</td>
              <td className="weapon  ">
                <h4>{characterInfo.weapontype}</h4>
                {characterInfo.weapontype && (
                  <div className="icon__img__container">
                    <Image
                      width="100%"
                      height="100%"
                      layout="responsive"
                      objectFit="contain"
                      src={weapon[characterInfo.weapontype.toLowerCase()]}
                      alt="weapon"
                    />
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>element</td>
              <td className="element  ">
                {currentElement.color && (
                  <>
                    <h4
                      style={{
                        textShadow: `0 0 10px ${currentElement.color}`,
                      }}
                    >
                      {characterInfo.element}
                    </h4>
                    <div className="icon__img__container">
                      <Image
                        width="100%"
                        height="100%"
                        layout="responsive"
                        objectFit="contain"
                        src={currentElement.url}
                        alt="element"
                      />
                    </div>
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td>birthday</td>
              <td>
                <h4> {characterInfo.birthday}</h4>
              </td>
            </tr>
            <tr>
              <td>constellation</td>
              <td>
                <h4>{characterInfo.constellation}</h4>
              </td>
            </tr>
            <tr>
              <td>description</td>
              <td>
                <h4>{characterInfo.description}</h4>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="content-container info">
          <h3 className="stat-title">Character status</h3>

          <div>
            Level <b>{level}</b> Ascension <b>{stat.ascension}</b> Growth
            <b> {characterInfo.substat}</b>
          </div>

          <div className="stat-input__container">
            <input
              type="range"
              title="current-level"
              min="1"
              max="90"
              value={level}
              className="stat-input__input"
              onChange={(e) => setLevel(e.target.value)}
            />

            <div className="stat-result">
              <div>
                <div className="stat-title">HP : {Math.round(stat.hp)}</div>
                <div className="stat-result__bar">
                  <div
                    className="stat-result__power stat-result__power--hp"
                    style={{
                      width: `${(Math.round(stat.hp) * 100) / maxStat.hp}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="stat-title">
                  ATK : {Math.round(stat.attack)}
                </div>
                <div className="stat-result__bar">
                  <div
                    className="stat-result__power stat-result__power--atk"
                    style={{
                      width: `${
                        (Math.round(stat.attack) * 100) / maxStat.atk
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="stat-title">
                  DEF : {Math.round(stat.defense)}
                </div>
                <div
                  className="stat-result__bar"
                  data-stat={`${
                    (Math.round(stat.defense) * 100) / maxStat.def
                  }`}
                >
                  <div
                    className="stat-result__power stat-result__power--def"
                    style={{
                      width: `${
                        (Math.round(stat.defense) * 100) / maxStat.def
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="content-container info">
          <h3>Ascension costs </h3>
          <div>
            {characterInfo.costs &&
              Object.keys(characterInfo.costs).map((key, i) => {
                return (
                  <div key={key} className="info-container">
                    <div className="ascension-header">
                      <span>{key} </span>
                      <span>Level {ascensionStep[i]}</span>
                    </div>
                    <div>
                      {characterInfo.costs[key].map(
                        (material: inf.material) => {
                          return (
                            <div
                              key={`${key}${material.name}`}
                              className="content-block"
                            >
                              <span> {material.name}</span>
                              <span> {material.count}</span>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="other-info info">
          <h3>More Info</h3>
          <div className="flex-center">
            {characterInfo.images && characterInfo.images.sideicon && (
              <div className="other-info__img">
                <Image
                  width="100%"
                  height="100%"
                  layout="responsive"
                  objectFit="contain"
                  src={characterInfo.images.sideicon}
                  className="other-info__img"
                  alt="side-char"
                />
              </div>
            )}
          </div>
          <div className="info-container physical-info">
            <div className="content-block affiliation-info">
              <span>affiliation</span>
              <span>{characterInfo.affiliation}</span>
            </div>

            <div className="  content-block region-info">
              <span>region</span> <span>{characterInfo.region}</span>
            </div>

            <div className="  content-block body-info">
              <span>body</span> <span>{characterInfo.body}</span>
            </div>
            <div className="  content-block gender-info">
              <span>gender</span> <span>{characterInfo.gender}</span>
            </div>
          </div>
          <h3>Character Voice</h3>
          <div className="info-container voice-info">
            <div>
              {characterInfo.cv &&
                Object.keys(characterInfo.cv).map((key: string) => {
                  return (
                    <div key={`voice${key}`} className=" content-block ">
                      <span> {key}</span>
                      <span> {characterInfo.cv[key]}</span>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="info-container fandom-info">
            {characterInfo.url && (
              <h3>
                <a href={characterInfo.url.fandom}>Fandom </a>
              </h3>
            )}
          </div>
        </div>

        <div className="content-container info">
          <h3>Constellation</h3>
          {Object.keys(constellation).map((con, i) => {
            if (con !== "name" && con !== "images") {
              return (
                <div className="constellation__items" key={con}>
                  <div className="info-container">
                    <h4>
                      {con.toUpperCase()} - {constellation[con].name}
                    </h4>
                    <div className="content-block">
                      <img
                        src={constellation.images[con]}
                        alt={con}
                        className="constellation__icon"
                      />

                      <h4 className="constellation__effect">
                        {constellation[con].effect}
                      </h4>
                    </div>
                  </div>
                </div>
              );
            } else {
              return <React.Fragment key={`none${i}`}></React.Fragment>;
            }
          })}
        </div>

        <div className="content-container info talent-blog">
          <CombatTable combatType={combat1} />
        </div>

        <div className="content-container info talent-blog">
          <CombatTable combatType={combat2} />
        </div>
        <div className="content-container info talent-blog">
          <CombatTable combatType={combat3} />
        </div>

        <div className="content-container info">
          <h3>Passive</h3>

          <div className="content-blog">
            <div className="info-container">
              <h4>{passive.passive1.name}</h4>
              <p>{passive.passive1.info}</p>
            </div>

            <div className="info-container">
              <h4>{passive.passive2.name}</h4>
              <p>{passive.passive2.info}</p>
            </div>
            <div className="info-container">
              <h4>{passive.passive3.name}</h4>
              <p>{passive.passive3.info}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterInfo;
