import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Head = styled("h1")`
  background: #7c7c7c;
  border-radius: 8px;
  width: 60%;
  margin: 0 auto;
`;
const Container = styled(Box)`
  width: 60%;
  margin: 0 auto;
  margin-top: 64px;
  background: #7c7c7c;
  border-radius: 8px;
  height: 70vh;
`;

const StyledContainer = styled(Box)`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  margin: 20px;
`;

const StyledBox = styled(Box)`
  font-size: 20px;
`;

const Image = styled("img")`
  border: 1px solid #000;
`;

const API_URI = "https://api.tvmaze.com/shows";

const Book = () => {
  const [show, setShow] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URI}/${id}`);
        if (response.data) {
          setShow(response.data);
        }
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    };
    fetchData();
  }, [id]);

  // State variables to manage form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [confirmation, setConfirmation] = useState("");
  const [numSeats, setNumSeats] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();

    setConfirmation(
      `Booking confirmed for seat(s) ${numSeats} under name ${name}. Check your email at ${email}.`
    );
  };

  const incrementSeats = () => {
    setNumSeats(numSeats + 1);
  };

  const decrementSeats = () => {
    if (numSeats > 1) {
      setNumSeats(numSeats - 1);
    }
  };

  return (
    <>
      <div style={{ marginTop: "64px" }}>
        <Head>Show Ticket Booking</Head>
        <Container>
          <StyledContainer>
            <Box>
              {show.image && <Image src={show.image.medium} alt="image" />}
            </Box>
            <StyledBox>
              <form>
                <label htmlFor="showName">Show name: {show.name}</label>
                <br />
                <label htmlFor="lang">Language: {show.language}</label>
                <br />
                <label htmlFor="premiered">Premiered: {show.premiered}</label>
                <br />
                <label htmlFor="lastShow">Last Show: {show.ended}</label>
                <br />
                <label htmlFor="time">
                  Time: {show.schedule && show.schedule.time}
                </label>
                <br />
                <label htmlFor="Day">
                  Day: {show.schedule && show.schedule.days}
                </label>
                <br />
                <label htmlFor="Duration">Duration: {show.runtime}</label>

                <form>
                  <label>
                    Name:
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </label>
                  <br />
                  <label>
                    Email:
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </label>
                  <br />

                  <label>
                    Number of Seats:
                    <button type="button" onClick={decrementSeats}>
                      -
                    </button>
                    {numSeats}
                    <button type="button" onClick={incrementSeats}>
                      +
                    </button>
                  </label>
                  <br />
                  <Button variant="contained" onClick={handleSubmit}>
                    Book Ticket
                  </Button>
                </form>
                {confirmation && <div>{confirmation}</div>}
              </form>
            </StyledBox>
          </StyledContainer>
        </Container>
      </div>
    </>
  );
};

export default Book;
