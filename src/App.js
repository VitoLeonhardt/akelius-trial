import React, { useState } from 'react';
import { Input, Button, Dropdown, Radio } from "semantic-ui-react";
import logo from './logo.svg';
import './App.css';
import { DateInput } from 'semantic-ui-calendar-react';
import moment from "moment";

const countryOptions = [
  {
    key: 'Germany',
    text: 'Germany',
    value: 'Germany'
  },
  {
    key: 'Poland',
    text: 'Poland',
    value: 'Poland'
  },
  {
    key: 'UK',
    text: 'UK',
    value: 'UK'
  }
];

const nationalityOptions = [
  {
    key: 'German',
    text: 'German',
    value: 'German'
  },
  {
    key: 'Polish',
    text: 'Polish',
    value: 'Polish'
  },
  {
    key: 'English',
    text: 'English',
    value: 'English'
  }
];

function App() {
  const [name, setName] = useState(undefined);
  const [surname, setSurname] = useState(undefined);
  const [passport, setPassport] = useState(undefined);
  const [country, setCountry] = useState(undefined);
  const [gender, setGender] = useState(undefined);
  const [nationality, setNationality] = useState(undefined);
  const [dateOfBirth, setDateOfBirth] = useState(undefined);
  const [passExpirationDate, setPassExpirationDate] = useState(undefined);
  const [submittedData, submitData] = useState(undefined);

  const isValidName = (str) => {
    return str && str.length > 0 && str[0] === str[0].toUpperCase();
  }

  const isValueSpecified = (val) => {
    return !!val;
  }

  const isPassNumberValid = (passNumber) => {
    return isValueSpecified(passNumber) && /^(\d|C|F|G|H|J|K|L|M|P|R|T|V|W|X|Y|Z){9}$/.test(passNumber);
  }

  const isDoBValid = (date) => {
    if(!moment(date).isValid()) return false;
    const eighteenYearsAgo = moment().subtract(18, "years");
    const hundredYearsAgo = moment().subtract(100, "years");
    return moment(date).isBetween(hundredYearsAgo, eighteenYearsAgo);
  }

  const isPassExpDateValid = (date) => {
    return isDoBValid(dateOfBirth) && moment(date).isAfter(dateOfBirth) && moment().isBefore(date);
  };

  const isFormValid = () => {
    return isValidName(name) && isValidName(surname) && isPassNumberValid(passport) 
    && isValueSpecified(country) && isValueSpecified(gender) && isValueSpecified(nationality)
    && isDoBValid(dateOfBirth) && isPassExpDateValid(passExpirationDate);
  }

  const submit = () => {
    submitData({
      name,
      surname,
      passport,
      country,
      gender,
      nationality,
      dateOfBirth,
      passExpirationDate
    })
  }

  if(submittedData) {
    return (<div>
      {Object.keys(submittedData).map(key => <div key={key}><span className="key">{key}: </span><span>{submittedData[key]}</span></div>)}
    </div>)
  }
  return (
    <div className="basicForm">
      <Input placeholder="Name" value={name} onChange={(_, { value }) => setName(value)}/>
      <Input placeholder="Surname" value={surname} onChange={(_, { value }) => setSurname(value)}/>
      <Input placeholder="eg. 234234" value={passport} onChange={(_, { value }) => setPassport(value)}/>
      <Dropdown placeholder="Issuer" value={country} selection options={countryOptions} onChange={(_, { value }) => setCountry(value)}/>
      <Radio label="Male" checked={gender === "M"} onClick={() => setGender("M")}/>
      <Radio label="Female" checked={gender === "F"} onClick={() => setGender("F")}/>
      <Radio label="Not specified" checked={gender === "N"} onClick={() => setGender("N")}/>
      <Dropdown placeholder="Nationality" value={nationality} selection options={nationalityOptions} onChange={(_, { value }) => setNationality(value)}/>
      <DateInput dateFormat="YYYY-MM-DD" value={dateOfBirth} onChange={(_, { value }) => setDateOfBirth(value)} placeholder="Date of Birth"/>
      <DateInput dateFormat="YYYY-MM-DD" value={passExpirationDate} onChange={(_, { value }) => setPassExpirationDate(value)} placeholder="Passport expiration date"/>
      <Button disabled={!isFormValid()} onClick={() => submit()}>Submit</Button>
    </div>
  );
}

export default App;
