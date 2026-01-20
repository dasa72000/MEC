"use client";

import { format } from 'date-fns';
import type { FichaMatrimonialData } from './schema';

const fieldMappings = {
  // Datos del Matrimonio
  memberCode: 'entry.1156990869',
  encounterNumber: 'entry.1583014279',
  community: 'entry.1088149683',
  country: 'entry.791191831',
  affiliation: 'entry.553504835',
  correlative: 'entry.301217874',
  encounterYear: 'entry.1308011902',
  civilMarriageDate: 'entry.1705889295',
  religiousMarriageDate: 'entry.2019193873',
  belongsToGroup: 'entry.1168466126',
  group: 'entry.438479411',

  // Datos Personales (Él)
  groomNames: 'entry.1226284909',
  groomLastNames: 'entry.1475879770',
  groomBirthDate: 'entry.138200667',
  groomDui: 'entry.192079651',
  groomNit: 'entry.447242304',
  groomOccupation: 'entry.1694910302',
  groomEmail: 'entry.762826639',
  groomCellPhone: 'entry.865727457',
  groomOfficePhone: 'entry.617110316',

  // Datos Personales (Ella)
  brideNames: 'entry.864169649',
  brideLastNames: 'entry.268050510',
  brideBirthDate: 'entry.916118613',
  brideDui: 'entry.880115904',
  brideNit: 'entry.1900352598',
  brideOccupation: 'entry.1128913595',
  brideEmail: 'entry.1540070540',
  brideCellPhone: 'entry.1344314415',
  brideOfficePhone: 'entry.93459105',

  // Dirección
  fullAddress: 'entry.1241868238',
  municipality: 'entry.1169903313',
  department: 'entry.1520416446',
  homePhone: 'entry.1084534512',

  // Escalera de Crecimiento
  growthLadderDialogo: 'entry.831348012',
  growthLadderRenovacion: 'entry.1057522194',
  growthLadderFeYConversion: 'entry.185377418',
  growthLadderEscuela: 'entry.1144574340',
  growthLadderPastoreo: 'entry.721247053',
  growthLadderReencuentro: 'entry.1145015679',
  growthLadderConvivencia: 'entry.1502870648',
  growthLadderMesa: 'entry.977902280',

  // Retiros como Servidores
  serverRetreatsEncuentro: 'entry.14539237',
  serverRetreatsDialogo: 'entry.943970582',
  serverRetreatsFeYConversion: 'entry.1976107671',
  serverRetreatsReencuentro: 'entry.1212632899',
  serverRetreatsRenovacion: 'entry.94533679',
  serverRetreatsEscuela: 'entry.1825921011',
  
  // Secretarías y Asamblea
  secretariats: 'entry.1828306218',
  attendsGeneralAssembly: 'entry.1892421715',

  // Grupos de Crecimiento
  growthGroups: 'entry.1164913253',

  // Observaciones
  observations: 'entry.756144804',
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
    
    const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSceHliAO4zEK7CdhQwq2oSXls9E_S6PHE10EMOa86nTEhKxsA/formResponse';
    
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
