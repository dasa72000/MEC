import { z } from "zod";

const requiredString = z.string().min(1, "Este campo es requerido.");

const yearSchema = z.coerce.number().int().min(1970, "El año debe ser mayor a 1970").max(2035, "El año debe ser menor a 2035");

const dateString = z.string().optional().refine(val => {
    if (val === 'PARTIAL') return false;
    if (!val || val.trim() === '') return true; // Let optional and empty strings pass
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(val)) return false;
    const [day, month, year] = val.split('/').map(Number);
    const d = new Date(year, month - 1, day);
    return d && d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day;
}, { message: "Fecha inválida o incompleta. Por favor, complete día, mes y año." });

const requiredDateString = z.string().min(1, "Este campo es requerido.").refine(val => {
    if (val === 'PARTIAL') return false;
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(val)) return false;
    const [day, month, year] = val.split('/').map(Number);
    const d = new Date(year, month - 1, day);
    return d && d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day;
}, { message: "Fecha inválida o incompleta. Por favor, complete día, mes y año." });

const personSchema = z.object({
  names: requiredString,
  lastNames: requiredString,
  birthDate: dateString,
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
    "Escuela de Animadores",
    "Servicios en Pastoreo",
    "Servicios en Convivencia Familiar"
] as const;

const serverRetreatEntrySchema = z.object({
  date: dateString,
  role: z.string().optional(),
  comments: z.string().optional(),
}).refine((data) => {
    const hasValue = data.role || data.comments;
    if (!hasValue) return true;
    // if you start filling, then role is required
    return data.role && data.role !== '';
}, {
    message: "El rol es requerido si se ingresan comentarios o fecha.",
    path: ['role'],
});


const serverRetreatsSchema = z.object({
    Encuentro: z.array(serverRetreatEntrySchema).optional(),
    Diálogo: z.array(serverRetreatEntrySchema).optional(),
    "Fe y Conversión": z.array(serverRetreatEntrySchema).optional(),
    Reencuentro: z.array(serverRetreatEntrySchema).optional(),
    "Renovación Conyugal": z.array(serverRetreatEntrySchema).optional(),
    "Escuela de Animadores": z.array(serverRetreatEntrySchema).optional(),
    "Servicios en Pastoreo": z.array(serverRetreatEntrySchema).optional(),
    "Servicios en Convivencia Familiar": z.array(serverRetreatEntrySchema).optional(),
}).default({});


const secretariatSchema = z.object({
  name: requiredString,
  startYear: yearSchema,
  endYear: z.string().optional(),
}).refine(data => {
    if (data.endYear && data.endYear.length > 0) {
        const end = Number(data.endYear);
        if (isNaN(end) || end < 1970 || end > 2035) {
            return false;
        }
        return end >= data.startYear;
    }
    return true;
}, {
    message: "Año fin inválido o menor que el año de inicio.",
    path: ["endYear"],
});

const growthGroupSchema = z.object({
  groupName: requiredString,
  startDate: requiredDateString,
  endDate: requiredDateString,
  encounter: requiredString,
});

const growthLadderEntrySchema = z.object({
  name: z.string(),
  date: dateString,
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
    encounterNumber: requiredString,
    community: requiredString,
    country: z.string().optional(),
    affiliationNumber: z.string().optional(),
    encounterDate: dateString,
    belongsToGroup: z.boolean().optional(),
    group: z.string().optional(),
    civilMarriageDate: dateString,
    religiousMarriageDate: dateString,
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
    fullAddress: z.string().optional(),
    municipality: z.string().optional(),
    department: z.enum(DEPARTMENTS).optional(),
    homePhone: z.string().optional(),
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
];
