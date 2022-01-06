import React from "react";
import { combat } from "../interface/character-interface";

type CombatTableType = {
  combatType: combat;
};

const CombatTable = ({ combatType }: CombatTableType) => {
  return (
    <>
      <h3>{combatType.name}</h3>
      <p>{combatType.info}</p>
      <table className="talent-table">
        <thead>
          <tr>
            <td></td>
            {Array.from(Array(15), (e, i) => {
              return <td key={`${combatType.name}level${i}`}>lv{i + 1}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {combatType.attributes.labels.map((combat, i) => {
            let current = combat.slice(
              combat.indexOf("param"),
              combat.indexOf(":")
            );

            return (
              <tr key={`${combatType.name}${current}${i}`}>
                <td>{combat.slice(0, combat.indexOf("|"))}</td>
                {combatType.attributes.parameters[current] &&
                  combatType.attributes.parameters[current].map(
                    (result: number, j: number) => {
                      return (
                        <td key={`${combatType.name}${current}result${j}`}>
                          {result % 1 === 0
                            ? result
                            : (result * 100).toFixed(2) + "%"}
                        </td>
                      );
                    }
                  )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default CombatTable;
