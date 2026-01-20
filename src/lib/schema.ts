import { z } from "zod";

const requiredString = z.string().min(1, "Este campo es requerido.");

const yearSchema = z.coerce.number().int().min(1970, "El año debe ser mayor a 1970").max(2035, "El año debe ser menor a 2035");

const personSchema = z.object({
  names: requiredString,
  lastNames: requiredString,
  birthDate: z.date({ required_error: "Este campo es requerido." }),
  dui: z.string().optional(),
  nit: z.string().optional(),
  occupation: requiredString,
  email: requiredString.email("Email inválido."),
  cellPhone: requiredString,
  officePhone: z.string().optional(),
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
});

const growthGroupSchema = z.object({
  groupName: requiredString,
  startDate: z.date({ required_error: "Este campo es requerido." }),
  endDate: z.date({ required_error: "Este campo es requerido." }),
  encounter: requiredString,
});

const growthLadderEntrySchema = z.object({
  name: z.string(),
  date: z.date().optional(),
});

export const DEPARTMENTS = [
  "Ahuachapán",
  "Cabañas",
  "Chalatenango",
  "Cuscatlán",
  "La Libertad",
  "La Paz",
  "La Unión",
  "Morazán",
  "San Miguel",
  "San Salvador",
  "San Vicente",
  "Santa Ana",
  "Sonsonate",
  "Usulután",
] as const;


export const fichaMatrimonialSchema = z.object({
  marriageData: z.object({
    memberCode: z.string().optional(),
    encounterNumber: requiredString,
    community: requiredString,
    country: z.string().optional(),
    affiliation: z.string().optional(),
    encounterDate: z.date().optional(),
    belongsToGroup: z.boolean().optional(),
    group: z.string().optional(),
    civilMarriageDate: z.date().optional(),
    religiousMarriageDate: z.date().optional(),
  }).refine(data => {
    if (data.belongsToGroup === true && !data.group) {
      return false;
    }
    return true;
  }, {
    message: "El nombre del grupo es requerido.",
    path: ["group"],
  }),
  groomData: personSchema,
  brideData: personSchema,
  address: z.object({
    fullAddress: requiredString,
    municipality: requiredString,
    department: z.enum(DEPARTMENTS, { required_error: "Debe seleccionar un departamento." }),
    homePhone: requiredString,
  }),
  growthLadder: z.array(growthLadderEntrySchema).default([]),
  serverRetreats: serverRetreatsSchema,
  secretariats: z.array(secretariatSchema).default([]),
  attendsGeneralAssembly: z.boolean({ required_error: "Por favor, indique si asisten a las asambleas." }),
  growthGroups: z.array(growthGroupSchema).default([]),
  observations: z.string().optional(),
});

export type FichaMatrimonialData = z.infer<typeof fichaMatrimonialSchema>;

export const GROWTH_LADDER_STEPS = [
  "Diálogo",
  "Renovación Conyugal",
  "Fe y Conversión",
  "Escuela de Animadores",
  "Pastoreo",
  "Reencuentro",
  "Convivencia Familiar",
  "Alrededor de la Mesa",
];
