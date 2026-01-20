"use client";

import { format } from 'date-fns';
import type { FichaMatrimonialData, GrowthLadderStep, RetreatType } from './schema';

// =====================================================================================
// == PASO 1: Reemplaza los IDs de placeholder con los IDs de tu Google Form.         ==
// =====================================================================================
// Sigue las instrucciones para obtener el enlace de pre-rellenado y encuentra
// el ID de "entry.xxxxxxxx" que corresponde a cada campo.
const fieldMappings = {
  // Datos del Matrimonio
  memberCode: 'entry.0000000001',
  encounterNumber: 'entry.0000000002',
  community: 'entry.0000000003',
  country: 'entry.0000000004',
  affiliation: 'entry.0000000005',
  correlative: 'entry.0000000006',
  encounterYear: 'entry.0000000007',
  civilMarriageDate: 'entry.0000000008',
  religiousMarriageDate: 'entry.0000000009',
  belongsToGroup: 'entry.0000000010',
  group: 'entry.0000000011',

  // Datos Personales (Él)
  groomNames: 'entry.0000000012',
  groomLastNames: 'entry.0000000013',
  groomBirthDate: 'entry.0000000014',
  groomDui: 'entry.0000000015',
  groomNit: 'entry.0000000016',
  groomOccupation: 'entry.0000000017',
  groomEmail: 'entry.0000000018',
  groomCellPhone: 'entry.0000000019',
  groomOfficePhone: 'entry.0000000020',

  // Datos Personales (Ella)
  brideNames: 'entry.0000000021',
  brideLastNames: 'entry.0000000022',
  brideBirthDate: 'entry.0000000023',
  brideDui: 'entry.0000000024',
  brideNit: 'entry.0000000025',
  brideOccupation: 'entry.0000000026',
  brideEmail: 'entry.0000000027',
  brideCellPhone: 'entry.0000000028',
  brideOfficePhone: 'entry.0000000029',

  // Dirección
  fullAddress: 'entry.0000000030',
  municipality: 'entry.0000000031',
  department: 'entry.0000000032',
  homePhone: 'entry.0000000033',

  // Escalera de Crecimiento
  growthLadderDialogo: 'entry.0000000034',
  growthLadderRenovacion: 'entry.0000000035',
  growthLadderFeYConversion: 'entry.0000000036',
  growthLadderEscuela: 'entry.0000000037',
  growthLadderPastoreo: 'entry.0000000038',
  growthLadderReencuentro: 'entry.0000000039',
  growthLadderConvivencia: 'entry.0000000040',
  growthLadderMesa: 'entry.0000000041',

  // Retiros como Servidores
  serverRetreatsEncuentro: 'entry.0000000042',
  serverRetreatsDialogo: 'entry.0000000043',
  serverRetreatsFeYConversion: 'entry.0000000044',
  serverRetreatsReencuentro: 'entry.0000000045',
  serverRetreatsRenovacion: 'entry.0000000046',
  serverRetreatsEscuela: 'entry.0000000047',
  
  // Secretarías y Asamblea
  secretariats: 'entry.0000000048',
  attendsGeneralAssembly: 'entry.0000000049',

  // Grupos de Crecimiento
  growthGroups: 'entry.0000000050',

  // Observaciones
  observations: 'entry.0000000051',
};


function formatDate(date: Date | undefined): string {
    return date ? format(date, 'yyyy-MM-dd') : '';
}

function formatServerRetreats(retreats: any[] | undefined): string {
    if (!retreats || retreats.length === 0) return 'No aplica.';
    return retreats.map(r => `Fecha: ${formatDate(r.date)}, Rol: ${r.role}, Comentarios: ${r.comments || 'N/A'}`).join('\n');
}

function formatSecretariats(secretariats: any[] | undefined): string {
    if (!secretariats || secretariats.length === 0) return 'No aplica.';
    return secretariats.map(s => `Secretaría: ${s.name}, Año: ${s.year}`).join('\n');
}

function formatGrowthGroups(groups: any[] | undefined): string {
    if (!groups || groups.length === 0) return 'No aplica.';
    return groups.map(g => `Grupo: ${g.groupName}, Desde: ${formatDate(g.startDate)}, Hasta: ${formatDate(g.endDate)}, Enc. No.: ${g.encounter}`).join('\n');
}


