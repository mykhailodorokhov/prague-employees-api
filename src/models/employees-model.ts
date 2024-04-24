import { EmployeeBodyType } from "../schemas/employee-schema";

const employees: Employee[] = [
  {
    id: 0,
    name: "John Doe",
    title: "Chief Happinnes Officer",
    tribe: {
      id: 1,
      name: "Interstellar",
      department: "Engineering Excellence",
    },
  },
  {
    id: 1,
    name: "Foo Bar",
    title: "Senior Vibe Specialist",
    tribe: {
      id: 1,
      name: "Interstellar",
      department: "Engineering Excellence",
    },
  },
];

export interface Employee {
  id: number;
  name: string;
  title: string;
  tribe: {
    id: number;
    name: string;
    department: string;
  };
}

export function getEmployees(): Employee[] {
  return structuredClone(employees);
}

export function getEmployee(id: number): Employee | null {
  const result = employees.filter((x) => x.id == id);
  return result.length !== 0 ? structuredClone(result[0]) : null;
}

export function createEmployee(employee: EmployeeBodyType): Employee {
  const newId = Math.max(...employees.map((x) => x.id)) + 1;
  const newEmployee: Employee = {
    id: newId,
    name: employee.name,
    title: employee.title,
    tribe: {
      id: employee.tribe.id,
      name: employee.tribe.name,
      department: employee.tribe.department,
    },
  };
  employees.push(newEmployee);
  return structuredClone(newEmployee);
}

export function deleteEmployee(id: number): number | null {
  const indexToDelete = employees.findIndex((x) => x.id == id);
  if (indexToDelete === -1) return null;

  employees.splice(indexToDelete, 1);
  return id;
}
