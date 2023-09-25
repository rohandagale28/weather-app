import React, { useEffect, useState } from "react";
import "./App.css";
import AirIcon from "@mui/icons-material/Air";
import WavesIcon from "@mui/icons-material/Waves";
import axios from "axios";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import { time, currDay } from "./components/TimeAndData.tsx";
import LanguageIcon from "@mui/icons-material/Language";

const App = () => {
  const [data, setData] = useState<any>({});
  const [curr, setCurr] = useState<any>({});
  const [long, setLong] = useState<any>();
  const [city, setCity] = useState<string>("");
  // const [air, setAir] = useState<any>({});
  console.log(curr, "this data is called first");
  console.log(long, "this data is called first");

  const Location = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurr(position.coords.latitude)
        setLong(position.coords.longitude)
      });
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${curr}&lon=${long}&appid=04643d0d1d1a8acd4e6df8127487e725`
        )
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      getData();
    }
  };

  console.log(data);

  const getData = async () => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=04643d0d1d1a8acd4e6df8127487e725`
      )
      .then((res) => {
        setData(res.data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  function handleChange(e: any) {
    setCity(e.target.value);
  }

  function fetchData(e: any) {
    e.preventDefault();
    getData();
  }
  // Location()
  useEffect(() => {
    console.log("component re-rendered")
    setCurr(null)
    setLong(null)
    Location();
  }, []);
  return (
    <>
      <div style={{ position: "absolute", top: 18, left: 18 }}>Air Quality</div>
      <div
        style={{
          position: "absolute",
          top: 18,
          right: 18,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div style={{ padding: "0rem .5rem" }}>
          <LanguageIcon fontSize="small" />
        </div>
        <div>{data?.sys?.country}</div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          gap: 30,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            height: "2.6rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#262626",
            borderRadius: ".5rem",
            boxSizing: "border-box",
          }}
        >
          <form onSubmit={fetchData}>
            <input
              type="text"
              id="city"
              value={city}
              onChange={handleChange}
              placeholder={`Search City`}
              style={{
                width: "14rem",
                height: "2rem",
                borderRadius: ".5rem",
                margin: ".5rem",
                paddingLeft: "0.8rem",
                border: "none",
                outline: "none",
                backgroundColor: "#262626",
                color: "#EDEDED",
              }}
            />
            <IconButton sx={{ paddingRight: "1rem" }} onClick={fetchData}>
              <SearchIcon sx={{ color: "#e5e5e599" }} />
            </IconButton>
          </form>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <div>
              <LocationOnSharpIcon />
            </div>
            <div style={{ fontSize: "1.6rem" }}>{data?.name}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 70,
            }}
          >
            <div>
              {currDay} {time.getDate()}
            </div>
            <div>
              {time.getHours()}:{time.getMinutes()}{" "}
              {time.getHours() >= 12 ? <>PM</> : <>AM</>}
            </div>
          </div>
        </div>
        <div style={{ fontSize: "5rem" }}>
          {(data?.main?.temp - 275.15).toFixed(2)}&deg;
        </div>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 60,
            }}
          >
            <div>{data?.weather?.map((a: any) => a.main)}</div>
            <div>
              Feels Like {(data?.main?.feels_like - 275.15).toFixed(2)}&deg;
            </div>
          </div>
        </div>
        <div
          style={{
            height: "4.25rem",
            width: "22rem",
            backgroundColor: "#69696934",
            borderRadius: "4rem",
            boxSizing: "border-box",
            padding: ".5rem 2rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 1,
              alignItems: "center",
            }}
          >
            <AirIcon sx={{ height: "1.2rem", width: "1.2rem" }} />
            <p style={{ fontSize: ".8rem", fontWeight: "600" }}>
              {data?.wind?.speed}km/hr
            </p>
            <p style={{ fontSize: ".750rem", color: "#696969" }}>Windspeed</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 1,
              alignItems: "center",
            }}
          >
            <WavesIcon sx={{ height: "1.2rem", width: "1.2rem" }} />
            <p style={{ fontSize: ".9rem", fontWeight: "600" }}>
              {data?.main?.humidity}%
            </p>
            <p style={{ fontSize: ".750rem", color: "#696969" }}>Humidity</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 1,
              alignItems: "center",
            }}
          >
            <img
              src="https://s3-alpha-sig.figma.com/img/a9da/5f30/fda4169cea7b2cc7cf4eca9f0798c7f5?Expires=1691971200&Signature=V44SDq4NG92GeZh0tFyLNOd3ax6W2p8bHwEOqAFn3~CaEcEcYGKuVtQTBQai-KULJn2gXNzP6m4GzHiGDjEdPSH2V73MWrmec6GhfP1A2tL2IgUqJRkUz7bn5f9EjbCqJRiImXtnyZT3C-YZVRrTCDe3oFyq~hs-A45TfRDgIiUJRbeXgmvXI5Slw5HmmZxZ7KgoV7PgclY8aQhuEjY3DiT1q6yqbZeOaDn2T6e09mvr8JOzyesrsRQlw5IVN~QCa2p9JUA~1ORN~oiGpL9SPVTHNKeViehhd1A29Fn753ryN6HeNLKvYHA2b1TuWZozkJhR585LB1Jx-NrZmhmCnA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              style={{ height: "1.2rem", width: "1.2rem" }}
            />
            <p style={{ fontSize: ".9rem", fontWeight: "600" }}>20%</p>
            <p style={{ fontSize: ".750rem", color: "#696969" }}>
              Precipitation
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
