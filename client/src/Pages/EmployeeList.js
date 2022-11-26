import React, { useState, useEffect, Component } from "react";
import styled from "styled-components";
import { getAllEmployee, deleteEmployee } from "../services/employee";
import Loader from "../Components/Loader.js";
import Employee from "../Components/Employee";
import View from "../Components/View";

const MainWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const Nav = styled.div`
  background-color: #302f2f;
`;
const Title = styled.p`
  color: white;
  margin: 0;
  font-size: 20px;
  padding: 10px 0px 10px 10px;
  @media (min-width: 320px) {
    padding: 10px 0px 10px 20px;
  }
`;
const Heading = styled.h1`
  text-align: center;
  color: #302f25;
`;

const Button = styled.button`
  color: white;
  background-color: #2c74e0;
  font-size: 16px;
  border: 0;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const Div = styled.div`
  overflow-x: auto;
  margin-top: 20px;
`;
const MainTable = styled.table`
  max-width: 900px;
  margin: 0 auto;
  border: 1px solid black;
  border-collapse: collapse;
`;

const TableHeader = styled.td`
  border: 1px solid black;
  /* border-bottom: 1px solid black; */
  /* text-align: center; */
  /* width: 160px; */
  height: 48px;
  font-size: 16px;
  padding-left: 15px;
  font-weight: 900;
  min-width: ${({ divwidth }) => {
    if (divwidth === "FirstName") return "250px";
    else if (divwidth === "LastName") return "250px";
    else if (divwidth === "Email") return "225px";
    else if (divwidth === "Actions") return "300px";
  }};
`;

const TableData = styled.td`
  border: 1px solid black;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  /* text-align: center; */
  max-width: 280px;
  padding-left: 15px;
  color: #747980;
`;

const Action = styled.button`
  border: 0;
  padding: 10px;
  color: white;
  background-color: ${(props) => (props.delete ? "red" : "#0BBAC6")};
  margin-right: 15px;
  border-radius: 5px;
  cursor: pointer;
`;

const Tr = styled.tr`
&.even{
background-color: #E9EDED;
}
`;

const EmployeeList = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [value, setValue] = useState(false);
  const [data, setData] = useState({});
  const [view, setView] = useState(false);
  const [empId, setEmpId] = useState();
  useEffect(() => {
    setLoading(true);
    setValue(false);
    getAllEmployee()
      .then((result) => {
        setResponse(result.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [value, trigger]);

  const deleteEmp = (id) => {
    deleteEmployee(id)
      .then((result) => {
        setValue(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {loading && <Loader />}
      <Nav>
        <Title>Employee Management Web App</Title>
      </Nav>
      <MainWrapper>
        <Heading>Employees List</Heading>
        <Button
          onClick={() => {
            setTrigger(true);
          }}
        >
          Add Employee
        </Button>
        <Div>
          {response && (
            <MainTable>
              <tbody>
                <tr>
                  <TableHeader divwidth="FirstName">
                    Employee First Name
                  </TableHeader>
                  <TableHeader divwidth="LastName">
                    Employee Last Name
                  </TableHeader>
                  <TableHeader divwidth="Email">Employee Email Id</TableHeader>
                  <TableHeader divwidth="Actions">Actions</TableHeader>
                </tr>
                {response.map((data, index) => (
                  <Tr key={index} className={index % 2 == 0 ? "even" : "odd"}>
                    <TableData>{data.firstName}</TableData>
                    <TableData>{data.lastName}</TableData>
                    <TableData>{data.email}</TableData>
                    <TableData>
                      <Action
                        onClick={() => {
                          setTrigger(true);
                          setData(data);
                        }}
                      >
                        Update
                      </Action>
                      <Action delete onClick={() => deleteEmp(data.empId)}>
                        Delete
                      </Action>
                      <Action
                        onClick={() => {
                          setView(true);
                          setEmpId(data.empId);
                        }}
                      >
                        View
                      </Action>
                    </TableData>
                  </Tr>
                ))}
              </tbody>
            </MainTable>
          )}
        </Div>
        {trigger && (
          <Employee
            dataEmp={data}
            setTrigger={setTrigger}
            setDataEmp={setData}
          />
        )}
        {view && <View setView={setView} empId={empId} />}
      </MainWrapper>
    </>
  );
};

export default EmployeeList;
