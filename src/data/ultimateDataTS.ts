import { UltimateData } from '../types';

// Import the JavaScript data
// @ts-ignore - Ignoring type checking for the import
import ultimateDataJS from '../../ultimateData.js';

// Cast the JavaScript data to our TypeScript interface
export const ultimateData: UltimateData = ultimateDataJS as UltimateData;

export default ultimateData; 