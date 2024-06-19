const { promises: fs } = require('fs');
const readme = require('./readme');

const msInOneDay = 1000 * 60 * 60 * 24;

const today = new Date();

function generateNewREADME() {
  const readmeRow = readme.split('\n');

  function updateIdentifier(identifier, replaceText) {
    const identifierIndex = findIdentifierIndex(readmeRow, identifier);
    if (!readmeRow[identifierIndex]) return;
    readmeRow[identifierIndex] = readmeRow[identifierIndex].replace(
      `<#${identifier}>`,
      replaceText
    );
  }

  const identifierToUpdate = {
    variable_duree: getCodingDuration(),
    variable_age: getCurrentAge(),
    mood: getMood(),
  };

  Object.entries(identifierToUpdate).forEach(([key, value]) => {
    updateIdentifier(key, value);
  });

  return readmeRow.join('\n');
}

function getCodingDuration() {
  const startCodingDate = new Date('2022-01-01');
  const diffInMs = today - startCodingDate;
  const diffInDays = Math.floor(diffInMs / msInOneDay);
  return `${diffInDays} jours`;
}

function getCurrentAge() {
  const birthDate = new Date('1993-07-20');
  const ageInMs = today - birthDate;
  const ageDate = new Date(ageInMs);
  return `${Math.abs(ageDate.getUTCFullYear() - 1970)} ans`;
}

function getMood() {
  return "joviaaaaale";
}

const findIdentifierIndex = (rows, identifier) =>
  rows.findIndex((r) => Boolean(r.match(new RegExp(`<#${identifier}>`, 'i'))));

const updateREADMEFile = (text) => fs.writeFile('./README.md', text);

function main() {
  const newREADME = generateNewREADME();
  console.log(newREADME);
  updateREADMEFile(newREADME);
}
main();
