import { useEffect, useState } from 'react';
import { 
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select
} from '@material-ui/core';
import './App.css';
import './Table.css';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import LineGraph from './LineGraph';
import numeral from "numeral";
import { sortData } from "./util";

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);


  useEffect(() => {
   fetch("https://disease.sh/v3/covid-19/all")
   .then(response => response.json())
   .then(data => {
     setCountryInfo(data);
   })
  }, [])

  useEffect(() => {
   //going to use `async` code because 
  // -> send a request to a server, wait for it, and do something with info
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country, //India, United State etc
            value: country.countryInfo.iso2 //IN, US, UK

          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
      });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url = 
    countryCode === "worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode)
        //all of the data... from country response
        setCountryInfo(data);
      });
  };

  // console.log("Country Info >>>", countryInfo); -> just to see what they are giving back all the data

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              onChange={onCountryChange}
              variant="outlined"
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>

              {/* Loop through all the countries
              and show a drop down list of the option */} 
              { countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
              
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          {/* all the three component gonna be same
          but it will take different props to process */}
          
          {/* InfoBoxes TITLE=coronavirus cases*/}
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          {/* InfoBoxes TITLE=coronavirus recovery*/}
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          {/* InfoBoxes TITLE=coronavirus death*/}
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>

        <Map />
      </div>

      <Card className="app__right">
          <CardContent>
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide new cases</h3>
            <LineGraph />
          </CardContent>
      </Card>

    </div>
  );
}

export default App;

// {/* SETTING UP MARKERS FOR THIS SITE | all these components i'm going to build for this app */}
// {/* Header */}
// {/* TITLE + SELECT INPUT DROPDOWN FIELD */}

// {/* InfoBoxes */}
// {/* InfoBoxes */}
// {/* InfoBoxes */}

// {/* Table */}
// {/* Graph */}

// {/* Map */}
