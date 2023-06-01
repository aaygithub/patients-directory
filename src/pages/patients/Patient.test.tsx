import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import * as rrd from "react-router-dom";
import { IPatient } from "../../common/interfaces";
import { PatientDataContext } from "../../context/patientDataContext";
import { PatientDetails } from "./Patient";

const Component = () => {
  const [patientData, setPatientData] = React.useState<IPatient | undefined>({
    patient_id: 1,
    first_name: "a",
    last_name: "b",
    email: "",
    gender: "Male",
    age: 1,
    avatar: "",
  });

  const mockPatientList = [
    {
      patient_id: 1,
      first_name: "Gloriane",
      last_name: "Skittles",
      email: "gskittles0@google.ca",
      gender: "Male",
      age: 58,
      avatar: "http://dummyimage.com/146x100.png/5fa2dd/ffffff",
    },
    {
      patient_id: 2,
      first_name: "Lydon",
      last_name: "Dymock",
      email: "ldymock1@techcrunch.com",
      gender: "Female",
      age: 64,
      avatar: "http://dummyimage.com/221x100.png/ff4444/ffffff",
    },
  ];

  return (
    <PatientDataContext.Provider
      value={{
        patientData,
        patientsListLoading: false,
        updatePatientsList: () => {},
        updatePatientData: (patientData) => {
          setPatientData(patientData);
        },
        patientsList: mockPatientList as IPatient[],
      }}
    >
      <PatientDetails />
    </PatientDataContext.Provider>
  );
};

jest.mock("react-router-dom");
const mockedOutletContext = rrd as jest.Mocked<typeof rrd>;

describe("Patient component", () => {
  beforeEach(() => {
    const outletContext: rrd.OutletProps = { context: { id: 1 } };
    mockedOutletContext.useOutletContext.mockReturnValue(outletContext.context);
  });

  afterEach(() => {
    mockedOutletContext.Outlet.mockReset();
    cleanup();
  });

  it("should render correctly", () => {
    render(<Component />);

    expect(screen.getByTestId("patient-details-wrapper")).toBeInTheDocument();
  });

  it("should render correct details of the patient", () => {
    render(<Component />);

    expect(screen.getByTestId("first-name").textContent).toBe("Gloriane");
    expect(screen.getByTestId("last-name").textContent).toBe("Skittles");
    expect(screen.getByTestId("email").textContent).toBe(
      "gskittles0@google.ca"
    );
    expect(screen.getByTestId("gender").textContent).toBe("Male");
    expect(screen.getByTestId("age").textContent).toBe("58");

    expect(screen.getByTestId("delete-button")).toBeInTheDocument();
  });

  it("should open delete patient modal on click on delete button", () => {
    render(<Component />);

    fireEvent.click(screen.getByTestId("delete-button"));
    expect(screen.getByTestId("delete-modal-wrapper")).toBeInTheDocument();
  });

  it("should show correct email id message on the delete patient modal", () => {
    render(<Component />);

    fireEvent.click(screen.getByTestId("delete-button"));
    expect(
      screen.getByTestId("delete-modal-email-id-message").textContent
    ).toBe("(email id: gskittles0@google.ca)");
  });
});
