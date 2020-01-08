import React, { useState } from 'react';
import { Input, Button, Dropdown, Radio } from "semantic-ui-react";
import logo from './logo.svg';
import './App.css';
import { DateInput } from 'semantic-ui-calendar-react';

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
  const [country, setCountry] = useState(undefined);
  const [gender, setGender] = useState(undefined);
  const [nationality, setNationality] = useState(undefined);
  const [dateOfBirth, setDateOfBirth] = useState(undefined);
  const [passExpirationDate, setPassExpirationDate] = useState(undefined);
  return (
    <div>
      <Input placeholder="Name"/>
      <Input placeholder="Surname"/>
      <Input placeholder="eg. 234234"/>
      <Dropdown value={country} selection options={countryOptions} onChange={(_, { value }) => setCountry(value)}/>
      <Radio label="Male" checked={gender === "M"} onClick={() => setGender("M")}/>
      <Radio label="Female" checked={gender === "F"} onClick={() => setGender("F")}/>
      <Radio label="Not specified" checked={gender === "N"} onClick={() => setGender("N")}/>
      <Dropdown value={nationality} selection options={nationalityOptions} onChange={(_, { value }) => setNationality(value)}/>
      <DateInput value={dateOfBirth} onChange={(_, { value }) => setDateOfBirth(value)} placeholder="Date of Birth"/>
      <DateInput value={passExpirationDate} onChange={(_, { value }) => setPassExpirationDate(value)} placeholder="Passport expiration date"/>
    </div>
  );
}

export default App;
