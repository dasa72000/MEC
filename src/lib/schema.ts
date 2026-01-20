import { z } from "zod";

const requiredString = z.string().min(1, "Este campo es requerido.");

const yearSchema = z.coerce.number().int().min(1970, "El año debe ser mayor a 1970").max(2035, "El año debe ser menor a 2035");

const personSchema = z.object({
  names: requiredString,
  lastNames: requiredString,
  birthDate: z.date({ required_error: "Este campo es requerido." }),
  dui: requiredString,
  nit: requiredString,
  occupation: requiredString,
  email: requiredString.email("Email inválido."),
  cellPhone: requiredString,
  officePhone: requiredString,
});

export const RETREAT_TYPES = [
    "Encuentro",
    "Diálogo",
    "Fe y Conversión",
    "Reencuentro",
    "Renovación Conyugal",
    "Escuela de Animadores"
] as const;

const serverRetreatEntrySchema = z.object({
  date: z.date({ required_error: "Este campo es requerido." }),
  role: requiredString,
  comments: z.string().optional(),
});

const serverRetreatsSchema = z.object({
    Encuentro: z.array(serverRetreatEntrySchema).optional(),
    Diálogo: z.array(serverRetreatEntrySchema).optional(),
    "Fe y Conversión": z.array(serverRetreatEntrySchema).optional(),
    Reencuentro: z.array(serverRetreatEntrySchema).optional(),
    "Renovación Conyugal": z.array(serverRetreatEntrySchema).optional(),
    "Escuela de Animadores": z.array(serverRetreatEntrySchema).optional(),
}).default({});


const secretariatSchema = z.object({
  name: requiredString,
  year: yearSchema,
  inAssembly: z.boolean().default(false),
});

const growthGroupSchema = z.object({
  groupName: requiredString,
  startDate: z.date({ required_error: "Este campo es requerido." }),
  endDate: z.date({ required_error: "Este campo es requerido." }),
  encounter: requiredString,
});


export const fichaMatrimonialSchema = z.object({
  marriageData: z.object({
    memberCode: z.string().optional(),
    encounterNumber: requiredString,
    community: requiredString,
    country: z.string().optional(),
    affiliation: z.string().optional(),
    correlative: z.string().optional(),
    encounterYear: z.string().optional(),
    group: z.string().optional(),
    civilMarriageDate: z.date().optional(),
    religiousMarriageDate: z.date().optional(),
  }),
  groomData: personSchema,
  brideData: personSchema,
  address: z.object({
    street: requiredString,
    city: requiredString,
    state: requiredString,
    zip: requiredString,
    homePhone: requiredString,
  }),
  growthLadder: z.array(z.string()).default([]),
  serverRetreats: serverRetreatsSchema,
  secretariats: z.array(secretariatSchema).default([]),
  growthGroups: z.array(growthGroupSchema).default([]),
  observations: z.string().optional(),
});

export type FichaMatrimonialData = z.infer<typeof fichaMatrimonialSchema>;

export const GROWTH_LADDER_STEPS = ["Encuentro", "Crecimiento 1", "Crecimiento 2", "Comunidad de Comunidades", "Opción Fundamental"];
