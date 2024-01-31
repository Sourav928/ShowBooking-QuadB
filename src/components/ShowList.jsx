import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, styled, Box } from "@mui/material";
import { Link } from "react-router-dom";

const API_URI = "https://api.tvmaze.com/search/shows?q=all";

const Container = styled("ul")`
  width: 90%;
  background-color: #484848;
  display: flex;
  list-style-type: none;
  align-items: center;
  border-radius: 8px;
  margin: 5px;
  padding: 0px;
`;

const Image = styled("img")`
  margin: 5px;
  padding: 5px;
`;

const Styledcontainer = styled(Box)`
  display: flex;
  list-style-type: none;
  align-items: center;
`;

const EmptyImageBox = styled("div")`
  width: 150px;
  height: 200px;
  margin: 20px;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ccc;
`;

const ShowsList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get(API_URI);
        if (response.data) {
          setShows(response.data);
        }
      } catch (error) {
        console.error("Error fetching shows:", error);
      }
    };
    fetchShows();
  }, []);

  return (
    <>
      <div>
        <h1>List of Shows</h1>
        <div>
          <ul
            style={{
              listStyleType: "none",
              margin: "0 auto",
              width: "90%",
            }}
          >
            {shows.map((show) => (
              <li key={show.show.id}>
                <Container>
                  <Box>
                    {show.show.image ? (
                      <Image src={show.show.image.medium} alt="Poster" />
                    ) : (
                      <EmptyImageBox>
                        <span>Poster</span>
                      </EmptyImageBox>
                    )}
                  </Box>
                  <Box
                    style={{
                      width: "80%",
                      margin: "20px",
                      background: " #cbcbcb",
                      padding: "20px",
                      borderRadius: "8px",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h1>{show.show.name}</h1>
                      <Link to={`/summary/${show.show.id}`}>
                        <Button variant="contained">Know More</Button>
                      </Link>
                    </Box>

                    <Styledcontainer>
                      <p>
                        <h4 style={{ display: "inline" }}>Type:</h4>{" "}
                        {show.show.type}
                      </p>
                      <h4 style={{ display: "inline" }}>Genre: </h4>
                      {"  "}
                      {show.show.genres.map((genre) => (
                        <li> {genre}, </li>
                      ))}
                    </Styledcontainer>
                    <Styledcontainer>
                      <p>
                        <h4 style={{ display: "inline" }}>Status:</h4>{" "}
                        {show.show.status}
                      </p>
                      <p>
                        <h4 style={{ display: "inline" }}>Language:</h4>{" "}
                        {show.show.language}
                      </p>
                    </Styledcontainer>
                    <Styledcontainer
                      style={{ justifyContent: "space-between" }}
                    >
                      <p>
                        <h4 style={{ display: "inline" }}>Premiered:</h4>{" "}
                        {show.show.premiered}
                      </p>
                      <span>
                        <h4 style={{ display: "inline" }}>Rating:</h4>{" "}
                        {show.show.rating && show.show.rating.average
                          ? show.show.rating.average
                          : "NA"}
                      </span>
                    </Styledcontainer>
                  </Box>
                </Container>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ShowsList;
