import React, { useState, useEffect, Component } from "react";
import styled from "styled-components";
import { createEmployee, updateEmployee } from "../services/employee";

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
  color: white;
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

const Employee = ({ dataEmp, setTrigger, setDataEmp }) => {
  const [data, setData] = useState(
    dataEmp
      ? {
          firstName: dataEmp.firstName,
          lastName: dataEmp.lastName,
          email: dataEmp.email,
          contact: dataEmp.contact,
        }
      : { firstName: "", lastName: "", email: "", contact: "" }
  );
  const handleChange = (name) => (e) => {
    setData({ ...data, [name]: e.target.value });
  };
  const add = () => {
    const validate = (url) => {
      let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return pattern.test(url);
    };

    if (!data.firstName) {
      return null;
    } else if (!data.lastName) {
      return null;
    } else if (!validate(data.email)) {
      return null;
    } else if (data.contact.length !== 10) {
      return null;
    }

    createEmployee(data)
      .then((result) => {
        setTrigger(false);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const update = () => {

    const validate = (url) => {
      let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return pattern.test(url);
    };

    if (!data.firstName) {
      return null;
    } else if (!data.lastName) {
      return null;
    } else if (!validate(data.email)) {
      return null;
    } 

    updateEmployee(data, dataEmp.empId)
      .then((result) => {
        setTrigger(false);
        console.log(result);
        setDataEmp({});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal>
        <PopupDiv>
          <Heading>
            {dataEmp && dataEmp.firstName ? "Update" : "Add"} Employee Detail
          </Heading>
          <Form>
            <Flex>
              <div>
                <Label>First Name</Label>
                <Input
                  onChange={handleChange("firstName")}
                  placeholder="Enter employee's first name"
                  value={data.firstName}
                />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input
                  onChange={handleChange("lastName")}
                  placeholder="Enter employee's last name"
                  value={data.lastName}
                />
              </div>
            </Flex>
            <Flex>
              <div>
                <Label>Email Id</Label>
                <Input
                  onChange={handleChange("email")}
                  placeholder="Enter employee's email id"
                  value={data.email}
                />
              </div>
              <div>
                <Label>Contact Number</Label>
                <Input
                  onChange={handleChange("contact")}
                  placeholder="Enter employee's contact"
                  value={data.contact}
                />
              </div>
            </Flex>
          </Form>

          <FlexDiv>
            <CancelButton
              onClick={() => {
                setTrigger(false);
                setDataEmp({});
              }}
            >
              Cancel
            </CancelButton>
            <AddButton
              onClick={() => {
                dataEmp && dataEmp.firstName ? update() : add();
              }}
            >
              {dataEmp && dataEmp.firstName ? "Update" : "Add"}
            </AddButton>
          </FlexDiv>
        </PopupDiv>
      </Modal>
    </>
  );
};

export default Employee;
