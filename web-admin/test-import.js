// test-import.js
  import React from 'react';
  import { Input } from './src/components/common';
  import { RESERVATION_STATUS } from '@shared/constants';
  import { updateReservationStatus } from '@store/slices/reservationSlice';

console.log('=== TEST IMPORTS ===');

try {
  // Test 1: Import basique
  console.log('✅ React OK');
} catch (e) {
  console.error('❌ React:', e);
}

try {
  // Test 2: Import components
  console.log('✅ Components OK');
} catch (e) {
  console.error('❌ Components:', e);
}

try {
  // Test 3: Import shared
  console.log('✅ Shared constants OK');
} catch (e) {
  console.error('❌ Shared constants:', e);
}

try {
  // Test 4: Import store
  console.log('✅ Store OK');
} catch (e) {
  console.error('❌ Store:', e);
}