export async function submitToGoogleForm(data: FichaMatrimonialData) {
    const formData = new FormData();

    formData.append(fieldMappings.memberCode, data.marriageData.memberCode || '');
    formData.append(fieldMappings.encounterNumber, data.marriageData.encounterNumber);
    formData.append(fieldMappings.community, data.marriageData.community);
    formData.append(fieldMappings.country, data.marriageData.country || '');
    formData.append(fieldMappings.affiliation, data.marriageData.affiliation || '');
    formData.append(fieldMappings.correlative, data.marriageData.correlative || '');
    formData.append(fieldMappings.encounterYear, data.marriageData.encounterYear || '');
    formData.append(fieldMappings.civilMarriageDate, formatDate(data.marriageData.civilMarriageDate));
    formData.append(fieldMappings.religiousMarriageDate, formatDate(data.marriageData.religiousMarriageDate));
    formData.append(fieldMappings.belongsToGroup, data.marriageData.belongsToGroup ? 'Sí' : 'No');
    formData.append(fieldMappings.group, data.marriageData.group || '');

    formData.append(fieldMappings.groomNames, data.groomData.names);
    formData.append(fieldMappings.groomLastNames, data.groomData.lastNames);
    formData.append(fieldMappings.groomBirthDate, formatDate(data.groomData.birthDate));
    formData.append(fieldMappings.groomDui, data.groomData.dui);
    formData.append(fieldMappings.groomNit, data.groomData.nit);
    formData.append(fieldMappings.groomOccupation, data.groomData.occupation);
    formData.append(fieldMappings.groomEmail, data.groomData.email);
    formData.append(fieldMappings.groomCellPhone, data.groomData.cellPhone);
    formData.append(fieldMappings.groomOfficePhone, data.groomData.officePhone);

    formData.append(fieldMappings.brideNames, data.brideData.names);
    formData.append(fieldMappings.brideLastNames, data.brideData.lastNames);
    formData.append(fieldMappings.brideBirthDate, formatDate(data.brideData.birthDate));
    formData.append(fieldMappings.brideDui, data.brideData.dui);
    formData.append(fieldMappings.brideNit, data.brideData.nit);
    formData.append(fieldMappings.brideOccupation, data.brideData.occupation);
    formData.append(fieldMappings.brideEmail, data.brideData.email);
    formData.append(fieldMappings.brideCellPhone, data.brideData.cellPhone);
    formData.append(fieldMappings.brideOfficePhone, data.brideData.officePhone);

    formData.append(fieldMappings.fullAddress, data.address.fullAddress);
    formData.append(fieldMappings.municipality, data.address.municipality);
    formData.append(fieldMappings.department, data.address.department);
    formData.append(fieldMappings.homePhone, data.address.homePhone);

    const growthLadderMap = new Map(data.growthLadder.map(item => [item.name, item.date]));
    formData.append(fieldMappings.growthLadderDialogo, formatDate(growthLadderMap.get('Diálogo')));
    formData.append(fieldMappings.growthLadderRenovacion, formatDate(growthLadderMap.get('Renovación Conyugal')));
    formData.append(fieldMappings.growthLadderFeYConversion, formatDate(growthLadderMap.get('Fe y Conversión')));
    formData.append(fieldMappings.growthLadderEscuela, formatDate(growthLadderMap.get('Escuela de Animadores')));
    formData.append(fieldMappings.growthLadderPastoreo, formatDate(growthLadderMap.get('Pastoreo')));
    formData.append(fieldMappings.growthLadderReencuentro, formatDate(growthLadderMap.get('Reencuentro')));
    formData.append(fieldMappings.growthLadderConvivencia, formatDate(growthLadderMap.get('Convivencia Familiar')));
    formData.append(fieldMappings.growthLadderMesa, formatDate(growthLadderMap.get('Alrededor de la Mesa')));

    formData.append(fieldMappings.serverRetreatsEncuentro, formatServerRetreats(data.serverRetreats.Encuentro));
    formData.append(fieldMappings.serverRetreatsDialogo, formatServerRetreats(data.serverRetreats.Diálogo));
    formData.append(fieldMappings.serverRetreatsFeYConversion, formatServerRetreats(data.serverRetreats['Fe y Conversión']));
    formData.append(fieldMappings.serverRetreatsReencuentro, formatServerRetreats(data.serverRetreats.Reencuentro));
    formData.append(fieldMappings.serverRetreatsRenovacion, formatServerRetreats(data.serverRetreats['Renovación Conyugal']));
    formData.append(fieldMappings.serverRetreatsEscuela, formatServerRetreats(data.serverRetreats['Escuela de Animadores']));
    
    formData.append(fieldMappings.secretariats, formatSecretariats(data.secretariats));
    formData.append(fieldMappings.attendsGeneralAssembly, data.attendsGeneralAssembly ? 'Sí' : 'No');

    formData.append(fieldMappings.growthGroups, formatGrowthGroups(data.growthGroups));

    formData.append(fieldMappings.observations, data.observations || 'Sin observaciones.');
    
    // =====================================================================================
    // == PASO 2: Reemplaza esta URL con la URL de acción de tu Google Form.             ==
    // =====================================================================================
    const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';
    
    try {
        await fetch(GOOGLE_FORM_ACTION_URL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors',
        });
    } catch (error) {
        console.error('Error submitting to Google Form:', error);
        throw new Error('No se pudo enviar el formulario. Por favor, intente de nuevo.');
    }
}
