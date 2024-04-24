import { Static, Type } from "@sinclair/typebox";

export const employeeBodySchema = Type.Object({
  name: Type.String(),
  title: Type.String(),
  tribe_id: Type.Integer(),
});

export const idParamsSchema = Type.Object({
  id: Type.Integer(),
});

export type EmployeeBodyType = Static<typeof employeeBodySchema>;
export type IdParamsType = Static<typeof idParamsSchema>;
