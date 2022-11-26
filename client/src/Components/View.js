import React, { useState, useEffect, Component } from "react";
import styled from "styled-components";
import { singleEmployee } from "../services/employee";

const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #00000094;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 11;
`;

const PopupDiv = styled.div`
  z-index: 10;
  position: fixed;
  /* width: 100%; */
  max-width: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  background-color: #2c74e0;
  border-radius: 20px;
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Heading = styled.h1`
  margin-bottom: 30px;
  margin-top: 0;
  color: black;
  font-size: 20px;
`;

const CancelButton = styled.button`
  cursor: pointer;
  font-size: 12.8px;
  border: none;
  background-color: red;
  padding: 8px 24px;
  border-radius: 8px;
  margin-right: 10px;
`;

const AddButton = styled.button`
  cursor: pointer;
  font-size: 12.8px;
  background: #ff9f0f;
  border: none;
  border-radius: 8px;
  color: #fff;
  padding: 8px 24px;
`;

const Label = styled.label`
  color: white;
  font-weight: 600;
  padding: 10px 0 7px 0;
`;

const Input = styled.input`
  height: 50px;
  box-sizing: border-box;
  border-radius: 10px;
  font-size: 16px;
  padding-left: 10px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Group = styled.div`
  margin-bottom: 15px;
`;
const View = ({ setView, empId }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    singleEmployee(empId)
      .then((result) => {
        setData(result.data.data);
      })
      .catch((err) => {});
  }, []);
  return (
    <>
      <Modal>
        <PopupDiv>
          <Heading>Employee Detail</Heading>
          <Form>
            <Group>
              <Label>First Name: {data.firstName} </Label>
            </Group>
            <Group>
              <Label>Last Name: {data.lastName}</Label>
            </Group>

            <Group>
              <Label>Email Id: {data.email}</Label>
            </Group>
            <Group>
              <Label>Contact Number: {data.contact}</Label>
            </Group>
          </Form>

          <FlexDiv>
            <CancelButton
              onClick={() => {
                setView(false);
              }}
            >
              Cancel
            </CancelButton>
          </FlexDiv>
        </PopupDiv>
      </Modal>
    </>
  );
};

export default View;
