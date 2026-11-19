import {applications, applicationReferences} from './application-data-v17.mjs';
import {additionalApplications, additionalReferences, additionalGroups} from './business-services-data-v17.mjs';
import {industryKnowledge} from './knowledge-v10.mjs';
import {applicationImages} from './application-images-v18.mjs';
import {expansionApplications, expansionReferences} from './application-expansion-v19.mjs';
import {refinedApplicationImages} from './application-images-v19.mjs';
import {healthcareApplications, healthcareReferences, healthcareGroups} from './application-healthcare-v20.mjs';

export const businessApplications = [...applications, ...additionalApplications, ...expansionApplications, ...healthcareApplications].map(item => ({...item, image: refinedApplicationImages[item.slug] ?? applicationImages[item.slug] ?? item.image}));
export const businessReferences = {...applicationReferences, ...additionalReferences, ...expansionReferences, ...healthcareReferences};
export const applicationGroups = [
  ...industryKnowledge.flatMap(({slug, name, en}) => [{slug, name, en, overview: `/industries/${slug}/`}, ...(slug === 'pharmaceutical-healthcare' ? healthcareGroups : [])]),
  ...additionalGroups.map(group => group.slug === 'agriculture-labs' ? {...group, name: 'ฟาร์มและห้องปฏิบัติการเกษตร', en: 'FARMS & AGRICULTURAL LABORATORIES'} : group)
];
