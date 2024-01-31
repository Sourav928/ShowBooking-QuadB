import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";

const API_URI = "https://api.tvmaze.com/shows";

const Container = styled(Box)`
  display: flex;
  margin: 20px;
  padding: 20px;
  background: #cbcbcb;
  border-radius: 8px;
`;

const Image = styled("img")`
  border: 1px solid #000;
`;

const ShowSummary = ({ match }) => {
  const [show, setShow] = useState({});
  const { id } = useParams();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${id}`);
  };
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

  return (
    <>
      <Container>
        {show.image && <Image src={show.image.medium} alt="image" />}
        <Box>
          <h1>{show.name}</h1>
          <div dangerouslySetInnerHTML={{ __html: show.summary }} />
          <Link to={`/book/${show.id}`}>
            <Button variant="contained" onClick={handleClick}>
              Book Now
            </Button>
          </Link>
        </Box>
      </Container>
    </>
  );
};

export default ShowSummary;
