import { Suspense, lazy, useState, useEffect } from "react";
import { useLocation, Route, Routes } from "react-router-dom";
import * as ROUTES from "./Constants/routes";

const EmployeeList = lazy(() => import("./Pages/EmployeeList"));

function App() {
  return (
    <>
      {" "}
      <Suspense fallback={<h1>loader</h1>}>
        <Routes>
          <Route path={ROUTES.EMPLOYEELIST} element={<EmployeeList />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
