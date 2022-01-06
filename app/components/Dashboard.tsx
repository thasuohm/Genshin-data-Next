import React, { useCallback, useEffect, useState } from "react";
import * as itf from "../interface/character-interface";
import sword from "../../public/images/weapon-type/icon-sword.png";
import bow from "../../public/images/weapon-type/icon-bow.png";
import claymore from "../../public/images/weapon-type/icon-claymore.png";
import polearm from "../../public/images/weapon-type/icon-polearm.png";
import catalyst from "../../public/images/weapon-type/icon-catalyst.png";
import anemo from "../../public/images/elements/anemo.png";
import Image from "next/image";

const Dashboard = () => {
  const [allChar, setAllChar] = useState<Array<itf.characterInfo>>([]);
  const weapons: itf.weapon = {
    sword: sword,
    bow: bow,
    claymore: claymore,
    polearm: polearm,
    catalyst: catalyst,
  };

  const elements: itf.elements = {
    cryo: {
      url: "https://static.wikia.nocookie.net/gensin-impact/images/8/88/Element_Cryo.png",
      color: "#62bdb7",
    },
    pyro: {
      url: "https://static.wikia.nocookie.net/gensin-impact/images/e/e8/Element_Pyro.png",
      color: "#f98148",
    },
    hydro: {
      url: "https://static.wikia.nocookie.net/gensin-impact/images/3/35/Element_Hydro.png",
      color: "#0fcce1",
    },
    electro: {
      url: "https://static.wikia.nocookie.net/gensin-impact/images/7/73/Element_Electro.png",
      color: "#ad50bd",
    },
    anemo: {
      url: "https://static.wikia.nocookie.net/gensin-impact/images/a/a4/Element_Anemo.png",
      color: "#04dabf",
    },
    geo: {
      url: "https://static.wikia.nocookie.net/gensin-impact/images/4/4a/Element_Geo.png",
      color: "#efb233",
    },
    dendro: {
      url: "https://static.wikia.nocookie.net/gensin-impact/images/f/f4/Element_Dendro.png",
      color: "#02b27e",
    },
    none: { url: anemo, color: "#fff" },
  };
  const [elementFilter, setElementFilter] = useState<Array<string>>([]);
  const [weaponFilter, setWeaponFilter] = useState<Array<string>>([]);

  const presetCharacter = () => {
    const town: Array<string> = ["monstadt", "liyue", "inazuma"];
    const genshindb = require("genshin-db");
    setAllChar([]);

    for (let i = 0; i < town.length; i++) {
      for (
        let j = 0;
        j < genshindb.characters(town[i], { matchCategories: true }).length;
        j++
      ) {
        setAllChar((char) => [
          ...char,
          genshindb.characters(
            genshindb.characters(town[i], { matchCategories: true })[j]
          ),
        ]);
      }
    }
  };

  useEffect(() => {
    presetCharacter();
    return () => {
      setAllChar([]);
    };
  }, []);

  const selectElement = (element: string) => {
    if (elementFilter.indexOf(element) === -1) {
      setElementFilter((ele) => [...ele, element]);
      return;
    } else {
      setElementFilter(elementFilter.filter((elem) => elem !== element));
      if (weaponFilter.length === 0 && elementFilter.length === 1) {
        presetCharacter();
      }
    }
  };

  const selectWeapon = (weapon: string) => {
    if (weaponFilter.indexOf(weapon) === -1) {
      setWeaponFilter((wea) => [...wea, weapon]);
      return;
    } else {
      setWeaponFilter(weaponFilter.filter((wea) => wea !== weapon));
      if (weaponFilter.length === 1 && elementFilter.length === 0) {
        presetCharacter();
      }
    }
  };

  const filterWeapon = useCallback(() => {
    const genshindb = require("genshin-db");
    for (let i = 0; i < weaponFilter.length; i++) {
      for (
        let j = 0;
        j <
        genshindb.characters(weaponFilter[i], { matchCategories: true }).length;
        j++
      ) {
        setAllChar((char) => [
          ...char,
          genshindb.characters(
            genshindb.characters(weaponFilter[i], {
              matchCategories: true,
            })[j]
          ),
        ]);
      }
    }
  }, [weaponFilter]);

  const filterElementandWeapon = useCallback(() => {
    const genshindb = require("genshin-db");
    for (let i = 0; i < elementFilter.length; i++) {
      for (
        let j = 0;
        j <
        genshindb.characters(elementFilter[i], { matchCategories: true })
          .length;
        j++
      ) {
        if (weaponFilter.length > 0) {
          if (
            weaponFilter.indexOf(
              genshindb
                .characters(
                  genshindb.characters(elementFilter[i], {
                    matchCategories: true,
                  })[j]
                )
                .weapontype.toLowerCase()
            ) !== -1
          ) {
            setAllChar((char) => [
              ...char,
              genshindb.characters(
                genshindb.characters(elementFilter[i], {
                  matchCategories: true,
                })[j]
              ),
            ]);
          }
        } else {
          setAllChar((char) => [
            ...char,
            genshindb.characters(
              genshindb.characters(elementFilter[i], {
                matchCategories: true,
              })[j]
            ),
          ]);
        }
      }
    }
  }, [weaponFilter, elementFilter]);

  useEffect(() => {
    if (weaponFilter.length > 0 || elementFilter.length > 0) {
      setAllChar([]);
      if (elementFilter.length > 0) {
        filterElementandWeapon();
      }

      if (weaponFilter.length > 0 && elementFilter.length === 0) {
        filterWeapon();
      }
    }
  }, [elementFilter, weaponFilter, filterWeapon, filterElementandWeapon]);

  return (
    <div className="container">
      <section className="dashboard-filter">
        <div className="filter__element">
          {Object.keys(elements).map((element) => {
            return (
              <label key={element} data-info={element} className="filter__item">
                <input
                  id={element}
                  title="element"
                  type="checkbox"
                  value={element}
                  className="filter__input"
                  onChange={(e) => selectElement(e.target.value)}
                />

                <div className="filter__icon">
                  <Image
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="contain"
                    src={elements[element].url}
                    alt={element}
                  />
                </div>
              </label>
            );
          })}
        </div>
        <div className="filter__weapon">
          {Object.keys(weapons).map((weapon) => {
            return (
              <label key={weapon} data-info={weapon} className="filter__item">
                <input
                  id={weapon}
                  type="checkbox"
                  value={weapon}
                  className="filter__input"
                  onChange={(e) => selectWeapon(e.target.value)}
                />
                <div className="filter__icon">
                  <Image
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="contain"
                    src={weapons[weapon]}
                    alt={weapon}
                  />
                </div>
              </label>
            );
          })}
        </div>
      </section>

      <div className="character-card__container">
        {allChar.map((char) => {
          return (
            <a
              href={`character/${char.name}`}
              key={`${char.name}card`}
              className="character-card"
            >
              <div className="character-card__char-image">
                <Image
                  width="100%"
                  height="100%"
                  layout="responsive"
                  objectFit="contain"
                  src={char.images.icon}
                  alt={`preview${char.name}`}
                />
              </div>
              <div className="character-card__content">
                <h3>{char.name}</h3>
                <div className="character-card__image">
                  <div className="character-card__weapon">
                    <Image
                      width="100%"
                      height="100%"
                      layout="responsive"
                      objectFit="contain"
                      src={weapons[char.weapontype.toLowerCase()]}
                      alt={`${char.name}weapon`}
                    />
                  </div>
                  <div className="character-card__element">
                    <Image
                      width="100%"
                      height="100%"
                      layout="responsive"
                      objectFit="contain"
                      src={elements[char.element.toLowerCase()].url}
                      alt={`${char.name}element`}
                    />
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
