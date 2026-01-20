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
    if (!date) return '';
    // Format to YYYY-MM-DD, crucial for Google Forms date fields
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatServerRetreats(retreats: any[] | undefined): string {
    if (!retreats || retreats.length === 0) return 'No aplica.';
    return retreats.map(r => `Fecha: ${formatDate(r.date)}, Rol: ${r.role || 'N/A'}, Comentarios: ${r.comments || 'N/A'}`).join('\n');
}

function formatSecretariats(secretariats: any[] | undefined): string {
    if (!secretariats || secretariats.length === 0) return 'No aplica.';
    return secretariats.map(s => `Secretaría: ${s.name || 'N/A'}, Año: ${s.year || 'N/A'}`).join('\n');
}

function formatGrowthGroups(groups: any[] | undefined): string {
    if (!groups || groups.length === 0) return 'No aplica.';
    return groups.map(g => `Grupo: ${g.groupName || 'N/A'}, Desde: ${formatDate(g.startDate)}, Hasta: ${formatDate(g.endDate)}, Enc. No.: ${g.encounter || 'N/A'}`).join('\n');
}

export function submitToGoogleForm(data: FichaMatrimonialData) {
    const GOOGLE_FORM_VIEW_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSceHliAO4zEK7CdhQwq2oSXls9E_S6PHE10EMOa86nTEhKxsA/viewform';

    const params = new URLSearchParams();

    const appendData = (key: string, value: string | undefined | null) => {
        if (value) {
            params.append(key, value);
        }
    };

    appendData(fieldMappings.memberCode, data.marriageData.memberCode);
    appendData(fieldMappings.encounterNumber, data.marriageData.encounterNumber);
    appendData(fieldMappings.community, data.marriageData.community);
    appendData(fieldMappings.country, data.marriageData.country);
    appendData(fieldMappings.affiliation, data.marriageData.affiliation);
    appendData(fieldMappings.encounterYear, data.marriageData.encounterYear);
    appendData(fieldMappings.civilMarriageDate, formatDate(data.marriageData.civilMarriageDate));
    appendData(fieldMappings.religiousMarriageDate, formatDate(data.marriageData.religiousMarriageDate));
    appendData(fieldMappings.belongsToGroup, data.marriageData.belongsToGroup ? 'Sí' : 'No');
    appendData(fieldMappings.group, data.marriageData.group);

    appendData(fieldMappings.groomNames, data.groomData.names);
    appendData(fieldMappings.groomLastNames, data.groomData.lastNames);
    appendData(fieldMappings.groomBirthDate, formatDate(data.groomData.birthDate));
    appendData(fieldMappings.groomDui, data.groomData.dui);
    appendData(fieldMappings.groomNit, data.groomData.nit);
    appendData(fieldMappings.groomOccupation, data.groomData.occupation);
    appendData(fieldMappings.groomEmail, data.groomData.email);
    appendData(fieldMappings.groomCellPhone, data.groomData.cellPhone);
    appendData(fieldMappings.groomOfficePhone, data.groomData.officePhone);

    appendData(fieldMappings.brideNames, data.brideData.names);
    appendData(fieldMappings.brideLastNames, data.brideData.lastNames);
    appendData(fieldMappings.brideBirthDate, formatDate(data.brideData.birthDate));
    appendData(fieldMappings.brideDui, data.brideData.dui);
    appendData(fieldMappings.brideNit, data.brideData.nit);
    appendData(fieldMappings.brideOccupation, data.brideData.occupation);
    appendData(fieldMappings.brideEmail, data.brideData.email);
    appendData(fieldMappings.brideCellPhone, data.brideData.cellPhone);
    appendData(fieldMappings.brideOfficePhone, data.brideData.officePhone);

    appendData(fieldMappings.fullAddress, data.address.fullAddress);
    appendData(fieldMappings.municipality, data.address.municipality);
    appendData(fieldMappings.department, data.address.department);
    appendData(fieldMappings.homePhone, data.address.homePhone);

    const growthLadderMap = new Map(data.growthLadder.map(item => [item.name, item.date]));
    appendData(fieldMappings.growthLadderDialogo, formatDate(growthLadderMap.get('Diálogo')));
    appendData(fieldMappings.growthLadderRenovacion, formatDate(growthLadderMap.get('Renovación Conyugal')));
    appendData(fieldMappings.growthLadderFeYConversion, formatDate(growthLadderMap.get('Fe y Conversión')));
    appendData(fieldMappings.growthLadderEscuela, formatDate(growthLadderMap.get('Escuela de Animadores')));
    appendData(fieldMappings.growthLadderPastoreo, formatDate(growthLadderMap.get('Pastoreo')));
    appendData(fieldMappings.growthLadderReencuentro, formatDate(growthLadderMap.get('Reencuentro')));
    appendData(fieldMappings.growthLadderConvivencia, formatDate(growthLadderMap.get('Convivencia Familiar')));
    appendData(fieldMappings.growthLadderMesa, formatDate(growthLadderMap.get('Alrededor de la Mesa')));

    appendData(fieldMappings.serverRetreatsEncuentro, formatServerRetreats(data.serverRetreats.Encuentro));
    appendData(fieldMappings.serverRetreatsDialogo, formatServerRetreats(data.serverRetreats.Diálogo));
    appendData(fieldMappings.serverRetreatsFeYConversion, formatServerRetreats(data.serverRetreats['Fe y Conversión']));
    appendData(fieldMappings.serverRetreatsReencuentro, formatServerRetreats(data.serverRetreats.Reencuentro));
    appendData(fieldMappings.serverRetreatsRenovacion, formatServerRetreats(data.serverRetreats['Renovación Conyugal']));
    appendData(fieldMappings.serverRetreatsEscuela, formatServerRetreats(data.serverRetreats['Escuela de Animadores']));
    
    appendData(fieldMappings.secretariats, formatSecretariats(data.secretariats));
    appendData(fieldMappings.attendsGeneralAssembly, data.attendsGeneralAssembly ? 'Sí' : 'No');

    appendData(fieldMappings.growthGroups, formatGrowthGroups(data.growthGroups));

    appendData(fieldMappings.observations, data.observations);
    
    const fullUrl = `${GOOGLE_FORM_VIEW_URL}?${params.toString()}`;
    
    window.open(fullUrl, '_blank');
}
